"use client"
import { ProductDetail } from '@/types/users';
import { useFetchPublicData } from '@/utils/fetch-hooks';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import LoadingSpinners from '../loading-spinners';
import DescriptionAndSpecs from './product-description-specs';
import ProductGallery from './product-gallery';
import ProductInfoPanel from './product-info-panel';
import ProductReviews from './product-review';
import SellerInfoCard from './seller-info-card';
import apiPublic from '@/utils/api-public';
import { useQueryClient } from '@tanstack/react-query';
import AiEnquiry from './ai-enquiry';



const similarProducts = [
  { id: 1, title: 'Art Deco Velvet Armchair', price: 650, img: 'https://placehold.co/400x300/10B981/FFFFFF?text=Similar+1' },
  { id: 2, title: 'Mahogany Dining Table Set', price: 1200, img: 'https://placehold.co/400x300/F59E0B/333333?text=Similar+2' },
  { id: 3, title: 'Modern Floor Lamp', price: 150, img: 'https://placehold.co/400x300/00A36C/FFFFFF?text=Similar+3' },
  { id: 4, title: 'Industrial Bookshelf', price: 400, img: 'https://placehold.co/400x300/FFBF00/333333?text=Similar+4' },
];


  const ProductsYouMayAlsoLike = () => (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
        Products You May Also Like
      </h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {similarProducts.map(product => (
          <div key={product.id} className="min-w-[200px] max-w-[200px] border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 text-sm truncate">{product.title}</h3>
              <p className="text-xl font-bold text-amber-600 mt-1">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

const ProductDetailsPage = ({slug}:{slug:string}) => {
    // fetch product details based slug
     const { data, isLoading,isError} = useFetchPublicData({
        queryKey: "product-details",
        requestUrl:`/product/prodct-details/${slug}`,
        queryParams:slug
     })
  const queryClient = useQueryClient()

    const productDetail = useMemo(
      () => (data as ProductDetail) ,
      [data]
  );

  // track views
    useEffect (() => {
       if (!('IntersectionObserver' in window)) return;
     
      const trackViews = async () => {
       await apiPublic.post(`/product/view/${slug}`)
       queryClient.invalidateQueries({ queryKey: ['product-details',slug], })
      }

      trackViews()  
    },);


    if (isLoading) {
        return <LoadingSpinners/>;
  }
  
  if (isError) {
    return <div>Error fetching data</div>;
  }
  

 

  return (
    <div className="relative mt-16 min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
    

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs/Back Button placeholder */}
        <p className="text-gray-500 mb-4 text-xs md:text-sm">
          <Link href="/">Home</Link> &gt;
          <Link className='mr-1 ml-1' href={`/categories/${productDetail?.subCategory?.slug}`}>{productDetail?.subCategory?.name}</Link>&gt;
          <span className="ml-1 text-emerald-600 truncate">{productDetail?.name}</span>
        </p>

        {/* Main Grid Layout */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left/Main Column (Gallery, Info, Description, Reviews) */}
          <div className="md:col-span-2">
            <ProductGallery
              images={productDetail?.avatar}
              username={productDetail.seller.name}
            online={productDetail.seller.online}
            />
            <ProductInfoPanel productData={productDetail} />
            <DescriptionAndSpecs productData={productDetail} />
            <ProductReviews productID={productDetail?.id} sellerId={productDetail.sellerId} />
          </div>

          {/* Right/Sidebar Column (Seller Info) */}
          <div className="md:col-span-1">
            <SellerInfoCard productData={productDetail} />
          </div>
        </div>

        {/* Bottom Section (Recommendations) */}
        <ProductsYouMayAlsoLike />
      </div>

      {/* ai enquiry */}
      <div className='fixed bottom-10 right-10 z-50'>
        <AiEnquiry product={productDetail}/>

      </div>

  
    </div>
  );
};

export default ProductDetailsPage;