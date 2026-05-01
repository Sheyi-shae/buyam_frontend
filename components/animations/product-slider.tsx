"use client";

import { useAuthStore } from "@/stores/auth-stores";
import type { Product } from "@/types/users";
import apiPrivate, { parseErrorMessage } from "@/utils/api-private";
import playSound from "@/utils/like-sound-function";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getConditionColor } from "../product/product-listing";

interface Props {
  item: Product;
  intervalMs?: number;
  pauseOnHover?: boolean;
  queryFn?: string
  mode?: string
  queryParams?:string
}

// Helper function for random number within a range
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Component for a single floating bubble
const FloatingBubble = ({ id, x, y, color }: { id: number, x: number, y: number, color: string }) => {
  return (
    <motion.div
      key={id}
      className="absolute z-50"
      initial={{ opacity: 1, scale: 0.5, x, y }}
      animate={{
        y: y - randomNumber(100, 200), // Float up
        opacity: 0,
        scale: randomNumber(10, 15) / 10, // Slightly random scale
        x: x + randomNumber(-50, 50), // Slight horizontal drift
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Heart
        className="w-3 h-3"
        style={{
          fill: color,
          color: color,
        }}
      />
    </motion.div>
  );
};

export function ProductCardSlide({
  item,
  intervalMs = 3000,
  pauseOnHover = true,
  queryFn,
  mode,
  queryParams
}: Props) {
  const avatars = item.avatar ?? [];
  const count = avatars.length;
  const [index, setIndex] = useState(0);
  const hovered = useRef(false);
  const [bubbles, setBubbles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-slide
  useEffect(() => {
    if (pauseOnHover && hovered.current) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, intervalMs);

    return () => clearInterval(id);
  }, [count,intervalMs]);

  // Clean up bubbles after animation
  useEffect(() => {
    if (bubbles.length > 0) {
      const timer = setTimeout(() => {
        // Remove bubbles that have finished their animation (duration is 1.5s)
        setBubbles(prev => prev.slice(1));
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [bubbles]);

  // liking bubbles animation
  const triggerBubbles = () => {
    if (!likeButtonRef.current) return;

    // Get the position of the like button relative to the card container
    const buttonRect = likeButtonRef.current.getBoundingClientRect();
    const containerRect = likeButtonRef.current.closest('.relative')?.getBoundingClientRect();

    if (!containerRect) return;

    // Calculate the center of the button relative to the container
    const x = (buttonRect.left + buttonRect.right) / 2 - containerRect.left;
    const y = (buttonRect.top + buttonRect.bottom) / 2 - containerRect.top;

    const colors = ["#ef4444", "#f87171", "#fca5a5"]; // Tailwind red-500, 400, 300

    const newBubbles = Array.from({ length: randomNumber(5, 10) }).map((_, i) => ({
      id: Date.now() + i,
      x: x + randomNumber(-5, 5), // Slight horizontal offset
      y: y + randomNumber(-5, 5), // Slight vertical offset
      color: colors[randomNumber(0, colors.length - 1)],
    }));

    setBubbles(prev => [...prev, ...newBubbles]);
  };
    
  // like functionality
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  
  // handle likes 
  const toggleLike = async (id: number) => {
    try {
      const isLiked = item.likes.some(like => like.userId === Number(user?.id));
      const { data } = await apiPrivate.post(`/like/${id}`);
      toast.success(data.message);
      
      // Only trigger bubbles if the item was just liked (not unliked)
      if (!isLiked) {
        triggerBubbles();
        playSound("/sound/like.wav");
      }

      queryClient.invalidateQueries({ queryKey: [queryFn, queryParams] });
      console.log(queryFn,queryParams)
    } catch (error) {
      parseErrorMessage(error);
    }
  };

  const isLiked = item.likes.some(like => like.userId === Number(user?.id));

  return (
    <div
      className="relative h-60 w-full overflow-hidden bg-muted select-none"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      {/* Floating Bubbles Layer */}
      {bubbles.map(bubble => (
        <FloatingBubble key={bubble.id} {...bubble} />
      ))}

      {/* Slide track */}
      <motion.div
        className="flex h-full"
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        //onDragEnd={handleSwipe}
      >
        {avatars.map((src, i) => (
          <div
            key={i}
            className="relative h-full w-full flex-shrink-0"
          >
            <Image
              src={src}
              alt={`${item.name} ${i + 1}`}
              width={1200}
              height={1200}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </motion.div>

        <div className="absolute top-3  flex right-3 gap-3">
          <span className={`p-2 rounded-lg text-xs h-auto  ${getConditionColor(item.condition)}`}>
            {item.condition}
        </span>
        <span>
          {user && mode !== "profile" && ( <button
            ref={likeButtonRef} // Attach ref to the button
            onClick={() => toggleLike(item.id)}
            className="bg-white/90 hover:bg-white p-2 rounded-full transition"
          >
            
           <Heart className={`w-5 h-5 ${ isLiked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
          
          </button>)}</span>
          </div>
      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {avatars.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
                index === i ? "bg-white/90 scale-110" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}


    </div>
  );
}