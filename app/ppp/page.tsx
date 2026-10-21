import { redirect } from "next/navigation";
import { legacyPPPHref, type CatalogParams } from "@/components/oportunidades/catalog-query";

export default async function PPPPage({ searchParams }: { searchParams: Promise<CatalogParams> }) {
  redirect(legacyPPPHref(await searchParams));
}