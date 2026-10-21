import Image from "next/image";

const parceiros = [
  {
    nome: "Governo de Moçambique",
    logo: "/images/governo_de_mocambique.png",
  },
  {
    nome: "PNUD",
    logo: "/images/PNUD.png",
  },
  {
    nome: "The World Bank",
    logo: "/images/worldbank.png",
  },
  {
    nome: "IFAD",
    logo: "/images/IFAD.png",
  },
  {
    nome: "AFD",
    logo: "/images/AFD.jpeg",
  },
  {
    nome: "União Europeia",
    logo: "/images/UniaoEuropeia.jpeg",
  },
  {
    nome: "GAPI",
    logo: "/images/gapi.jpeg",
  },
];

export default function PartnersSection() {
  return (
    <section className="bg-white pt-0 pb-6 lg:pb-8">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* CABEÇALHO */}
        <div className="mb-5">
          <p
            className="
              text-lg
              lg:text-xl
              font-bold
              text-[#1F6F4A]
              tracking-wide
              leading-tight
            "
          >
            PARCEIROS E APOIADORES
          </p>

          <p className="mt-1 text-sm text-[#64748B] leading-tight">
            Entidades que contribuem para o desenvolvimento sustentável de Nhamatanda.
          </p>
        </div>

        {/* LOGOS */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          {parceiros.map(({ nome, logo }) => (
            <div
              key={nome}
              className="
                relative
                h-[60px]
                w-[140px]
                shrink-0
              "
            >
              <Image
                src={logo}
                alt={nome}
                fill
                className="object-contain object-center"
                sizes="140px"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}