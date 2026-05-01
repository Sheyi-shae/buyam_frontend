"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Upload, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { FieldGroup,} from "@/components/ui/field"
import TextInputField,{TextAreaField} from "@/components/forms/_reuseable-form-components/text-input-field"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import axios from "axios"

import apiPrivate from "@/utils/api-private"

import { useQueryClient } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


// form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
})

type FormData = z.infer<typeof formSchema>
interface SubCategoryFormProps{
  categoryId: number
  slug: string
  categoryName:string
}

export function AddSubCategoryDialog({categoryId,slug,categoryName}:SubCategoryFormProps ) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
    const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const[isOpen, setIsOpen ]=useState<boolean>(false)
   const queryClient=useQueryClient()
    
 
  const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        description: "",
      },
    })
  
  //  file upload
  const handleFiles = useCallback(async (fileList: FileList) => {
    const validFile = Array.from(fileList).find((file) =>
      file.type.startsWith("image/")
    )

    if (!validFile) {
      toast.error("Invalid file type")
      return
    }

    if (validFile.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB")
      return
    }

    setUploading(true)
    setUploadProgress(0)
   
    const formData = new FormData()
      formData.append("file", validFile)
      //console.log(validFile.name)

      try {
         
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
              setUploadProgress(percent)
            }
          },
        }
      )

      toast.success("File uploaded successfully")

      // If your backend returns a URL, use that:
      const uploadedUrl = response.data.url
      setMediaPreview(uploadedUrl || URL.createObjectURL(validFile))
      } catch (error) {
          const errorMessge= "Upload failed,please try again later"
      toast.error(errorMessge)
      console.error(error)
    } finally {
      setUploading(false)
    }
  }, [])

  // file upload callback
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles]
  )

  const removeFile = useCallback(() => {
    if (mediaPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(mediaPreview)
    }
    setMediaPreview(null)
  
  }, [mediaPreview])
   
  // handle form submission
   
     function handleOpenChange(open: boolean) {
  setIsOpen(open)
  if (!open) {
    setMediaPreview(null)
  }
}
 

    async function onSubmit (data: FormData) {
     setLoading(true)
      try {
      const subCategoryData = {avatar: mediaPreview,categoryId,...data}
          
      const response = await apiPrivate.post('/sub_category', subCategoryData)
        toast.success(response.data.message)
         queryClient.invalidateQueries({ queryKey: ["category-details"] })
        handleOpenChange(false)
       

      }  catch (error: unknown) {
      if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Something went wrong")
      } else {
      toast.error("An unexpected error occurred")
      }}finally {
            setLoading(false)
        }
      }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      
        <DialogTrigger asChild>
          <Button  className="bg-gradient-to-r capitalize bg-amber-500 hover:bg-amber-700">
            <Plus className="w-5 h-5 mr-2" />
            Add sub category
          </Button>
        </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[94vh] overflow-y-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="capitalize">Create New Sub Category in <span className="text-emerald-600">{ categoryName}</span></DialogTitle>
            <DialogDescription>
              Add a new sub category to {categoryName}. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          {/* input fields */}
          <FieldGroup>
                      <TextInputField
                        form={form}
                        name="name"
                        label="Sub Category Name"
                        placeholder="e.g Phones"
                      />
                      <TextAreaField
                        form={form}
                        name="description"
                        label="Description"
                        placeholder="Enter description"
                      />
                    </FieldGroup>
          {/* Image Upload */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Sub Category Image</div>

            {!mediaPreview ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Upload sub category thumbnail
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports: JPG, PNG, GIF (max 10MB)
                </p>
                <Button
                 disabled={uploading || loading}
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select File
                </Button>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="relative border rounded-lg overflow-hidden">
                <Image
                  src={mediaPreview}
                  alt="Preview"
                  width={500}
                  height={300}
                  unoptimized
                  className="w-full h-64 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
                      )}
                      {/* Upload Progress */}
                            {uploading && (
                              <Card>
                                <CardContent className="">
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Uploading file, please wait...</span>
                                      <span>{Math.round(uploadProgress)}%</span>
                                    </div>
                                    <Progress value={uploadProgress} className="w-full" />
                                  </div>
                                </CardContent>
                              </Card>
                            )}
          </div>

          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit"  disabled={uploading || loading  || !mediaPreview } className="bg-emerald-600" >
             {loading ? <Spinner/>  :'Save changes'} 
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
    
    </Dialog>
  )
}
