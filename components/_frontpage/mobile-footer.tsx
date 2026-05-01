'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid3x3, MessageCircle, User, Plus } from 'lucide-react'

export function MobileFooter() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/categories', icon: Grid3x3, label: 'Categories' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' },
    { href: '/account', icon: User, label: 'Account' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-50">
      <nav className="flex items-center justify-around h-20 px-2">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 ${
            isActive('/') 
              ? 'bg-green-50 text-green-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="Home"
        >
          <Home size={24} strokeWidth={2} />
        </Link>

        {/* Categories */}
        <Link
          href="/categories"
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 ${
            isActive('/categories') 
              ? 'bg-green-50 text-green-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="Categories"
        >
          <Grid3x3 size={24} strokeWidth={2} />
        </Link>

        {/* Sell Button - Center, Larger, Distinctive */}
        <Link
          href="/sell"
          className="flex items-center justify-center -mt-8 mb-2 w-16 h-16 rounded-full bg-amber-500 text-white shadow-lg hover:bg-green-700 active:scale-95 transition-all duration-200 hover:shadow-xl"
          title="Post an Advert"
        >
          <Plus size={28} strokeWidth={2.5} className=''/>
        </Link>

        {/* Messages */}
        <Link
          href="/messages"
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 ${
            isActive('/messages') 
              ? 'bg-green-50 text-green-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="Messages"
        >
          <MessageCircle size={24} strokeWidth={2} />
        </Link>

        {/* Account */}
        <Link
          href="/account"
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 ${
            isActive('/account') 
              ? 'bg-green-50 text-green-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="Account"
        >
          <User size={24} strokeWidth={2} />
        </Link>
      </nav>
    </div>
  )
}
