"use client";

import { useAuthStore } from "@/stores/auth-stores";
import { useNotificationStore } from "@/stores/notification-store";
import apiPrivate from "@/utils/api-private";
import playSound from "@/utils/like-sound-function";
import { useEffect } from "react";
import { useAppSocket } from "./socket-provider";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
const { socket, isConnected } = useAppSocket();

  const { set } = useNotificationStore();

  // 🔁 Source of truth: backend
  useEffect(() => {
    if (!isConnected || !socket) return;

    const syncNotifications = async () => {
      const res = await apiPrivate.get("/conversation/unread-count");
      set(res.data.data);
    };

    syncNotifications(); // initial load

    socket.on("notification:sync", syncNotifications);

    return () => {
      socket?.off("notification:sync", syncNotifications);
    };
  }, [isConnected, socket, set]);

  // 🔔 UX only
  useEffect(() => {
    if (!isConnected || !socket) return;

    const handleNewMessage = () => {
      playSound("/sound/like.wav");
    };

    socket.on("notification:new-message", handleNewMessage);

    return () => {
      socket?.off("notification:new-message", handleNewMessage);
    };
  }, [isConnected, socket]);

  return <>{children}</>;
}
