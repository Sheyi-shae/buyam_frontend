"use client";

import { useAppSocket } from "@/providers/socket-provider";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-stores";

const messageTemplates = [
  { id: 1, message: "Is this item available?" },
  { id: 2, message: "Is it negotiable?" },
  { id: 3, message: "What is the last price?" },
];

interface ContactProps {
  buyerId: number;
  productId: number;
  sellerId: number;
}

export default function ProductContactSeller({ buyerId, productId, sellerId }: ContactProps) {
  const [message, setMessage] = useState("");
  const { socket, isConnected } = useAppSocket();
  const {user}=useAuthStore()


  const sendMessage = () => {
    try {
      if (!message.trim() || !isConnected) return;
      if (sellerId === user?.id) {
        toast.error('Message sending failed')
        return
      }
    socket?.emit("message:send", {
      buyerId,
      sellerId,
      productId,
      senderId: buyerId,
      content: message,
      type: "text",
      avatar: "/default-avatar.png",
    });
    
    } catch (error) {
      
    } finally {
      setMessage("");
    }
 
  };


  
  return (
    <Card className="p-3 space-y-1 border border-gray-200 shadow-sm rounded-xl">
      <div className="flex gap-2 overflow-x-auto items-center justify-center">
        {messageTemplates.map((item) => (
          <button
            key={item.id}
            onClick={() => setMessage(item.message)}
            className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
          >
            {item.message}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="text-sm"
        />
        <Button onClick={sendMessage} className="bg-emerald-600 hover:bg-emerald-700">
          <Send className="w-4 h-4" />
        </Button>
      </div>

    </Card>
  );
}
