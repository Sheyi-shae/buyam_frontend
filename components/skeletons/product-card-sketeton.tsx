export function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      
      {/* Image skeleton */}
      <div className="w-full h-48 bg-muted" />

      <div className="p-4 space-y-3">
        
        {/* Category */}
        <div className="h-3 w-20 bg-muted rounded" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
        </div>

        {/* Meta info */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded-full" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded-full" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-3">
          <div className="h-6 w-20 bg-muted rounded" />
          <div className="h-9 w-28 bg-muted rounded-md" />
        </div>

        {/* Seller */}
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <div className="w-4 h-4 bg-muted rounded-full" />
          <div className="h-3 w-24 bg-muted rounded" />
        </div>

      </div>
    </div>
  );
}