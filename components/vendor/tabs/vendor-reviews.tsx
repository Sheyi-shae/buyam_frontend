"use client"

import { Star, ThumbsUp, Flag } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    author: "John Smith",
    avatar: "/user-avatar-john.png",
    rating: 5,
    date: "2 weeks ago",
    title: "Excellent seller!",
    content:
      "Very responsive and items arrived in perfect condition. The iPhone was exactly as described. Highly recommended!",
    helpful: 24,
    item: "iPhone 15 Pro Max",
  },
  {
    id: 2,
    author: "Emma Davis",
    avatar: "/user-avatar-emma.jpg",
    rating: 5,
    date: "3 weeks ago",
    title: "Fast shipping and great communication",
    content: "Purchased the MacBook Pro. It arrived two days earlier than expected. Great quality!",
    helpful: 18,
    item: "MacBook Pro 14",
  },
  {
    id: 3,
    author: "Michael Johnson",
    avatar: "/user-avatar-michael.png",
    rating: 4,
    date: "1 month ago",
    title: "Good, but could be better",
    content: "The iPad was in great condition, but took a while to ship. Overall satisfied.",
    helpful: 12,
    item: "iPad Air 5th Gen",
  },
  {
    id: 4,
    author: "Sarah Chen",
    avatar: "/user-avatar-sarah.png",
    rating: 5,
    date: "2 months ago",
    title: "Perfect! Will buy again",
    content: "Best experience with this seller. Everything was perfect from start to finish.",
    helpful: 31,
    item: "AirPods Pro Max",
  },
]

export default function VendorReviews({ vendor }: { vendor: any }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Customer Reviews & Ratings</h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase font-semibold mb-2">Overall Rating</p>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold text-emerald-600">{vendor.rating}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(vendor.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Based on {vendor.reviews} reviews</p>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground min-w-12">{Math.floor(Math.random() * 100)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground mb-4">Recent Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{review.author}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {review.date} • Purchased: <span className="font-medium text-foreground">{review.item}</span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">{review.title}</p>
              <p className="text-sm text-foreground/80 mb-4">{review.content}</p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="gap-2 text-xs">
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful})
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-xs">
                <Flag className="w-4 h-4" />
                Report
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
