"use client"
import { UserReview } from '@/types/users';
import { Star } from 'lucide-react';
import { useMemo } from 'react';

interface VendorRatingSummaryProps {
    vendor: UserReview[]
  averageRating: number;
  
}
export default function VendorRatingSummary({ vendor,  averageRating }: VendorRatingSummaryProps) {
    
      
  // get all ratings from vendor 
  const ratingCounts = useMemo(() => {
    const counts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    vendor.forEach((v) => {
      const rating = Math.floor(v.ratings);
      if (counts[rating] !== undefined) {
        counts[rating]++;
      }
    });
    return counts;
  }, [vendor]);
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase font-semibold mb-2">Overall Rating</p>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold text-emerald-600">{averageRating}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(averageRating) ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Based on {vendor.length} reviews</p>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars] || 0;
              const percentage = vendor.length > 0 ? (count / vendor.length) * 100 : 0;
              
              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground min-w-12">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
  )
}
