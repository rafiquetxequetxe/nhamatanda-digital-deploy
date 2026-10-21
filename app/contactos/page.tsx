import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/contactos/ContactForm";
import NhamatandaMap from "@/components/mapas/NhamatandaMapWrapper";
import {
  IconMapPin, IconPhone, IconMail, IconClock, IconChevronRight,
  IconFacebook, IconTwitter, IconWhatsapp
} from "@/components/ui/Icons";
import s from "@/components/oportunidades/oportunidades.module.css";

const contactos = [
  { Icon: IconMapPin, titulo: "Morada", linhas: ["Vila-Sede, Rua Samora Moisés Machel, Nhamatanda - Sofala"] },
{ Icon: IconPhone, titulo: "Telefone", linhas: ["+258 86 30 98 740", "+258 84 77 19 343"] },
  { Icon: IconMail, titulo: "Email", linhas: ["A confirmar"] },
  { Icon: IconClock, titulo: "Horário", linhas: ["7:30h – 15:30h"] },
];
const perguntas = [
  { titulo: "Como pedir informações?", texto: "Indique o assunto e descreva claramente a informação de que necessita." },
  { titulo: "Onde consultar os serviços?", texto: "Consulte as informações disponíveis no portal. Para dúvidas específicas, identifique o serviço sobre o qual pretende esclarecimentos." },
  { titulo: "Como colocar uma questão sobre investimento?", texto: "Consulte a página Investir e indique na sua mensagem o sector ou a oportunidade que pretende conhecer.", href: "/investir", link: "Explorar oportunidades" },
  { titulo: "O que incluir na mensagem?", texto: "Inclua o assunto, o contexto do pedido e um email de contacto. Evite enviar dados sensíveis ou documentos pessoais que não tenham sido solicitados." },
];
const redes = [
  { href: "https://www.facebook.com/profile.php?id=61557454743845", Icon: IconFacebook, nome: "Facebook", cor: "text-[#1877F2]" },
  { href: "https://whatsapp.com/channel/0029VbEUC5JIHphFsdmkHq3i", Icon: IconWhatsapp, nome: "Whatsapp", cor: "text-[#25D366]" },
  { href: "https://x.com/GOVNHAMATANDA", Icon: IconTwitter, nome: "X", cor: "text-[#000000]" },
];
const card = "rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.025)]";

