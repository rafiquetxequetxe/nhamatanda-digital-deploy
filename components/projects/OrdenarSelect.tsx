"use client";

type OrdenarSelectProps = {
  valorAtual: string;
};

// Pequeno Client Component isolado só para o <select> de ordenação,
// porque precisa de onChange (interatividade), que não é permitido
// diretamente num Server Component como a página /investir.
export default function OrdenarSelect({ valorAtual }: OrdenarSelectProps) {
  return (
    <form action="/investir" method="GET" className="flex items-center gap-2 text-md text-gray-600">
      <label htmlFor="ordenar">Ordenar por</label>
      <select
        id="ordenar"
        name="ordenar"
        defaultValue={valorAtual}
        onChange={(e) => e.currentTarget.form?.submit()}
        className="border border-gray-200 rounded-md px-3 py-2 text-md outline-none focus:border-[#1F6F4A]"
      >
        <option value="recentes">Mais recentes</option>
        <option value="az">A-Z</option>
      </select>
    </form>
  );
}