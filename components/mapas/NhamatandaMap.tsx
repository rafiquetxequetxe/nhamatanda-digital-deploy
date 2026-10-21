"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createThemeController,
  THEMES,
  THEME_KEYS,
  type LayerState,
} from "./map-layers";
import { isThemeKey, type ThemeKey } from "../../lib/catalog";
import { ALTITUDE_LEGEND, SLOPE_LEGEND } from "./terrain-analysis";
import { pointOnFeature } from "@turf/turf";

type LayerKey =
  | "district"
  | "posts"
  | "localidades"
  | "estradas"
  | "rios"
  | "lagoas"
  | "nascentes"
  | "bacias"
  | "hillshade"
  | "altitude"
  | "declividade"
  | "agua"
  | "educacao"
  | "saude"
  | "energia"
  | "telecom"
  | "agricultura"
  | "usoSolo"
  | "vegetacao"
  | "areasUrbanas"
  | "economia"
  | "demografia";

type Category = {
  id: string;
  title: string;
  color: string;
  items: { key: LayerKey; label: string }[];
};

const BASE_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const INITIAL_LAYERS: Record<LayerKey, boolean> = {
  district: true,
  posts: true,
  localidades: false,
  estradas: false,
  rios: false,
  lagoas: false,
  nascentes: false,
  bacias: false,
  hillshade: false,
  altitude: false,
  declividade: false,
  agua: false,
  educacao: false,
  saude: false,
  energia: false,
  telecom: false,
  agricultura: false,
  usoSolo: false,
  vegetacao: false,
  areasUrbanas: false,
  economia: false,
  demografia: false,
};

const CATEGORIES: Category[] = [
  {
    id: "administrativo",
    title: "Administrativo",
    color: "#176B4A",
    items: [
      { key: "district", label: "Distrito" },
      { key: "posts", label: "Postos administrativos" },
      { key: "localidades", label: "Localidades" },
    ],
  },
  {
    id: "relevo",
    title: "Relevo",
    color: "#9A7041",
    items: [
      { key: "hillshade", label: "Sombreamento do relevo" },
      { key: "altitude", label: "Altitude" },
      { key: "declividade", label: "Declividade" },
    ],
  },
  {
    id: "hidrografia",
    title: "Hidrografia",
    color: "#2768B4",
    items: [
      { key: "rios", label: "Rios" },
      { key: "lagoas", label: "Lagoas" },
      { key: "nascentes", label: "Nascentes" },
      { key: "bacias", label: "Bacias hidrográficas" },
    ],
  },
  {
    id: "infraestrutura",
    title: "Infraestrutura",
    color: "#6853A0",
    items: [
      { key: "estradas", label: "Transportes" },
      { key: "agua", label: "Água" },
      { key: "educacao", label: "Educação" },
      { key: "saude", label: "Saúde" },
      { key: "energia", label: "Energia" },
      { key: "telecom", label: "Telecomunicações" },
    ],
  },
  {
    id: "territorio",
    title: "Território",
    color: "#4C9460",
    items: [
      { key: "agricultura", label: "Agricultura" },
      { key: "usoSolo", label: "Uso do solo" },
      { key: "vegetacao", label: "Vegetação" },
      { key: "areasUrbanas", label: "Áreas urbanas" },
    ],
  },
  {
    id: "economia",
    title: "Economia",
    color: "#C88B10",
    items: [{ key: "economia", label: "Actividades económicas" }],
  },
  {
    id: "demografia",
    title: "Demografia",
    color: "#247B72",
    items: [{ key: "demografia", label: "Dados populacionais" }],
  },
];

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isFeatureCollection(value: unknown): value is FeatureCollection {
  if (!value || typeof value !== "object") return false;

  const candidate = value as {
    type?: unknown;
    features?: unknown;
  };

  return (
    candidate.type === "FeatureCollection" && Array.isArray(candidate.features)
  );
}

