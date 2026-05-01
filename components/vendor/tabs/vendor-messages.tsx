"use client"

import { Search, Send } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const conversations = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/user-avatar-1.png",
    lastMessage: "Is this still available?",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/diverse-user-avatar-set-2.png",
    lastMessage: "Great, I'll pick it up tomorrow",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 3,
    name: "Mike Chen",
    avatar: "/diverse-user-avatars-3.png",
    lastMessage: "Can you negotiate the price?",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    name: "Emma Davis",
    avatar: "/user-avatar-4.png",
    lastMessage: "Thank you for the fast shipping!",
    time: "3 days ago",
    unread: false,
  },
]

const messages = [
  {
    id: 1,
    sender: "John Smith",
    text: "Hi! Is the iPhone 15 Pro Max still available?",
    time: "5:30 PM",
    isVendor: false,
  },
  {
    id: 2,
    sender: "You",
    text: "Yes, it is! Still in excellent condition.",
    time: "5:35 PM",
    isVendor: true,
  },
  {
    id: 3,
    sender: "John Smith",
    text: "Great! What's the best time to meet?",
    time: "5:40 PM",
    isVendor: false,
  },
]

export default function VendorMessages({ vendor }: { vendor: any }) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState("")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96 lg:h-96">
      {/* Conversations List */}
      <div className="lg:col-span-1 border border-border rounded-lg overflow-hidden flex flex-col bg-background">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-card border-border" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full p-4 border-b border-border hover:bg-muted/50 transition text-left ${
                selectedConversation.id === conversation.id ? "bg-muted/50 border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground text-sm">{conversation.name}</p>
                    {conversation.unread && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-muted-foreground mt-1">{conversation.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2 border border-border rounded-lg overflow-hidden flex flex-col bg-background hidden lg:flex">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={selectedConversation.name} />
              <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{selectedConversation.name}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isVendor ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.isVendor
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 opacity-70`}>{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border flex gap-2">
          <Input
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="bg-card border-border"
          />
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground p-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
