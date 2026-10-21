import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/layout/NewsletterForm";
import {
  IconFacebook,
  IconTwitter,
  IconWhatsapp,
  IconPhone,
  IconMail,
  IconMapPin,
} from "@/components/ui/Icons";

// ─────────────────────────────────────────────
// DADOS ESTÁTICOS DO FOOTER
// Guardados em arrays para evitar repetir JSX manualmente.
// Para adicionar/remover um link, basta editar estes arrays —
// não é preciso mexer na parte visual (JSX) mais abaixo.
// ─────────────────────────────────────────────

// Coluna "Links Rápidos" — aponta para páginas reais do site
const linksRapidos = [
  { href: "/", label: "Início" },
  { href: "/sobre-o-distrito", label: "Sobre o Distrito" },
  { href: "/governacao", label: "Governação" },
  { href: "/investir", label: "Investir" },
  { href: "/observatorio", label: "Observatório" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/noticias", label: "Notícias" },
  { href: "/contactos", label: "Contactos" },
];

// Coluna "Apoio" — links "#" são placeholders (páginas ainda não construídas no MVP)
const apoio = [
  { href: "#", label: "Centro de Ajuda" },
  { href: "/contactos#perguntas-frequentes", label: "Perguntas Frequentes" },
  { href: "#", label: "Documentos" },
  { href: "#", label: "Downloads" },
  { href: "#", label: "Mapa do Site" },
];

// Redes sociais: cada item junta o nome (para acessibilidade)
// com o componente de ícone correspondente (importado de Icons.tsx)
const redesSociais = [
  { href: "https://www.facebook.com/profile.php?id=61557454743845", label: "Facebook", Icon: IconFacebook },
{ href: "https://x.com/GOVNHAMATANDA", label: "Twitter", Icon: IconTwitter },
{ href: "https://whatsapp.com/channel/0029VbEUC5JIHphFsdmkHq3i", label: "Whatsapp", Icon: IconWhatsapp }
];

// Dados de contacto: cada item junta o ícone com o texto a mostrar ao lado
const contactos = [
  { Icon: IconPhone, texto: "+258 86 30 98 740" },
  { Icon: IconPhone, texto: "+258 84 77 19 343" },
  { Icon: IconMail, texto: "geral@nhamatanda.gov.mz" },
  { Icon: IconMapPin, texto: "Vila-Sede, Rua Samora Moisés Machel, Nhamatanda - Sofala" },
];
const anoActual = new Date().getFullYear(); // pega o ano atual dinamicamente, para não precisar atualizar manualmente no futuro

// ─────────────────────────────────────────────
// COMPONENTE FOOTER
// Usado no layout raiz (app/layout.tsx) e aparece
// automaticamente em TODAS as páginas do site.
// ─────────────────────────────────────────────
export default function Footer() {
  return (
    // bg-[#153E2C] = verde escuro institucional; text-gray-200 = cor de texto padrão do footer
    <footer className="bg-[#153E2C] text-gray-200">

      {/* 
        Bloco principal com as 5 colunas.
        grid-cols-1 (mobile) → sm:grid-cols-2 (tablet) → lg:grid-cols-5 (desktop)
        items-start garante que todas as colunas começam alinhadas no topo,
        mesmo tendo quantidades diferentes de conteúdo.
      */}
      <div className="max-w-[1800px] mx-auto px-10 sm:px-10 lg:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-16 gap-y-8 items-start">

        {/* ===== Coluna 1: Logo + redes sociais ===== */}
        <div className="flex flex-col gap-6">
          {/* variant="light" = versão do logo para fundo escuro (texto/ícone brancos) */}
          <div className="mb-3">
            <Logo variant="light" />
          </div>


          {/* Percorre o array redesSociais e gera um botão circular para cada rede */}
          <div className="flex gap-6">
            {redesSociais.map(({ href, label, Icon }) => (
              <a
                key={label} // "key" é obrigatório em listas do React, para identificar cada item
                href={href} // placeholder - trocar pelo link real de cada rede social quando disponível
                target="_blank" // abre o link numa nova aba
                rel="noopener noreferrer" // segurança ao abrir links em novas abas
                aria-label={label} // acessibilidade: leitores de ecrã leem "Facebook", "Twitter", etc.
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black transition-all duration-200 ease-out hover:scale-110 shrink-0"
                // text-black aqui é importante: os ícones usam fill="currentColor",
                // por isso herdam esta cor. hover:scale-110 = cresce suavemente ao passar o rato.
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ===== Coluna 2: Links Rápidos ===== */}
        <div>
          <h3 className="text-white font-semibold text-md mb-2">Links Rápidos</h3>
          <ul className="space-y-1">
            {linksRapidos.map((l) => (
              <li key={l.href}>
                {/* Link do Next.js = navegação interna sem recarregar a página */}
                <Link
                  href={l.href}
                  className="text-sm text-gray-300 hover:text-white transition-all duration-200 ease-out hover:scale-110 inline-block"
                  // inline-block é necessário para o hover:scale funcionar corretamente
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Coluna 3: Apoio ===== */}
        {/* Mesma estrutura da Coluna 2, mas usa <a> em vez de <Link> porque os links são "#" (externos/placeholder) */}
        <div>
          <h3 className="text-white font-semibold text-md mb-2">Apoio</h3>
          <ul className="space-y-1">
            {apoio.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-gray-300 hover:text-white transition-all duration-200 ease-out hover:scale-110 inline-block"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Coluna 4: Contactos ===== */}
        <div>
          <h3 className="text-white font-semibold text-md mb-2">Contactos</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            {/* Cada item mostra um ícone (telefone/email/localização) ao lado do respetivo texto */}
            {contactos.map(({ Icon, texto }) => (
              <li key={texto} className="flex items-start gap-3">
                {/* items-start (no <li> pai) + mt-0.5 (no ícone) alinham o ícone com a 1ª linha do texto,
                    importante porque o endereço ocupa duas linhas */}
                <Icon className="shrink-0 mt-0.5 text-white" />
                <span>{texto}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Coluna 5: Newsletter ===== */}
        <div>
          <h3 className="text-white font-semibold text-md mb-2">Newsletter</h3>
          <p className="text-sm text-gray-300 mb-4">
            Subscreva e receba as últimas novidades do distrito.
          </p>
          {/* 
            ATENÇÃO: este formulário ainda não envia dados para lado nenhum.
            Falta ligar a um serviço de envio (ex: Formspree), previsto para o Dia 6
            do roadmap, quando integrarmos o formulário de contacto do Portal do Investidor.
          */}
          <NewsletterForm />
        </div>
      </div>

      {/* 
        ===== Barra inferior (copyright + links legais) =====
        Fica fora do grid de 5 colunas, numa faixa separada por uma borda superior fina.
      */}
      <div className="border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-300">
          {/* flex-col no mobile (empilhado) → sm:flex-row no tablet+ (lado a lado) */}
          <p>&copy; {anoActual} Administração do Distrito de Nhamatanda. Por um Nhamatanda com mais oportunidades.</p>
          <div className="flex gap-5">
            {/* Links "#" = páginas de Política de Privacidade / Termos de Uso ainda não existem no MVP */}
            <a href="#" className="hover:text-white hover:scale-110 inline-block transition-all duration-200 ease-out">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-white hover:scale-110 inline-block transition-all duration-200 ease-out">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}