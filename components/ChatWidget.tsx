"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import Link from "next/link";

const SYSTEM_PROMPT = `Bakery & Beverages Chatbot – System Prompt

Vai trò: Trợ lý của tiệm bánh & đồ uống.
Mục tiêu: Trả lời NGẮN GỌN, ĐÚNG TRỌNG TÂM, CHÍNH XÁC về sản phẩm/đặt hàng/thông tin cửa hàng.

Quy tắc trả lời:
- Lịch sự, thân thiện. Bắt đầu trả lời trực tiếp câu hỏi.
- Độ dài: 1–3 câu hoặc tối đa 5 gạch đầu dòng. Tránh lặp lại/lan man.
- Chỉ trong phạm vi: bánh ngọt/bánh mì/donut/croissant/pizza mini; đồ uống (cà phê, trà, sinh tố…); giờ mở cửa, địa chỉ, liên hệ; đặt hàng cơ bản; bảo quản; dị ứng (trứng, sữa, bơ, gluten…). Nếu không chắc, đề nghị làm rõ.
- Link nội bộ: chỉ chèn khi RẤT liên quan, để ở cuối câu trong ngoặc. Ví dụ: (Xem tại /menu/bread).
- KHÔNG dùng emoji/ký tự trang trí; chỉ plain text, dấu câu thông dụng.
- Luôn trả lời đúng NGÔN NGỮ của tin nhắn người dùng.
- Tuyệt đối không hiển thị suy luận (ví dụ <think>, <analysis>, <reflection>); chỉ xuất câu trả lời cuối.

Định dạng:
- Plain text (không Markdown/HTML, không bảng, không code block, không ký tự như | * _ \` # >).
- Nếu liệt kê, dùng "- " và tối đa 5 mục.
`;

const DEFAULT_TEMP = 0.2;
const DEFAULT_TOP_P = 0.9;
const DEFAULT_MAX_TOKENS = 256;

type Sender = "bot" | "user";

interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
}

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function extractInternalLinks(text: string): string[] {
  const links = new Set<string>();
  const regex = /(\(|\b)(\/[a-zA-Z0-9\-_/?.=&%#]+)(\)|\b)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const path = match[2].replace(/[).,;!?]+$/, "");
    if (path.startsWith("/")) links.add(path);
  }
  return Array.from(links);
}

function toTitleCase(input: string): string {
  return input
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function labelForLink(path: string): string {
  const clean = path.split("?")[0];
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "menu") {
    if (parts[1]) return `Xem ${toTitleCase(parts[1].replace(/-/g, " "))}`;
    return "Xem Menu";
  }
  return `Mở ${clean}`;
}

const MENU_KEYWORDS = ["menu", "thực đơn", "món", "sản phẩm", "xem menu", "danh mục"];
const SLUG_SYNONYMS: Record<string, string[]> = {
  bread: ["bread", "bánh mì", "bánh mi", "bánh"],
  brunch: ["brunch"],
  cake: ["cake", "bánh kem", "bánh ngọt", "bánh sinh nhật", "bánh gato"],
  cookies: ["cookies", "cookie", "bánh quy"],
  dessert: ["dessert", "tráng miệng"],
  macaroon: ["macaroon", "macaron", "macarons"],
  beverages: ["beverages", "đồ uống", "nuoc uong", "nước uống", "cà phê", "ca phe", "trà", "tra", "coffee", "tea", "sinh tố", "sinh to"],
};

function userMentionsPath(path: string, userTextRaw: string): boolean {
  const userText = (userTextRaw || "").toLowerCase();
  const clean = path.split("?")[0];
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return false;
  if (parts[0] === "menu" && parts.length === 1) {
    return MENU_KEYWORDS.some((k) => userText.includes(k));
  }
  if (parts[0] === "menu" && parts[1]) {
    const slug = parts[1];
    const keys = SLUG_SYNONYMS[slug] || [slug];
    return keys.some((k) => userText.includes(k));
  }
  return false;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [mobileKbdLocked, setMobileKbdLocked] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [streamBuffer, setStreamBuffer] = useState<string>("");

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { id: createId(), sender: "bot", text: "Xin chào! Tôi có thể gợi ý món phù hợp cho bạn hôm nay không?" },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.sender !== "bot") return;
    const prefersDesktop = typeof window !== "undefined" && window.matchMedia('(min-width: 768px)').matches;
    const el = prefersDesktop ? desktopScrollRef.current : mobileScrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Toggle a global class on <body> so other UI (e.g., floating cart) can react
  useEffect(() => {
    if (typeof document === "undefined") return;
    const className = "chat-open";
    document.body.classList.toggle(className, open);
    // Lock page scroll when chat is open (mobile UX)
    const previousOverflow = document.documentElement.style.overflow;
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = previousOverflow;
    }
    return () => {
      document.body.classList.remove(className);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  // Do not autofocus on open (as requested)

  // When opening on small screens, keep input readOnly until user taps it
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
    setMobileKbdLocked(open && isMobileViewport);
  }, [open]);

  const unlockMobileInputImmediate = () => {
    if (!mobileKbdLocked) return;
    // Remove the readonly attribute synchronously and focus within the same gesture
    if (inputRef.current) {
      try {
        (inputRef.current as HTMLInputElement).readOnly = false;
        inputRef.current.focus();
      } catch {}
    }
    setMobileKbdLocked(false);
  };

  function sanitizeReply(raw: string): string {
    if (!raw) return "";
    let s = String(raw);
    // Extract JSON { "response": "..." } if present
    try {
      const jsonMatch = s.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed && typeof parsed.response === "string") return parsed.response.trim();
        if (parsed && typeof parsed.message === "string") return parsed.message.trim();
      }
    } catch {}

    // Remove special control tokens like <|...|>
    s = s.replace(/<\|.*?\|>/g, "");
    // Strip markdown punctuation that often creates noise when LLM ignores instruction
    s = s.replace(/[|*_`#>]+/g, "");
    // Remove leading meta-lines (commentary, to=assistant, channel markers)
    s = s
      .split(/\r?\n/)
      .filter((line) => !/(^\s*to=\w+)|(^\s*commentary\b)|(^\s*channel\b)|(^\s*analysis\b)|\|channel\|/i.test(line))
      .join("\n");
    // Convert simple HTML line breaks to newlines
    s = s.replace(/<br\s*\/?>(\s*)/gi, "\n");
    // Trim excessive blank lines
    s = s.replace(/\n{3,}/g, "\n\n").trim();

    // Remove chain-of-thought or reasoning tags/blocks if model emits them
    // Remove complete blocks
    s = s.replace(/<think[^>]*>[\s\S]*?<\/think>/gi, "");
    s = s.replace(/<analysis[^>]*>[\s\S]*?<\/analysis>/gi, "");
    s = s.replace(/<reflection[^>]*>[\s\S]*?<\/reflection>/gi, "");
    // Also remove partial blocks during streaming (from tag to end when no closing yet)
    s = s.replace(/<think[^>]*>[\s\S]*$/gi, "");
    s = s.replace(/<analysis[^>]*>[\s\S]*$/gi, "");
    s = s.replace(/<reflection[^>]*>[\s\S]*$/gi, "");
    s = s.replace(/<\/?(think|analysis|reflection)[^>]*>/gi, "");

    // Normalize punctuation and remove emojis/zero-width/decorative symbols
    s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/[–—―]/g, "-");
    s = s.replace(/[•▪◦·]/g, "- ");
    s = s.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, ""); // zero-width & bidi controls
    try {
      s = s.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, ""); // emojis
    } catch {}

    // Collapse repeated punctuation
    s = s.replace(/([!?.])\1{1,}/g, "$1");

    // Remove boilerplate disclaimers often produced by small models
    s = s.replace(/\b(Là một AI|Với tư cách là một AI)[^.]*\./gi, "");
    s = s.replace(/\b(Tôi không thể cung cấp|Tôi không có khả năng)[^.]*\./gi, "");

    // Limit bullet items to 5
    const lines = s.split(/\r?\n/);
    let bulletCount = 0;
    const limited = lines.filter((line) => {
      if (/^\s*-\s+/.test(line)) {
        if (bulletCount >= 5) return false;
        bulletCount += 1;
      }
      return true;
    });

    // Dedupe exact duplicate lines
    const seen = new Set<string>();
    const deduped = limited.filter((line) => {
      const key = line.trim();
      if (!key) return true;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    s = deduped.join("\n").trim();

    // Cap total lines and characters to reduce rambling
    const maxLines = 8;
    const outLines = s.split(/\r?\n/).slice(0, maxLines);
    s = outLines.join("\n");
    const maxChars = 700;
    if (s.length > maxChars) {
      const cut = s.slice(0, maxChars);
      const lastPunct = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("\n"), cut.lastIndexOf("; "));
      s = (lastPunct > 200 ? cut.slice(0, lastPunct + 1) : cut).trim();
    }
    return s;
  }

  function detectLanguage(text: string): "vi" | "en" | "other" {
    const t = (text || "").toLowerCase();
    // Vietnamese-specific letters
    if (/[ăâêôơưđ]/i.test(t) || /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(t)) return "vi";
    // Basic English heuristic
    if (/[a-z]/i.test(t) && /(\bthe\b|\band\b|\bis\b|\bare\b|\bwhat\b|\bhow\b|\bprice\b|\bplease\b|\bthanks\b)/i.test(t)) return "en";
    return /[a-z]/i.test(t) ? "en" : "other";
  }

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: createId(), sender: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setIsReplying(true);
    setStreamBuffer("");
    try {
      const userLang = detectLanguage(userMsg.text);
      const langInstruction =
        userLang === "vi"
          ? "Hãy trả lời hoàn toàn bằng tiếng Việt."
          : userLang === "en"
          ? "Answer strictly in English."
          : "Reply strictly in the same language as the user's last message.";

      const payloadMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: langInstruction },
        {
          role: "system",
          content:
            "Chỉ chèn link nội bộ khi RẤT liên quan: ví dụ '/menu' cho thực đơn, '/menu/bread' cho BREAD, '/menu/beverages' cho đồ uống. Nếu người dùng nêu tên món có trên site, gợi ý '/menu/<slug>' tương ứng. Plain text, đặt link cuối câu trong ngoặc (VD: Xem tại /menu/bread).",
        },
        ...[...messages, userMsg].map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
      ];

      const res = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          temperature: DEFAULT_TEMP,
          top_p: DEFAULT_TOP_P,
          max_tokens: DEFAULT_MAX_TOKENS,
        }),
      });
      if (!res.ok || !res.body) {
        // Fallback to non-streaming endpoint
        const res2 = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: payloadMessages,
            temperature: DEFAULT_TEMP,
            top_p: DEFAULT_TOP_P,
            max_tokens: DEFAULT_MAX_TOKENS,
          }),
        });
        if (res2.ok) {
          const data = (await res2.json()) as any;
          const finalClean = sanitizeReply(String(data?.reply || "")) || "Xin lỗi, hiện chưa trả lời được.";
          setMessages((prev) => [...prev, { id: createId(), sender: "bot", text: finalClean }]);
          setIsReplying(false);
          return;
        }
        throw new Error("No stream");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botMessageId = createId();
      let accumulated = "";
      // Create single placeholder bot message with explicit "..." to avoid showing previous reply
      setMessages((prev) => [...prev, { id: botMessageId, sender: "bot", text: "..." }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // SSE format: lines starting with "data: {json}"
        const lines = chunk.split(/\n/).map((l) => l.trim()).filter((l) => l.startsWith("data:"));
        for (const line of lines) {
          const payload = line.replace(/^data:\s*/, "").trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const c0 = json?.choices?.[0];
            const delta: string = (c0?.delta?.content ?? c0?.message?.content ?? "");
            if (delta) {
              accumulated += delta;
              setStreamBuffer(accumulated);
              const clean = sanitizeReply(accumulated) || "...";
              setMessages((prev) => prev.map((m) => (m.id === botMessageId ? { ...m, text: clean } : m)));
            }
          } catch {}
        }
      }
      // Final clean up
      const finalClean = sanitizeReply(accumulated) || "Xin lỗi, hiện chưa trả lời được.";
      setMessages((prev) => prev.map((m) => (m.id === botMessageId ? { ...m, text: finalClean } : m)));
    } catch (e) {
      setMessages((prev) => [...prev, { id: createId(), sender: "bot", text: "Có lỗi kết nối, vui lòng thử lại." }]);
    }
    setIsReplying(false);
  };

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="hide-when-chat-open-mobile hide-when-cart-open-desktop fixed right-4 bottom-4 md:bottom-6 md:right-6 z-50 rounded-full shadow-cardHover border border-accent bg-accent text-accent-contrast p-3 hover:brightness-95 transition"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {/* Desktop side panel overlay - keep bottom X visible */}
      <div className={`hidden md:block fixed inset-0 z-[40] ${open ? 'visible' : 'invisible'}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-black/20 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <section
          className={`absolute right-24 bottom-6 top-6 w-[clamp(320px,40vw,460px)] rounded-2xl bg-white border border-accent/20 shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
          role="dialog"
          aria-modal={open ? true : false}
          aria-label="J\\T Virtual Assistant"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-accent/30 bg-accent text-accent-contrast rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center size-7 rounded-full bg-accent-contrast/10 border border-accent-contrast/20 text-accent-contrast">
                <Bot size={16} />
              </span>
              <div className="leading-tight">
                <div className="font-serif text-[18px]">J\\T Virtual Assistant</div>
              </div>
            </div>
            <button aria-label="Close chat" className="p-1 rounded-md hover:bg-accent-contrast/10" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div ref={desktopScrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.sender === 'user' ? 'bg-accent text-accent-contrast' : 'bg-neutral-100 text-neutral-900'} px-3 py-2 rounded-2xl max-w-[80%]`}>
                  {m.text}
                </div>
              </div>
            ))}
            {/* Extract and render link chips only when user mentions relevant intent */}
            {(() => {
              const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
              const userText = lastUser?.text || '';
              const links = messages
                .filter((m) => m.sender === 'bot')
                .flatMap((m) => extractInternalLinks(m.text))
                .filter((href) => userMentionsPath(href, userText));
              if (links.length === 0) return null;
              return (
                <div className="flex flex-wrap gap-2 pt-1">
                  {links.map((href, idx) => (
                    <Link key={`${href}-${idx}`} href={href} className="text-sm px-3 py-1.5 rounded-full border border-accent/40 hover:bg-accent/10">
                      {labelForLink(href)}
                    </Link>
                  ))}
                </div>
              );
            })()}
          </div>
          <form
            className="flex items-center gap-2 px-3 py-3 pr-16 border-t border-accent/30"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
              setInput('');
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message…"
              className="flex-1 rounded-xl border border-neutral-300 px-3 h-11 outline-none focus:ring-2 focus:ring-accent"
              ref={inputRef}
              readOnly={mobileKbdLocked}
              onTouchStart={unlockMobileInputImmediate}
            />
            <button type="submit" className="inline-flex items-center justify-center h-11 px-4 rounded-xl border border-accent/50 hover:bg-accent/10">
              <Send size={16} />
              <span className="sr-only">Send</span>
            </button>
          </form>
        </section>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <section
          className={`absolute inset-0 bg-white transition-transform ${open ? "translate-y-0" : "translate-y-2"} flex flex-col pt-[env(safe-area-inset-top)] overscroll-contain`}
          role="dialog"
          aria-modal={open ? true : false}
          aria-label="J\\T Virtual Assistant"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-accent/30 bg-accent text-accent-contrast">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center size-7 rounded-full bg-accent-contrast/10 border border-accent-contrast/20 text-accent-contrast">
                <Bot size={16} />
              </span>
              <div className="leading-tight">
                <div className="font-serif text-[17px]">J\\T Virtual Assistant</div>
              </div>
            </div>
            <button aria-label="Close chat" className="p-1 rounded-md hover:bg-accent-contrast/10" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div ref={mobileScrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`${
                    m.sender === "user" ? "bg-accent text-accent-contrast" : "bg-neutral-100 text-neutral-900"
                  } px-3 py-2 rounded-2xl max-w-[80%]`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {/* Extract and render link chips only when user mentions relevant intent */}
            {(() => {
              const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
              const userText = lastUser?.text || '';
              const links = messages
                .filter((m) => m.sender === 'bot')
                .flatMap((m) => extractInternalLinks(m.text))
                .filter((href) => userMentionsPath(href, userText));
              if (links.length === 0) return null;
              return (
                <div className="flex flex-wrap gap-2 pt-1">
                  {links.map((href, idx) => (
                    <Link key={`${href}-${idx}`} href={href} className="text-sm px-3 py-1.5 rounded-full border border-accent/40 hover:bg-accent/10">
                      {labelForLink(href)}
                    </Link>
                  ))}
                </div>
              );
            })()}
          </div>
          <form
            className="flex items-center gap-2 px-3 py-3 border-t border-accent/30 bg-white pb-safe"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
              setInput("");
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message…"
              className="flex-1 rounded-xl border border-neutral-300 px-3 h-12 outline-none focus:ring-2 focus:ring-accent"
              ref={inputRef}
              readOnly={mobileKbdLocked}
              onTouchStart={unlockMobileInputImmediate}
            />
            <button type="submit" className="inline-flex items-center justify-center h-12 px-4 rounded-xl border border-accent/50 hover:bg-accent/10">
              <Send size={16} />
              <span className="sr-only">Send</span>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}


