"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import apiPrivate, { parseErrorMessage } from "@/utils/api-private";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Replace, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SimpleDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  queryKey: string;
  title?: string;
    description?: string;
  deleteUrl: string
  name?: string
  queryParams?:number

  
}

interface MarkDialog extends SimpleDeleteDialogProps{
  url: string
  buttonName: string
  itemStatus: boolean
  
  
}

export function SimpleDeleteDialog({
  open,
  onOpenChange,
    queryKey,
  deleteUrl,
  name,
  queryParams,
  
  title = "Delete ",
  description = "This action cannot be undone. This will be permanently deleted and remove all associated data.",
}: SimpleDeleteDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient =useQueryClient()

    // delete category
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const response = await apiPrivate.delete(deleteUrl)
            toast.success(response.data.message)
            queryClient.invalidateQueries({ queryKey: [queryKey,queryParams] })
           onOpenChange(!open)

        } catch (error: unknown) {
          toast.error(parseErrorMessage(error))
        }finally {
            setIsLoading(false)
        }
      }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-amber-900">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-amber-700">
                {name}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-gray-600">
          {description}
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}



// mark item as sold dialog
export function MarkItemDialog({
  open,
  onOpenChange,
    queryKey,
  url,
  name,
  title = "",
  itemStatus,
  description = "",
  queryParams,
  buttonName
}: MarkDialog) {
    const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient()
  

    const handleChangestatus = async (status:boolean) => {
      setIsLoading(true);
      if (isLoading) 
       return  toast.loading('Please wait...')
      
        try {
          const response = await apiPrivate.put(url, { isSold:status })
            toast.success(response.data.message)
            queryClient.invalidateQueries({ queryKey: [queryKey,queryParams] })
           onOpenChange(!open)

        } catch (error: unknown) {
          toast.error(parseErrorMessage(error))
        }finally {
            setIsLoading(false)
        }
      }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Replace className="h-5 w-5 animate-spin text-emerald-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-emerald-900">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-emerald-700">
                {name}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-gray-600">
          {description}
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="default"
              onClick={()=>handleChangestatus(itemStatus)}
              disabled={isLoading}
              //className="
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                 Please wait..
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  {buttonName}
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}