import type { Projeto } from "@/types/project";

export type CatalogParams = Record<string, string | string[] | undefined>;
export const PAGE_SIZE = 6;
export const asArray = (value?: string | string[]) => [...new Set((Array.isArray(value) ? value : value ? [value] : []).filter(Boolean))];
const first = (value?: string | string[]) => asArray(value)[0] ?? "";
const normalise = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function getCatalog(projects: Projeto[], params: CatalogParams) {
  const sectors = asArray(params.setor);
  const categories = asArray(params.categoria);
  const phases = asArray(params.fase);
  const types = asArray(params.tipo); // Compatibilidade com links antigos de PPP.
  const location = first(params.localizacao);
  const query = first(params.q).trim();
  const order = first(params.ordenar) === "az" ? "az" : "catalogo";
  const filtered = projects.filter(p =>
    (!sectors.length || sectors.includes(p.setor)) &&
    (!categories.length || categories.includes(p.categoria)) &&
    (!phases.length || phases.includes(p.fase)) &&
    (!types.length || Boolean(p.tipoInvestimento && types.includes(p.tipoInvestimento))) &&
    (!location || location === "Todas" || p.localizacao === location) &&
    (!query || normalise(`${p.titulo} ${p.resumo} ${p.setor} ${p.localizacao}`).includes(normalise(query)))
  );
  if (order === "az") filtered.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt"));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const requested = Number(first(params.pagina));
  const page = Math.min(Math.max(1, totalPages), Number.isSafeInteger(requested) && requested > 0 ? requested : 1);
  const base = new URLSearchParams();
  sectors.forEach(v => base.append("setor", v));
  categories.forEach(v => base.append("categoria", v));
  phases.forEach(v => base.append("fase", v));
  types.forEach(v => base.append("tipo", v));
  if (location && location !== "Todas") base.set("localizacao", location);
  if (query) base.set("q", query);
  if (order === "az") base.set("ordenar", order);
  const href = (target: number) => {
    const next = new URLSearchParams(base);
    if (target > 1) next.set("pagina", String(target));
    return `/oportunidades${next.size ? `?${next.toString()}` : ""}`;
  };
  return { sectors, categories, phases, types, location, query, order, page, totalPages,
    count: filtered.length, items: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), href,
    formKey: base.toString(),
  };
}

export function legacyPPPHref(params: CatalogParams) {
  const next = new URLSearchParams();
  // Paginação é reiniciada porque os critérios do catálogo mudaram.
  for (const key of ["setor", "tipo", "fase", "localizacao", "q", "ordenar"]) {
    asArray(params[key]).forEach(value => next.append(key, value));
  }
  next.set("categoria", "PPP");
  return `/oportunidades?${next.toString()}`;
}
