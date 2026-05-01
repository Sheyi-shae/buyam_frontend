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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload, X } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import axios from "axios"
import { Card, CardContent } from "../ui/card"
import { Progress } from "../ui/progress"
import apiPrivate from "@/utils/api-private"

import { Spinner } from "../ui/spinner"
import { useQueryClient } from "@tanstack/react-query"

// interface AddCategoryDialogProps {
//   setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>
// }


export function AddCategoryDialog( ) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
    const [mediaPreview, setMediaPreview] = useState<string | null>(null)
    const [categoryName, setCategoryName] = useState<string >('')
  const [categoryDescription, setCategoryDescription] = useState<string>('')
  const[isOpen, setIsOpen ]=useState<boolean>(false)
   const queryClient=useQueryClient()
    
  function onClose(){
    setIsOpen(!isOpen)
    setCategoryName('')
    setCategoryDescription('')
    setMediaPreview(null)
  }

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
    const handleCreateCategory = async () => {
     setLoading(true)
      try {
      const data = {
                name: categoryName,
                description: categoryDescription,
                avatar: mediaPreview,
                }
          
      const response = await apiPrivate.post('/category', data)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
        toast.success(response.data.message)
        onClose()
       

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form >
        <DialogTrigger asChild>
          <Button  className="bg-gradient-to-r capitalize from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
            <Plus className="w-5 h-5 mr-2" />
            Add category
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl max-h-[94vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Category Name</Label>
              <Input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} id="name" name="name" placeholder="Electronics" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Category Description</Label>
                          <Textarea
                              value={categoryDescription}
                id="description"
                name="description"
                placeholder="Phones, computers, sound systems..."
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Category Image</div>

            {!mediaPreview ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Upload category thumbnail
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
                                <CardContent className="p-4">
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

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateCategory} disabled={uploading || loading || !categoryDescription || !mediaPreview || ! categoryName} className="bg-emerald-600" >
             {loading ? <Spinner/>  :'Save changes'} 
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
