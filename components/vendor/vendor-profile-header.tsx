import { Star, Clock, TrendingUp, Badge, Heart, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VendorHeaderProps {
  vendor: {
    name: string
    avatar: string
    banner: string
    rating: number
    reviews: number
    followers: number
    joinedDate: string
    description: string
    responseTime: string
    sellRate: number
    positiveRating: number
    verified: boolean
    badges: string[]
  }
}



export default function VendorProfileHeader({ vendor }: VendorHeaderProps) {
  return (
    <div className="mb-8">
      {/* Banner */}
      <div className="relative h-0 rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-emerald-500/20 to-amber-500/20">
       
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6 -mt-16 z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* Avatar */}
         

          {/* Info Section */}
          <div className="flex-1">
            <div className="mb-4">
              
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {/* display picture */}
                <div className="flex gap-3">
                  
            <div className="h-32 sm:w-32 rounded-2xl border-4 border-background shadow-xl overflow-hidden bg-card">
              <img src={vendor.avatar || "/placeholder.svg"} alt={vendor.name} className="w-full h-full object-cover" />
            </div>
            
          
             
                  {/* name and description */}
                  <div className="flex flex-col">
                    <span className="flex gap-2">
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{vendor.name}</h1>
                       {vendor.verified && (
                  
                    <BadgeCheck className="w-10 h-10 fill-emerald-700 text-white" />
                    
                    )}
                    </span>
                    <p className="text-muted-foreground text-sm sm:text-base w-full sm:max-w-2xl">{vendor.description}</p>
                  </div>
                  
               
                 
              </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {vendor.badges.map((badge) => (
                <span key={badge} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                  {badge}
                </span>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-xl font-bold text-foreground">{vendor.rating}</span>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Reviews</p>
                <p className="text-xl font-bold text-foreground">{vendor.reviews}</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Response</p>
                <p className="text-sm font-bold text-foreground">{vendor.responseTime}</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Sell Rate</p>
                <p className="text-xl font-bold text-emerald-600">{vendor.sellRate}%</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Followers</p>
                <p className="text-xl font-bold text-foreground">{vendor.followers}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full md:w-auto">
              Message Vendor
            </Button>
            <Button variant="outline" className="gap-2 w-full md:w-auto bg-transparent">
              <Heart className="w-4 h-4" />
              Follow Store
            </Button>
          </div>
        </div>

        {/* Secondary Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-muted-foreground">
              Joined <span className="font-semibold text-foreground">{vendor.joinedDate}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-muted-foreground">
              Positive <span className="font-semibold text-foreground">{vendor.positiveRating}%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
