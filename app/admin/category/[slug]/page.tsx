"use client"
import { CategoryDetails } from '@/components/_admin_components/category/category-details'
import { useParams } from 'next/navigation'


export default function Page() {
  const {slug}=useParams()
  return (
    <CategoryDetails slug={slug}/>
  )
}
