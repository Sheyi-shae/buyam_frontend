import { create } from "zustand";

type NotificationState = {
  unreadCount: number;
  increment: () => void;
  reset: () => void;
  set: (count: number) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  increment: () =>
    set((s) => ({ unreadCount: s.unreadCount + 1 })),
  reset: () => set({ unreadCount: 0 }),
  set: (count) => set({ unreadCount: count }),
}));
