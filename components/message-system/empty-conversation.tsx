"use client";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyConversationState() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted/40">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        
        {/* Animated Icon Wrapper */}
        <div className="relative flex items-center justify-center">
          
          {/* Pulse Ring */}
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner Glow */}
          <div className="absolute h-16 w-16 rounded-full bg-primary/10 blur-xl" />

          {/* Icon */}
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-md border">
            <MessageCircle className="h-7 w-7 text-primary" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Select a conversation
          </h2>
          <p className="text-sm text-muted-foreground">
            to start messaging
          </p>
        </div>

        {/* Optional subtle divider */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-px w-10 bg-border" />
          <div className="h-1 w-1 rounded-full bg-primary/60" />
          <div className="h-px w-10 bg-border" />
        </div>
      </div>
    </div>
  );
}




export  function NoConversationState() {
  return (
    <div className="flex py-10 h-full w-full items-center justify-center  px-6">
      <div className="max-w-md text-center flex flex-col items-center space-y-6">
        
        {/* Animated Icon */}
        <div className="relative flex items-center justify-center">
          
          {/* Pulse effect */}
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.15, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Soft glow */}
          <div className="absolute h-20 w-20 rounded-full bg-primary/10 blur-2xl" />

          {/* Icon */}
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border bg-background shadow-sm">
            <MessageSquarePlus className="h-7 w-7 text-primary" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            No conversations yet
          </h2>
          <p className="text-sm text-muted-foreground">
            Start a new conversation to begin messaging.
          </p>
        </div>

       

        {/* Optional helper text */}
        <p className="text-xs text-muted-foreground">
          You can message vendors from their listings posted.
        </p>
      </div>
    </div>
  );
}