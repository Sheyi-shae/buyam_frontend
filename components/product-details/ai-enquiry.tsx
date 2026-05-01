"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Send, Sparkles, Loader2, User, Bot } from "lucide-react"
import apiPrivate from "@/utils/api-private"
import { ProductDetail } from "@/types/users"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AiEnquiry({ product }: { product: ProductDetail }) {
  const [showHint, setShowHint] = useState(true)
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your AI assistant. Ask me anything about this product or the seller." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = async () => {
    
    const userMsg = input.trim();
    if (!userMsg || isLoading) return;

    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await apiPrivate.post("/product/ai/product-chat", { 
        productId: product.id, 
        message: userMsg 
      });
      setMessages((m) => [...m, { role: "assistant", text: res.data.reply }]);
    } catch (error) {
      setMessages((m) => [...m, { role: "assistant", text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {/* Animated Hint Bubble */}
      {showHint && (
        <div className="bg-white border border-amber-100 text-amber-800 text-sm py-2 px-4 rounded-2xl shadow-xl animate-bounce">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Ask about this item!
          </span>
        </div>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-tr from-amber-500 to-orange-600 hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-full sm:max-w-[450px] flex flex-col p-0 gap-0">
          <SheetHeader className="p-4 border-b bg-amber-50/50">
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Product Assistant
            </SheetTitle>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Discussing: {product.name}
            </p>
          </SheetHeader>

          {/* Chat Area */}
          <ScrollArea ref={scrollRef} className="flex-1 overflow-y-scroll p-4 bg-slate-50/30">
            <div className="flex overflow-y-scroll flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-amber-100" : "bg-white border"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    msg.role === "user" 
                    ? "bg-amber-600 text-white rounded-br-none" 
                    : "bg-white text-slate-800 border rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center text-muted-foreground animate-pulse ml-10">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs">AI is thinking...</span>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-white border-t">
            <form 
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="relative flex items-center"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className=""
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 h-9 w-9 rounded-lg bg-emerald-500 hover:bg-emerald-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}