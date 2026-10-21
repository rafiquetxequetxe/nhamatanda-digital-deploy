import { IconCheckCircleSmall, IconCircleDot, IconCircleEmpty } from "@/components/ui/Icons";
import { EtapaProgresso } from "@/types/project";

type ProjectProgressProps = {
  progresso: number;
  etapas: EtapaProgresso[];
};

const configEstado = {
  concluido: { Icon: IconCheckCircleSmall, cor: "text-[#1F6F4A]", label: "Concluído" },
  "em-andamento": { Icon: IconCircleDot, cor: "text-amber-500", label: "Em andamento" },
  pendente: { Icon: IconCircleEmpty, cor: "text-gray-300", label: "Pendente" },
};

export default function ProjectProgress({ progresso, etapas }: ProjectProgressProps) {
  return (
    <div className="border border-gray-100 rounded-xl p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4"><strong> Progresso do Projeto</strong></h2>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1F6F4A] rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <span className="text-sm font-bold text-gray-800">{progresso}%</span>
      </div>

      <ul className="space-y-3">
        {etapas.map(({ nome, estado }) => {
          const { Icon, cor, label } = configEstado[estado];
          return (
            <li key={nome} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-700">
                <span className={cor}><Icon /></span>
                {nome}
              </span>
              <span className={`text-xs font-medium ${cor}`}>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}