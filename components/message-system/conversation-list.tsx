import { SelectedConversation } from "@/types/users"
import ConversationItem from "./coversation-item"

export default function ConversationList({
  conversations,
  selectedConversation,
  onSelect,
  userId,
  isMobile,
}: {
  conversations: SelectedConversation[]
  selectedConversation: SelectedConversation | null
  onSelect: (c: SelectedConversation) => void
  userId?: number | null
  isMobile: boolean
}) {
  return (
    <div
      className={`${
        isMobile
          ? "flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(90vh-10rem)]"
          : "hidden md:flex md:flex-col overflow-y-auto p-4 space-y-4 max-h-[calc(70vh-10rem)]"
      }`}
    >
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={selectedConversation?.id === conversation.id}
          onClick={() => onSelect(conversation)}
          userId={userId}
        />
      ))}
    </div>
  )
}