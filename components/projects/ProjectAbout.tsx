import {
  IconBadgeCheck, IconCheckCircle, IconWarehouse, IconTruckServices,
  IconPlugZap, IconClock, IconFileStack,
} from "@/components/ui/Icons";
import { DetalheProjeto } from "@/types/project";

const iconesPorTipo = {
  infraestruturaPrevista: IconWarehouse,
  servicosPrevistos: IconTruckServices,
  infraestruturaExistente: IconPlugZap,
  estagioAtual: IconClock,
  documentos: IconFileStack,
};

type ProjectAboutProps = {
  descricaoDetalhada?: string[];
  alinhamentoEstrategico?: string;
  porQueInvestir?: string[];
  detalhesProjeto?: DetalheProjeto[];
};

// Secção "Sobre o Projeto" + "Por que investir" + "Detalhes do Projeto".
// Todos os campos são opcionais — a secção só aparece se houver conteúdo.
export default function ProjectAbout({
  descricaoDetalhada,
  alinhamentoEstrategico,
  porQueInvestir,
  detalhesProjeto,
}: ProjectAboutProps) {
  const temSobre = descricaoDetalhada && descricaoDetalhada.length > 0;
  const temPorque = porQueInvestir && porQueInvestir.length > 0;

  if (!temSobre && !temPorque && !detalhesProjeto) return null;

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Sobre o Projeto */}
        {temSobre && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4"><strong>Sobre o Projeto</strong></h2>
            <div className="space-y-3 mb-4">
              {descricaoDetalhada!.map((par, index) => (
                <p key={index} className="text-md text-gray-600 leading-relaxed">
                  {par}
                </p>
              ))}
            </div>

            {alinhamentoEstrategico && (
              <div className="flex items-center gap-2.5 bg-[#1F6F4A]/5 text-[#1F6F4A] text-sm font-medium rounded-lg px-4 py-3">
                <IconBadgeCheck size={18} className="shrink-0" />
                {alinhamentoEstrategico}
              </div>
            )}
          </div>
        )}

        {/* Por que investir */}
        {temPorque && (
          <div className="border border-gray-100 rounded-xl p-6 lg:pl-8 lg:border-0">
            <h2 className="text-xl font-bold text-gray-900 mb-4"><strong>Por que investir</strong></h2>
            <ul className="space-y-3">
              {porQueInvestir!.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#1F6F4A] shrink-0 mt-0.5">
                    <IconCheckCircle size={18} />
                  </span>
                  <span className="text-md text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Detalhes do Projeto */}
      {detalhesProjeto && detalhesProjeto.length > 0 && (
        <div className=" mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5"><strong>Detalhes do Projeto</strong></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {detalhesProjeto.map(({ titulo, descricao, icone }) => {
              const Icon = iconesPorTipo[icone];
              return (
                <div key={titulo} className="flex gap-3">
                  <span className="text-[#1F6F4A] shrink-0">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-md font-bold text-gray-900 mb-1 gap-x-20">{titulo}</p>
                    <p className="text-sm text-gray-500 leading-relaxed gap-x-20">{descricao}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}