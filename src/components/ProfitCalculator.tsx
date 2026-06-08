import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins, TrendingUp, Sparkles } from 'lucide-react';

export default function ProfitCalculator() {
  const [salesPerDay, setSalesPerDay] = useState(15);

  const costPerApple = 3.00;
  const averageClassicProfitPerApple = 8.00; // Price R$11 - R$3 cost
  const averageGourmetProfitPerApple = 17.00; // Price R$20 - R$3 cost

  // Profit computations
  const dailyClassicProfit = salesPerDay * averageClassicProfitPerApple;
  const dailyGourmetProfit = salesPerDay * averageGourmetProfitPerApple;
  const monthlyGourmetProfit = dailyGourmetProfit * 30;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 mt-4 shadow-xs" id="lucro-calculadora">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 justify-center">
        <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
          <Coins className="w-4 h-4" />
        </span>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
          Simulador de Ganhos
        </h3>
      </div>

      <div className="space-y-4">
        {/* Slider & Value Control */}
        <div className="bg-slate-50/75 p-3.5 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-slate-600">Meta de vendas:</span>
            <span className="text-xs font-black bg-emerald-500 text-white px-3 py-1 rounded-full shadow-xs">
              {salesPerDay} maçãs /dia
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="100"
            id="slider-vendas"
            step="5"
            value={salesPerDay}
            onChange={(e) => setSalesPerDay(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 outline-none my-2"
          />

          <div className="flex justify-between text-[9px] text-slate-400 font-extrabold uppercase tracking-wider px-0.5">
            <span>5/dia</span>
            <span>50/dia</span>
            <span>100/dia</span>
          </div>
        </div>

        {/* Dynamic Profit Comparison Side-by-Side */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Classic */}
          <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl text-center flex flex-col justify-between min-h-[85px]">
            <span className="text-[10px] font-black tracking-widest text-slate-450 uppercase">
              Clássicas
            </span>
            <span className="text-lg font-black text-slate-800 my-0.5">
              R$ {dailyClassicProfit.toFixed(0)},00
            </span>
            <span className="text-[9px] text-slate-500 font-bold bg-white border border-slate-150 inline-block px-1.5 py-0.5 rounded-md self-center">
              Lucro Líquido/Dia
            </span>
          </div>

          {/* Gourmet */}
          <div className="bg-rose-50/30 border border-rose-100/50 p-3 rounded-xl text-center flex flex-col justify-between min-h-[85px] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-bl-lg uppercase tracking-widest">
              Gourmet
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#cc1111] uppercase shrink-0">
              Gourmet ⭐
            </span>
            <span className="text-lg font-black text-[#cc1111] my-0.5">
              R$ {dailyGourmetProfit.toFixed(0)},00
            </span>
            <span className="text-[9px] text-[#cc1111] font-bold bg-[#cc1111]/5 inline-block px-1.5 py-0.5 rounded-md self-center">
              Lucro Líquido/Dia
            </span>
          </div>
        </div>

        {/* Projection summary cards */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 text-center space-y-1 relative overflow-hidden shadow-md">
          <div className="absolute -right-3 -top-3 w-12 h-12 bg-[#cc1111]/10 rounded-full blur-xs" />
          
          <div className="flex items-center justify-center gap-1 text-[9px] text-emerald-400 font-black uppercase tracking-widest">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Projeção Mensal Prevista</span>
          </div>
          
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-bold">Até</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
              R$ {monthlyGourmetProfit.toLocaleString('pt-BR')}
            </span>
            <span className="text-xs text-emerald-300 font-black">/mês</span>
          </div>

          <p className="text-[10px] text-slate-350 leading-relaxed font-semibold">
            Trabalhando em casa, usando apenas as panelas que você já possui e lucrando sob encomendas!
          </p>
        </div>

        {/* Small math transparency notice replaces the old wordy rows */}
        <div className="text-center text-[9px] text-slate-400/80 font-semibold flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-slate-300 shrink-0" />
          <span>Calculado com custo de R$3,00 e preços de R$11,00 (clássicas) e R$20,00 (gourmet)</span>
        </div>

      </div>
    </div>
  );
}
