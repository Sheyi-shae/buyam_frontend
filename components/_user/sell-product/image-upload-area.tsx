"use client"

import { Plus, Upload, UploadCloud, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadAreaProps{
  setHoveredImage: (index: number | null) => void;
  hoveredImage: number | null;
  removeFile: (index: number) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mediaPreview: { url: string, fingerprint: string; }[];
  uploading: boolean;

}

export default function ImageUploadArea({
  setHoveredImage,
  uploading,
  hoveredImage,
  removeFile,
  handleFileChange,
  mediaPreview,
}: ImageUploadAreaProps) {
  return (
   
      <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-4">
                            <span className="flex items-center gap-2">
                              <Upload className="w-5 h-5  text-emerald-600" />
                              Add Photos
                              <span className="text-emerald-600">*</span>
                            </span>
                          </label>
                          <div className="flex flex-row overflow-x-scroll gap-2">
                            {mediaPreview.map((image, idx) => (
                              <div
                                key={idx}
                                className="relative group"
                                onMouseEnter={() => setHoveredImage(idx)}
                                onMouseLeave={() => setHoveredImage(null)}
                              >
                                <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                                  <Image
                                    src={image.url}
                                    width={100}
                                    height={100}
                                    alt={`Product ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  {idx === 0 && (
                                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                      Main
                                    </div>
                                  )}
                                </div>
                                {hoveredImage === idx && (
                                  <button
                                    onClick={() => removeFile(idx)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl transition-colors"
                                  >
                                    <X className="w-6 h-6 text-white" />
                                  </button>
                                )}
                              </div>
                            ))}
                            <label className="w-28 h-28 rounded-xl border-2 border-dashed border-emerald-300 flex items-center justify-center cursor-pointer hover:bg-emerald-50 transition-colors bg-emerald-50/50">
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                                <div className="text-center relative">
                                  
  {uploading && (
    <div className="absolute inset-0 flex z-20 bg-emerald-600 rounded-full  items-center justify-center">
      
        <UploadCloud className='animate-pulse  text-white'/>
     
    </div>
  )}
                                <Plus className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                                <p className="text-xs font-medium text-emerald-600">Add Photo</p>
                              </div>
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-3">Min of 2 & Max 10 photos • Up to 10MB each • JPG, PNG</p>
                        </div>
  )
}
