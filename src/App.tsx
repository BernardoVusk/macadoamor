import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ChevronRight, 
  Clock, 
  Flame,
  Check,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
  Gift,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import WhatsAppChat from './components/WhatsAppChat';
import ProfitCalculator from './components/ProfitCalculator';
import CheckoutModal from './components/CheckoutModal';
import UpgradeModal from './components/UpgradeModal';
import { TestimonialChat } from './types';

// Import image assets
import macaVermelhaClassica from './assets/images/maca_vermelha_classica_1780706545196.webp';
import macaVermelhaGourmet from './assets/images/maca_vermelha_gourmet_1780706558274.webp';
import macaVermelhaEmbalagem from './assets/images/maca_vermelha_embalagem_1780706570904.webp';
import macaVermelhaTabuleiro from './assets/images/maca_vermelha_tabuleiro_1780706583039.webp';
import macaCaixaProducao from './assets/images/maca_caixa_producao_1780707367505.webp';

// Testimonials copy exactly matched with Section 7
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
        text: 'Angela, olha isso!! Primeira vez que faço e a calda ficou perfeita. 🍎 Não grudou nada no dente, fez aquele "toc toc" de vidro!',
        timestamp: '15:22',
        isSelf: false
      },
      {
        id: 'sil2',
        senderName: 'Silvana',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Levei 10 pro serviço e vendi todas em 15 minutos! Já recuperei o valor do guia umas 5 vezes kkkk',
        timestamp: '15:22',
        photo: macaVermelhaTabuleiro,
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
    studentName: 'Márcia Manual',
    studentStatus: 'online',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
    messages: [
      {
        id: 'mar_img',
        senderName: 'Márcia',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
        text: '',
        timestamp: '16:40',
        photo: macaCaixaProducao,
        isSelf: false
      },
      {
        id: 'mar_msg',
        senderName: 'Márcia',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Olha a produção de hoje! Já fechei 30 encomendadas pro sábado de uma festa infantil aqui perto. Pagaram metade no Pix pra eu comprar os ingredientes. 🙏',
        timestamp: '16:41',
        isSelf: false
      },
      {
        id: 'mar_self',
        senderName: 'Angela',
        senderAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Meu Deus, Márcia! Que espetáculo! 🤩 O brilho delas tá profissional. Sábado o dinheiro cai todo na conta!',
        timestamp: '16:42',
        isSelf: true,
        status: 'read'
      }
    ]
  },
  {
    studentName: 'Cláudia Aluna 2',
    studentStatus: 'Visto por último hoje 19:05',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
    messages: [
      {
        id: 'cla1',
        senderName: 'Cláudia',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Mulher, eu preciso te agradecer. Eu nunca tinha acendido o fogo pra fazer um caramelo na vida. Tava morrendo de medo de perder os R$ 9,99.',
        timestamp: '19:10',
        isSelf: false
      },
      {
        id: 'cla2',
        senderName: 'Cláudia',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Fiz na minha panelinha velha mesmo, sem termômetro nenhum, só olhando o tempo que você ensina. Minha vizinha comprou 3 de uma vez pra dar pros filhos e falou que nunca comeu uma calda tão crocante. Tô boba! 😍😭',
        timestamp: '19:11',
        isSelf: false
      },
      {
        id: 'cla3',
        senderName: 'Angela',
        senderAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150',
        text: 'Cláudia, eu fico emocionada lendo isso! O método foi feito justamente pra ser simples. Esse é só o primeiro passo da sua virada financeira!',
        timestamp: '19:12',
        isSelf: true,
        status: 'read'
      }
    ]
  }
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const openEssencialCheckout = () => {
    window.location.href = "https://orlacheckout.shop/checkout/fmy93blx?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";
  };

  const openComboCheckout = () => {
    window.location.href = "https://orlacheckout.shop/checkout/gweoknb5?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";
  };

  const openUpgradeDiscountCheckout = () => {
    window.location.href = "https://orlacheckout.shop/checkout/zdivfth0?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";
  };

  const scrollToOffer = () => {
    const offerSection = document.getElementById('oferta-detalhada');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-gray-800 flex flex-col font-sans relative overflow-x-hidden antialiased">
      {/* Container Principal Centrado (Mobile Viewport Simulator) */}
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl min-h-screen flex flex-col relative pb-10">
        
        {/* 1. TAG DE CONTEXTO / TOP BAR */}
        <div id="top-urgency-bar" className="bg-[#cc1111] text-white text-center py-3.5 px-4 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 select-none">
          <AlertTriangle className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse shrink-0" />
          <span className="tracking-wider">MANUAL PRÁTICO REVELA:</span>
        </div>

        {/* 2. HEADLINE DE ALTO IMPACTO (Acima da Dobra) */}
        <section className="bg-gradient-to-b from-[#cc1111] to-[#a30b0b] text-white pt-8 pb-12 px-6 flex flex-col items-center text-center relative overflow-hidden">
          
          <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug max-w-sm">
            "O Doce Secreto de Confeitaria que Custa{' '}
            <span className="text-[#facc15] font-black drop-shadow-sm">R$ 3,00 para Fazer</span> e Vende de 5 em 5 Unidades sem Precisar de Maquinário Caro"
          </h1>

          {/* Subheadline de Conexão */}
          <p className="mt-5 text-xs sm:text-sm leading-relaxed text-red-100 font-medium max-w-xs">
            Descubra o método exato da Calda de Vidro Cristalizada: o segredo para produzir Maçãs Gourmet que não derretem, não melam no saquinho e geram de R$ 100 a R$ 300 por dia direto da cozinha da sua casa.
          </p>

          {/* CTA Principal de Rolagem */}
          <button
            onClick={scrollToOffer}
            id="roll-to-offer-btn"
            className="btn-vibrate mt-8 w-full max-w-xs bg-[#10b981] hover:bg-[#059669] text-white py-4.5 px-6 rounded-2xl font-black text-xs sm:text-sm text-center transition-all duration-300 select-none cursor-pointer outline-none active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>QUERO GARANTIR O MANUAL AGORA</span>
            <ChevronRight className="w-4.5 h-4.5 stroke-[3]" />
          </button>

          {/* Imagens das Maçãs Lindas de Destaque */}
          <div className="grid grid-cols-2 gap-3.5 mt-8 w-full max-w-xs">
            <div className="overflow-hidden rounded-2xl shadow-xl border-2 border-red-500/20 bg-white aspect-[3/4]">
              <img
                src={macaVermelhaClassica}
                alt="Maçã do Amor Clássica Vermelha"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl border-2 border-red-500/20 bg-white aspect-[3/4]">
              <img
                src={macaVermelhaGourmet}
                alt="Maçã do Amor Gourmet Vermelha"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 3. CONEXÃO RÁPIDA COM A DOR (Layout de blocos escaneáveis) */}
        <section className="bg-slate-50 py-10 px-6">
          <div className="max-w-xs sm:max-w-sm mx-auto space-y-5">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">A Realidade que Você Enfrenta</h2>
            
            <div className="space-y-3.5">
              
              {/* Dor 1 */}
              <div className="bg-white border-l-4 border-red-500 p-4.5 rounded-r-xl rounded-l-xs shadow-xs">
                <p className="text-xs font-black text-red-600 uppercase tracking-wider mb-1">🚨 O nó no estômago</p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  Abrir a geladeira na quarta-feira à noite, ver que falta mistura e sentir a corda apertar no fim do mês.
                </p>
              </div>

              {/* Dor 2 */}
              <div className="bg-white border-l-4 border-red-500 p-4.5 rounded-r-xl rounded-l-xs shadow-xs">
                <p className="text-xs font-black text-red-600 uppercase tracking-wider mb-1">💸 A armadilha dos cursos caros</p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  Cursos de R$ 500 que exigem batedeiras planetárias e termômetros industriais que você não tem como comprar agora.
                </p>
              </div>

              {/* Dor 3 */}
              <div className="bg-white border-l-4 border-red-500 p-4.5 rounded-r-xl rounded-l-xs shadow-xs">
                <p className="text-xs font-black text-red-600 uppercase tracking-wider mb-1">🍂 O desperdício invisível</p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  Tentar receitas do YouTube, queimar o açúcar, ver a maçã melar no saquinho e perder o pouco dinheiro que restava em ingredientes.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 4. APRESENTAÇÃO DA SOLUÇÃO (O Mecanismo Único) */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-xs sm:max-w-sm mx-auto space-y-6">
            <div className="flex items-center gap-2 text-amber-600">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-600 shrink-0" />
              <h2 className="text-sm font-black uppercase tracking-wider">O Grande Segredo Está no Ponto de Vidro Inquebrável</h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
              O maior medo de quem tenta vender maçã do amor é a calda derreter e ficar grudenta. Nosso método foca na ciência simples por trás da calda: um truque caseiro que faz a cobertura ficar dura como vidro, garantindo aquele barulho crocante irresistível na primeira mordida.
            </p>

            {/* Destaque com Imagem Bonita */}
            <div className="border-2 border-dashed border-[#cc1111]/30 p-4 rounded-2xl bg-amber-50/10 space-y-4">
              <div className="overflow-hidden rounded-xl shadow-md aspect-square bg-white">
                <img
                  src={macaVermelhaEmbalagem}
                  alt="Maçã de vidro perfeita"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs sm:text-sm text-center font-bold text-gray-700 leading-relaxed">
                Ela não mela, mantém o brilho espelhado por dias e faz os clientes comprarem de caixas fechadas para festas.
              </p>
            </div>
          </div>
        </section>

        {/* 5. BENEFÍCIOS PRINCIPAIS (Lista Mobile-Friendly) */}
        <section className="bg-slate-50 py-12 px-6">
          <div className="max-w-xs sm:max-w-sm mx-auto space-y-8">
            <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight text-center">
              O Que Você Terá Acesso Imediato:
            </h2>

            <div className="space-y-4">
              
              {/* Benefício 1 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex gap-3.5 items-start">
                <div className="bg-purple-100 p-2.5 rounded-xl shrink-0 text-xl">🧪</div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">O Ponto de Vidro Sem Erro</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    A técnica exata para acertar a hora certa de tirar a calda do fogo sem precisar de termômetros caros.
                  </p>
                </div>
              </div>

              {/* Benefício 2 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex gap-3.5 items-start">
                <div className="bg-red-100 p-2.5 rounded-xl shrink-0 text-xl">🍏</div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">As 3 Maçãs Gourmet Premium</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Vá além do tradicional e aprenda os sabores que vendem 3x mais caro: Brigadeiro Belga, Caramelo Salgado e Trufada de Ninho com Nutella.
                  </p>
                </div>
              </div>

              {/* Benefício 3 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex gap-3.5 items-start">
                <div className="bg-amber-100 p-2.5 rounded-xl shrink-0 text-xl">📦</div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Blindagem contra Umidade</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    O segredo comercial de embalagem para a maçã durar dias sem suar ou amolecer, permitindo trabalhar com encomendas antecipadas.
                  </p>
                </div>
              </div>

              {/* 6. BÔNUS EXCLUSIVO INCLUSO */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border-2 border-emerald-500/20 shadow-xs flex gap-3.5 items-start mt-6">
                <div className="bg-emerald-100 p-2.5 rounded-xl shrink-0 text-xl">🎁</div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-emerald-900 leading-tight">BÔNUS EXCLUSIVO INCLUSO</h3>
                  <p className="text-xs sm:text-sm font-black text-emerald-800 leading-tight mt-1">O Script de Venda Rápida de 15 Minutos para WhatsApp</p>
                  <p className="text-xs text-emerald-700/80 leading-relaxed mt-1 font-medium">
                    O exato texto que você vai copiar e colar para mandar para amigas, vizinhas e comércios locais para vender suas primeiras 20 maçãs antes mesmo de começar a produzir.
                  </p>
                </div>
              </div>

              {/* Interactive Calculator Simulator to elevate interaction and trust */}
              <div className="pt-2">
                <ProfitCalculator />
              </div>

            </div>
          </div>
        </section>

        {/* 7. PROVA SOCIAL (WhatsApp Simulator with Silvana and Marcia) */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-xs sm:max-w-sm mx-auto space-y-6">
            <div className="text-center space-y-1.5">
              <h2 className="text-base sm:text-lg font-black text-gray-800 uppercase tracking-tight">Eles Testaram e Comprovaram:</h2>
              <p className="text-xs text-gray-400 font-medium">Conversas autênticas do WhatsApp de alunas reais:</p>
            </div>

            <WhatsAppChat chatData={mockChats} />
          </div>
        </section>

        {/* 8. ANCORAGEM E OFERTA DUPLA NO CHECKOUT */}
        <section id="oferta-detalhada" className="bg-[#5c1111] text-white py-14 px-6 border-t border-red-950/20">
          <div className="max-w-xs sm:max-w-sm mx-auto space-y-8">
            
            {/* Honest quote block */}
            <div className="space-y-4 text-center">
              <h2 className="text-sm font-black uppercase tracking-wider text-amber-400">Sendo brutalmente honesta: Por que custa tão barato?</h2>
              <p className="text-xs sm:text-sm text-red-50 leading-relaxed font-semibold">
                Eu sei que o mercado está cheio de cursos falsos que não te ajudam a pagar as contas na próxima segunda-feira. Eu decidi colocar um preço menor do que duas maçãs prontas para remover qualquer desculpa financeira e ganhar sua confiança para o futuro. É uma troca justa.
              </p>
              <div className="h-px bg-red-800/60 w-3/4 mx-auto my-2" />
              <p className="text-sm font-black text-white">Escolha a melhor opção para você começar hoje:</p>
            </div>

            {/* Offer Cards layout */}
            <div className="space-y-6">

              {/* [CARD OPÇÃO 1] - Acesso Essencial */}
              <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#a30b0b] bg-red-50 px-2 py-0.5 rounded-md">OPÇÃO 1</span>
                      <h3 className="text-base font-black text-gray-900 mt-1">Acesso Essencial</h3>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3]" />
                      <span>Manual Prático Calda de Vidro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3]" />
                      <span>Guia de Maçãs Clássicas</span>
                    </li>
                    <li className="flex items-center gap-2 font-semibold text-emerald-600">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3]" />
                      <span>Bônus: Script de WhatsApp de 15 Minutos</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                  <div className="leading-none text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Por apenas</p>
                    <p className="text-3xl font-black text-[#10b981]">R$ 9,99</p>
                  </div>

                  <button
                    onClick={() => setIsUpgradeModalOpen(true)}
                    className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-3.5 px-4 rounded-xl font-bold text-xs text-center border-b-2 border-emerald-700 transition active:scale-98 cursor-pointer shadow-md uppercase tracking-wider"
                  >
                    QUERO O ACESSO ESSENCIAL
                  </button>
                </div>
              </div>


              {/* [CARD OPÇÃO 2] - Combo Master Gourmet (Mais Vendido) */}
              <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-2xl border-4 border-[#efe23b] flex flex-col justify-between relative overflow-hidden">
                
                {/* Most popular ribbon */}
                <div className="absolute top-0 right-0 bg-[#efe23b] text-gray-900 font-black text-[9px] px-3.5 py-1 uppercase tracking-widest rounded-bl-xl">
                  Mais Vendido
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">OPÇÃO 2</span>
                      <h3 className="text-base font-black text-gray-900 mt-1">Combo Master Gourmet</h3>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                    <li className="flex items-center gap-2 text-gray-500 line-through text-[11px]">
                      <Check className="w-4 h-4 text-gray-400 shrink-0 stroke-[2]" />
                      <span>Tudo do Acesso Essencial</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
                      <span>Tudo do Acesso Essencial (Incluso)</span>
                    </li>
                    <li className="flex items-center gap-2 text-amber-700">
                      <Check className="w-4 h-4 text-amber-600 shrink-0 stroke-[3]" />
                      <span>+ O Guia Secreto de Caldas Coloridas</span>
                    </li>
                    <li className="flex items-center gap-2 text-violet-700">
                      <Check className="w-4 h-4 text-violet-600 shrink-0 stroke-[3]" />
                      <span>+ Planilha Automática de Precificação</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#cc1111]">
                      <Check className="w-4 h-4 text-[#cc1111] shrink-0 stroke-[3]" />
                      <span>+ Como vender Online</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#cc1111]">
                      <Check className="w-4 h-4 text-[#cc1111] shrink-0 stroke-[3]" />
                      <span>+ Como vender Presencial</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#cc1111]">
                      <Check className="w-4 h-4 text-[#cc1111] shrink-0 stroke-[3]" />
                      <span>+ Como vender no Whatsapp</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#cc1111]">
                      <Check className="w-4 h-4 text-[#cc1111] shrink-0 stroke-[3]" />
                      <span>+ Estratégias para Aumentar as Vendas</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#cc1111]">
                      <Check className="w-4 h-4 text-[#cc1111] shrink-0 stroke-[3]" />
                      <span>+ Venda por Encomenda</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#cc1111]">
                      <Check className="w-4 h-4 text-[#cc1111] shrink-0 stroke-[3]" />
                      <span>+ Dicas de Fidelização</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#cc1111]">
                      <Check className="w-4 h-4 text-[#cc1111] shrink-0 stroke-[3]" />
                      <span>+ Estratégias para Datas Comemorativas</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                  <div className="leading-none text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 line-through">De R$ 67,00 por apenas</p>
                    <p className="text-3xl font-black text-[#10b981]">R$ 24,90</p>
                  </div>

                  <button
                    onClick={openComboCheckout}
                    className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-4 px-4 rounded-xl font-black text-xs text-center border-b-2 border-emerald-700 transition active:scale-98 cursor-pointer shadow-md uppercase tracking-wider btn-vibrate"
                  >
                    QUERO O COMBO MASTER COM 62% DE DESCONTO
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 9. FAQ (Quebra de Objeções) */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-xs sm:max-w-sm mx-auto space-y-6">
            
            <div className="text-center space-y-1 select-none">
              <h2 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight">Dúvidas Frequentes</h2>
              <p className="text-xs text-slate-400 font-medium">Toque para ver a resposta das suas dúvidas:</p>
            </div>

            <div className="space-y-3.5">
              
              {/* FAQ 1 */}
              <div className="border border-gray-150 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleFaq(0)}
                  className="w-full py-4 px-5 bg-slate-50 hover:bg-slate-100/50 transition font-bold text-xs sm:text-sm text-left text-slate-800 flex justify-between items-center outline-none cursor-pointer"
                >
                  <span>Preciso de termômetro ou batedeira?</span>
                  <ChevronRight className={`w-4.5 h-4.5 text-gray-400 transition-transform duration-300 ${activeFaq === 0 ? 'rotate-90' : 'rotate-0'}`} />
                </button>
                {activeFaq === 0 && (
                  <div className="p-5 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Não. Você só precisa de uma panela comum, fogão e os ingredientes básicos que você já tem na cozinha.
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="border border-gray-150 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleFaq(1)}
                  className="w-full py-4 px-5 bg-slate-50 hover:bg-slate-100/50 transition font-bold text-xs sm:text-sm text-left text-slate-800 flex justify-between items-center outline-none cursor-pointer"
                >
                  <span>Como eu recebo o material?</span>
                  <ChevronRight className={`w-4.5 h-4.5 text-gray-400 transition-transform duration-300 ${activeFaq === 1 ? 'rotate-90' : 'rotate-0'}`} />
                </button>
                {activeFaq === 1 && (
                  <div className="p-5 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-500 leading-relaxed">
                    O acesso é imediato. Assim que o pagamento for aprovado, você recebe o link de download direto no seu e-mail e WhatsApp.
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="border border-gray-150 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleFaq(2)}
                  className="w-full py-4 px-5 bg-slate-50 hover:bg-slate-100/50 transition font-bold text-xs sm:text-sm text-left text-slate-800 flex justify-between items-center outline-none cursor-pointer"
                >
                  <span>Nunca fiz doces, vou conseguir?</span>
                  <ChevronRight className={`w-4.5 h-4.5 text-gray-400 transition-transform duration-300 ${activeFaq === 2 ? 'rotate-90' : 'rotate-0'}`} />
                </button>
                {activeFaq === 2 && (
                  <div className="p-5 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Sim, o passo a passo foi desenhado para quem nunca acendeu o fogo para fazer um caramelo. É impossível errar se seguir o tempo do manual.
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* 10. GARANTIA BLINDADA DE RISCO ZERO */}
        <section className="bg-slate-50 py-12 px-6 border-t border-gray-150">
          <div className="max-w-xs sm:max-w-sm mx-auto space-y-4 text-center">
            <div className="inline-block p-3 bg-emerald-100 rounded-full text-emerald-600 mb-1">
              <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
            </div>
            
            <h3 className="text-base font-black text-slate-950 uppercase tracking-tight">Garantia Blindada de Risco Zero</h3>
            
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
              "Garantia Incondicional de 7 Dias: Se em até 7 dias você ler o material e achar que não valeu a pena, basta me enviar um único e-mail. Eu devolvo cada centavo dos seus R$ 9,99 ou R$ 24,90 imediatamente. Sem perguntas e sem burocracia. O risco é todo meu."
            </p>

            <div className="pt-6 border-t border-gray-200 flex items-center justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest select-none">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra Segura</span>
              </span>
              <span>•</span>
              <span>Aprovado Imediato</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-500 py-8 px-5 text-center text-[10px] flex flex-col items-center gap-1">
          <p className="font-bold text-slate-400">Guia Prático da Maçã de Vidro © 2026</p>
          <p>Todos os direitos reservados.</p>
        </footer>

      </div>

      {/* Upgrade High-Converting Pop-up Modal */}
      <UpgradeModal 
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={openUpgradeDiscountCheckout}
        onDecline={() => {
          setIsUpgradeModalOpen(false);
          openEssencialCheckout();
        }}
      />
    </div>
  );
}
