export type MissionTone = "green" | "blue" | "violet" | "gold";

export type IconName =
  | "target" | "gear" | "handshake" | "chart" | "leaf" | "drop"
  | "education" | "road" | "shield" | "building" | "map" | "people" | "arrow"
  | "check" | "image";

export const MISSIONS = [
  { number: "01", slug: "mesa-cheia", title: "FOME ZERO & Autonomia Alimentar", text: "Mais produção, melhores cadeias de valor e segurança alimentar.", label: "Agricultura", icon: "leaf", tone: "green" },
  { number: "02", slug: "agua-segura", title: "Água, Saúde & Dignidade", text: "Serviços essenciais mais próximos e comunidades mais saudáveis.", label: "Social", icon: "drop", tone: "blue" },
  { number: "03", slug: "horizonte", title: "Educação, Talento & Emprego", text: "Preparar jovens para aprender, trabalhar, inovar e criar.", label: "Talento", icon: "education", tone: "violet" },
  { number: "04", slug: "synergy", title: "Empresas, Investimento & Oportunidades", text: "Criar melhores condições para produzir, investir e gerar emprego.", label: "Economia", icon: "chart", tone: "gold" },
  { number: "05", slug: "corredor-produtivo", title: "Corredor, Logística & Infra-estrutura", text: "Transformar conectividade e localização em vantagem económica.", label: "Infra-estrutura", icon: "road", tone: "blue" },
  { number: "06", slug: "chao-firme", title: "Resiliência, Território & Habitação", text: "Comunidades mais seguras e um território melhor preparado.", label: "Resiliência", icon: "shield", tone: "green" },
  { number: "07", slug: "distrito-inteligente", title: "Governo Próximo & Digital", text: "Serviços mais simples, transparentes, modernos e acessíveis.", label: "Governação", icon: "building", tone: "blue" },
  { number: "08", slug: "raizes", title: "Cultura, Identidade & Turismo", text: "Valorizar o território e criar novas oportunidades com identidade.", label: "Turismo", icon: "map", tone: "gold" },
] as const;

export function getMissionBySlug(slug: string) {
  return MISSIONS.find((m) => m.slug === slug);
}