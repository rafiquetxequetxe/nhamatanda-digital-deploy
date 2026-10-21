import { IconBarChart2, IconMapPin, IconDatabase, IconBookOpen, IconHelpCircle } from "@/components/ui/Icons";

const acessos = [
  { label: "Indicadores por Tema", Icon: IconBarChart2 },
  { label: "Comparações Regionais", Icon: IconMapPin },
  { label: "Dados Abertos", Icon: IconDatabase },
  { label: "Metodologia", Icon: IconBookOpen },
  { label: "Perguntas Frequentes", Icon: IconHelpCircle },
];

export default function QuickAccessGrid() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Acesso Rápido</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {acessos.map(({ label, Icon }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 border border-gray-100 rounded-xl py-6 px-3 hover:shadow-md hover:border-[#1F6F4A]/30 transition-all duration-200 text-center"
          >
            <span className="text-[#1F6F4A]"><Icon size={50}/></span>
            <span className="text-md font-bold text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}