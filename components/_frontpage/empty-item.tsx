'use client'

import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyItem({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-10 px-4 ${className}`}>
      {/* Animated Icon Container - 80% focus */}
      <div className=" relative">
        {/* Glowing background circle */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl animate-pulse" />
        
        {/* Icon wrapper with animation */}
        <div className="relative animate-float">
          <Icon 
            size={60}
            strokeWidth={1.2}
            className="text-red-400 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-md animate-slide-up">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          {title}
        </h2>
        
        {description && (
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
            {description}
          </p>
        )}
        
        {action && (
          <Button
            onClick={action.onClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium px-8 py-2.5 transition-all hover:shadow-lg active:scale-95"
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic empty search results:
 * <EmptyState
 *   icon={Search}
 *   title="No listings found"
 *   description="Try adjusting your filters or search terms"
 * />
 * 
 * 2. With action button:
 * <EmptyState
 *   icon={ShoppingBag}
 *   title="Your cart is empty"
 *   description="Start browsing our amazing products"
 *   action={{
 *     label: "Browse Products",
 *     onClick: () => router.push("/products")
 *   }}
 * />
 * 
 * 3. No messages:
 * <EmptyState
 *   icon={MessageSquare}
 *   title="No messages"
 *   description="You don't have any conversations yet"
 * />
 * 
 * 4. Favorites:
 * <EmptyState
 *   icon={Heart}
 *   title="No favorites yet"
 *   description="Save items you love to view them later"
 *   action={{
 *     label: "Explore Items",
 *     onClick: () => router.push("/products")
 *   }}
 * />
 */
