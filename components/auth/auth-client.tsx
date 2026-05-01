'use client';


import { CheckCircle2 } from 'lucide-react';
import AuthFormCard from './auth-form-card';

export function AuthClient({ redirectTo, msg }: { redirectTo:string , msg:string }) {

 
  
  

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
     

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl grid  ">
        

          <AuthFormCard redirectTo={ redirectTo} msg={msg} />
        </div>
      </div>
    </div>
  );
}
