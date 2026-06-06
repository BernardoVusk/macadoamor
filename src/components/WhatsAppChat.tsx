import React, { useState, useEffect } from 'react';
import { Phone, Video, ArrowLeft, CheckCheck, Smile, Send, Paperclip, Camera, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TestimonialChat } from '../types';

interface WhatsAppChatProps {
  chatData: TestimonialChat[];
}

export default function WhatsAppChat({ chatData }: WhatsAppChatProps) {
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeChat = chatData[activeChatIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveChatIndex((prev) => (prev + 1) % chatData.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [activeChatIndex, isPaused, chatData.length]);

  return (
    <div 
      className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden" 
      id="wa-mockup"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Tab Switcher */}
      <div className="flex bg-gray-50 border-b border-gray-100 p-2 overflow-x-auto gap-2 no-scrollbar">
        {chatData.map((chat, idx) => (
          <button
            key={chat.studentName}
            id={`tab-aluna-${idx}`}
            onClick={() => setActiveChatIndex(idx)}
            className={`flex flex-col items-stretch px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap outline-none cursor-pointer relative overflow-hidden ${
              activeChatIndex === idx
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <img
                src={chat.avatarUrl}
                alt={chat.studentName}
                className="w-6 h-6 rounded-full object-cover border border-emerald-100"
                referrerPolicy="no-referrer"
              />
              <span>{chat.studentName}</span>
            </div>
            
            {/* Elegant visual timer progress bar for the active tab */}
            {activeChatIndex === idx && !isPaused && (
              <motion.div 
                className="absolute bottom-0 left-0 h-[3px] bg-white opacity-60"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6.5, ease: 'linear' }}
                key={`progress-${idx}`}
              />
            )}
            {activeChatIndex === idx && isPaused && (
              <div className="absolute bottom-0 left-0 h-[3px] bg-white/40 w-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* WhatsApp App Container */}
      <div className="relative bg-[#efeae2] flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-[#f0f2f5] px-4 py-3 border-b border-gray-200 z-10 shadow-sm shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 cursor-pointer mr-1">
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div className="relative">
              <img
                src={activeChat.avatarUrl}
                alt={activeChat.studentName}
                style={{ contentVisibility: 'auto' }}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 leading-tight">{activeChat.studentName}</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
                <span>{activeChat.studentStatus}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-blue-500">
            <button className="hover:bg-gray-200/60 p-2 rounded-full transition cursor-pointer">
              <Video className="w-5 h-5 fill-none" />
            </button>
            <button className="hover:bg-gray-200/60 p-2 rounded-full transition cursor-pointer">
              <Phone className="w-5 h-5 fill-none" />
            </button>
          </div>
        </div>

        {/* Chat Message Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[radial-gradient(#dfdcd6_1px,transparent_1px)] [background-size:16px_16px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChatIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {activeChat.messages.map((msg) => {
                const isSelf = msg.isSelf;
                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm relative ${
                        isSelf
                          ? 'bg-[#d9fdd3] text-[#303030] rounded-tr-none'
                          : 'bg-white text-[#303030] rounded-tl-none'
                      }`}
                    >
                      {/* Message Image */}
                      {msg.photo && (
                        <div className="mb-2 overflow-hidden rounded-xl bg-gray-100 max-h-56">
                          <img
                            src={msg.photo}
                            alt="Foto enviada"
                            className="w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Text content with break word support */}
                      <p className="whitespace-pre-line leading-relaxed pr-8">{msg.text}</p>

                      {/* Right aligned Timestamp inside bubble */}
                      <div className="absolute bottom-1 right-2 flex items-center gap-0.5 text-[10px] text-gray-500 select-none">
                        <span>{msg.timestamp}</span>
                        {isSelf && (
                          <CheckCheck className="w-3.5 h-3.5 text-blue-500 ml-0.5 stroke-[2.5]" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fake Input Container for high realistic immersion */}
        <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-gray-200 shrink-0">
          <button className="text-gray-500 hover:text-gray-700 p-1.5 cursor-pointer">
            <Smile className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1.5 cursor-pointer">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 bg-white rounded-lg px-3 py-2 text-xs text-gray-400 select-none border border-gray-200 flex items-center justify-between">
            <span>Mensagem</span>
            <span className="text-gray-300">|</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 p-1.5 cursor-pointer">
            <Camera className="w-5 h-5" />
          </button>
          <button className="bg-emerald-600 text-white rounded-full p-2 hover:bg-emerald-700 transition shadow-sm scroll-smooth cursor-pointer">
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
