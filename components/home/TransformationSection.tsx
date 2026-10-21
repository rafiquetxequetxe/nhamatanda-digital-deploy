import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconEducation,
  IconDroplet,
  IconBridge,
  IconIrrigationSystem,
} from "@/components/ui/Icons";

const iniciativas = [
  {
    status: "CONCLUÍDO",
    categoria: "Educação e Capital Humano",
    titulo: "A maior escola secundária do país está em Nhamatanda",
    descricao:
      "Com 66 salas de aula, laboratórios e espaços especializados, e capacidade para cerca de 3.600 alunos, a infraestrutura amplia o acesso ao ensino secundário e cria melhores condições de formação.",
    imagem: "/images/transformacao/escola.jpg",
    Icon: IconEducation,
  },

  {
  status: "CONCLUÍDO",
  categoria: "Infraestruturas e Recursos Hídricos",
  titulo: "18 km de nova rede para ampliar o acesso à água potável",
  descricao:
    "O novo sistema de abastecimento amplia a rede em 18 km, acrescenta 14 fontanários e leva água potável a mais de 18 mil pessoas, reforçando uma infraestrutura essencial ao crescimento.",
  imagem: "/images/transformacao/agua.jpeg",
  Icon: IconDroplet,
  },

  {
  status: "CONCLUÍDO",
  categoria: "Infraestruturas e Conectividade",
  titulo: "184 metros para aproximar pessoas, produção e mercados",
  descricao:
    "A nova ponte sobre o Rio Metuchira, com 184 metros, liga Metuchira, Bhebhedo e Nhampoca, tornando mais segura a circulação de pessoas e bens numa zona de forte actividade agrícola.",
  imagem: "/images/transformacao/pontemetuchira.jpg",
  Icon: IconBridge,
  },

  {
  status: "EM IMPLEMENTAÇÃO",
  categoria: "Agricultura e Desenvolvimento Rural",
  titulo: "Cerca de 60 hectares para uma agricultura mais produtiva",
  descricao:
    "O Regadio de Muda Massequesse cria capacidade para intensificar a produção agrícola em cerca de 60 hectares, abrindo espaço à participação privada em mecanização, assistência técnica e comercialização.",
  imagem: "/images/transformacao/irrigacao.jpg",
  Icon: IconIrrigationSystem,
  },  
];

export default function TransformationSection() {
  return (
    <section className="bg-white pt-0 pb-12 lg:pb-14">

      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* =====================================================
            CABEÇALHO
        ====================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">

          <div>

            <p className="text-lg font-bold text-[#1F6F4A] tracking-wide">
              NHAMATANDA EM TRANSFORMAÇÃO
            </p>

            <p className="text-[#64748B] text-sm lg:text-base leading-tight">
              Obras, projectos e iniciativas que estão a gerar impacto no distrito.
            </p>

          </div>


          {/* LINK PARA TODAS AS INICIATIVAS */}

          <Link
            href="/transformacao"
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
            Ver todas as iniciativas
            <IconArrowRight size={15} />
          </Link>

        </div>


        {/* =====================================================
            CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {iniciativas.map((item) => {

            const Icon = item.Icon;

            return (

              <article
                key={item.titulo}
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#E2E8F0]
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                "
              >

                {/* =================================================
                    IMAGEM
                ================================================== */}

                <div className="relative h-[150px] overflow-hidden">

                  <Image
                    src={item.imagem}
                    alt={item.titulo}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />


                  {/* =================================================
                      STATUS
                  ================================================== */}

                  <div
                    className="
                      absolute
                      top-3
                      left-3
                      rounded-md
                      bg-white/95
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      tracking-wide
                      text-[#166B45]
                      shadow-sm
                    "
                  >
                    {item.status}
                  </div>


                  {/* =================================================
                      ÍCONE SOBRE A IMAGEM
                  ================================================== */}

                  <div
                    className="
                    absolute
                    left-4
                    bottom-0
                    z-10
                    flex
                    h-14
                    w-14
                   -translate-y-1/2
                   items-center
                   justify-center
                   rounded-full
                  border-4
                  border-white
                  bg-white
                  text-[#166B45]
                  shadow-sm
                  "
                  >
                    <Icon size={24} />
                  </div>

                </div>


                {/* =================================================
                    CONTEÚDO
                ================================================== */}

                <div className="px-5 pt-7 pb-5">


                  {/* =================================================
                      TÍTULO
                  ================================================== */}

                  <h3
                    className="
                      font-bold
                      text-[#0F172A]
                      text-[17px]
                      leading-snug
                      mb-2
                    "
                  >
                    {item.titulo}
                  </h3>


                  {/* =================================================
                      DESCRIÇÃO
                  ================================================== */}

                  <p
                    className="
                      text-sm
                      text-[#64748B]
                      leading-6
                      mb-4
                    "
                  >
                    {item.descricao}
                  </p>


                  {/* =================================================
                      CATEGORIA
                  ================================================== */}

                  <div
                    className="
                      text-sm
                      font-semibold
                      text-[#166B45]
                    "
                  >
                    {item.categoria}
                  </div>

                </div>

              </article>

            );

          })}

        </div>

      </div>

    </section>
  );
}