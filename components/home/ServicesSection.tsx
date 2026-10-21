import Link from "next/link";
import {
  IconBank,
  IconBarChart,
  IconBriefcase,
  IconArrowRight,
  IconCoins,
} from "@/components/ui/Icons";

const servicos = [
  {
    Icon: IconBank,
    titulo: "Portal Institucional",
    descricao:
      "Informações oficiais sobre a administração e serviços públicos.",
    href: "/",
  },
  {
    Icon: IconCoins,
    titulo: "Portal do Investidor",
    descricao:
      "Oportunidades de investimento e ambiente de negócios.",
    href: "/investir",
  },
  {
    Icon: IconBarChart,
    titulo: "Observatório Económico",
    descricao:
      "Dados e indicadores económicos do distrito.",
    href: "/observatorio",
  },
  {
    Icon: IconBriefcase,
    titulo: "Catálogo de Projectos PPP",
    descricao:
      "Parcerias público-privadas e concessões.",
    href: "/ppp",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white pt-0 pb-12 lg:pb-14">

      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* =====================================================
            CABEÇALHO
        ====================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">

          <div>

            <p className="text-lg font-bold text-[#1F6F4A] tracking-wide">
              SERVIÇOS E PORTAIS
            </p>

            <p className="text-[#64748B] text-sm lg:text-base leading-tight">
              Serviços, informação e ferramentas digitais para cidadãos, empresas e investidores.
            </p>

          </div>


          {/* LINK PARA TODOS OS PORTAIS */}

          <Link
            href="/noticias"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#166B45]
              hover:text-[#0F5133]
              transition-colors
            "
          >
            Explorar portais
            <IconArrowRight size={15} />
          </Link>

        </div>

       
        {/* =====================================================
            CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {servicos.map((servico) => {

            const Icon = servico.Icon;

            return (
              <Link
                key={servico.titulo}
                href={servico.href}
                className="
                  group
                  flex
                  items-center
                  gap-5
                  min-h-[148px]
                  rounded-xl
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-5
                  py-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#166B45]/30
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                "
              >

                {/* =================================================
                    ÍCONE
                ================================================== */}

                <div
                  className="
                    shrink-0
                    flex
                    items-center
                    justify-center
                    text-[#166B45]
                  "
                >
                  <Icon size={38} />
                </div>


                {/* =================================================
                    CONTEÚDO
                ================================================== */}

                <div className="min-w-0">

                  <h3
                    className="
                      font-bold
                      text-[#0F172A]
                      text-base
                      leading-snug
                      mb-1.5
                    "
                  >
                    {servico.titulo}
                  </h3>


                  <p
                    className="
                      text-sm
                      leading-5
                      text-[#64748B]
                    "
                  >
                    {servico.descricao}
                  </p>


                  {/* =================================================
                      LINK
                  ================================================= */}

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      mt-3
                      text-sm
                      font-semibold
                      text-[#166B45]
                    "
                  >
                    Saber mais

                    <IconArrowRight
                      size={14}
                      className="
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                    />
                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}