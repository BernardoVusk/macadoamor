import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins, TrendingUp } from 'lucide-react';

export default function ProfitCalculator() {
  const [salesPerDay, setSalesPerDay] = useState(15);

  const costPerApple = 3.00;
  const priceClassicMin = 10.00;
  const priceClassicMax = 12.00;
  const priceGourmetMin = 15.00;
  const priceGourmetMax = 25.00;

  // Let's compute average values
  const averageClassicPrice = (priceClassicMin + priceClassicMax) / 2; // R$11
  const averageGourmetPrice = (priceGourmetMin + priceGourmetMax) / 2; // R$20

  // Net calculations
  const totalCostDaily = salesPerDay * costPerApple;
  
  const dailyClassicRevenue = salesPerDay * averageClassicPrice;
  const dailyClassicProfit = dailyClassicRevenue - totalCostDaily;

  const dailyGourmetRevenue = salesPerDay * averageGourmetPrice;
  const dailyGourmetProfit = dailyGourmetRevenue - totalCostDaily;

  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 mt-6 shadow-sm" id="lucro-calculadora">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
          <Coins className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-extrabold text-gray-800 text-center">
          Simule os seus ganhos diários:
        </h3>
      </div>

      <div className="space-y-4">
        {/* Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>Se vender por dia:</span>
            <span className="text-emerald-600 font-extrabold text-base bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {salesPerDay} maçãs
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="150"
            id="slider-vendas"
            step="5"
            value={salesPerDay}
            onChange={(e) => setSalesPerDay(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 outline-none"
          />
          <div className="flex justify-between text-xs text-gray-400 font-semibold">
            <span>5 por dia</span>
            <span>75 por dia</span>
            <span>150 por dia</span>
          </div>
        </div>

        {/* Math summary styled identically to Screen 6 */}
        <div className="space-y-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs sm:text-sm py-1">
            <span className="text-gray-500 font-semibold">Custo diário em ingredientes (R$ 3,00 cada):</span>
            <span className="text-red-600 font-bold">
              - R$ {totalCostDaily.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm py-1">
            <span className="text-gray-500 font-semibold">Preço médio clássicas (R$ 10 a R$ 12):</span>
            <span className="text-gray-700 font-semibold">
              R$ {averageClassicPrice.toFixed(2).replace('.', ',')} cada
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm py-1">
            <span className="text-gray-500 font-semibold">Preço médio gourmet (R$ 15 a R$ 25):</span>
            <span className="text-gray-700 font-semibold">
              R$ {averageGourmetPrice.toFixed(2).replace('.', ',')} cada
            </span>
          </div>
        </div>

        {/* Dynamic profit outputs */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          {/* Classic profit card */}
          <div className="bg-[#fcfdfd] border border-gray-100 p-4 rounded-xl text-center space-y-1 bg-slate-50/20">
            <p className="text-xs uppercase tracking-wider font-extrabold text-slate-400">
              Maçãs Clássicas
            </p>
            <p className="text-xl font-black text-slate-800">
              R$ {dailyClassicProfit.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded-md">
              Lucro Líquido/Dia
            </p>
          </div>

          {/* Gourmet profit card */}
          <div className="bg-emerald-50/20 border border-emerald-100/30 p-4 rounded-xl text-center space-y-1">
            <p className="text-xs uppercase tracking-wider font-extrabold text-emerald-600">
              Maçãs Gourmet ⭐
            </p>
            <p className="text-xl font-black text-emerald-600">
              R$ {dailyGourmetProfit.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-yellow-800 font-black bg-yellow-250 inline-block px-2 py-0.5 rounded-md">
              Lucro Líquido/Dia
            </p>
          </div>
        </div>

        {/* Projection summary for emotional boost */}
        <div className="bg-emerald-950 text-white rounded-2xl p-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Projeção de Lucro Mensal (Gourmet)</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#5ae095]">
            R$ {(dailyGourmetProfit * 30).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} /mês
          </p>
          <p className="text-xs text-emerald-300 leading-relaxed font-medium">
            Trabalhando apenas na cozinha de casa, sem sair para a rua, lucrando com encomendas!
          </p>
        </div>
      </div>
    </div>
  );
}
