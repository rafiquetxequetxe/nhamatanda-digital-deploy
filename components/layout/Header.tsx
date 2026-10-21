"use client";
// Necessário porque este componente usa useState (menu aberto/fechado, idioma)
// e usePathname (saber a URL atual) — ambos só funcionam no browser, não no servidor.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { IconSearch, IconChevronDown, IconX, IconGlobe } from "@/components/ui/Icons";

// ─────────────────────────────────────────────
// DADOS ESTÁTICOS
// ─────────────────────────────────────────────

// Lista de links do menu principal. Para adicionar/remover uma página do menu,
// basta editar este array — o JSX mais abaixo gera os links automaticamente.
const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre-o-distrito", label: "Sobre o Distrito" },
  { href: "/governacao", label: "Governação" },
  { href: "/investir", label: "Investir" },
  { href: "/observatorio", label: "Observatório" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/noticias", label: "Notícias" },
  { href: "/contactos", label: "Contactos" },
];

// Idiomas disponíveis com suas respetivas bandeiras no seletor. "as const" torna o array "só de leitura"
// e permite ao TypeScript saber exatamente que os valores possíveis são "PT" ou "EN"
// (em vez de aceitar qualquer string).
const idiomas = [
  { codigo: "PT", pais: "mz", nome: "Português" }, // mz = Moçambique
  { codigo: "EN", pais: "gb", nome: "English" },
  { codigo: "FR", pais: "fr", nome: "Français" },
  { codigo: "ES", pais: "es", nome: "Español" },
  { codigo: "ZH", pais: "cn", nome: "中文" },
  { codigo: "AR", pais: "sa", nome: "العربية" },
] as const;

