"use client";

import { useState } from "react";
import CategoryTabs from "@/components/observatorio/CategoryTabs";
import IndicatorChart from "@/components/observatorio/IndicatorChart";
import { getIndicadoresPrincipais } from "@/lib/indicadores";
import { IndicadorPrincipal } from "@/types/indicador";
import { getUltimosPontos } from "@/lib/indicadores";



type CategoryTabsWrapperProps = {
    categorias: string[];
    indicadoresIniciais: IndicadorPrincipal[];
};

export default function CategoryTabsWrapper({ categorias, indicadoresIniciais }: CategoryTabsWrapperProps) {
    const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

    const indicadores =
        categoriaAtiva === "Todos"
            ? indicadoresIniciais
            : indicadoresIniciais.filter((i) => i.categoria === categoriaAtiva);

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-base font-bold text-gray-900">Indicadores Principais</h2>
            </div>
            <CategoryTabs categorias={categorias} ativa={categoriaAtiva} onChange={setCategoriaAtiva} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {indicadores.map((ind) => (
                    // No .map() dos gráficos pequenos:
                    <IndicatorChart
                        key={ind.id}
                        indicador={{ ...ind, dados: getUltimosPontos(ind.dados, 5) }}
                        altura={180}
                    />
                ))}
            </div>

        </div>
    );
}