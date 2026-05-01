"use client";
import { ProductDetail } from '@/types/users';
import { useState } from 'react';

export default function DescriptionAndSpecs({ productData }: { productData: ProductDetail }) {
    
      const [showFullDescription, setShowFullDescription] = useState(false);
  return (
  
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">Product Description</h2>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap wrap-break-word">
        {showFullDescription ? productData.description : `${productData.description.substring(0, 350)}${productData.description.length > 350 ? '...' : ''}`}
      </p>
      {productData.description.length > 350 && (
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-emerald-600 font-semibold hover:text-emerald-700 mt-2"
        >
          {showFullDescription ? 'Show Less' : 'Read Full Description'}
        </button>
      )}

      <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">More Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
          <div className="flex justify-between  items-center bg-gray-50 p-3 rounded-lg">
            <span className="font-medium text-sm  text-gray-600">{'Condition'}</span>
            <span className="font-semibold text-sm text-gray-800">{productData.condition}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="font-medium text-sm text-gray-600">{'Negotiable'}</span>
            <span className="font-semibold text-sm text-gray-800">{productData.negotiable ? 'Yes' : 'No'}</span>
          </div>
       
      </div>
    </div>

  )
}
