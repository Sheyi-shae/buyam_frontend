import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "../ui/badge"
import { Check, CheckCheck } from "lucide-react"
import { timeAgo } from "@/utils/date-format"
import { SelectedConversation } from "@/types/users"

export default function ConversationItem({
  conversation,
  isSelected,
  onClick,
  userId,
}: {
  conversation: SelectedConversation
  isSelected: boolean
  onClick: () => void
  userId?: number | null
}) {
  const isLastMessageMine = conversation.lastMessageSenderId === userId
  const isUnread = conversation.unread === true

  return (
    <button
      onClick={onClick}
      className={`w-full relative p-4 border-b border-border hover:bg-amber-50 transition text-left
        ${conversation.user?.online
          ? "border-l-4 border-l-emerald-500"
          : "border-l-4 border-l-amber-400"}
        ${isSelected ? "bg-amber-50" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={conversation.avatar || "/fallback.png"}
            alt={conversation.name}
          />
          <AvatarFallback>
            {conversation.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm truncate">
              {conversation.user?.storeName ||  conversation.name}
            </p>

            {isLastMessageMine &&
              (isUnread ? (
                <Check className="w-4 h-4 text-muted-foreground" />
              ) : (
                <CheckCheck className="w-4 h-4 text-primary" />
              ))}
          </div>

          <p
            className={`text-xs truncate ${
              isUnread
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {conversation.lastMessage}
          </p>

          {isLastMessageMine && isUnread && (
            <Badge className="absolute right-0 -translate-y-1/2 bg-primary/20 w-7 h-7">
              1
            </Badge>
          )}

          <p className="text-xs text-muted-foreground mt-1">
            {timeAgo(conversation.lastMessageAt)}
          </p>
        </div>
      </div>
    </button>
  )
}