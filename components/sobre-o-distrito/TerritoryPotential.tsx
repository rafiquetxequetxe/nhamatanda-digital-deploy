import {
  IconLeaf,
  IconDroplet,
  IconRoad,
} from "@/components/ui/Icons";

const dados = [
  {
    Icon: IconLeaf,
    valor: "278.567 ha",
    titulo: "Terras com potencial agrícola",
  },
  {
    Icon: IconDroplet,
    valor: "73.895 ha",
    titulo: "Recursos hídricos com potencial",
  },
  {
    Icon: IconRoad,
    valor: "156 km",
    titulo: "Estradas primárias",
  },
];

export default function TerritoryPotential() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="rounded-xl bg-[#F2F7F4] p-7">
            <p className="text-sm font-bold uppercase tracking-wide text-[#1F6F4A]">
              Recursos
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">
              Um território com recursos.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
              A diversidade territorial de Nhamatanda oferece condições
              para diferentes actividades económicas e para a melhoria
              da qualidade de vida das comunidades.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              {dados.map(({ Icon, valor, titulo }) => (
                <div
                  key={titulo}
                  className="rounded-lg bg-white border border-[#E2E8F0] p-4"
                >
                  <Icon size={19} className="text-[#1F6F4A]" />

                  <p className="mt-3 font-bold text-[#0F172A]">
                    {valor}
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    {titulo}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[#F8FAF9] border border-[#E2E8F0] p-7">
            <p className="text-sm font-bold uppercase tracking-wide text-[#1F6F4A]">
              Desenvolvimento
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">
              Do território à oportunidade.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
              Os recursos existentes criam uma base para desenvolver
              cadeias de valor, gerar emprego e atrair novos projectos.
            </p>

            <a
              href="/investir"
              className="inline-flex items-center mt-6 px-5 py-3 rounded-lg bg-[#1F6F4A] text-white text-sm font-semibold hover:bg-[#185A3C]"
            >
              Explorar oportunidades
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}