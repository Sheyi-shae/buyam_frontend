import { PageLoader } from "@/components/loading-spinners";
import MessageLayout from "@/components/message-system/message-layout";
import { Suspense } from "react";
export const dynamic = 'force-dynamic'


export default function page() {
  return (
    
    
      <div className="pt-16 md:pt-28   max-h-screen overflow-y-auto">
        <MessageLayout />
        </div>
     
      
    
  )
}
