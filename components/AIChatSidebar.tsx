"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, ChevronRight, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What's our conversion rate this month?",
  "Which VA is performing best?",
  "Which source brings the most leads?",
  "How many leads are in nurture?",
  "What's the estimated monthly revenue?",
];

export default function AIChatSidebar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your CRM AI assistant. Ask me anything about your leads, VA performance, conversions, or revenue. 🧹",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput("");
    setError("");
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Something went wrong.");
        setMessages(prev => prev.slice(0, -1));
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Network error. Check your connection.");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl text-white font-semibold text-sm shadow-modal transition-all duration-200 active:scale-95"
        style={{ background: open ? "#1E1E2E" : "#F97316" }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "#EA6C0A"; }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "#F97316"; }}
      >
        {open ? <X size={16} /> : <><Sparkles size={15} /> Ask AI</>}
      </button>

      {/* Sidebar panel */}
      <div
        className="fixed top-0 right-0 h-full z-30 flex flex-col bg-white shadow-modal border-l border-gray-100 transition-all duration-300"
        style={{
          width: open ? 380 : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="p-2 rounded-xl" style={{ background: "#FFF7ED" }}>
            <Sparkles size={16} style={{ color: "#F97316" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold font-display text-gray-900">CRM AI Assistant</p>
            <p className="text-[11px] text-gray-400">Powered by Claude Haiku</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: m.role === "assistant" ? "#FFF7ED" : "#1E1E2E" }}
              >
                {m.role === "assistant"
                  ? <Bot size={14} style={{ color: "#F97316" }} />
                  : <User size={14} className="text-white" />}
              </div>

              {/* Bubble */}
              <div
                className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: m.role === "assistant" ? "#F9FAFB" : "#F97316",
                  color: m.role === "assistant" ? "#374151" : "#fff",
                  borderBottomLeftRadius: m.role === "assistant" ? 4 : undefined,
                  borderBottomRightRadius: m.role === "user" ? 4 : undefined,
                }}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Loading bubble */}
          {loading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FFF7ED" }}>
                <Bot size={14} style={{ color: "#F97316" }} />
              </div>
              <div className="px-3.5 py-2.5 rounded-2xl bg-gray-100 flex items-center gap-1.5" style={{ borderBottomLeftRadius: 4 }}>
                <Loader2 size={13} className="animate-spin text-orange-400" />
                <span className="text-xs text-gray-400">Thinking…</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mx-1 px-3 py-2 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs text-red-600">{error}</p>
              {error.includes("ANTHROPIC_API_KEY") && (
                <p className="text-[10px] text-red-400 mt-1">
                  Add your key to <code className="bg-red-100 px-1 rounded">.env.local</code> and restart the server.
                </p>
              )}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && !loading && (
          <div className="px-4 pb-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Try asking…</p>
            <div className="flex flex-col gap-1.5">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 text-left transition-colors group"
                >
                  <ChevronRight size={11} className="text-gray-300 group-hover:text-orange-400 transition-colors shrink-0" />
                  <span className="text-[11px] text-gray-600 group-hover:text-gray-800">{s}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 shrink-0">
          <div className="flex items-end gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-3 py-2 focus-within:border-orange-300 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder="Ask about your leads or revenue…"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none max-h-24"
              style={{ lineHeight: "1.5" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="p-1.5 rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-40"
              style={{ background: input.trim() && !loading ? "#F97316" : "#E5E7EB" }}
            >
              <Send size={13} className={input.trim() && !loading ? "text-white" : "text-gray-400"} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-1.5">Press Enter to send · Shift+Enter for newline</p>
        </div>
      </div>
    </>
  );
}
