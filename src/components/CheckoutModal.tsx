import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, Check, Copy, CheckCheck, Loader2, Sparkles, Download, FileText, ArrowRight } from 'lucide-react';
import { CheckoutFormData } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'pix_screen' | 'success'>('form');
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'pix',
  });
  const [pixCopied, setPixCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handlePaymentSelect = (method: 'pix' | 'credit_card') => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Por favor, informe seu nome completo.';
    if (!formData.email.trim() || !formData.email.includes('@')) return 'Informe um e-mail válido para receber o guia.';
    if (!formData.phone.trim() || formData.phone.length < 8) return 'Informe seu WhatsApp com DDD.';
    
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber || formData.cardNumber.length < 16) return 'Número do cartão inválido.';
      if (!formData.cardName) return 'Nome do titular é obrigatório.';
      if (!formData.cardExpiry) return 'Data de validade inválida.';
      if (!formData.cardCvc) return 'Código de segurança inválido.';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    setStep('processing');
    setTimeout(() => {
      if (formData.paymentMethod === 'pix') {
        setStep('pix_screen');
      } else {
        setStep('success');
      }
    }, 1800);
  };

  const handleCopyPix = () => {
    const pixKey = "00020126360014BR.GOV.BCB.PIX0114espetoclips@gmail.com520400005303986540512.905802BR5915MacaDeVidroGuia6009SaoPaulo62070503Guia03";
    navigator.clipboard.writeText(pixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const simulatePixPayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col relative max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-emerald-900 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-800 p-1.5 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Checkout 100% Seguro</h3>
                <p className="text-[10px] text-emerald-300">Garantia SSL e entrega imediata por e-mail</p>
              </div>
            </div>
            <button
              id="close-checkout"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-emerald-800 transition text-emerald-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Summary badge */}
                <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🍎</span>
                    <div>
                      <p className="text-xs font-extrabold text-gray-800">Guia Prático da Maçã de Vidro + Bônus</p>
                      <p className="text-[10px] text-gray-500">Acesso vitalício no seu e-mail</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800 line-through leading-none">R$ 67,00</p>
                    <p className="text-base font-black text-emerald-600">R$ 12,90</p>
                  </div>
                </div>

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg font-semibold border border-red-100">
                    {validationError}
                  </div>
                )}

                {/* Identification Inputs */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                    1. Dados de Recebimento
                  </h4>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      name="fullName"
                      id="input-name"
                      required
                      placeholder="Como quer no seu certificado..."
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base placeholder-gray-400 text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">E-mail para Envio</label>
                      <input
                        type="email"
                        name="email"
                        id="input-email"
                        required
                        placeholder="onde você vai receber o PDF..."
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base placeholder-gray-400 text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">WhatsApp com DDD</label>
                      <input
                        type="tel"
                        name="phone"
                        id="input-phone"
                        required
                        placeholder="(00) 99999-9999"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base placeholder-gray-400 text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                    2. Método de Pagamento
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      id="pay-pix"
                      onClick={() => handlePaymentSelect('pix')}
                      className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        formData.paymentMethod === 'pix'
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="text-lg">⚡ PIX</span>
                      <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-100/50 px-2 py-0.5 rounded-full">
                        Aprovação em 1s
                      </span>
                    </button>

                    <button
                      type="button"
                      id="pay-card"
                      onClick={() => handlePaymentSelect('credit_card')}
                      className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        formData.paymentMethod === 'credit_card'
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="text-lg">💳 Cartão</span>
                      <span className="text-[10px] text-gray-400">Até 2x sem juros</span>
                    </button>
                  </div>

                  {formData.paymentMethod === 'credit_card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-2"
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Número do Cartão</label>
                        <input
                          type="text"
                          name="cardNumber"
                          id="input-card-num"
                          maxLength={16}
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Nome Impresso no Cartão</label>
                        <input
                          type="text"
                          name="cardName"
                          id="input-card-name"
                          placeholder="Maria da Silva"
                          value={formData.cardName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1 font-mono">Validade</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            id="input-card-exp"
                            maxLength={5}
                            placeholder="MM/AA"
                            value={formData.cardExpiry || ''}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">CVC</label>
                          <input
                            type="text"
                            name="cardCvc"
                            id="input-card-cvc"
                            maxLength={3}
                            placeholder="123"
                            value={formData.cardCvc || ''}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Submit Action Block */}
                <button
                  type="submit"
                  id="submit-payment"
                  className="w-full py-4 px-6 bg-emerald-600 text-white rounded-2xl font-extrabold text-base transition-all duration-300 hover:bg-emerald-700 shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-4"
                >
                  {formData.paymentMethod === 'pix' ? 'GERAR PIX R$ 12,90' : 'FINALIZAR COMPRA R$ 12,90'}
                </button>
              </form>
            )}

            {step === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                <h3 className="font-extrabold text-lg text-gray-800 text-center">Processando sua transação...</h3>
                <p className="text-gray-500 text-xs text-center max-w-xs">
                  Criptografia de nível bancário de 256 bits. Seus dados estão completamente seguros e protegidos.
                </p>
              </div>
            )}

            {step === 'pix_screen' && (
              <div className="py-4 flex flex-col items-center text-center space-y-4">
                <div className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <span>⚡ Pix gerado com sucesso!</span>
                </div>

                {/* Mock QR Code representation using pure beautiful CSS */}
                <div className="w-44 h-44 bg-gray-100 p-2.5 rounded-2xl border-2 border-gray-200 relative flex items-center justify-center shadow-inner">
                  <div className="grid grid-cols-4 gap-1 w-full h-full opacity-90 p-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i + 3) % 4 === 0 || (i * 7) % 3 === 0 ? 'bg-black' : 'bg-transparent'
                        }`}
                      ></div>
                    ))}
                  </div>
                  {/* Glowing core logo */}
                  <div className="absolute bg-white p-1 rounded-lg border border-gray-200">
                    <span className="text-xs font-black text-emerald-600">PIX</span>
                  </div>
                </div>

                <div className="space-y-1.5 w-full">
                  <p className="text-xs text-gray-500 font-medium">Copie a chave Pix abaixo e pague no seu banco:</p>
                  
                  <div className="flex items-center gap-1.5 bg-gray-50 p-2.5 rounded-xl border border-gray-100 max-w-sm mx-auto">
                    <input
                      readOnly
                      value="00020126360014BR.GOV.BCB..."
                      className="bg-transparent text-xs text-gray-600 font-mono flex-1 outline-none select-none pl-1"
                    />
                    <button
                      onClick={handleCopyPix}
                      id="copy-pix-btn"
                      className="bg-emerald-600 text-white p-2 rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-emerald-700 transition cursor-pointer"
                    >
                      {pixCopied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{pixCopied ? "Copiado!" : "Copiar"}</span>
                    </button>
                  </div>
                </div>

                <div className="w-full pt-4 border-t border-gray-100 space-y-2">
                  <button
                    onClick={simulatePixPayment}
                    id="paid-pix-confirm"
                    className="w-full py-4 px-6 bg-emerald-600 text-white rounded-2xl font-extrabold text-base hover:bg-emerald-700 transition duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>JÁ PAGUEI VIA PIX!</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-gray-400">
                    O sistema detecta o pagamento automaticamente em menos de 10 segundos.
                  </p>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="bg-emerald-100 text-emerald-800 p-4 rounded-full">
                  <Sparkles className="w-10 h-10 text-emerald-600" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-xl text-gray-800">Parabéns, {formData.fullName.split(' ')[0]}! 🍎🎉</h3>
                  <p className="text-emerald-600 text-sm font-bold">Seu pagamento de R$ 12,90 foi confirmado!</p>
                  <p className="text-gray-500 text-xs px-4">
                    O Guia Prático foi enviado para o seu e-mail: <strong className="text-gray-700">{formData.email}</strong>.
                  </p>
                </div>

                {/* Direct value download block inside the app so it's useful! */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full mt-4 space-y-3">
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-red-100 p-2 rounded-xl text-red-600">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-700">Guia-Maca-de-Vidro-Completo.pdf</h4>
                      <p className="text-[10px] text-gray-400">PDF • 5.4MB • Pronto para Download</p>
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Download iniciado para o Guia da Maçã de Vidro! Também enviado para seu e-mail: ${formData.email}`);
                    }}
                    id="download-guide-btn"
                    className="w-full py-3 px-4 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>BAIXAR GUIA AGORA</span>
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 text-xs font-semibold pt-2 cursor-pointer"
                >
                  Concluir e Voltar ao Site
                </button>
              </div>
            )}
          </div>

          {/* Footer security badges */}
          {step !== 'success' && (
            <div className="bg-gray-50 p-3.5 border-t border-gray-100 flex items-center justify-center gap-6 shrink-0 text-gray-400 text-[10px] font-bold">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                <span>SSL SECURE</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                <span>COMPRA GARANTIDA</span>
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
