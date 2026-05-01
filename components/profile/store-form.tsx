"use client"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { FolderSync, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { User } from "@/types/users"
import apiPrivate, { parseErrorMessage } from "@/utils/api-private"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"



export  function StoreUpdateDialog({user}: {user: User}) {
    const [isOpen, setIsOpen] = useState(false)
    const [storeName, setStoreName] = useState(user.storeName ?? 'Insert your store name')
const [storeDescription, setStoreDescription] = useState(
user.storeDescription ?? 'Insert your store description'
)

    
    const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  function onClose(){
        setIsOpen(!isOpen)
    }
    
const handleUpdateStore = async () => {
  const payload: Record<string, string> = {}

  if (storeName.trim() !== user.storeName) {
    payload.storeName = storeName.trim()
  }

  if (storeDescription.trim() !== user.storeDescription) {
    payload.storeDescription = storeDescription.trim()
  }

  if (Object.keys(payload).length === 0) {
    toast.info("Nothing to update")
    return
  }

  setLoading(true)
  try {
    await apiPrivate.patch(`/user/store/${user.id}`, payload)
    toast.success("Store updated successfully")
    queryClient.invalidateQueries({ queryKey: ['my_profile', user.id] })
  } catch (error) {
    parseErrorMessage(error)
    toast.error("Failed to update store")
  } finally {
    setLoading(false)
    onClose()
  }
}

    
    
    
 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="font-light text-xs"
          >Update Store <FolderSync /></Button>
                   
      </DialogTrigger>
    
            

          <DialogContent className="sm:max-w-2xl max-h-[94vh] overflow-y-auto">
              <DialogTitle>Update your store name & desc</DialogTitle>
 
        <div className="text-center mb-2">
          <div className="space-y-4">
          <Input value={storeName} onChange={(e)=>setStoreName(e.target.value)} />
          <Textarea value={storeDescription} onChange={(e)=>setStoreDescription(e.target.value)} />
          
          <Button onClick={handleUpdateStore} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Update Store'}</Button>
          
    </div>
        </div>

        

        
        </DialogContent>
    </Dialog>
  )
}