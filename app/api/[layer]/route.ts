import { admin, thematic } from "../../../lib/data";
import { isThemeKey, THEMES } from "../../../lib/catalog";

export const runtime = "nodejs";
export const maxDuration = 180;

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ layer: string }>;
  }
) {
  const { layer } = await context.params;

  try {
    if (layer === "district" || layer === "posts") {
      const payload = await admin(layer);
      return Response.json(payload);
    }

    if (!isThemeKey(layer)) {
      return Response.json(
        { error: `Camada desconhecida: ${layer}` },
        { status: 404 }
      );
    }

    if (THEMES[layer].kind === "dem") {
      return Response.json(
        { error: "Esta camada de relevo é calculada no navegador." },
        { status: 400 }
      );
    }

    const payload = await thematic(layer);

    return Response.json(payload);
  } catch (error) {
    console.error(`Erro ao carregar a camada ${layer}:`, error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível carregar a camada.",
      },
      { status: 502 }
    );
  }
}