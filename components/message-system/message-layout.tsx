"use client"
import { shouldNotify } from "@/app/message-hooks/should-notify"
import { useAppSocket } from "@/providers/socket-provider"
import { useAuthStore } from "@/stores/auth-stores"
import { Conversation, Message, SelectedConversation } from "@/types/users"
import { useFetchPrivateData } from "@/utils/fetch-hooks"
import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import MessageChatArea from "./message-chat-area"
import MessageConversationList from "./message-conversation-list"

export default function MessageLayout() {
  const { user } = useAuthStore()
  const userId = user?.id || 0
  
 

  const [conversations, setConversations] = useState<SelectedConversation[]>([])
  const [messageText, setMessageText] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);

  
  const messagesEndRef = useRef<HTMLDivElement>(null)
const { socket, isConnected } = useAppSocket();

  // Fetch conversations
  const { data, isLoading, isError } = useFetchPrivateData<Conversation[]>({
    queryKey: 'conversation',
    requestUrl: '/conversation',
    queryParams: userId
  })

  // Cleanup image preview on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])


  // Process conversations data
  useEffect(() => {
    if (data) {
      const formatted = data.map((c) => {
        const otherUser = c.buyerId === userId ? c.seller : c.buyer
        return {
          id: c.id,
          name: otherUser.name,
          avatar: otherUser.avatar,
          lastMessage: c.lastMessage,
          lastMessageAt: c.lastMessageAt,
          unread: shouldNotify(c.messages[c.messages.length - 1], userId, selectedConversation),
          buyerId: c.buyerId,
          sellerId: c.sellerId,
          lastMessageSenderId: c.lastMessageSenderId,
          product: c.product,
          messages: c.messages,
          productId: c.productId,
          user: otherUser,
          createdAt: c.createdAt,
        }
      })
      setConversations(formatted)
    }
  }, [data, userId])
 
  // Auto-select first conversation
  // useEffect(() => {
  //   if (conversations.length > 0 && !selectedConversation) {
  //     setSelectedConversation(conversations[0])
  //   }
  // }, [conversations, selectedConversation])

  // Update messages when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages || [])
    } else {
      setMessages([])
    }
  }, [selectedConversation])

  // Socket listener for incoming messages
  useEffect(() => {
    if (!socket) return

    const handleReceiveMessage = (msg: Message) => {
      // Update messages if it's for current conversation
      if (shouldNotify(msg, userId, selectedConversation)) {
  notificationAudioRef.current?.play().catch(() => {});
}

      if (msg.conversationId === selectedConversation?.id) {
        setMessages(prev => {
          // Avoid duplicates
          const exists = prev.some(m => m.id === msg.id)
          if (exists) {
            return prev.map(m => m.id === msg.id ? msg : m)
          }
          return [...prev, msg]
        })
      }

      // Update conversation list
      setConversations(prev => {
        const updated = prev.map((c) => {
          if (c.id === msg.conversationId) {
            const messageExists = c.messages.some(m => m.id === msg.id)
           
            return {
              ...c,
              lastMessage: msg.content,
              lastMessageAt: msg.createdAt,
              // unread: c.id !== selectedConversation?.id && msg.senderId !== userId,
               unread: shouldNotify(msg, userId, selectedConversation),
              messages: messageExists 
                ? c.messages.map(m => m.id === msg.id ? msg : m)
                : [...c.messages, msg],
            }
          }
          return c
        })

        // Sort by last message time
        return updated.sort(
          (a, b) => new Date(a.lastMessageAt).getTime() - new Date(b.lastMessageAt).getTime()
        )
      })
    }

    // NEW: Handle message updates (for image uploads)
    const handleMessageUpdated = (updatedMsg: Message) => {
      // Update in current conversation
      if (updatedMsg.conversationId === selectedConversation?.id) {
        setMessages(prev => prev.map(m => 
          m.id === updatedMsg.id ? updatedMsg : m
        ))
      }

      // Update in conversation list
      setConversations(prev => prev.map((c) => {
        if (c.id === updatedMsg.conversationId) {
          return {
            ...c,
            messages: c.messages.map(m => 
              m.id === updatedMsg.id ? updatedMsg : m
            ),
          }
        }
        return c
      }))
    }

    socket.on("message:receive", handleReceiveMessage)
    socket.on("message:updated", handleMessageUpdated)

    return () => {
      socket.off("message:receive", handleReceiveMessage)
      socket.off("message:updated", handleMessageUpdated)
    }
  }, [socket, selectedConversation, userId])

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  //real update for selected conversation
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
  if (!selectedConversation) return;

  const fresh = conversations.find(c => c.id === selectedConversation.id);
  if (fresh) {
    setSelectedConversation(fresh);
  }
}, [conversations]);


  // Image selection handler
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Revoke previous preview
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
      
      setSelectedImage(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  // Remove selected image
  const removeSelectedImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setSelectedImage(null)
    setImagePreview(null)
  }

  // Send message handler
  const sendMessage = async () => {
    if (!selectedConversation || !socket) return

    const textContent = messageText.trim()
    const isImage = !!selectedImage
    
    if (!textContent && !isImage) return

    const tempId = "temp-" + Date.now()

    // Create optimistic message
    const tempMsg: Message = {
      id: tempId,
      senderId: userId,
      content: textContent || "", 
      type: isImage ? "image" : "text",
      createdAt: new Date(),
      conversationId: selectedConversation.id,
      avatar: isImage ? imagePreview || undefined : undefined,
      isRead: false,
      uploadProgress: isImage ? 0 : undefined,
    }

   
    setMessages(prev => [...prev, tempMsg])

    // Emit to server
    socket.emit("message:send", {
      tempId,
      buyerId: selectedConversation.buyerId,
      sellerId: selectedConversation.sellerId,
      productId: selectedConversation.product.id,
      senderId: userId,
      content: textContent || "", // Send text, not "Sending image..."
      type: tempMsg.type,
      isUploading: isImage,
    })

  
    setMessageText("")

   
    if (!isImage || !selectedImage) return

    // Upload image in background
    setUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("file", selectedImage)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/public`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
         onUploadProgress: (e) => {
  if (!e.total) return;
  const percent = Math.round((e.loaded * 100) / e.total);

  setMessages(prev =>
    prev.map(m =>
      m.id === tempId ? { ...m, uploadProgress: percent } : m
    )
  );
},
        }
      )

      const finalUrl = res.data.url

      // Update server - DON'T change the content, only update avatar
      socket.emit("message:update", {
        tempId,
        finalUrl,
        conversationId: selectedConversation.id,
        senderId: userId,
        type: "image",
        // Don't send content here - keep the original text
      })
      
      
      setMessages(prev => prev.map(m => 
        m.id === tempId 
          ? { ...m, avatar: finalUrl } // Only update avatar, keep content
          : m
      ))

    } catch (err) {
      console.error("Upload failed", err)
      // Mark message as failed
      setMessages(prev => prev.map(m => 
        m.id === tempId 
          ? { ...m, avatar: undefined, content: m.content + " (Failed to send)" }
          : m
      ))
    } finally {
      setUploading(false)
      removeSelectedImage()
    }
  }
  const handleSelectConversation = (conversation: SelectedConversation) => {
  setSelectedConversation(conversation);

   
  setConversations(prev =>
    prev.map(c =>
      c.id === conversation.id
        ? { ...c, unread: false }
        : c
    )
    );
    // update messages to read (isRead:true)
    setMessages(prev =>
      prev.map(m =>
        m.conversationId === conversation.id ? { ...m, isRead: true } : m
      )
    );

    socket?.emit("message:read", {
    
      conversationId: selectedConversation?.id,
      userId: user?.id,
        
      })
      
};

  
 
  return (
    <div
      className={`grid fixed w-full grid-cols-1 
       px-2 lg:px-20  ${selectedConversation ?
          "lg:grid-cols-3 "
          : " lg:grid-cols-3"}   mt-3 gap-0 min-h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)]`}>
      {/* Conversations List */}
     
     <MessageConversationList
      conversations={conversations}
      isLoading={isLoading}
      isError={isError}
      selectedConversation={selectedConversation}
      handleSelectConversation={handleSelectConversation}
      userId={user?.id}
     /> 
      {/* Chat Area */}
      
        <MessageChatArea
            setSelectedConversation={setSelectedConversation}
        handleImageSelect={handleImageSelect}
        imagePreview={imagePreview}
        messageText={messageText}
        messages={messages}
        messagesEndRef={messagesEndRef}
        removeSelectedImage={removeSelectedImage}
        selectedConversation={selectedConversation}
        selectedImage={selectedImage}
        sendMessage={sendMessage}
        setMessageText={setMessageText}
        userId={user?.id}
      /> 
     
    </div>
  )
}