//tratamento 3D e satélite
function applyReferenceAppearance(map: maplibregl.Map) {
  // Guarda as camadas originais antes de acrescentar o satélite.
  const originalLayers = [...(map.getStyle().layers ?? [])];

  if (!map.getSource("satellite-imagery")) {
    map.addSource("satellite-imagery", {
      type: "raster",
      tiles: [
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        'Imagery © <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9" target="_blank" rel="noopener noreferrer">Esri and contributors</a>',
    });
  }

  if (!map.getLayer("satellite-imagery")) {
    map.addLayer(
      {
        id: "satellite-imagery",
        type: "raster",
        source: "satellite-imagery",
        paint: {
          "raster-opacity": 1,
          "raster-saturation": -0.18,
          "raster-contrast": 0.12,
          "raster-brightness-min": 0.08,
          "raster-brightness-max": 0.88,
          "raster-fade-duration": 300,
        },
      },
      originalLayers[0]?.id,
    );
  }

  for (const layer of originalLayers) {
    const id = layer.id.toLowerCase();

    const sourceLayer =
  "source-layer" in layer ? layer["source-layer"] : "";

if (layer.type === "fill" && sourceLayer === "water") {
  map.setLayoutProperty(layer.id, "visibility", "visible");
  map.setPaintProperty(layer.id, "fill-color", "#428cb3");
  map.setPaintProperty(layer.id, "fill-opacity", 0.65);
  continue;
}

    // Remove os fundos planos que tapariam a imagem de satélite.
    // As camadas administrativas são criadas posteriormente.
    if (
      layer.type === "background" ||
      layer.type === "fill" ||
      layer.type === "fill-extrusion"
    ) {
      map.setLayoutProperty(layer.id, "visibility", "none");
      continue;
    }

    // Mantém rios visíveis sobre a imagem.
    if (layer.type === "line" && /waterway|river|stream/.test(id)) {
      map.setPaintProperty(layer.id, "line-color", "#89c9ed");
      map.setPaintProperty(layer.id, "line-opacity", 0.9);
      continue;
    }

    // Estradas principais em dourado.
    // Preserva as larguras e os filtros originais do estilo.
    if (
      layer.type === "line" &&
      /motorway|trunk|primary/.test(id) &&
      !/casing|outline|tunnel/.test(id)
    ) {
      map.setPaintProperty(layer.id, "line-color", "#efc66f");
      map.setPaintProperty(layer.id, "line-opacity", 0.95);
    }

    // Texto branco com halo escuro para leitura sobre satélite.
    if (layer.type === "symbol" && layer.layout?.["text-field"] !== undefined) {
      // Mantém o desenho original dos escudos de números das estradas.
      if (/shield/.test(id)) continue;

      map.setPaintProperty(layer.id, "text-color", "#ffffff");
      map.setPaintProperty(
        layer.id,
        "text-halo-color",
        "rgba(20, 38, 30, 0.9)",
      );
      map.setPaintProperty(layer.id, "text-halo-width", 1.6);
      map.setPaintProperty(layer.id, "text-halo-blur", 0.4);
    }
  }
}

function TransportLegend() {
  const items = [
    { label: "Estradas primárias", color: "#FFAA38" },
    { label: "Estradas secundárias", color: "#F4DE76" },
    { label: "Estradas vicinais", color: "#D9B995" },
    { label: "Outras estradas", color: "#D1D5DB" },
    { label: "Ferrovia", color: "#BA91F2", railway: true },
  ];

  return (
    <div
      className="rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg"
      style={{
        width: 230,
        maxWidth: "100%",
        color: "#334155",
        fontSize: 12,
      }}
    >
      <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
        Transportes e ligações
      </div>

      {items.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 8,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              position: "relative",
              width: 28,
              height: 5,
              borderRadius: 2,
              background: item.color,
              flexShrink: 0,
            }}
          >
            {item.railway && (
              <span
                style={{
                  position: "absolute",
                  inset: "2px 0",
                  borderTop: "1px dashed white",
                }}
              />
            )}
          </span>

          <span>{item.label}</span>
        </div>
      ))}

      <p style={{ margin: "10px 0 0", lineHeight: 1.5 }}>
        Clique numa via para consultar o percurso, o corredor,
        o pavimento e a extensão registada, quando disponíveis.
      </p>
    </div>
  );
}

