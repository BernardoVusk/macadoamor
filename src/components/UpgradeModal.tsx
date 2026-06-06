import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, Check } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  onDecline: () => void;
}

export default function UpgradeModal({ isOpen, onClose, onUpgrade, onDecline }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col relative"
        >
          {/* Top Exclusive Promotion Bar (Header) */}
          <div className="bg-[#cc1111] text-white px-4 py-3.5 flex items-center justify-between shrink-0 relative">
            <div className="flex items-center gap-2 mx-auto pr-4">
              <AlertTriangle className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse shrink-0" />
              <div className="text-center">
                <h3 className="font-black text-xs sm:text-sm tracking-wide leading-tight text-white">
                  ⚠️ OFERTA EXCLUSIVA VÁLIDA AGORA!
                </h3>
                <p className="text-[10px] text-red-100 font-normal mt-0.5 leading-none">
                  Aproveite enquanto disponível para essa promoção
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute right-3.5 top-3.5 p-1 rounded-full hover:bg-red-800 transition text-red-200 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 overflow-y-auto max-h-[80vh] flex flex-col items-center">
            {/* Urgency Callout */}
            <h2 className="text-xl font-black text-gray-900 tracking-tight text-center leading-tight uppercase">
              ESPERA! VOCÊ QUER MAIS?
            </h2>
            <p className="text-xs text-gray-500 font-medium text-center mt-2.5 max-w-[280px] leading-relaxed">
              Upgrade para o plano completo agora e ganhe acesso a tudo
            </p>

            {/* Premium Benefits List (Molded for Combo Master Gourmet) */}
            <div className="w-full mt-6 space-y-3 bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
              <div className="flex items-start gap-2.5">
                <Check className="w-4.5 h-4.5 text-[#10b981] stroke-[3.5] mt-0.5 shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-700 font-semibold leading-snug">
                  Tudo do Acesso Essencial (Guia Prático + Clássicas)
                </span>
              </div>
              
              <div className="flex items-start gap-2.5">
                <Check className="w-4.5 h-4.5 text-[#10b981] stroke-[3.5] mt-0.5 shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-700 font-semibold leading-snug">
                  Guia Secreto de Caldas Coloridas para Festas Infantis
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Check className="w-4.5 h-4.5 text-[#10b981] stroke-[3.5] mt-0.5 shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-700 font-semibold leading-snug">
                  Planilha Automática de Precificação Inteligente
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Check className="w-4.5 h-4.5 text-[#10b981] stroke-[3.5] mt-0.5 shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-700 font-semibold leading-snug">
                  Métodos Completos de Venda: Online, Presencial e WhatsApp
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Check className="w-4.5 h-4.5 text-[#10b981] stroke-[3.5] mt-0.5 shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-700 font-semibold leading-snug">
                  Estratégias de Fidelização, Encomendas e Datas Especiais
                </span>
              </div>
            </div>

            {/* Price Presentation */}
            <div className="my-6 text-center select-none">
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-bold">
                <span className="line-through">R$ 24,90</span>
                <span className="bg-[#cc1111] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-black tracking-wider uppercase">
                  -28%
                </span>
              </div>
              <p className="text-4xl font-black text-[#cc1111] mt-1 tracking-tight">
                R$ 17,90
              </p>
              <p className="text-[10px] text-gray-400 font-medium mt-1">
                Promoção especial para clientes do plano básico
              </p>
            </div>

            {/* Upgrade action buttons */}
            <div className="w-full space-y-2.5">
              <button
                onClick={onUpgrade}
                className="w-full bg-[#cc1111] hover:bg-[#b40f0f] text-white py-4 px-5 rounded-2xl font-black text-xs sm:text-sm text-center border-b-4 border-red-900 transition-all active:scale-[0.98] cursor-pointer shadow-md uppercase tracking-wider btn-vibrate"
              >
                SIM! QUERO O UPGRADE
              </button>
              
              <button
                onClick={onDecline}
                className="w-full bg-[#f4f4f5] hover:bg-[#e4e4e7] border border-gray-200 text-gray-600 py-3.5 px-4 rounded-2xl font-bold text-xs text-center transition cursor-pointer"
              >
                Não, prefiro o básico
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
