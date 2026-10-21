type TimelineEvent = {
  ano: string;
  descricao: string;
};

type TimelineProps = {
  eventos: TimelineEvent[];
};

// Linha do tempo horizontal: uma linha cinza contínua, com um ponto verde
// em cada evento, ano acima e descrição abaixo.
export default function Timeline({ eventos }: TimelineProps) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${eventos.length}, 1fr)` }}>
      {eventos.map((evento, index) => (
        <div key={evento.ano} className="flex flex-col items-center text-center">
          {/* Ano */}
          <p className="text-md font-semibold text-gray-800 mb-3">{evento.ano}</p>

          {/* Linha + ponto: a linha atravessa toda a largura, o ponto fica no centro */}
          <div className="relative w-full flex items-center mb-3">
            <div className={`absolute inset-0 top-1/2 h-px bg-gray-200 ${index === 0 ? "left-1/2" : ""} ${index === eventos.length - 1 ? "right-1/2" : ""}`} />
            <div className="w-2.5 h-2.5 rounded-full bg-[#1F6F4A] mx-auto relative z-10" />
          </div>

          {/* Descrição */}
          <p className="text-sm text-gray-500 leading-relaxed max-w-[160px]">
            {evento.descricao}
          </p>
        </div>
      ))}
    </div>
  );
}