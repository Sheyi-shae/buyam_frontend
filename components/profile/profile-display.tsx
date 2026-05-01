"use client"

import { Button } from "@/components/ui/button"
import { ProductListing, User } from "@/types/users"
import apiPrivate, { parseErrorMessage } from "@/utils/api-private"
import formatReadableDate from "@/utils/date-format"
import { useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Calendar, Loader2, Mail, Pencil, PlusCircle, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { Input } from "../ui/input"
import PremiumDialog from "./premium-dialog"
import ProfileStats from "./store/profile-stats"


interface ProfileDisplayProps {
    user: User
    vendorProducts: ProductListing[]
}

export function ProfileDisplay({ user, vendorProducts }: ProfileDisplayProps) {
    const [showPhoneForm, setShowPhoneForm] = useState(false)
    const [phone, setPhone] = useState<number | string>("")
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const handleAddPhone = async () => {
        setLoading(true)
        try {
           await apiPrivate.patch('/user/phone', { phone })
            setShowPhoneForm(false)
          setPhone("")
          toast.success("Phone number updated successfully")
            queryClient.invalidateQueries({ queryKey: ['my_profile', user?.id] })
        } catch (error) {
            parseErrorMessage(error)
            toast.error(parseErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }
   

  return (
    <div className=" mx-auto p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 backdrop-blur-xl  overflow-hidden shadow-2xl shadow-primary/5"
      >
        {/* Banner/Header */}
        <div className="h-32 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />

        <div className="px-0 md:px-8 pb-8">
          <div className="relative flex flex-col md:flex-row md:items-end gap-6 -mt-12 mb-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-background bg-muted shadow-xl">
                {user.avatar ? (
                  <Image
                                src={user.avatar || '/fallback.png'} 
                                alt={user.name || 'Vendor'} 
                                className="w-full h-full object-cover"
                                width={128}
                                height={128}
                                />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-4xl font-serif">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              {user.online && (
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-background rounded-full" />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-serif tracking-tight">{user.name}</h2>
                <div className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Joined {formatReadableDate(user.createdAt)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex ">
              
             <PremiumDialog user={user}/>
            </div>
                  </div>
                 

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bio & Details */}
            <div className="md:col-span-2 space-y-6">
             

              {/* Stats Grid */}
              <ProfileStats user={user} vendorProducts={vendorProducts}/>
             
              
              
                           </div>

            {/* Sidebar Details */}
            <div className="space-y-6 bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/60">Account Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">Account Type</div>
                  <div className="text-sm font-medium">{user.role ==='USER' ? 'vendor' : 'Admin'}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
                    Public ID
                  </div>
                  <div className="text-sm font-mono text-muted-foreground truncate">{user.publicId}</div>
                              </div>
                              <div>
                  <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
                   Phone Number
                  </div>
                  <div className="text-xs flex items-center gap-2 text-muted-foreground truncate">
                    {user.phone || "Please Add Your Phone Number"}
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> :
                      <Pencil 
                        className="w-4 h-4 hover:cursor-pointer"
                        onClick={() => setShowPhoneForm(!showPhoneForm)} />}
                    </div>
                </div>
                {showPhoneForm && (
                  <div className="mt-4 flex gap-2">
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button disabled={loading} onClick={handleAddPhone}><PlusCircle/></Button>
                  </div>
                )}
              
                
               <PremiumDialog user={user}/>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
