'use client'

import { useEffect, useState } from 'react'

export default function LoadingSpinners({ text = "Loading..." }: { text?: string }) {
  return (
    
        <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-gray-600">{text}</p>
        </div>
      
  )
}



export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Check if page has already loaded
    if (document.readyState === 'complete') {
      setIsFading(true)
      const timer = setTimeout(() => setIsVisible(false), 500)
      return () => clearTimeout(timer)
    }

    // Listen for page load completion
    const handleLoad = () => {
      setIsFading(true)
      const timer = setTimeout(() => setIsVisible(false), 500)
      return () => clearTimeout(timer)
    }

    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          <svg
            className="w-full h-full animate-spin"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer rotating circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeDasharray="44 176"
              strokeLinecap="round"
            />
            {/* Inner rotating circle */}
            <circle
              cx="32"
              cy="32"
              r="18"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="2.5"
              strokeDasharray="28 112"
              strokeLinecap="round"
              className="animate-spin-reverse"
            />
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2ecc71" stopOpacity="1" />
                <stop offset="100%" stopColor="#2ecc71" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#27ae60" stopOpacity="1" />
                <stop offset="100%" stopColor="#27ae60" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Loading</p>
          <div className="flex justify-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}



interface EmptyStateProps{
  title: string
  desc?:string
}
export function EmptyStateLoader({title,desc}:EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Loading Circle */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-muted-foreground/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" />
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-2 rounded-full bg-primary/10 animate-pulse" />
        </div>

        {/* Loading text with animation */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Optional subtitle */}
        <p className="text-sm text-muted-foreground text-center max-w-xs">
           Please wait a moment.
        </p>
      </div>
    </div>
  )
}

