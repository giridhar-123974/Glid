'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Video, 
  Phone, 
  ShieldCheck, 
  CheckCheck, 
  Image as ImageIcon, 
  FileText, 
  Smile, 
  MoreVertical,
  Lock,
  Sparkles,
  Play,
  Pause,
  X,
  Maximize2
} from 'lucide-react';
import { Professional } from '@/types';

interface Message {
  id: string;
  sender: 'client' | 'pro';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'voice' | 'file';
  fileMeta?: { name: string; size: string };
  audioDuration?: string;
}

export default function RealtimeChatWindow({
  professional,
  onClose
}: {
  professional: Professional;
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'pro',
      text: `Hello! I'm available for your ${professional.subcategory} project in ${professional.cityArea}. I reviewed your scope requirements.`,
      time: '11:42 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      sender: 'client',
      text: 'Great! Can you provide 4K deliverables and start tomorrow morning?',
      time: '11:45 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      sender: 'pro',
      text: 'Voice note briefing on gear & timeline:',
      time: '11:46 AM',
      status: 'read',
      type: 'voice',
      audioDuration: '0:42'
    },
    {
      id: '4',
      sender: 'pro',
      text: 'Yes, absolutely! I will bring the full kit. Milestone funds will stay safely in your Escrow.',
      time: '11:47 AM',
      status: 'read',
      type: 'text'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);

  const quickReplies = [
    "Let's proceed with Escrow booking",
    "Can you share your portfolio link?",
    "Can you start at 10 AM tomorrow?",
    "Deliverables approved, releasing payment"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'client',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'text'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulate Pro Typing & Reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const proReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'pro',
        text: `Got it! I am ready. You can fund the ₹${(professional.hourlyRateINR * 4).toLocaleString()} milestone via Escrow to lock the calendar slot.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        type: 'text'
      };
      setMessages(prev => [...prev, proReply]);
    }, 1500);
  };

  return (
    <div className="w-full bg-white rounded-[20px] border border-[#E8EBF0] shadow-2xl flex flex-col h-[580px] overflow-hidden font-sans relative">
      
      {/* Video Call Modal Overlay */}
      {isVideoCallActive && (
        <div className="absolute inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={professional.avatarUrl} alt={professional.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{professional.name} (HD 1080p)</h4>
                <span className="text-[10px] text-[#16A34A] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  Encrypted Peer-to-Peer Video Call
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsVideoCallActive(false)}
              className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold"
            >
              End Call
            </button>
          </div>

          {/* Video Stream Placeholder */}
          <div className="flex-1 flex items-center justify-center relative my-4 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={professional.avatarUrl} alt="Video Stream" className="w-48 h-48 rounded-full object-cover border-4 border-[#FF6B00] shadow-2xl animate-pulse" />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-2">
              <Lock className="w-3 h-3 text-[#16A34A]" />
              <span>Escrow Protected Project Discussion</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="p-4 border-b border-[#E8EBF0] bg-[#F8F9FB] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={professional.avatarUrl} alt={professional.name} className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-1.5 ring-white" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#0F172A] flex items-center gap-1">
              {professional.name}
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            </h4>
            <span className="text-[11px] text-[#64748B]">
              Online • Trust Score {professional.trustScore}% • 📍 {professional.cityArea}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsVideoCallActive(true)}
            className="p-2 rounded-xl bg-white hover:bg-orange-50 text-[#FF6B00] border border-[#E8EBF0] transition-colors"
            title="Start HD Video Call"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert(`Calling ${professional.name} on verified GLID relay phone...`)}
            className="p-2 rounded-xl bg-white hover:bg-emerald-50 text-[#16A34A] border border-[#E8EBF0] transition-colors"
            title="Secure Phone Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {messages.map((msg) => {
          const isMe = msg.sender === 'client';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-md p-3.5 rounded-[18px] text-xs font-medium ${
                  isMe
                    ? 'bg-[#0F172A] text-white rounded-br-xs'
                    : 'bg-[#F8F9FB] text-[#0F172A] border border-[#E8EBF0] rounded-bl-xs'
                }`}
              >
                {msg.type === 'text' && <p className="leading-relaxed">{msg.text}</p>}

                {msg.type === 'voice' && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-gray-500">{msg.text}</p>
                    <div className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-gray-200">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-7 h-7 rounded-full bg-[#FF6B00] text-white flex items-center justify-center"
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-[#FF6B00] ${isPlayingAudio ? 'w-2/3 animate-pulse' : 'w-1/4'}`} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-600">{msg.audioDuration}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-[10px] text-gray-400 px-1">
                <span>{msg.time}</span>
                {isMe && <CheckCheck className="w-3 h-3 text-[#16A34A]" />}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-1 text-xs text-gray-400 italic">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce delay-200" />
            <span>{professional.name} is typing...</span>
          </div>
        )}
      </div>

      {/* Quick AI Suggestions */}
      <div className="px-4 py-2 bg-[#F8F9FB] border-t border-[#E8EBF0] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-[#FF6B00] flex-shrink-0" />
        {quickReplies.map((qr, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qr)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-orange-50 border border-[#E8EBF0] hover:border-orange-300 text-[11px] font-semibold text-[#0F172A] whitespace-nowrap transition-colors"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Bottom Message Input Bar */}
      <div className="p-3 border-t border-[#E8EBF0] bg-white flex items-center gap-2">
        <button
          onClick={() => alert("Attaching project requirements PDF...")}
          className="p-2 text-gray-400 hover:text-[#0F172A] rounded-xl hover:bg-[#F8F9FB]"
          title="Attach Files"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message or discuss milestone deliverables..."
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#FF6B00] focus:bg-white"
        />

        <button
          onClick={() => handleSendMessage()}
          className="btn-primary p-2.5 text-xs font-bold rounded-xl shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
