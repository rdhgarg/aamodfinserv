import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useServerFn } from "@tanstack/react-start";
import { sendChatMessage } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

const WA_NUMBER = "919784009748";
const WA_TEXT = encodeURIComponent(
  "Hi Aamod Finserv, I'd like to know more about your services."
);

export function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Aamod Assistant 👋 Ask me about loans, project funding, government subsidies, or the EMI calculator.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const send = useServerFn(sendChatMessage);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({
        data: { messages: next.slice(-12) },
      });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please call +91 97840 09748 or email admin1@aamodfinserv.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-scale-in sm:right-6">
          <header className="flex items-center justify-between gap-2 bg-brand-navy px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Aamod Assistant</p>
              <p className="text-xs text-white/70">Typically replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </header>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-background border border-border text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.role === "user" ? (
                    m.content
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-headings:font-semibold prose-strong:text-foreground prose-a:text-primary">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-background p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              disabled={loading}
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="border-t border-border bg-muted/40 px-4 py-1.5 text-center text-[10px] text-muted-foreground">
            AI assistant • For quotes call +91 97840 09748
          </p>
        </div>
      )}

      {/* Floating action buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden>
            <path d="M19.11 17.51c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.11 2.82.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.02 4.6c-6.3 0-11.41 5.11-11.41 11.4 0 2.02.53 3.99 1.53 5.73L4.5 27.5l5.94-1.56a11.39 11.39 0 0 0 5.58 1.43h.01c6.29 0 11.4-5.11 11.4-11.4 0-3.05-1.19-5.91-3.34-8.07a11.34 11.34 0 0 0-8.07-3.3zm0 20.86h-.01a9.45 9.45 0 0 1-4.82-1.32l-.34-.21-3.52.92.94-3.43-.22-.35a9.47 9.47 0 0 1-1.45-5.07c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.78a9.44 9.44 0 0 1 2.78 6.72c0 5.23-4.26 9.49-9.49 9.49z" />
          </svg>
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Open chat"}
          aria-expanded={open}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg shadow-black/20 transition-transform hover:scale-110"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}