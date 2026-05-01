"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/users";

type Props = {
  item: Product;
  intervalMs?: number; // autoplay interval
  pauseOnHover?: boolean;
};

export function ProductCardFade({ item, intervalMs = 3000, pauseOnHover = true }: Props) {
  const [index, setIndex] = useState(0);
  const hovered = useRef(false);
  const avatars = item.avatar ?? ["/fallback.png"];

  useEffect(() => {
    const tick = () => {
      setIndex((i) => (i + 1) % avatars.length);
    };
    if (pauseOnHover && hovered.current) return;

    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatars.length, intervalMs, pauseOnHover, hovered.current]);

  return (
    <div
      className="relative overflow-hidden bg-muted h-60"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      aria-roledescription="carousel"
      aria-label={`${item.name} images`}
    >
      <motion.div
        key={avatars[index]} // ensures animation triggers on image change
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full h-full"
      >
        <Image
          src={avatars[index] ?? "/fallback.png"}
          alt={`${item.name} image ${index + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={index === 0} // first image loads quicker
        />
      </motion.div>

      {/* optional dot indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
        {avatars.map((_, i) => (
          <button
            key={i}
            aria-label={`Show image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-foreground" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
