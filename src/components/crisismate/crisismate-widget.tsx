"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Mic, Pause, Play, Send, Volume2, X, Zap } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
};

// Custom Robot Icon Component - Friendly Robot Design
const RobotIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="12" cy="8" rx="6" ry="5" fill="currentColor" />
    <ellipse cx="12" cy="16" rx="5" ry="4" fill="currentColor" />
    <rect x="7" y="6" width="10" height="2" rx="1" fill="#1f2937" />
    <circle cx="9" cy="7" r="1" fill="white" />
    <circle cx="15" cy="7" r="1" fill="white" />
    <path d="M9 9 Q12 11 15 9" stroke="white" strokeWidth="1" fill="none" />
    <line x1="12" y1="3" x2="12" y2="5" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="2.5" r="0.5" fill="currentColor" />
    <ellipse cx="6" cy="14" rx="1.5" ry="3" fill="#1f2937" />
    <ellipse cx="18" cy="14" rx="1.5" ry="3" fill="#1f2937" />
    <ellipse cx="5" cy="16" rx="1" ry="1.5" fill="#1f2937" />
    <ellipse cx="19" cy="16" rx="1" ry="1.5" fill="#1f2937" />
    <circle cx="12" cy="16" r="2" fill="white" />
  </svg>
);

const safeAdviceByTopic: Record<string, string[]> = {
  earthquake: [
    "Drop, cover, and hold on. Stay away from windows and heavy objects.",
    "If outdoors, move to an open area away from buildings and power lines.",
    "After shaking stops, check for injuries and turn off gas if you smell a leak.",
  ],
  flood: [
    "Move to higher ground immediately. Avoid walking or driving through flood water.",
    "Disconnect electrical appliances if safe. Do not touch electrical equipment if wet.",
    "Carry essential items: ID, water, medications, flashlight, and a power bank.",
  ],
  fire: [
    "Stay low under smoke, cover nose and mouth with cloth, and evacuate quickly.",
    "Feel doors with the back of your hand; if hot, use an alternate route.",
    "Call emergency services once safe; do not re-enter the building.",
  ],
  cyclone: [
    "Secure windows and doors. Stay in an interior room away from glass.",
    "Keep battery-powered lights and a radio. Avoid using corded electronics.",
    "Do not go outside until authorities declare it safe.",
  ],
  heatwave: [
    "Hydrate frequently, avoid strenuous activity, and stay in cool shaded places.",
    "Check on elderly neighbors and never leave children or pets in vehicles.",
    "Use damp cloths on wrists/neck; seek medical help if heat stroke signs appear.",
  ],
  mental: [
    "You are not alone. Focus on slow breaths: inhale 4s, hold 4s, exhale 6s.",
    "Text or call a trusted person. Share your location if you feel unsafe.",
    "If you have thoughts of self-harm, contact your local emergency number now.",
  ],
};

function generateAssistantReply(input: string): string {
  const text = input.toLowerCase();
  const sections: string[] = [];
  if (/(earthquake|tremor|shake)/.test(text)) sections.push(...safeAdviceByTopic.earthquake);
  if (/(flood|water|inundat)/.test(text)) sections.push(...safeAdviceByTopic.flood);
  if (/(fire|smoke|burn)/.test(text)) sections.push(...safeAdviceByTopic.fire);
  if (/(cyclone|hurricane|typhoon|storm|wind)/.test(text)) sections.push(...safeAdviceByTopic.cyclone);
  if (/(heat|hot|heatwave)/.test(text)) sections.push(...safeAdviceByTopic.heatwave);
  if (/(anx|panic|stress|fear|scared|help me calm)/.test(text)) sections.push(...safeAdviceByTopic.mental);

  if (sections.length === 0) {
    sections.push(
      "I'm CrisisMate. Tell me where you are and what you see. I can give step-by-step safety guidance for earthquakes, floods, fires, cyclones, heatwaves, and more.",
      "If you are in immediate danger, call your local emergency number now.",
    );
  }

  return sections.slice(0, 3).join(" \n\n");
}

export default function CrisisMateWidget() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm CrisisMate. I'm here with you. Describe your situation or type a disaster like 'earthquake in Delhi' and I'll guide you. I can also read messages aloud.",
      timestamp: Date.now(),
    },
  ]);
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const lastAssistantText = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === "assistant") return messages[i].text;
    }
    return "";
  }, [messages]);

  function speak(text: string) {
    if (!synthRef.current) return;
    if (synthRef.current.speaking) synthRef.current.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1.0;
    u.volume = 1.0;
    utteranceRef.current = u;
    setSpeaking(true);
    u.onend = () => setSpeaking(false);
    synthRef.current.speak(u);
  }

  function toggleSpeech() {
    const synth = synthRef.current;
    if (!synth) return;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
    } else if (lastAssistantText) {
      speak(lastAssistantText);
    }
  }

  function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: content, timestamp: Date.now() };
    const reply = generateAssistantReply(content);
    const botMsg: ChatMessage = { id: crypto.randomUUID(), role: "assistant", text: reply, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    speak(reply);
  }

  return (
    <div className="fixed right-5 bottom-5 z-[9999]">
      {/* Tooltip */}
      {showTooltip && !open && (
        <div 
          className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg border border-gray-700"
        >
          <div className="text-center">
            <div className="font-medium mb-1">Ask CrisisMate for help!</div>
            <div className="text-xs text-gray-300 mb-1">Quickly troubleshoot and resolve issues.</div>
            <div className="text-xs text-gray-300">Easily check emergency guidance.</div>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {/* Floating button */}
      <button
        aria-label="Open CrisisMate"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-red-500"
        style={{
          minWidth: "200px",
          height: "56px",
        }}
      >
        <div className="relative">
          <RobotIcon className="h-8 w-8 text-white" />
          <Zap className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
          {!open && (
            <div className="absolute -top-8 -left-2 w-6 h-4 bg-white rounded-full opacity-80 animate-pulse">
              <div className="absolute bottom-0 left-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white"></div>
            </div>
          )}
        </div>
        <span className="font-medium text-sm">CrisisMate Virtual Assistant</span>
      </button>

      {/* Popup panel */}
      <div
        className={`pointer-events-auto mt-3 w-[380px] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        role="dialog"
        aria-label="CrisisMate Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gradient-to-r from-red-600 to-red-700 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <RobotIcon className="h-8 w-8 text-white" />
              <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">CrisisMate</div>
              <div className="text-xs text-red-100">Your disaster safety companion</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-red-800 text-white transition-colors" 
              onClick={toggleSpeech}
            >
              {speaking ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button 
              className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-red-800 text-white transition-colors" 
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="max-h-[360px] overflow-y-auto px-4 py-3 space-y-3 bg-gray-900">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}> 
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user" 
                    ? "bg-red-600 text-white" 
                    : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick suggestions */}
        <div className="px-4 pb-2 flex flex-wrap gap-2 bg-gray-900">
          {[
            "Earthquake now",
            "Flood in my area", 
            "There's a fire",
            "Cyclone advice",
            "I feel anxious",
          ].map((s) => (
            <button
              key={s}
              className="text-xs px-3 py-1 rounded-full border border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
              onClick={() => handleSend(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Composer */}
        <div className="flex items-center gap-2 p-3 border-t border-gray-700 bg-gray-800 rounded-b-xl">
          <input
            type="text"
            placeholder="Describe your situation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 h-10 px-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button 
            className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors" 
            onClick={() => handleSend()}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}