export type ThemeSpec = {
  title: string;
  color: string;
  source: string;
  note: string;
  kind: "arcgis" | "osm" | "dem";
  service?: string;
  ids?: readonly number[];
  selectors?: readonly string[];
};
export const THEMES = {
  localidades: {
    title: "Localidades (pontos)",
    color: "#f1f5f9",
    source: "MozGIS / CENACARTA",
    note: "Pontos de povoações; não são limites administrativos de localidades.",
    kind: "arcgis",
    service: "Toponímia",
    ids: [1, 2],
  },
  estradas: {
    title: "Transportes",
    color: "#efc66f",
    source: "MozGIS / CENACARTA",
    note: "Estradas e ferrovia; a data de actualização não está indicada no catálogo.",
    kind: "arcgis",
    service: "Rede_de_Transportes",
    ids: [2, 3, 4, 5, 6, 9],
  },
  rios: {
    title: "Rios",
    color: "#6dc4ed",
    source: "MozGIS / CENACARTA",
    note: "Rede hidrográfica cartografada.",
    kind: "arcgis",
    service: "Hidrografia",
    ids: [8, 9],
  },
  lagoas: {
    title: "Lagos e lagoas",
    color: "#438bde",
    source: "OpenStreetMap / contribuidores",
    note:
      "Lagos, lagoas e reservatórios identificados no OpenStreetMap. " +
      "Inclui corpos de água sazonais quando cartografados; " +
      "ausência no mapa não significa inexistência.",
    kind: "osm",
    selectors: [
      '["natural"="water"]["water"~"^(lake|pond|oxbow|lagoon|reservoir)$"]',
      '["landuse"="reservoir"]',
    ],
  },
  bacias: {
    title: "Bacias hidrográficas",
    color: "#95b6ef",
    source: "MozGIS / CENACARTA",
    note: "Bacias que intersectam o distrito; mostra a geometria completa para preservar o contexto hidrográfico.",
    kind: "arcgis",
    service: "Hidrografia",
    ids: [10],
  },
  educacao: {
    title: "Educação",
    color: "#eaa43a",
    source: "MozGIS / CENACARTA",
    note: "Equipamentos cartografados; não representa um cadastro actual completo.",
    kind: "arcgis",
    service: "Educação",
    ids: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  saude: {
    title: "Saúde",
    color: "#ee7182",
    source: "MozGIS / CENACARTA",
    note: "Unidades sanitárias cartografadas; confirmar funcionamento junto das autoridades.",
    kind: "arcgis",
    service: "Saúde",
    ids: [1, 2, 3, 4, 5],
  },
  energia: {
    title: "Energia",
    color: "#e9d24c",
    source: "MozGIS / Projecto SADC",
    note: "Localizações e rede do Projecto SADC; não equivale à rede de distribuição actual ou à cobertura de acesso.",
    kind: "arcgis",
    service: "Infra_Estruturas_2",
    ids: [7, 8],
  },
  telecom: {
    title: "Telecomunicações",
    color: "#c496ef",
    source: "MozGIS / CENACARTA",
    note: "Estações rádio e rede de comunicação; não é um mapa de cobertura móvel.",
    kind: "arcgis",
    service: "Infra_Estruturas_2",
    ids: [0, 1],
  },
  usoSolo: {
    title: "Uso e cobertura do solo",
    color: "#d4b479",
    source: "MozGIS / CENACARTA",
    note: "Estado de cobertura cartografado. Data não indicada; não certifica disponibilidade de terrenos.",
    kind: "arcgis",
    service: "Solos",
    ids: [2],
  },
  vegetacao: {
    title: "Vegetação / florestas",
    color: "#51b76c",
    source: "MozGIS / CENACARTA",
    note: "Classes da camada Florestas; levantamento sem data indicada.",
    kind: "arcgis",
    service: "Solos",
    ids: [9],
  },
  demografia: {
    title: "População por posto — 2007",
    color: "#ef774e",
    source: "MozGIS / Censo 2007",
    note: "População absoluta por posto em 2007. Limites históricos completos; não são estimativas actuais nem valores recortados para os limites de hoje.",
    kind: "arcgis",
    service: "Demografia",
    ids: [7],
  },
  nascentes: {
    title: "Nascentes",
    color: "#66d6d8",
    source: "OpenStreetMap / contribuidores",
    note: "Nascentes registadas; ausência no mapa não significa inexistência.",
    kind: "osm",
    selectors: ['["natural"="spring"]'],
  },
  agua: {
    title: "Água / abastecimento",
    color: "#4ca6ed",
    source: "OpenStreetMap / contribuidores",
    note: "Pontos e instalações de abastecimento registados; não representa cobertura do serviço.",
    kind: "osm",
    selectors: [
      '["amenity"="drinking_water"]',
      '["man_made"~"^(water_well|water_tower|water_works|water_tap|reservoir_covered)$"]',
    ],
  },
  agricultura: {
    title: "Áreas agrícolas mapeadas",
    color: "#b8c856",
    source: "OpenStreetMap / contribuidores",
    note: "Áreas classificadas no OpenStreetMap; não certifica produtividade, propriedade ou disponibilidade.",
    kind: "osm",
    selectors: [
      '["landuse"~"^(farmland|farmyard|orchard|vineyard|plant_nursery)$"]',
    ],
  },
  areasUrbanas: {
    title: "Áreas edificadas mapeadas",
    color: "#d6a39e",
    source: "OpenStreetMap / contribuidores",
    note: "Zonas residenciais, comerciais e industriais registadas; não equivale ao perímetro urbano legal.",
    kind: "osm",
    selectors: ['["landuse"~"^(residential|commercial|industrial|retail)$"]'],
  },
  economia: {
    title: "Actividades económicas",
    color: "#f4bc47",
    source: "OpenStreetMap / contribuidores",
    note: "Estabelecimentos registados; não constitui um censo económico.",
    kind: "osm",
    selectors: [
      '["shop"]',
      '["craft"]',
      '["office"]',
      '["amenity"~"^(marketplace|bank|restaurant|fuel)$"]',
      '["tourism"~"^(hotel|guest_house|camp_site|attraction)$"]',
    ],
  },
  altitude: {
    title: "Altitude (m)",
    color: "#d5ae71",
    source: "Terrain Tiles / Terrarium",
    note: "Altitude aproximada a partir do DEM Terrarium; resolução varia com o zoom.",
    kind: "dem",
  },
  declividade: {
    title: "Declividade (graus)",
    color: "#e69a45",
    source: "Terrain Tiles / Terrarium",
    note: "Inclinação aproximada por diferenças centrais no DEM. Resolução varia com o zoom (até ~36 m/pixel no zoom 12); valores podem mudar ao ampliar. Uso exploratório; não é levantamento topográfico.",
    kind: "dem",
  },
} as const satisfies Record<string, ThemeSpec>;
export type ThemeKey = keyof typeof THEMES;
export const THEME_KEYS = Object.keys(THEMES) as ThemeKey[];
export function isThemeKey(key: string): key is ThemeKey {
  return Object.prototype.hasOwnProperty.call(THEMES, key);
}
