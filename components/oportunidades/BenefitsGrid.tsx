import { IconTrendingUp, IconBriefcase, IconShield, IconHome } from "@/components/ui/Icons";
import { Beneficio } from "@/types/project";

const iconesPorTipo = { trendingUp: IconTrendingUp, briefcase: IconBriefcase, shield: IconShield, home: IconHome };

type BenefitsGridProps = {
  beneficios: Beneficio[];
};

export default function BenefitsGrid({ beneficios }: BenefitsGridProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4"><strong>Principais Benefícios</strong></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {beneficios.map(({ titulo, descricao, icone }) => {
          const Icon = iconesPorTipo[icone];
          return (
            <div key={titulo} className="flex gap-3">
              <span className="text-[#1F6F4A] shrink-0"><Icon /></span>
              <div>
                <p className="text-md font-bold text-gray-900 mb-1">{titulo}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{descricao}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}