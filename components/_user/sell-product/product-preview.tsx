import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, Package, Zap } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

interface ProductPreviewProps{
    formStep: number;
    isStep1Complete: boolean;
    isStep2Complete: boolean;
    mediaPreview: {url:string,fingerprint:string}[];

}
export default function ProductPreview({
  formStep,
  isStep1Complete,
  isStep2Complete,
  mediaPreview

}: ProductPreviewProps) {
  return (
    <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <Card className="border-gray-200 shadow-lg bg-gradient-to-br from-white to-emerald-50/30">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-600" />
                    Progress
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        isStep1Complete
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isStep1Complete ? '✓' : '1'}
                      </div>
                      <div>
                        <p className={`font-semibold ${isStep1Complete ? 'text-emerald-600' : 'text-gray-900'}`}>
                          Photos & Basics
                        </p>
                        <p className="text-xs text-gray-500">
                          {isStep1Complete ? 'Complete' : 'Photos and title required'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        isStep2Complete
                          ? 'bg-emerald-600 text-white'
                          : formStep === 2 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isStep2Complete ? '✓' : '2'}
                      </div>
                      <div>
                        <p className={`font-semibold ${isStep2Complete ? 'text-emerald-600' : formStep === 2 ? 'text-amber-600' : 'text-gray-900'}`}>
                          Pricing & Details
                        </p>
                        <p className="text-xs text-gray-500">
                          {isStep2Complete ? 'Complete' : formStep === 2 ? 'In progress' : 'Price and description'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Preview</h3>
                  {mediaPreview.length > 0 ? (
                    <div className="space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                          src={mediaPreview[0]?.url}
                           width={100}
                          height={100}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                       
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Add photos to see preview</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

            
            </div>
          </div>
  )
}
