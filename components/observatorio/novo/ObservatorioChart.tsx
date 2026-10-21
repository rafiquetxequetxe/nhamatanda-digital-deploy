"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { numero, type Indicador, type Ponto } from "./observatorio-model";
import s from "./observatorio.module.css";

type Props = { indicador: Indicador; dados: Ponto[] };
type TipProps = { active?: boolean; payload?: readonly { value?: number | string | readonly (number | string)[] }[]; label?: string | number; unidade: string };
function Tip({ active, payload, label, unidade }: TipProps) {
  const value = payload?.[0]?.value;
  if (!active || typeof value !== "number") return null;
  return <div className={s.tooltip}><span>{label}</span><strong>{numero(value)} {unidade}</strong></div>;
}
export default function ObservatorioChart({ indicador, dados }: Props) {
  const eixoX = <XAxis dataKey="ano" tick={{ fontSize: 12, fill: "#65758a" }} axisLine={false} tickLine={false} minTickGap={22} />;
  const eixoY = <YAxis width={66} tick={{ fontSize: 11, fill: "#65758a" }} axisLine={false} tickLine={false} tickFormatter={value => numero(Number(value), 0)} />;
  const grelha = <CartesianGrid stroke="#e8eeeb" vertical={false} />;
  const tip = <Tooltip content={<Tip unidade={indicador.unidade} />} />;
  const margin = { top: 12, right: 12, left: 0, bottom: 4 };
  return <div className={s.chart} role="group" aria-label={`${indicador.titulo}. Valores em ${indicador.unidade}. A tabela apresenta os mesmos dados.`}>
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      {indicador.tipo === "barra" ? <BarChart data={dados} margin={margin} accessibilityLayer>{grelha}{eixoX}{eixoY}{tip}<Bar dataKey="valor" name={indicador.titulo} fill="#21774f" maxBarSize={72} radius={[2, 2, 0, 0]} isAnimationActive={false} /></BarChart>
        : indicador.tipo === "linha" ? <LineChart data={dados} margin={margin} accessibilityLayer>{grelha}{eixoX}{eixoY}{tip}<Line type="linear" dataKey="valor" name={indicador.titulo} stroke="#21774f" strokeWidth={2.5} dot={{ r: 3, fill: "#21774f" }} connectNulls={false} isAnimationActive={false} /></LineChart>
        : <AreaChart data={dados} margin={margin} accessibilityLayer>{grelha}{eixoX}{eixoY}{tip}<Area type="linear" dataKey="valor" name={indicador.titulo} stroke="#21774f" fill="#21774f" fillOpacity={0.12} strokeWidth={2.5} connectNulls={false} isAnimationActive={false} /></AreaChart>}
    </ResponsiveContainer>
  </div>;
}