"use client"

import { SelectedConversation } from "@/types/users"
import { useIsMobile } from "@/utils/use-mobile-screen"
import { NoConversationState } from "./empty-conversation"
import ConversationHeader from "./conversation-header"
import ConversationList from "./conversation-list"

interface Props {
  conversations: SelectedConversation[]
  isLoading: boolean
  isError: boolean
  selectedConversation: SelectedConversation | null
  handleSelectConversation: (conversation: SelectedConversation) => void
  userId?: number | null
}

export default function MessageConversationList(props: Props) {
  const isMobile = useIsMobile()

  const showList = isMobile
    ? !props.selectedConversation
    : true

  return (
    <div className={`lg:col-span-1  shadow-sm border-l border-t border-b ${isMobile && props.selectedConversation ? 'hidden' : 'h-full'} border-border flex flex-col bg-background`}>
      
     
        <ConversationHeader
          isLoading={props.isLoading}
          isError={props.isError}
        />
    

      {props.conversations.length === 0 && !props.isLoading && (
        <NoConversationState />
      )}

      {showList && (
        <ConversationList
          conversations={props.conversations}
          selectedConversation={props.selectedConversation}
          onSelect={props.handleSelectConversation}
          userId={props.userId}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}