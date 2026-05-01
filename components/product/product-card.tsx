"use client"

import { Product, ProductListing } from "@/types/users"
import { timeAgo } from "@/utils/date-format"
import { Clock, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import { useAuthStore } from "@/stores/auth-stores"


const getConditionColor = (condition: string) => {
  switch (condition) {
    case "New":
      return "bg-green-100 text-green-800"
    case "Like New":
      return "bg-blue-100 text-blue-800"
    case "Good":
      return "bg-yellow-100 text-yellow-800"
    case "Fair":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
export default function ProductCard({ items }: { items: ProductListing[] }) {
    const { user } = useAuthStore()
    const toggleLike = (id: number) => {
      // Implement like toggle functionality here
    }
  return (
   <div>
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative overflow-hidden bg-muted h-48">
              <Image
                src={item.avatar[0]}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConditionColor(item.condition)}`}>
                  {item.condition}
                </span>
               {user && <button
                  onClick={() => toggleLike(item.id)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full transition"
                >
                  <Heart className={`w-5 h-5 ${item.likes.userId === Number(user?.id) ? "fill-accent text-accent" : "text-foreground"}`} />
                </button>}
              </div>
            </div>

            <div className="p-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{item.subCategory.name}</p>
              <h4 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{item.name}</h4>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {item.state}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {timeAgo(item.createdAt)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">{item.price}</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">View details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}
