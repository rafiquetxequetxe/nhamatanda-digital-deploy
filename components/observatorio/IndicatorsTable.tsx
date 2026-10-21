import { LinhaTabela } from "@/types/indicador";

type IndicatorsTableProps = {
  linhas: LinhaTabela[];
};

export default function IndicatorsTable({ linhas }: IndicatorsTableProps) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-500">
            <th className="px-4 py-3 font-medium">Indicador</th>
            <th className="px-4 py-3 font-medium">2022</th>
            <th className="px-4 py-3 font-medium">2023</th>
            <th className="px-4 py-3 font-medium">2024</th>
            <th className="px-4 py-3 font-medium">Variação</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.indicador} className="border-t border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-800">{linha.indicador}</td>
              <td className="px-4 py-3 text-gray-600">{linha["2022"]}</td>
              <td className="px-4 py-3 text-gray-600">{linha["2023"]}</td>
              <td className="px-4 py-3 text-gray-600">{linha["2024"]}</td>
              <td className="px-4 py-3 font-semibold text-green-600">{linha.variacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}