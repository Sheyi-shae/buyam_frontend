"use client"

import { MarkItemDialog, SimpleDeleteDialog } from "@/components/_admin_components/delete-dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ProductListing } from "@/types/users"
import { MoreVertical } from "lucide-react"
import { useState } from "react"

interface ProductOptions {
  item: ProductListing,
  
}
export default function MoreOptions({ item }: ProductOptions) {
  const [open, setOpen] = useState<boolean>(false)
  const [openDelete, setOpenDelete]=useState<boolean>(false)
  // mark as sold or active funtion
  
  async function changeItemStatus() {
    setOpen(!open)
    
  }
  async function deleteItem() {
    setOpenDelete(!openDelete)
    
  }
  return (
    <>
    <Popover >
          <PopoverTrigger><MoreVertical className="w-5 h-5" /></PopoverTrigger>
          <PopoverContent className="text-xs w-30 p-2">
                <div className="grid space-y-2 ">
         
          {!item.isSold ? (
          <button onClick={changeItemStatus} className="w-full  rounded-sm hover:cursor-pointer bg-amber-50 text-amber-700">Mark as sold</button>
          ): (
            <button onClick={changeItemStatus} className="w-full  rounded-sm hover:cursor-pointer bg-green-50 text-green-700">Mark active</button>
          )}
              <button className="w-full  rounded-sm hover:cursor-pointer bg-emerald-50 text-emerald-700">Edit Item</button>
              <button onClick={deleteItem} className="w-full  rounded-sm hover:cursor-pointer bg-red-50 text-red-700">Delete Item</button>

          </div>
          </PopoverContent>
        
      </Popover>
      <MarkItemDialog
        open={open}
        onOpenChange={setOpen}
        deleteUrl=""
        itemStatus={item.isSold ? false : true}
        url={`/product/update-status/${item.slug}`}
        queryKey='my_profile'
        queryParams={item.sellerId}
        description="Are you sure?"
        name={item.name}
        title={`Mark item as ${!item.isSold ? 'sold' : 'active'}`}
        buttonName={!item.isSold ? 'Mark sold' :'Mark active'}
      />

      <SimpleDeleteDialog
         open={openDelete}
        onOpenChange={setOpenDelete}
        deleteUrl={`/product/delete/${item.slug}`}
       
        queryKey='my_profile'
        queryParams={item.sellerId}
        //description="Are you sure?"
        name={item.name}
        title={`Delete ${item.name}`}
       
      
      
      />
    </>
  )
}
