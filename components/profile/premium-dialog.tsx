"use client"
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';

import { VendorBenefits } from './vendor-benefits';

import {
    Crown,
    ShieldCheck,
} from 'lucide-react';

import { User } from '@/types/users';
import apiPrivate, { parseErrorMessage } from '@/utils/api-private';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function PremiumDialog({user}: {user: User}) {
    const [isOpen, setIsOpen] = useState(false)
    const [success,setSuccess] = useState(false)
    const [loading,setLoading] = useState(false)
    
    function onClose(){
        setIsOpen(!isOpen)
    }
    // verify paystack payment
      // Separate verification function (non-async for Paystack callback)
  const verifyPayment = async(reference: string) => {
    try {
      apiPrivate.get(`/payment/verify/${reference}`)
      
          setSuccess(true);
          // Refresh page
          setTimeout(() => {
            window.location.reload();
          }, 2000);
    } catch (error) {
      console.error("Verification error:", error);
        toast.error("Failed to verify payment. Please contact support.");
      
    }finally{
        setLoading(false);
      }
    };
    
    // handle payment
      const handlePayment = async () => {
          setLoading(true);
          onClose()

    try {
      // Step 1: Initialize payment with backend
      const initResponse = await apiPrivate.post("/payment/initialize", {
        publicId: user.publicId,
        })
      const {data,amount} =  initResponse.data;

     

      

      // Step 2: Open Paystack payment modal
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
        email: user.email,
        amount: amount,
        ref: data.reference,
        onClose: function () {
          setLoading(false);
          toast.info("Payment cancelled")
        },
        callback: function (response) {
          // Step 3: Verify payment with backend
          verifyPayment(response.reference);
        },
      });

      handler.openIframe();
    } catch (error: unknown) {
        parseErrorMessage(error)
      console.error("Payment initialization error:", error);
     toast.error(parseErrorMessage(error) || "Payment failed")
      setLoading(false);
    }
  };


  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
    {user.verifiedSeller ? (
                  
                      <Button className=" w-full bg-emerald-100 hover:bg-neutral-50 text-emerald-600 shadow-lg shadow-secondary/20 gap-2  group">
                <ShieldCheck className="w-4 h-4 transition-transform group-hover:rotate-12" />
               Verified
                  </Button>
                  
                  
         ) : (
          <DialogTrigger asChild>
              
              
             <Button className="w-full bg-amber-500 hover:bg-amber-500/90 text-slate-500 shadow-lg shadow-secondary/20 gap-2 font-semibold group">
                <Crown className="w-4 h-4 transition-transform group-hover:rotate-12" />
                Upgrade to Premium
                  </Button>
          
             
        </DialogTrigger> ) }

          <DialogContent className="sm:max-w-2xl max-h-[94vh] overflow-y-auto">
              <DialogTitle></DialogTitle>
 
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 mb-4">
            <Crown className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Become a Verified Premium Vendor
          </h1>
          <p className="text-base text-gray-600">
            Unlock exclusive benefits and grow your business on our platform
          </p>
        </div>

        

        
          <div className="space-y-8">
            <VendorBenefits />
          </div>
       

              <Button
                   onClick={handlePayment}
        disabled={loading || success}
                  className="rounded-sm font-semibold bg-amber-500 hover:bg-amber-500/90 text-slate-700 shadow-lg shadow-secondary/20 gap-2  group">
                {loading
          ? "Processing..."
          : success
          ? "✓ Payment Successful!"
          : "Buy Verification Badge - ₦2,000"}
              </Button>

  

   


        
        </DialogContent>
    </Dialog>
  )
}







