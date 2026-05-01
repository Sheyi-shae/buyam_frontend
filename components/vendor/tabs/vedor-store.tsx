"use client"

import { Heart, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const storeProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    price: "$1,099",
    condition: "New",
    image: "/iphone-15-pro-max-display.png",
    location: "New York, NY",
    time: "2 hours ago",
    liked: false,
  },
  {
    id: 2,
    title: "iPad Air 5th Gen",
    price: "$649",
    condition: "Like New",
    image: "/ipad-air.png",
    location: "New York, NY",
    time: "5 hours ago",
    liked: false,
  },
  {
    id: 3,
    title: "MacBook Pro 14",
    price: "$1,499",
    condition: "New",
    image: "/macbook-pro-on-desk.png",
    location: "New York, NY",
    time: "1 day ago",
    liked: false,
  },
  {
    id: 4,
    title: "AirPods Pro Max",
    price: "$549",
    condition: "New",
    image: "/airpods-pro-max.jpg",
    location: "New York, NY",
    time: "3 days ago",
    liked: false,
  },
  {
    id: 5,
    title: "Apple Watch Ultra",
    price: "$799",
    condition: "Like New",
    image: "/apple-watch-ultra.png",
    location: "New York, NY",
    time: "1 week ago",
    liked: false,
  },
  {
    id: 6,
    title: "Magic Keyboard",
    price: "$199",
    condition: "Good",
    image: "/magic-keyboard.jpg",
    location: "New York, NY",
    time: "2 weeks ago",
    liked: false,
  },
]

const getConditionColor = (condition: string) => {
  switch (condition) {
    case "New":
      return "bg-green-100 text-green-800"
    case "Like New":
      return "bg-blue-100 text-blue-800"
    case "Good":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function VendorStore({ vendor }: { vendor: any }) {
  const [products, setProducts] = useState(storeProducts)

  const toggleLike = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)))
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Store Items</h2>
          <p className="text-muted-foreground">{products.length} items currently listed</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground text-sm">
            <option>Most Recent</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative overflow-hidden bg-muted h-48">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getConditionColor(product.condition)}`}
                >
                  {product.condition}
                </span>
                <button
                  onClick={() => toggleLike(product.id)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full transition"
                >
                  <Heart className={`w-5 h-5 ${product.liked ? "fill-accent text-accent" : "text-foreground"}`} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{product.title}</h4>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {product.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {product.time}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">{product.price}</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">View</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