export default function NhamatandaMap() {
   const mapWrapper = useRef<HTMLDivElement>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const thematicRef = useRef<ReturnType<typeof createThemeController> | null>(
    null,
  );
  const [themeStates, setThemeStates] = useState<
    Partial<Record<ThemeKey, LayerState>>
  >({});

  const [layers, setLayers] =
    useState<Record<LayerKey, boolean>>(INITIAL_LAYERS);

  const [available, setAvailable] = useState<
    Partial<Record<LayerKey, boolean>>
  >({});

  const [openCategory, setOpenCategory] = useState<string | null>();

  const [panelOpen, setPanelOpen] = useState(false);
  const [terrain3D, setTerrain3D] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [attempt, setAttempt] = useState(0);

  /* Abre o painel automaticamente em ecrãs grandes.
  useEffect(() => {
    setPanelOpen(window.innerWidth >= 1024);
  }, []); */

  useEffect(() => {
    const container = mapContainer.current;

    if (!container) return;

    let disposed = false;
    let baseLoaded = false;
    let instance: maplibregl.Map | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let loadTimeout: ReturnType<typeof setTimeout> | undefined;

    const controllers = new Set<AbortController>();
    const requestTimers = new Set<ReturnType<typeof setTimeout>>();

    setLoading(true);
    setReady(false);
    setMapError(null);
    setWarnings([]);
    setAvailable({});
    setThemeStates({});
    setTerrain3D(false);
    setLayers({ ...INITIAL_LAYERS });

    const addWarning = (message: string) => {
      if (disposed) return;

      setWarnings((current) =>
        current.includes(message) ? current : [...current, message],
      );
    };

    const cleanup = () => {
      disposed = true;

      if (loadTimeout) clearTimeout(loadTimeout);

      requestTimers.forEach((timer) => clearTimeout(timer));
      controllers.forEach((controller) => controller.abort());
      resizeObserver?.disconnect();

      if (mapRef.current === instance) {
        mapRef.current = null;
      }

      thematicRef.current?.dispose();
      thematicRef.current = null;
      instance?.remove();
    };

    try {
      maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
      instance = new maplibregl.Map({
        container,
        style: BASE_STYLE,
        center: [34.28, -19.3],
        zoom: 9.1,
        pitch: 0,
        bearing: 0,
        minZoom: 5,
        maxZoom: 17,
        attributionControl: {
          compact: true,
        },
      });

      const map = instance;
      mapRef.current = map;

      map.on("error", (event) => {
        if (disposed) return;

        const message = errorMessage(event.error ?? event);

        console.error("Erro no MapLibre:", event.error ?? event);

        if (!baseLoaded) {
          setMapError(message);
          setLoading(false);
          return;
        }

        const sourceId = (event as unknown as { sourceId?: string }).sourceId;

        if (sourceId === "terrain-dem") {
          addWarning(
            "Não foi possível carregar parte do relevo. Pode continuar em 2D.",
          );
        } else {
          addWarning(
            "Alguns recursos cartográficos não carregaram. Consulte a consola para ver os detalhes.",
          );
        }
      });

      map.addControl(
        new maplibregl.NavigationControl({
          showCompass: true,
          visualizePitch: true,
        }),
        "bottom-right",
      );

      if (mapWrapper.current) {
  map.addControl(
    new maplibregl.FullscreenControl({
      container: mapWrapper.current,
    }),
    "bottom-right",
  );
}

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (!disposed) map.resize();
        });

        resizeObserver.observe(container);
      }

      loadTimeout = setTimeout(() => {
        if (disposed || baseLoaded) return;

        setLoading(false);
        setMapError(
          "O mapa demorou demasiado a carregar. Verifique a ligação e tente novamente.",
        );
      }, 20000);

      const addPopup = (
        layerId: string,
        title: string,
        property: string,
        fallback: string,
      ) => {
        map.on("click", layerId, (event) => {
          if (disposed) return;

          const thematicIds = map
            .getStyle()
            .layers.filter(
              (layer) =>
                layer.id.startsWith("theme-") && layer.type !== "raster",
            )
            .map((layer) => layer.id);
          if (
            thematicIds.length &&
            map.queryRenderedFeatures(event.point, { layers: thematicIds })
              .length
          )
            return;
          if (
            ["theme-altitude", "theme-declividade"].some(
              (id) =>
                map.getLayer(id) &&
                map.getLayoutProperty(id, "visibility") === "visible",
            )
          )
            return;
          const feature = event.features?.[0];
          if (!feature) return;

          const content = document.createElement("div");
          content.style.cssText =
            "min-width:190px;padding:6px;font-family:Arial,sans-serif";

          const label = document.createElement("div");
          label.textContent = title;
          label.style.cssText =
            "font-size:11px;font-weight:700;color:#176B4A;" +
            "text-transform:uppercase;margin-bottom:6px";

          const name = document.createElement("div");
          name.textContent = String(feature.properties?.[property] || fallback);
          name.style.cssText = "font-size:17px;font-weight:700;color:#142235";

          const location = document.createElement("div");
          location.textContent = "Sofala · Moçambique";
          location.style.cssText =
            "font-size:12px;color:#687386;margin-top:5px";

          content.append(label, name, location);

          new maplibregl.Popup({
            closeButton: true,
            offset: 12,
          })
            .setLngLat(event.lngLat)
            .setDOMContent(content)
            .addTo(map);
        });

        map.on("mouseenter", layerId, () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", layerId, () => {
          map.getCanvas().style.cursor = "";
        });
      };

      const loadAdministrativeLayer = async (
        key: "district" | "posts",
        url: string,
      ) => {
        const controller = new AbortController();
        controllers.add(controller);

        const timer = setTimeout(() => controller.abort(), 120000);
        requestTimers.add(timer);

        try {
          const response = await fetch(url, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(`Resposta HTTP ${response.status}`);
          }

          const payload = await response.json();
          if (payload.error) {
            throw new Error(
            typeof payload.error === "string"
            ? payload.error
            : payload.error.message || "Erro na fonte geográfica."
            );
          }

          // Aceita GeoJSON directo e respostas da API com a propriedade data.
          const data: unknown = payload.data ?? payload;

          if (!isFeatureCollection(data)) {
            throw new Error("O serviço não devolveu um GeoJSON válido.");
          }

          if (data.features.length === 0) {
            throw new Error("O serviço não devolveu elementos.");
          }

          if (disposed) return;

          // Identifica o nome do posto mesmo se o serviço usar
          // um nome de propriedade diferente de "Posto".
          const styledData: FeatureCollection = {
            ...data,
            features: data.features.map((feature) => {
              const properties = feature.properties ?? {};

              const normalize = (value: string) =>
                value
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .trim();

              const postoEntry = Object.entries(properties).find(
                ([name, value]) =>
                  /posto/.test(normalize(name)) &&
                  typeof value === "string" &&
                  value.trim().length > 0,
              );

              const postoName =
                typeof postoEntry?.[1] === "string" ? postoEntry[1] : "";

              const normalizedName = normalize(postoName);

              const postoGroup = /\btica\b/.test(normalizedName)
                ? "tica"
                : /\bnhamatanda\b/.test(normalizedName)
                  ? "nhamatanda"
                  : "other";

              return {
                ...feature,
                properties: {
                  ...properties,
                  ...(postoName ? { Posto: postoName } : {}),
                  mapPostoGroup: postoGroup,
                },
              };
            }),
          };

          map.addSource(key, {
            type: "geojson",
            data: styledData,
            attribution:
              'Dados: <a href="https://www.mozgis.gov.mz/">MozGIS / CENACARTA</a>',
          });

          // Mantém os nomes das localidades acima dos polígonos.
          const beforeId = map
            .getStyle()
            .layers?.find((layer) => layer.type === "symbol")?.id;

          map.addLayer(
            {
              id: `${key}-fill`,
              type: "fill",
              source: key,
              paint: {
                "fill-color":
                  key === "district"
                    ? "#43864b"
                    : [
                        "match",
                        ["get", "mapPostoGroup"],
                        "nhamatanda",
                        "#43864b",
                        "tica",
                        "#82609e",
                        "#6C8F7A",
                      ],

                "fill-opacity": key === "district" ? 0.08 : 0.32,

                "fill-antialias": true,
              },
            },
            beforeId,
          );

          map.addLayer(
            {
              id: `${key}-outline`,
              type: "line",
              source: key,
              layout: {
                "line-cap": "round",
                "line-join": "round",
              },
              paint: {
                "line-color": key === "district" ? "#ffffff" : "#e7e0ee",

                "line-width":
                  key === "district"
                    ? [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        7,
                        1.8,
                        10,
                        3.2,
                        14,
                        4.5,
                      ]
                    : 1.3,

                "line-opacity": key === "district" ? 1 : 0.85,
              },
            },
            beforeId,
          );


          if (key === "posts") {
  // Agrupa todos os polígonos do mesmo posto.
  const groups = new Map<
    string,
    {
      name: string;
      features: FeatureCollection["features"];
    }
  >();

  for (const feature of styledData.features) {
    if (
      !feature.geometry ||
      !["Polygon", "MultiPolygon"].includes(feature.geometry.type)
    ) {
      continue;
    }

    const name = String(feature.properties?.Posto ?? "").trim();

    if (!name) continue;

    const normalizedName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ");

    const group = groups.get(normalizedName);

    if (group) {
      group.features.push(feature);
    } else {
      groups.set(normalizedName, {
        name,
        features: [feature],
      });
    }
  }

  // Produz apenas um ponto por posto administrativo.
  const labelData: FeatureCollection = {
    type: "FeatureCollection",

    features: Array.from(groups.entries()).map(
      ([id, group]) => {
        const point = pointOnFeature({
          type: "FeatureCollection",
          features: group.features,
        });

        return {
          type: "Feature",
          id,
          geometry: point.geometry,
          properties: {
            Posto: group.name,
          },
        };
      }
    ),
  };

  // Remove a camada antiga, ligada aos polígonos.
  if (map.getLayer("posts-labels")) {
    map.removeLayer("posts-labels");
  }

  const labelSource = map.getSource(
    "posts-label-points"
  ) as maplibregl.GeoJSONSource | undefined;

  if (labelSource) {
    labelSource.setData(labelData);
  } else {
    map.addSource("posts-label-points", {
      type: "geojson",
      data: labelData,
    });
  }

  map.addLayer({
    id: "posts-labels",
    type: "symbol",

    // Os nomes passam a usar os pontos, não os polígonos.
    source: "posts-label-points",

    layout: {
      "symbol-placement": "point",

      "text-field": [
        "concat",
        "Posto Administrativo de\n",
        ["get", "Posto"],
      ],

      "text-font": ["Noto Sans Regular"],

      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7,
        11,
        10,
        15,
      ],

      "text-anchor": "center",
      "text-justify": "center",
      "text-max-width": 16,

      "text-allow-overlap": false,
      "text-ignore-placement": false,
      "text-padding": 12,
    },

    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#16382b",
      "text-halo-width": 2,
      "text-halo-blur": 0.5,
    },
  });
}


          // Mantém o limite exterior acima dos preenchimentos,
          // independentemente da ordem de chegada das duas fontes.
          if (map.getLayer("district-outline")) {
            map.moveLayer("district-outline", beforeId);
          }

          // Enquadra a totalidade do distrito e reserva espaço
          // para o painel de camadas no lado direito.
          if (key === "district") {
            const bounds = new maplibregl.LngLatBounds();

            const extendCoordinates = (coordinates: unknown): void => {
              if (!Array.isArray(coordinates)) return;

              if (
                coordinates.length >= 2 &&
                typeof coordinates[0] === "number" &&
                typeof coordinates[1] === "number" &&
                Number.isFinite(coordinates[0]) &&
                Number.isFinite(coordinates[1])
              ) {
                bounds.extend([coordinates[0], coordinates[1]]);
                return;
              }

              coordinates.forEach(extendCoordinates);
            };

            for (const feature of data.features) {
              const geometry = feature.geometry;

              if (geometry && "coordinates" in geometry) {
                extendCoordinates(geometry.coordinates);
              }
            }

            if (!bounds.isEmpty()) {
              const wideMap = map.getContainer().clientWidth >= 900;

              map.fitBounds(bounds, {
                padding: {
                  top: 110,
                  bottom: 100,
                  left: 45,
                  right: wideMap ? 320 : 45,
                },
                pitch: 45,
                bearing: 0,
                maxZoom: 10,
                duration: 1200,
              });
            }
          }

          addPopup(
            `${key}-fill`,
            key === "district" ? "Distrito" : "Posto administrativo",
            key === "district" ? "Distrito" : "Posto",
            key === "district" ? "Nhamatanda" : "Posto administrativo",
          );

          setAvailable((current) => ({
            ...current,
            [key]: true,
          }));
        } catch (error) {
          if (disposed) return;

          console.error(`Erro na camada ${key}:`, error);

          addWarning(
            key === "district"
              ? "O limite oficial do distrito está indisponível."
              : "Os limites dos postos administrativos estão indisponíveis.",
          );
        } finally {
          clearTimeout(timer);
          requestTimers.delete(timer);
          controllers.delete(controller);
        }
      };

      map.on("load", () => {
        if (disposed) return;

        baseLoaded = true;
        if (loadTimeout) clearTimeout(loadTimeout);

        setLoading(false);
        setMapError(null);
        setReady(true);

        map.resize();

        // Aplica a aparência de satélite e ajusta as cores das camadas.
        try {
          applyReferenceAppearance(map);
        } catch (error) {
          console.error("Erro ao aplicar imagem de satélite:", error);

          addWarning(
            "Não foi possível preparar completamente a aparência de satélite.",
          );
        }

        // O relevo é opcional e começa desactivado.
        try {
          map.addSource("terrain-dem", {
            type: "raster-dem",
            tiles: [
              "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
            ],
            encoding: "terrarium",
            tileSize: 256,
            maxzoom: 15,
          });

          const beforeId = map
            .getStyle()
            .layers?.find((layer) => layer.type === "symbol")?.id;

          map.addLayer(
            {
              id: "terrain-hillshade",
              type: "hillshade",
              source: "terrain-dem",
              layout: {
                visibility: "none",
              },
              paint: {
                "hillshade-exaggeration": 0.35,
                "hillshade-shadow-color": "#385244",
                "hillshade-highlight-color": "#ffffff",
                "hillshade-accent-color": "#78927d",
              },
            },
            beforeId,
          );

          setAvailable((current) => ({
            ...current,
            hillshade: true,
          }));

          map.setLayoutProperty("terrain-hillshade", "visibility", "visible");

          map.setPaintProperty(
            "terrain-hillshade",
            "hillshade-exaggeration",
            0.35,
          );

          map.setTerrain({
            source: "terrain-dem",
            exaggeration: 1.25,
          });

          map.jumpTo({
            pitch: 45,
            bearing: 0,
          });

          setTerrain3D(true);

          setLayers((current) => ({
            ...current,
            hillshade: true,
          }));
        } catch (error) {
          console.error("Erro ao preparar o relevo:", error);
          addWarning("A visualização do relevo está indisponível.");
        }

        thematicRef.current = createThemeController(map, (key, state) => {
          if (!disposed)
            setThemeStates((current) => ({ ...current, [key]: state }));
        });
        for (const key of THEME_KEYS)
          thematicRef.current.setVisible(key, INITIAL_LAYERS[key]);

        // Uma falha nestas fontes não bloqueia o mapa base.
        void loadAdministrativeLayer("district", "/distrito.geojson");

        void loadAdministrativeLayer("posts", "/postos.geojson");
      });
    } catch (error) {
      console.error("Erro ao iniciar o mapa:", error);

      setLoading(false);
      setMapError(`Não foi possível iniciar o mapa: ${errorMessage(error)}`);

      cleanup();
    }

    return () => {
      if (!disposed) cleanup();
    };
  }, [attempt]);

  // Aplica o estado também quando uma camada termina de carregar.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const updateVisibility = (layerId: string, visible: boolean) => {
      if (!map.getLayer(layerId)) return;

      map.setLayoutProperty(
        layerId,
        "visibility",
        visible ? "visible" : "none",
      );
    };

    updateVisibility("district-fill", layers.district);
    updateVisibility("district-outline", layers.district);
    updateVisibility("posts-fill", layers.posts);
    updateVisibility("posts-outline", layers.posts);
    updateVisibility("posts-labels", layers.posts);
    updateVisibility("terrain-hillshade", layers.hillshade);
    for (const key of THEME_KEYS)
      thematicRef.current?.setVisible(key, layers[key]);
  }, [layers, available, ready]);

  const changeTerrain = (enabled: boolean) => {
    const map = mapRef.current;

    if (!map || !ready || !available.hillshade) return;

    try {
      if (enabled) {
        map.setTerrain({
          source: "terrain-dem",
          exaggeration: 1.25,
        });
      } else {
        map.setTerrain(null);
      }

      map.easeTo({
        pitch: enabled ? 48 : 0,
        duration: 700,
      });

      setTerrain3D(enabled);
    } catch (error) {
      console.error("Erro ao alterar o relevo:", error);

      setWarnings((current) => {
        const message = "Não foi possível alterar o modo de relevo.";
        return current.includes(message) ? current : [...current, message];
      });
    }
  };

  const toggleLayer = (key: LayerKey) => {
    if (!ready || (!isThemeKey(key) && !available[key])) return;

    setLayers((current) => ({
      ...current,
      [key]: !current[key],
      ...(key === "altitude" && !current[key] ? { declividade: false } : {}),
      ...(key === "declividade" && !current[key] ? { altitude: false } : {}),
    }));
  };

  return (
    <div
    ref={mapWrapper}
      className="relative isolate w-full overflow-hidden rounded-2xl bg-[#e8eee9]"
      style={{ height: "clamp(480px, 72vh, 760px)" }}
      aria-label="Mapa interactivo do distrito de Nhamatanda"
    >
      {/* Contentor exclusivo do MapLibre */}
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/15 to-transparent" />

      {/* Cabeçalho */}
      <div className="absolute left-3 top-3 z-10 sm:left-5 sm:top-5">
        <div className="rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700">
            Mapa territorial
          </div>

          <div className="mt-1 text-base font-bold text-slate-900 sm:text-xl">
            Distrito de Nhamatanda
          </div>

          <div className="mt-1 text-xs text-slate-500">Sofala · Moçambique</div>
        </div>
      </div>

      {/* Painel de camadas */}
      <div className="absolute right-3 top-32 z-20 w-[270px] max-w-[calc(100%-24px)] sm:right-5 sm:top-5">
        <div className="flex justify-end">
          <button
  type="button"
  onClick={() => setPanelOpen((current) => !current)}
  aria-expanded={panelOpen}
  aria-controls="nhamatanda-map-layers"
  aria-label={panelOpen ? "Fechar painel de camadas" : "Abrir painel de camadas"}
  className="
    inline-flex min-h-11 items-center justify-center gap-2.5
    rounded-xl border border-white/70 bg-white/95
    px-4 py-3 text-sm font-semibold text-slate-800
    shadow-lg backdrop-blur-sm
    transition-colors hover:bg-white
    focus-visible:outline focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-[#166B45]
  "
>
  {/* Ícone de camadas */}
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3 2 8l10 5 10-5-10-5Z" />
    <path d="m2 12 10 5 10-5" />
    <path d="m2 16 10 5 10-5" />
  </svg>

  <span>Camadas</span>

  {/* Seta: aponta para cima quando o painel está aberto */}
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`transition-transform duration-200 motion-reduce:transition-none ${
      panelOpen ? "rotate-180" : ""
    }`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</button>
        </div>

        {panelOpen && (
          <div
            id="nhamatanda-map-layers"
            className="mt-2 max-h-[280px] overflow-y-auto rounded-2xl border border-white/70 bg-white/95 p-3 shadow-xl backdrop-blur sm:max-h-[420px]"
          >
            <div className="mb-3 px-2">
              <div className="text-sm font-bold text-slate-900">
                Informação territorial
              </div>

              <p className="mt-1 text-[11px] text-slate-500">
                Active uma camada para carregar os dados. Clique nos elementos
                para consultar a fonte.
              </p>
            </div>

            <div className="space-y-1">
              {CATEGORIES.map((category) => {
                const isOpen = openCategory === category.id;

                return (
                  <div key={category.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenCategory(isOpen ? null : category.id)
                      }
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: category.color,
                          }}
                        />

                        <span className="text-sm font-semibold text-slate-800">
                          {category.title}
                        </span>
                      </span>

                      <span className="text-xs text-slate-400">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mb-2 ml-3 border-l border-slate-200 pl-3">
                        {category.items.map(({ key, label }) => {
                          const themed = isThemeKey(key);
                          const spec = themed ? THEMES[key] : null;
                          const status = themed ? themeStates[key] : undefined;
                          const enabled =
                            ready && (themed || Boolean(available[key]));
                          const stateLabel =
                            status?.state === "loading"
                              ? "A carregar…"
                              : status?.state === "empty"
                                ? "Sem registos na fonte"
                                : status?.state === "error"
                                  ? "Falha ao carregar"
                                  : status?.state === "partial"
                                    ? `Parcial · ${status.count ?? 0} elementos`
                                    : status?.state === "ready"
                                      ? status.count === undefined
                                        ? "Preparada"
                                        : `${status.count} elementos`
                                      : "Carregar ao activar";
                          return (
                            <div
                              key={key}
                              className="rounded-lg px-2 py-2 hover:bg-slate-50"
                            >
                              <label
                                className={`flex items-start gap-2.5 ${enabled ? "cursor-pointer" : "cursor-not-allowed opacity-45"}`}
                              >
                                <input
                                  type="checkbox"
                                  disabled={!enabled}
                                  checked={layers[key]}
                                  onChange={() => toggleLayer(key)}
                                  className="mt-0.5 h-3.5 w-3.5 accent-emerald-700"
                                />
                                <span className="text-xs text-slate-700">
                                  {spec?.title ?? label}
                                </span>
                              </label>
                              {!themed && (
                                <details className="ml-6 mt-1 text-[10px] leading-relaxed text-slate-500">
                                  <summary className="cursor-pointer text-emerald-700">
                                    Fonte e legenda
                                  </summary>
                                  <p>
                                    {key === "hillshade"
                                      ? "Terrain Tiles / Terrarium. Sombreamento do relevo, sem representar valores de altitude por cor."
                                      : "MozGIS / CENACARTA. Limites administrativos; data de actualização não indicada."}
                                  </p>
                                  <p>
                                    {key === "district"
                                      ? "Linha branca: limite do distrito."
                                      : key === "posts"
                                        ? "Verde: Nhamatanda. Roxo: Tica. Verde acinzentado: sem identificação."
                                        : "Tons claros e escuros: iluminação simulada do terreno."}
                                  </p>
                                </details>
                              )}
                              {themed && spec && (
                                <div
                                  className="ml-6 mt-1 text-[10px] leading-relaxed text-slate-500"
                                  aria-live="polite"
                                >
                                  <span>{stateLabel}</span>
                                  <details className="mt-1">
                                    <summary className="cursor-pointer text-emerald-700">
                                      Fonte e legenda
                                    </summary>
                                    <p className="mt-1 font-medium">
                                      {spec.source}
                                    </p>
                                    <p>{status?.message || spec.note}</p>
                                    {status?.retrievedAt && (
                                      <p>
                                        Consulta:{" "}
                                        {new Date(
                                          status.retrievedAt,
                                        ).toLocaleDateString("pt-PT")}
                                      </p>
                                    )}
                                    {key === "altitude" ||
                                    key === "declividade" ? (
                                      <div className="mt-2 space-y-1">
                                        {(key === "altitude"
                                          ? ALTITUDE_LEGEND
                                          : SLOPE_LEGEND
                                        ).map(([text, color]) => (
                                          <div
                                            key={text}
                                            className="flex items-center gap-2"
                                          >
                                            <span
                                              className="h-2.5 w-3 rounded"
                                              style={{ backgroundColor: color }}
                                            />
                                            {text}
                                          </div>
                                        ))}
                                        <p>
                                          Visível a partir do zoom 8. Clique
                                          para consultar valores aproximados.
                                        </p>
                                      </div>
                                    ) : key === "demografia" ? (
                                      <div className="mt-2 space-y-1">
                                        {[
                                          ["< 10.000", "#fee8c8"],
                                          ["10.000–24.999", "#fdbb84"],
                                          ["25.000–49.999", "#fc8d59"],
                                          ["50.000–99.999", "#e34a33"],
                                          ["≥ 100.000", "#b30000"],
                                          ["Sem valor", "#9ca3af"],
                                        ].map(([text, color]) => (
                                          <div
                                            key={text}
                                            className="flex items-center gap-2"
                                          >
                                            <span
                                              className="h-2.5 w-3 rounded"
                                              style={{ backgroundColor: color }}
                                            />
                                            {text} habitantes
                                          </div>
                                        ))}
                                      </div>
                                    ) : key === "usoSolo" ? (
                                      <div className="mt-2 space-y-1">
                                        {[
                                          ["Natural", "#72a678"],
                                          [
                                            "Anteriormente cultivado em sequeiro",
                                            "#d8c27a",
                                          ],
                                          ["Anteriormente irrigado", "#92c5bc"],
                                          ["Artificial", "#cb8d90"],
                                          ["Sem classificação", "#9ca3af"],
                                        ].map(([text, color]) => (
                                          <div
                                            key={text}
                                            className="flex items-center gap-2"
                                          >
                                            <span
                                              className="h-2.5 w-3 rounded"
                                              style={{ backgroundColor: color }}
                                            />
                                            {text}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="mt-1 flex items-center gap-2">
                                        <span
                                          className="h-2.5 w-3 rounded"
                                          style={{
                                            backgroundColor: spec.color,
                                          }}
                                        />
                                        {spec.title}
                                      </div>
                                    )}
                                  </details>
                                  {(status?.state === "error" ||
                                    status?.state === "partial" ||
                                    status?.state === "empty") && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        thematicRef.current?.retry(key)
                                      }
                                      className="mt-1 font-semibold text-emerald-700 underline"
                                    >
                                      Tentar novamente
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Legenda */}
      {/* Legendas no canto inferior esquerdo */}
<div
  className="absolute bottom-12 left-3 z-10 flex flex-col items-start gap-3 sm:left-5"
  style={{
    maxWidth: "calc(100% - 100px)",
    maxHeight: "calc(100% - 180px)",
    overflowY: "auto",
  }}
>
  {layers.estradas && <TransportLegend />}

  {available.posts && layers.posts && (
    <div className="rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg">
      <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
        Postos administrativos
      </div>

      <div className="space-y-1.5 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-[#43864b]" />
          Nhamatanda
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-[#82609e]" />
          Tica
        </div>
      </div>
    </div>
  )}
</div>

      {/* Controlo 2D / 3D, afastado dos controlos nativos */}
      <div className="absolute bottom-12 right-14 z-10 flex rounded-xl border border-white/70 bg-white/95 p-1 shadow-lg">
        <button
          type="button"
          disabled={!ready || !available.hillshade}
          aria-pressed={!terrain3D}
          onClick={() => changeTerrain(false)}
          className={`rounded-lg px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 ${
            !terrain3D ? "bg-emerald-700 text-white" : "text-slate-600"
          }`}
        >
          2D
        </button>

        <button
          type="button"
          disabled={!ready || !available.hillshade}
          aria-pressed={terrain3D}
          onClick={() => changeTerrain(true)}
          className={`rounded-lg px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 ${
            terrain3D ? "bg-emerald-700 text-white" : "text-slate-600"
          }`}
        >
          3D
        </button>
      </div>

      {/* Avisos de fontes adicionais */}
      {warnings.length > 0 && !mapError && (
        <div
          role="status"
          className="absolute left-3 top-32 z-10 max-w-[230px] rounded-xl border border-amber-200 bg-amber-50/95 px-3 py-2 text-[11px] text-amber-900 shadow-sm sm:left-5"
        >
          <details>
            <summary className="cursor-pointer font-semibold">
              Algumas camadas estão indisponíveis
            </summary>

            <ul className="mt-2 list-disc space-y-1 pl-4">
              {warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </details>
        </div>
      )}

      {/* Carregamento inicial */}
      {loading && !mapError && (
        <div
          role="status"
          className="absolute inset-0 z-30 flex items-center justify-center bg-white/70 backdrop-blur-sm"
        >
          <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-xl">
            <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-emerald-100 border-t-emerald-700" />

            <div className="text-sm font-semibold text-slate-800">
              A carregar mapa de Nhamatanda…
            </div>

            <div className="mt-1 text-xs text-slate-500">
              A preparar a base cartográfica
            </div>
          </div>
        </div>
      )}

      {/* Falha inicial com possibilidade de tentar novamente */}
      {mapError && (
        <div
          role="alert"
          className="absolute inset-0 z-40 flex items-center justify-center bg-white/85 p-6 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              Não foi possível carregar o mapa
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Verifique a ligação à Internet e tente novamente.
            </p>

            <details className="mt-4 text-xs text-slate-500">
              <summary className="cursor-pointer font-medium">
                Detalhes do erro
              </summary>

              <p className="mt-2 break-words">{mapError}</p>
            </details>

            <button
              type="button"
              onClick={() => setAttempt((current) => current + 1)}
              className="mt-5 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
