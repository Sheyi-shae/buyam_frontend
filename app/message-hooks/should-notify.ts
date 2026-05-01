import { Message, SelectedConversation } from "@/types/users";


export const shouldNotify = ( msg:Message, userId: number, selectedConversation: SelectedConversation | null) => {
if (msg.senderId === userId) return false;
  if (msg.conversationId === selectedConversation?.id) return false;

  return true;
};
