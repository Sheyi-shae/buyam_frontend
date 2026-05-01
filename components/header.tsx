"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ShoppingBag, Menu, X, User, MessageSquare, Package, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/stores/auth-stores"
import { useBackendLogout } from "@/utils/logout"
import { useNotificationStore } from "@/stores/notification-store"

export default function Header() {
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const { unreadCount } = useNotificationStore()
  
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  const navLinks = [
    { href: "/categories", label: "Categories" },
    { href: "/my_listings", label: "My Listings" },
  ]


  const logout = useBackendLogout()


  return (
    <header className={`fixed top-0  w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-emerald-800 to-amber-400 rounded-lg flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div> */}
            <span className="text-3xl font-bold cat-heading  bg-gradient-to-r from-emerald-800 to-amber-600 bg-clip-text text-transparent">
              BuyAm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm  text-black hover:text-emerald-600 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link href="/messages" className="relative inline-flex px-2">
              
                <span >Messages</span>
                <span className="absolute text-xs text-center bg-red-500 rounded-full w-4 h-4 text-white -right-2">{unreadCount}</span>
           
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-5">
          {user && (
            <Link href="/sell">
              <Button variant="default" size="sm" className="hidden hover:bg-emerald-600 sm:inline-flex">
                Post Item
              </Button>
            </Link>
            )}
           

            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full w-10 h-10 p-0 overflow-hidden"
                  >
                    <Image
                      src={user.avatar || "/default-avatar.png"}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 mt-2" align="end" sideOffset={8}>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">{user.name || "User"}</span>
                      <span className="text-xs text-gray-500 truncate">{user.email || "user@example.com"}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-600" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/my_profile" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/messages" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      Messages
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/my_listings" className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-600" />
                      My Listings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={logout} className="text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <Link href="/signin&signup-auth">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="p-6 w-[250px]">
                <SheetHeader>
                  <Link href="/" onClick={() => setOpen(false)} className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-md flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                      Buyam
                    </span>
                  </Link>
                </SheetHeader>

                <div className="mt-6 flex flex-col space-y-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="text-gray-700 font-medium hover:text-emerald-600 transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="mt-4 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                  >
                    Sell on Buyam
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
