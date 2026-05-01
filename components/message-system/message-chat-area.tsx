"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, X, ArrowLeft } from "lucide-react"
import { Message, SelectedConversation } from "@/types/users"
import { timeAgo } from "@/utils/date-format"
import Link from "next/link"
import { formatCurrency } from "@/utils/format-currency"
import EmptyConversationState from "./empty-conversation"

interface MessageChatAreaProps {
    selectedConversation?: SelectedConversation | null;
    messages: Message[];
    userId?: number | null ;
    selectedImage: File | null;
    imagePreview: string | null;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedConversation: (conversation: SelectedConversation | null) => void
    removeSelectedImage: () => void;
    messageText: string;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  
   
}


export default function MessageChatArea({
    selectedConversation,
    messages,
    userId,
    selectedImage,
    imagePreview,
    handleImageSelect,
    removeSelectedImage,
    messageText,
  setMessageText,
    setSelectedConversation,
    sendMessage,
    messagesEndRef,
}: MessageChatAreaProps) {
  return (
    
    <div className="lg:col-span-2 shadow-sm border-r border-t border-b border-border  overflow-hidden flex flex-col min-h-[calc(70vh-10rem)] bg-background">
  
      {selectedConversation ? (
    
        <>
          {/* Chat Header */}
         
          <div className="p-4 border-b border-border flex items-center justify-between">
          
             
            <div className="flex items-center gap-3">
            
                 <ArrowLeft onClick={() => setSelectedConversation(null)}  className="md:hidden" /> 
            
              
              <Link className="flex gap-3" href={`/vendor/${selectedConversation?.user?.publicId}`}>
          <Avatar>
            <AvatarImage
              src={selectedConversation?.avatar || "/placeholder.svg"}
              alt={selectedConversation?.name}
            />
            <AvatarFallback>
              {selectedConversation?.name?.charAt(0) }
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold text-foreground">
              {selectedConversation?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedConversation?.user?.online
                ? "Online"
                : "last seen: " + timeAgo(selectedConversation?.user?.lastSeen || new Date())}
            </p>
              </div>
              </Link>
            </div>
            
          </div>
            
          {/* product info */}
          <Link href={`/categories/${selectedConversation?.product?.subCategory?.slug}/${selectedConversation?.product?.slug}`} >
          <div className="flex w-full px-2 md:px-8 lg:px-16 rounded-sm overflow-hidden gap-2 lg:gap-5   z-50 bg-amber-50 ">
            <span className="relative">
              <Image
              src={selectedConversation?.product?.avatar[0] || "/fallback.png"}
              alt={selectedConversation?.product?.name}
              width={50}
              height={50}
              className="w-full h-full object-contain rounded-2xl"
            />
            </span>
            <span className="flex flex-col">
              <p className="tex-sm line-clamp-1 text-amber-700">{selectedConversation?.product?.name}</p>
              <p className="text-xs text-amber-600">{formatCurrency(selectedConversation?.product?.price)}</p>
            </span>

            </div>
            </Link>
 

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden z-10 p-4 space-y-4 max-h-[calc(80vh-10rem)]">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.senderId === userId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 z-10 rounded-lg text-sm ${
                      message.senderId === userId
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    {message.type === "image" && message.avatar && (
                      <div className="relative mb-2">
                        <Image
                          width={200}
                          height={200}
                          src={message.avatar}
                          alt="Shared image"
                          className="max-w-full h-auto rounded-lg"
                        />
                        {typeof message.uploadProgress === "number" && (
  <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs px-2 py-1 rounded">
    Uploading… {message.uploadProgress}%
  </div>
)}

                      </div>
                    )}
                    {message.content && <p>{message.content}</p>}
                    <p className="text-xs mt-1 opacity-70">
                      {timeAgo(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border flex flex-col gap-2">
              {/* Image Preview */}
              {selectedImage && imagePreview && (
                <div className="flex items-center p-2 border border-border rounded-lg bg-muted/50">
                  <Image
                    width={40}
                    height={40}
                    src={imagePreview}
                    alt="Preview"
                    className="w-10 h-10 object-cover rounded mr-3"
                  />
                  <span className="text-sm text-foreground truncate flex-1">
                    {selectedImage.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeSelectedImage}
                    className="h-6 w-6"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageSelect}
                />

                <label
                  htmlFor="image-upload"
                  className="cursor-pointer p-2 rounded-full hover:bg-muted transition"
                  aria-label="Attach image"
                >
                  <Paperclip className="w-5 h-5 text-muted-foreground" />
                </label>

                <Input
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="bg-card border-border flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  aria-label="Message input"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!messageText.trim() && !selectedImage}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground p-2"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
      ) : (
          <div className="hidden lg:flex items-center justify-center h-full text-muted-foreground">
            <EmptyConversationState/>
          </div>
        )}
      </div>
  )
}
