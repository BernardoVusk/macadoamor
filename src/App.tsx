import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ChevronRight, 
  Clock, 
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WhatsAppChat from './components/WhatsAppChat';
import ProfitCalculator from './components/ProfitCalculator';
import CheckoutModal from './components/CheckoutModal';
import { TestimonialChat } from './types';

// Import assets directly so Vite bundles and resolves them natively in production
import macaChocolate from './assets/images/maca_chocolate_1779986474320.png';
import macaGourmet from './assets/images/maca_gourmet_1779986494468.png';
import macaVidroSaco from './assets/images/maca_vidro_sac_1779986521415.png';
import macaTabuleiro from './assets/images/maca_tabuleir_1779986554058.png';

// Testimonials data exactly copying screen transcripts
const mockChats: TestimonialChat[] = [
  {
    studentName: 'Aluna Silvana',
    studentStatus: 'online',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    messages: [
      {
        id: 'sil1',
        senderName: 'Silvana',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Angela, olha isso!! Primeira vez que faço e a calda ficou PERFEITA. 🍎 Não grudou nada no dente, fez aquele \'toc toc\' de vidro!',
        timestamp: '15:22',
        isSelf: false
      },
      {
        id: 'sil2',
        senderName: 'Silvana',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Levei 10 pro serviço e vendi todas em 15 minutos! Já recuperei o valor do guia umas 5 vezes kkkk',
        timestamp: '15:22',
        photo: macaTabuleiro,
        isSelf: false
      },
      {
        id: 'sil3',
        senderName: 'Angela',
        senderAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Silvana, que orgulho!! Ficaram lindas demais! É só seguir o passo a passo que não tem erro. Parabéns pelas vendas! 🚀❤️',
        timestamp: '15:23',
        isSelf: true,
        status: 'read'
      }
    ]
  },
  {
    studentName: 'Aluna Márcia',
    studentStatus: 'online',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
    messages: [
      {
        id: 'mar1',
        senderName: 'Márcia',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Passando pra agradecer. Fiz a receita da Caramelada com Flor de Sal pro aniversário do meu sobrinho. Todo mundo ficou doido perguntando quem fez 🤩',
        timestamp: '10:14',
        isSelf: false
      },
      {
        id: 'mar2',
        senderName: 'Márcia',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Acabei de fechar uma encomenda de 50 unidades pra um chá de bebê semana que vem! Tô tremendo aqui rsrs',
        timestamp: '10:15',
        isSelf: false
      },
      {
        id: 'mar3',
        senderName: 'Angela',
        senderAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Que espetáculo Márcia!! A gourmet vende muito caro, né? Agarra essa encomenda e vai pra cima! Precisando de ajuda com a embalagem, olha o módulo 4 do guia. Vai dar tudo certo! 😉✨',
        timestamp: '10:20',
        isSelf: true,
        status: 'read'
      }
    ]
  },
  {
    studentName: 'Aluna Cláudia',
    studentStatus: 'online',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
    messages: [
      {
        id: 'cla1',
        senderName: 'Cláudia',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Angela! Nem acredito que acertei o ponto de vidro de primeira sem usar termômetro! 🙏',
        timestamp: '18:45',
        isSelf: false
      },
      {
        id: 'cla2',
        senderName: 'Cláudia',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Gastei R$ 30 de material no mercado e faturei R$ 120 só postando no status do zap hoje. O lucro limpo veio. Guia salvou minhas contas esse mês. 😍🚀',
        timestamp: '18:46',
        isSelf: false
      },
      {
        id: 'cla3',
        senderName: 'Angela',
        senderAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Cláudia, fico muito feliz! Esse é o propósito! Sem desperdiçar ingrediente, é lucro justo no bolso. Parabéns! 🍎✨',
        timestamp: '18:50',
        isSelf: true,
        status: 'read'
      }
    ]
  }
];

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openCheckout = () => {
    window.location.href = "https://pay.wiapy.com/2EDYsJCncG";
  };

  // Content for the mobile scrolling container - Rendered identically to the user's screenshots
  const renderLanderContent = () => (
    <div className="bg-[#fcfdfd] flex flex-col min-h-screen text-slate-800 font-sans">
      
      {/* ⚠️ Top Bar Warning */}
      <div className="bg-red-700 text-white text-center py-3 px-5 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 select-none">
        <AlertTriangle className="w-4 h-4 text-[#efe23b] fill-[#efe23b] animate-pulse shrink-0" />
        <span className="tracking-wide">Manual Prático: Como iniciar com pouco dinheiro na cozinha de casa</span>
      </div>

      {/* Hero Section Container (Red Background) */}
      <section className="bg-[#cc1111] text-white pt-10 pb-12 px-6 flex flex-col items-center text-center select-none shrink-0 relative overflow-hidden">
        
        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug max-w-sm sm:max-w-md">
          COMO MULHERES COMUNS ESTÃO FAZENDO DE{' '}
          <span className="text-[#efe23b] block mt-1 font-black drop-shadow-sm scale-102">
            R$ 100 A R$ 300 POR DIA
          </span>{' '}
          <span className="text-xs uppercase tracking-widest text-red-100 block mt-2 opacity-95">(SEM MAQUINÁRIO OU EXPERIÊNCIA)</span>
        </h1>

        {/* Subheadline Copy */}
        <p className="mt-5 text-sm sm:text-base leading-relaxed text-red-50/90 font-medium max-w-xs sm:max-w-sm">
          Descubra a <strong className="text-white font-extrabold underline decoration-amber-300">"Maçã de Vidro"</strong>: o doce extremamente lucrativo que não derrete e que vende de 5 em 5 unidades.
        </p>

        {/* Floating Social Proof Badge */}
        <div className="mt-8 bg-white py-4 px-5 rounded-2xl shadow-xl border border-red-500/10 flex items-center gap-4 max-w-xs sm:max-w-sm w-full text-left">
          {/* Overlapping Student Avatars */}
          <div className="flex -space-x-2.5 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=70&h=70"
              alt="Aluna 1"
              className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=70&h=70"
              alt="Aluna 2"
              className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=70&h=70"
              alt="Aluna 3"
              className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="leading-tight">
            <p className="text-red-700 text-sm font-black">+2.147 alunas</p>
            <p className="text-slate-600 text-xs font-semibold mt-0.5">Faturamento real recorrente em casa.</p>
          </div>
        </div>

        {/* Massive Conversion Touch Green Button */}
        <button
          id="hero-cta-button"
          onClick={openCheckout}
          className="btn-vibrate mt-8 w-full max-w-xs sm:max-w-sm bg-[#10b981] hover:bg-[#059669] text-white py-5 px-6 rounded-2xl font-black text-center transition-all duration-300 select-none cursor-pointer outline-none active:scale-95 flex flex-col items-center justify-center shadow-lg"
        >
          <span className="text-sm sm:text-base tracking-wide">QUERO APRENDER E LUCRAR HOJE</span>
          <span className="text-xs opacity-90 font-normal mt-0.5">Acesso vitalício instantâneo</span>
        </button>

        {/* Dual Side-by-Side Apples Product Images */}
        <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-xs sm:max-w-sm">
          <div className="overflow-hidden rounded-2xl shadow-xl border-2 border-red-400 bg-white aspect-[3/4] hover:scale-[1.02] transition duration-350">
            <img
              src={macaChocolate}
              alt="Maçã Gourmet de Chocolate"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl border-2 border-red-400 bg-white aspect-[3/4] hover:scale-[1.02] transition duration-350">
            <img
              src={macaGourmet}
              alt="Maçã Gourmet Caramelada"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Screen 2: Red Dashed Card Detail */}
      <section className="bg-white py-12 px-6 flex flex-col items-center">
        <div className="border-2 border-dashed border-[#cc1111] rounded-3xl p-6 max-w-xs sm:max-w-sm w-full bg-red-50/10 space-y-5 shadow-xs">
          <div className="overflow-hidden rounded-2xl shadow-md aspect-square bg-white">
            <img
              src={macaVidroSaco}
              alt="Maçãs de Vidro embaladas prontas"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-sm sm:text-base text-slate-700 font-extrabold text-center leading-relaxed px-1">
            O ponto exato: <span className="text-[#cc1111] underline">Fica dura como vidro</span>, não mela no saquinho e tem aquele barulho crocante irresistível!
          </p>
        </div>
      </section>

      {/* Screen 3-5: Proof of Method with WhatsApp simulator */}
      <section className="bg-[#f4f7f6] py-14 px-6 flex flex-col items-center shrink-0">
        <div className="max-w-xs sm:max-w-sm w-full space-y-5">
          <div className="text-center space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight">
              A prova de que funciona na prática:
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Veja as conversas de alunas reais no WhatsApp:</p>
          </div>
          
          <WhatsAppChat chatData={mockChats} />
          
          <p className="text-xs text-center text-slate-500 font-semibold italic select-none mt-2">
            💡 Toque nos nomes acima para alternar as histórias
          </p>
        </div>
      </section>

      {/* Screen 6: What's inside the Guide Card list */}
      <section className="bg-white py-14 px-6 flex flex-col items-center">
        <div className="max-w-xs sm:max-w-sm w-full space-y-7">
          <div className="text-center space-y-2 select-none">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">O que você vai aprender?</h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Um manual detalhado sem rodeios, direto ao ponto para evitar desperdícios:
            </p>
          </div>

          {/* Module List */}
          <div className="space-y-4">
            {/* Module 1 */}
            <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-xs items-start">
              <div className="bg-red-50 p-2.5 rounded-xl shrink-0 text-2xl">🍎</div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">O Segredo da Calda de Vidro</h3>
                <p className="text-xs sm:text-sm text-left text-gray-500 leading-relaxed font-normal">
                  A técnica exata para dar o ponto perfeito. Você vai descobrir o truque caseiro para acertar a hora certa de tirar do fogo, sem precisar de bicos especiais ou termômetros caros.
                </p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-xs items-start">
              <div className="bg-amber-50 p-2.5 rounded-xl shrink-0 text-2xl">🍫</div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">12 Receitas Completas</h3>
                <p className="text-xs sm:text-sm text-left text-gray-500 leading-relaxed font-normal">
                  Vá muito além da maçã tradicional. Você terá acesso aos sabores Premium que vendem de 3x a 5x mais caro: Brigadeiro, Caramelo com Flor de Sal e Creme de Avelã trufado.
                </p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-xs items-start font-sans">
              <div className="bg-purple-50 p-2.5 rounded-xl shrink-0 text-2xl">🛍️</div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Secagem e Conservação</h3>
                <p className="text-xs sm:text-sm text-left text-gray-500 leading-relaxed font-normal">
                  O segredo comercial para a maçã durar dias sem suar ou melecar. Aprenda a embalar e armazenar de forma higiênica e profissional.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Section replacing static static blocks */}
          <div className="pt-4">
            <ProfitCalculator />
          </div>
        </div>
      </section>

      {/* Screen 7: Chef Bio & Authentic price story */}
      <section className="bg-slate-50 py-14 px-6 flex flex-col items-center">
        <div className="max-w-xs sm:max-w-sm w-full space-y-7">
          
          {/* Chef Block */}
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150"
              alt="Angela Chef Confeiteira"
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-600 shrink-0 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h2 className="text-base font-black text-slate-900 leading-none">Oi, sou a Angela.</h2>
              <p className="text-xs text-emerald-700 font-extrabold">Criadora do Método</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-600 font-normal text-left">
            Alguns anos atrás, eu me vi com as contas completamente atrasadas e com pouquíssima perspectiva financeira. Fazer doces na pequena cozinha de casa foi a luz no fim do túnel que mudou minha jornada.
          </p>
          
          <p className="text-sm leading-relaxed text-gray-600 font-normal text-left mt-[-10px]">
            Eu perdi muitos quilos de açúcar e desperdicei ingredientes até decifrar o mistério da calda que dura e não mela. Hoje, trago essa receita mastigada para que você comece faturando já no primeiro dia, sem o desperdício que eu enfrentei.
          </p>

          {/* Sendo brutalmente honesta pricing statement box */}
          <div className="bg-red-50/60 border border-red-200/50 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm sm:text-base font-black text-red-900 leading-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-700" />
              <span>Sendo brutalmente honesta: Por que só R$ 12,90?</span>
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal text-left">
              Se o conteúdo é tão detalhado e validado por milhares de alunas, por que cobrar um valor tão simbólico? A resposta não tem letras miúdas: quero ganhar a sua total confiança.
            </p>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal text-left">
              Eu sei que investindo apenas R$ 12,90 hoje, fazendo sua primeira fornada e colhendo o lucro com seus primeiros pedidos no final de semana, você verá valor real na minha entrega.
            </p>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal text-left">
              No futuro, quando eu lançar especializações mais avançadas de Confeitaria Gourmet, você vai lembrar de mim e comprar com segurança. É o acordo mais transparente do mercado: você ganha hoje, e eu ganho sua lealdade lá na frente.
            </p>
          </div>
        </div>
      </section>

      {/* Screen 8: Offer Recap and guarantees */}
      <section className="bg-[#5c1111] pt-14 pb-12 px-6 flex flex-col items-center text-center select-none text-white shrink-0">
        <div className="max-w-xs sm:max-w-sm w-full space-y-7">
          
          <h2 className="text-base sm:text-lg font-black tracking-tight max-w-xs mx-auto leading-tight">
            Tudo o que você vai receber agora no seu e-mail:
          </h2>

          {/* Batch scarcity info bar */}
          <div className="bg-red-700 text-xs font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 border border-red-500/20">
            <Clock className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="tracking-wide">Preço Promocional Limitado de R$ 12,90</span>
          </div>

          {/* Big price offer box wrapper */}
          <div className="bg-white rounded-2xl py-6 px-6 shadow-2xl text-gray-800 space-y-3">
            <p className="text-xs text-red-600 font-extrabold uppercase tracking-widest leading-none">
              De <span className="line-through text-gray-400 font-bold">R$ 67,00</span> por apenas:
            </p>
            
            {/* Premium Big Price representation */}
            <div className="flex items-center justify-center gap-0.5">
              <span className="text-2xl font-black text-gray-700 mt-2">R$</span>
              <span className="text-6xl font-black text-[#10b981] tracking-tighter">12</span>
              <span className="text-base font-extrabold text-gray-400 self-end mb-2">,90</span>
            </div>

            <p className="text-xs text-slate-500 font-extrabold bg-slate-50 inline-block px-4 py-1.5 rounded-full border border-gray-100 mt-2">
              Acesso Vitalício • Pagamento Único
            </p>
          </div>

          {/* Checkout CTA button */}
          <button
            id="footer-cta-button"
            onClick={openCheckout}
            className="btn-vibrate w-full bg-[#10b981] hover:bg-[#059669] text-white py-5 px-6 rounded-2xl font-black text-center transition-all duration-300 select-none cursor-pointer outline-none active:scale-95 flex flex-col items-center justify-center shadow-xl"
          >
            <span className="text-sm sm:text-base tracking-wide">SIM! QUERO COMEÇAR AGORA</span>
            <span className="text-xs opacity-90 font-normal mt-0.5">Ambiente Seguro & Entrega Imediata</span>
          </button>

          {/* Scarcity lightbulb reminder text */}
          <p className="text-xs leading-relaxed text-red-100/90 font-medium">
            💡 Faça a conta rápida: Ao vender uma única maçã de vidro gourmet neste final de semana, você já recupera todo o seu investimento inicial de R$ 12,90. O risco é inexistente!
          </p>

          {/* 7 Days Double Guarantee Box */}
          <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-[#10b981] text-gray-800 space-y-4 text-left shadow-xs">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-full flex items-center justify-center font-black text-xs text-center uppercase leading-tight border border-emerald-500/10 basis-12 shrink-0">
                <span>7 Dias</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-none">GARANTIA INCONDICIONAL DE 7 DIAS</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-left">
              Fique 100% tranquila: Se nos próximos 7 dias você experimentar, achar difícil ou sua calda cristalizar, basta me enviar um e-mail. Nós devolveremos seus R$ 12,90 centavo por centavo, sem perguntas ou burocracia.
            </p>
          </div>

        </div>
      </section>

      {/* Footer copyright and safety info */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center select-none shrink-0 px-5 border-t border-slate-950 text-xs">
        <p className="font-bold">Maçãs do Amor Gourmet © 2026. Todos os direitos reservados.</p>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-gray-800 flex flex-col font-sans relative overflow-x-hidden antialiased">
      {/* Center container to keep mobile-first scale beautiful on desktop, and native fluid content on phone */}
      <div className="w-full max-w-md mx-auto bg-white shadow-xl min-h-screen flex flex-col relative pb-20 md:pb-0">
        {renderLanderContent()}
      </div>

      {/* Sticky Bottom Floating Conversion Bar for Mobile (hidden on desktop screens where layout is large) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-150 p-3.5 flex items-center justify-between z-40 shadow-xl select-none">
        <div className="leading-tight">
          <p className="text-[10px] text-[#cc1111] font-black uppercase tracking-wider">Oferta Liberada</p>
          <p className="text-base font-black text-emerald-600">
            R$ 12,90 <span className="text-gray-400 font-normal text-xs line-through">R$ 67</span>
          </p>
        </div>
        <button
          onClick={openCheckout}
          className="bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs px-5 py-3 rounded-2xl cursor-pointer shadow-md select-none transition duration-150 active:scale-95 flex items-center gap-1"
        >
          <span>QUERO APRENDER AGORA!</span>
          <ChevronRight className="w-4 h-4 text-emerald-100 stroke-[2.5]" />
        </button>
      </div>

      {/* Interactive Checkout Modal Overlay Dialog */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