// ─────────────────────────────────────────────
// COMPONENTE HEADER
// Usado no layout raiz (app/layout.tsx), aparece em TODAS as páginas.
// ─────────────────────────────────────────────
export default function Header() {
  // pathname = rota atual (ex: "/investir"), usado para destacar o link ativo no menu
  const pathname = usePathname();

  // Controla se o menu mobile (hamburguer) está aberto
  const [menuAberto, setMenuAberto] = useState(false);

  // Controla se o dropdown de idioma está aberto
  const [idiomaAberto, setIdiomaAberto] = useState(false);

  // Idioma selecionado atualmente. Tipado para só aceitar "PT" ou "EN".
  // NOTA: por agora isto só troca o texto do botão — ainda não traduz
  // o conteúdo do site. Tradução real fica para decisão futura com o Tech Lead.
  const [idioma, setIdioma] = useState<(typeof idiomas)[number]>(idiomas[0]);

  const router = useRouter();
  const [pesquisaAberta, setPesquisaAberta] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  function handlePesquisar(e: React.FormEvent) {
    e.preventDefault();
    if (!termoPesquisa.trim()) return;
    router.push(`/pesquisa?q=${encodeURIComponent(termoPesquisa)}`);
    setPesquisaAberta(false);
    setTermoPesquisa("");
  }

  return (
    // sticky top-0 z-50 = header fica fixo no topo ao fazer scroll, acima de tudo o resto
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">

      {/* 
        Contentor principal: mesma largura máxima e padding do Footer (max-w-[1600px]),
        para as bordas do conteúdo alinharem entre os dois.
        h-20 = altura fixa da barra do header.
      */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">

        {/* Logo — clicável, leva sempre à página inicial */}
        <Link href="/">
          <Logo variant="dark" /> {/* dark = versão para fundo claro (texto verde) */}
        </Link>

        {/* 
          ===== Menu de navegação (desktop) =====
          hidden lg:flex = escondido em ecrãs pequenos, visível a partir do breakpoint "lg"
          (em mobile usamos o menu hamburguer mais abaixo, em vez deste)
        */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            // Um link fica ativo se a rota atual for exatamente igual,
            // OU se for uma sub-rota dele (ex: "/noticias/slug-x" deve destacar "Notícias").
            // Exceção: a Home ("/") só fica ativa na correspondência exata,
            // senão ficaria sempre destacada em todas as páginas do site.
            const ativo =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href} // key obrigatória em listas do React
                href={link.href}
                className={`text-lg font-medium pb-1 border-b-2 transition-all duration-200 ease-out hover:scale-110 inline-block ${ativo
                  ? "text-[#1F6F4A] border-[#1F6F4A]" // link da página atual: verde + sublinhado
                  : "text-gray-700 border-transparent hover:text-[#1F6F4A]" // outros: cinza, fica verde no hover
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 
          ===== Ações do lado direito (desktop): seletor de idioma + pesquisa =====
        */}
        <div className="hidden lg:flex items-center gap-5">

          {/* --- Seletor de idioma --- */}
          {/* "relative" é necessário para o dropdown (abaixo) se posicionar corretamente por baixo deste botão */}
          <div>
            <IconGlobe size={25} />
          </div>
          <div className="relative">
            <button
              onClick={() => setIdiomaAberto(!idiomaAberto)}
              className="flex items-center gap-2 text-lg font-bold text-gray-600 hover:text-[#1F6F4A]"
            >
              <img
                src={`https://flagcdn.com/${idioma.pais}.svg`}
                alt={idioma.nome}
                className="w-5 h-3.5 object-cover rounded-sm"
              />
              {idioma.codigo}
              <IconChevronDown size={25} />
            </button>

            {idiomaAberto && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden">
                {idiomas.map((lng) => (
                  <button
                    key={lng.codigo}
                    onClick={() => {
                      setIdioma(lng);
                      setIdiomaAberto(false);
                    }}
                    className={`w-full flex items-center gap-2.5 text-left px-3 py-2 text-lg hover:bg-gray-50 ${idioma.codigo === lng.codigo ? "text-[#1F6F4A] font-bold bg-gray-50" : "text-gray-600"
                      }`}
                  >
                    <img
                      src={`https://flagcdn.com/${lng.pais}.svg`}
                      alt={lng.nome}
                      className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                    />
                    {lng.codigo}
                  </button>
                ))}
              </div>
            )}

          </div>
          
          {/* Botão de pesquisa — só visual por agora, sem funcionalidade ligada */}
          {pesquisaAberta ? (
            <form onSubmit={handlePesquisar} className="flex items-center gap-1.5">
              <input
                autoFocus
                type="text"
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setPesquisaAberta(false);
                }}
                placeholder="Pesquisar..."
                className="w-44 text-md border border-gray-200 rounded-md px-3 py-1.5 outline-none focus:border-[#1F6F4A]"
              />
              <button
                type="button"
                aria-label="Fechar pesquisa"
                onClick={() => setPesquisaAberta(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <IconX size={30} />
              </button>
            </form>
          ) : (
            <button
              aria-label="Pesquisar"
              onClick={() => setPesquisaAberta(true)}
              className="text-gray-600 hover:text-[#1F6F4A]"
            >
              <IconSearch size={30} />
            </button>
          )}
        </div>
        {/* 
          ===== Botão hamburguer (mobile) =====
          lg:hidden = só aparece em ecrãs pequenos (oposto do menu desktop acima)
        */}
        <button
          className="lg:hidden text-gray-700"
          aria-label="Abrir menu"
          onClick={() => setMenuAberto(!menuAberto)} // alterna aberto/fechado
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {/* Troca o desenho do ícone consoante o estado: "X" se aberto, 3 linhas se fechado */}
            {menuAberto ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* 
        ===== Menu mobile (dropdown vertical) =====
        Só renderiza se menuAberto for true (padrão comum em React: "condição && JSX").
        Fica por baixo da barra principal do header, ocupando a largura toda.
      */}
      {menuAberto && (
        <nav className="lg:hidden border-t border-gray-100 px-6 py-3 flex flex-col gap-3 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)} // fecha o menu ao clicar num link, antes de navegar
              className={`text-sm font-medium ${pathname === link.href ? "text-[#1F6F4A]" : "text-gray-700"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Seletor de idioma, versão simplificada para mobile (botões lado a lado, sem dropdown) */}
          <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2 flex-wrap">
            {idiomas.map((lng) => (
              <button
                key={lng.codigo}
                onClick={() => setIdioma(lng)}
                className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border ${idioma.codigo === lng.codigo
                  ? "bg-[#1F6F4A] text-white border-[#1F6F4A]"
                  : "text-gray-600 border-gray-200"
                  }`}
              >
                <img
                  src={`https://flagcdn.com/${lng.pais}.svg`}
                  alt={lng.nome}
                  className="w-4 h-3 object-cover rounded-sm"
                />
                {lng.codigo}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}