export default function ContactosPage() {
  return (
    <main className="bg-gradient-to-b from-white via-[#f7f9fa] to-white text-[#102344]">
  
  {/* Cabeçalho da página */}
  <section className={s.hero} aria-labelledby="catalog-title">
      <Image src="/images/banners/contactoHero.jpg" alt="" fill priority sizes="100vw" className={s.heroImage} />
      <div className={s.veil} />
      <div className={`${s.container} ${s.heroContent}`}><h1 id="catalog-title">Contactos</h1><nav aria-label="Localização na página" className={s.breadcrumb}><Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Contactos</span></nav><p>Entre em contacto com o Governo do Distrito de Nhamatanda para esclarecer dúvidas, pedir informações ou apresentar a sua ideia.</p></div>
    </section>

  {/* Conteúdo da página */}
  <div className="mx-auto max-w-[1700px] px-5 py-8 sm:px-10 sm:py-10 lg:px-16 lg:pb-12">

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <section aria-labelledby="contactos-titulo" className="min-w-0 lg:col-span-5 lg:flex lg:flex-col lg:justify-start">


            <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#166B45]">
  Estamos aqui para ajudar
</p>

<h2
  id="contactos-titulo"
  className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
>
  Fale connosco
</h2>

<p
  className="mt-4 text-base leading-7 text-slate-600"
  style={{
    width: "100%",
    maxWidth: "520px",
    whiteSpace: "normal",
  }}
>
  Envie um pedido de informação, esclareça uma dúvida ou apresente
  uma sugestão ao Governo do Distrito de Nhamatanda.
</p>
            
            
            <div className="mt-7 grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 xl:mt-8">
              {contactos.map(({ Icon, titulo, linhas }) => (
                <div key={titulo} className={`${card} flex min-h-[126px] items-start gap-3 p-4 xl:min-h-[138px] xl:p-5`}>
                  <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e5f1eb] text-[#166B45]"><Icon size={23} /></span>
                  <div className="min-w-0 pt-1">
                    <h2 className="mb-1.5 text-sm font-bold sm:text-base">{titulo}</h2>
                    {linhas.map((linha, i) => <p key={linha} className={`${i > 0 ? "mt-1 text-sm" : "text-sm"} break-words leading-5 text-slate-600`}>{linha}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* O formulário precede o mapa em mobile; mapa à direita em desktop. */}
          <section aria-labelledby="mensagem-titulo" className={`${card} min-w-0 p-5 sm:p-7 lg:col-span-7 lg:col-start-1 lg:row-start-2 xl:p-8`}>
            <div className="mb-7 flex items-start gap-3">
              <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e5f1eb] text-[#166B45]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2v-10a9 9 0 0 1 19-.5Z" /></svg>
              </span>
              <div><h2 id="mensagem-titulo" className="text-xl font-bold sm:text-2xl">Como podemos ajudar?</h2><p className="mt-1 text-sm leading-6 text-slate-600">Preencha os campos abaixo para preparar a sua mensagem.</p></div>
            </div>
            {/* Mantém a implementação e o comportamento do formulário existente. */}
            <ContactForm />
          </section>

          <section aria-label="Mapa do distrito de Nhamatanda" className="min-w-0 self-start overflow-hidden rounded-2xl border border-slate-200 bg-[#e8eee9] shadow-sm lg:col-span-7 lg:col-start-6 lg:row-start-1">
            {/* Ajustar altura e painel no componente do mapa, preservando fullscreen. */}
            <NhamatandaMap />
          </section>

          <aside aria-labelledby="apoio-titulo" className={`${card} min-w-0 p-5 sm:p-7 lg:col-span-5 lg:col-start-8 lg:row-start-2 xl:p-8`}>
            <div className="mb-6 flex items-start gap-3">
              <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e5f1eb] text-2xl font-medium text-[#166B45]">?</span>
              <div><h2 id="apoio-titulo" className="text-xl font-bold sm:text-2xl">Antes de enviar</h2><p className="mt-1 text-sm leading-6 text-slate-600">Encontre respostas para as dúvidas mais comuns.</p></div>
            </div>
            <div id="perguntas-frequentes" className="scroll-mt-28 space-y-3">
              {perguntas.map((p, index) => (
                <details key={p.titulo} open={index === 0} className="group overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafb]">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#166B45] [&::-webkit-details-marker]:hidden">
                    {p.titulo}<span aria-hidden="true" className="shrink-0 rotate-90 transition-transform group-open:-rotate-90"><IconChevronRight size={15} /></span>
                  </summary>
                  <div className="border-t border-slate-100 bg-white px-4 py-4 text-sm leading-6 text-slate-600">{p.texto}{p.href && <Link href={p.href} className="mt-2 block font-semibold text-[#166B45] underline underline-offset-4">{p.link}</Link>}</div>
                </details>
              ))}
            </div>
            <div className="mt-6 border-t border-slate-200 pt-5">
              <h3 className="text-sm font-bold">Links úteis</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Link href="/investir" className="flex min-h-14 items-center justify-between gap-2 rounded-lg border border-[#166B45]/10 bg-[#f0f7f3] px-4 py-3 text-sm font-semibold text-[#166B45] hover:bg-[#e5f1eb]">Explorar oportunidades <span aria-hidden="true">→</span></Link>
                <Link href="/" className="flex min-h-14 items-center justify-between gap-2 rounded-lg border border-[#166B45]/10 bg-[#f0f7f3] px-4 py-3 text-sm font-semibold text-[#166B45] hover:bg-[#e5f1eb]">Explorar o portal <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </aside>
        </div>

        <section aria-labelledby="canais-titulo" className={`${card} mt-7 grid items-center gap-5 p-5 sm:p-7 lg:grid-cols-[1.25fr_2fr] xl:p-8`}>
          <div><h2 id="canais-titulo" className="text-base font-bold">Canais oficiais</h2><p className="mt-1 text-sm leading-6 text-slate-600">Acompanhe o Distrito de Nhamatanda nas redes sociais.</p></div>
          <ul className="grid gap-4 sm:grid-cols-3">
  {redes.map(({ href, Icon, nome, cor }) => (
    <li key={nome} className="flex items-center gap-3 border-slate-200 sm:border-l sm:pl-5">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <span aria-hidden="true">
          <Icon size={25} className={cor} />
        </span>
        <div>
          <p className="text-sm font-semibold">{nome}</p>
        </div>
      </a>
    </li>
  ))}
</ul>
        </section>
      </div>
    </main>
  );
}
