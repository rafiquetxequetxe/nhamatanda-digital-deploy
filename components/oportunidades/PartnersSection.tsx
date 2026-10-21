import { IconUser, IconBriefcase } from "@/components/ui/Icons";
import { Parceiro } from "@/types/project";

type PartnersSectionProps = {
  parceiros: Parceiro[];
};

export default function PartnersSection({ parceiros }: PartnersSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4"><strong>Parceiros Envolvidos</strong></h2>
      <div className="space-y-3">
        {parceiros.map(({ nome, papel, estado }) => (
          <div key={nome} className="flex items-start gap-3 border border-gray-100 rounded-xl p-4">
            <span className="w-9 h-9 rounded-full bg-[#1F6F4A]/10 flex items-center justify-center text-[#1F6F4A] shrink-0">
              <IconBriefcase size={16} />
            </span>
            <div>
              <p className="text-md font-bold text-gray-900">{nome}</p>
              <p className="text-sm text-gray-500">{papel}</p>
              {estado && <p className="text-xs text-amber-600 font-medium mt-0.5">{estado}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}