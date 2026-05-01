"use client"
import { useAuthStore } from '@/stores/auth-stores';
import { ProductDetail } from '@/types/users';
import apiPrivate, { parseErrorMessage } from '@/utils/api-private';
import { timeAgo } from '@/utils/date-format';
import { formatCurrency } from '@/utils/format-currency';
import playSound from '@/utils/like-sound-function';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Eye, Heart, Locate, MapPin, MessageSquare, PhoneCall, Share2, Star, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import ProductContactSeller from './product-contact-seller';


  const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center border-b border-gray-100 pb-2">
      <span className="w-6 mr-3">{icon}</span>
      <span className="text-sm text-gray-500 w-24">{label}:</span>
      <span className="font-medium text-sm text-gray-800 flex-1">{value}</span>
    </div>
);
  
export default function ProductInfoPanel({ productData }: { productData: ProductDetail }) {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [contactSeller, setContactSeller] = useState<boolean>(false);

  // handle contact seller
  const handleContactSeller = () => {
    setContactSeller(!contactSeller);
  };
  
  // handle likes 
  const toggleLike = async (id: number) => {
    try {
      const isLiked = productData.likes.some(like => like.userId === Number(user?.id));
      const { data } = await apiPrivate.post(`/like/${id}`);
      toast.success(data.message);
      
      // Only play sound
      if (!isLiked) {
      
        playSound("/sound/like.wav");
      }

      queryClient.invalidateQueries({ queryKey: ["product-details",productData.slug] });
    } catch (error) {
      parseErrorMessage(error);
    }
  };

  const isLiked = productData.likes.some(like => like.userId === user?.id);
    
  return (
   <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl md:text-3xl capitalize font-bold text-gray-800 leading-tight">
          {productData.name}
              </h1>
    
       
      </div>

      {/* views and price */}
      <div className=' flex justify-between'>
      <p className="text-2xl md:text-3xl  text-amber-600 mb-6">
        {formatCurrency(productData.price)}
        </p>
        
        {/* views and likes */}
        <span className='flex gap-7 text-slate-700 text-sm'>
           {user && ( <button
           
            onClick={() => toggleLike(productData.id)}
            className="flex gap-2 hover:bg-white "
          >
            
            <ThumbsUp size={18} className={`w-5 h-5 ${ isLiked ? "fill-amber-600 text-amber-600" : "text-foreground"}`} />
          {productData.likes.length > 0 && (<span className="text-xs flex ">{productData.likes.length}</span>)}
          </button>)}
          <button className='flex gap-2'>
          <Eye size={18} />{productData.views}
        </button>
        </span>
      
      </div>

      {/* Action Buttons (Emerald) */}
       {productData.sellerId !== user?.id &&
      <div className="flex flex-col md:flex-row gap-3 mb-6 text-sm md:text-base">
        <button
          onClick={handleContactSeller}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg  text-white bg-emerald-600 hover:bg-emerald-700 "
        >
          <MessageSquare size={20} />
          <span>{contactSeller ? 'Hide Chat' : 'Contact Seller' }</span>
        </button>
        <button onClick={()=>setShowNumber(!showNumber)}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg  text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 ">
           <PhoneCall size={20} className='mr-1' />       
          {showNumber ?  
            <a href={`tel:${'08148299505'}`} className="underline">{'08148299505'}</a>
            : "View Phone Number"}
        </button>

      </div>}
      {/* contact seller  */}
         <div
  className={`
    transition-all duration-700
    ${contactSeller ? "translate-y-3 h-40 opacity-100" : "opacity-0 -translate-y-3 h-0 "}
  `}
>
       
          <ProductContactSeller
          buyerId={Number(user?.id)}
          productId={productData.id}
          sellerId={productData.seller.id} />
</div>

      {/* Basic Details */}
      <div className="space-y-3 text-gray-700">
        <DetailItem icon={<MapPin size={18} className="text-emerald-500 " />} label="Location" value={productData.state} />
         <DetailItem icon={<Locate size={18} className="text-emerald-500" />} label="City/Town" value={productData.city} />
        <DetailItem icon={<Star size={18} className="text-emerald-500" />} label="Condition" value={productData.condition} />
        <DetailItem icon={<ChevronRight size={18} className="text-emerald-500" />} label="Category" value={productData.subCategory.name} />
        <DetailItem icon={<Share2 size={18} className="text-emerald-500" />} label="Posted" value={timeAgo(productData.createdAt)} />
      </div>
    </div>
  )
}

