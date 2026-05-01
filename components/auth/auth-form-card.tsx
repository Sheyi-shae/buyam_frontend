"use client"

import { ArrowRight, Loader2, } from 'lucide-react';
import { useState } from 'react';

export default function AuthFormCard({ redirectTo, msg }: { redirectTo:string , msg:string }) {
   
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) throw new Error("Backend URL not defined");
      // redirect user to backend Google OAuth route
        // send redirectTo to backend
    const url = `${backendUrl}/api/auth/google?redirectTo=${redirectTo}`;

      window.location.href=`${url}`;

     
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
          setLoading(false);
        }
      };
    
  return (
      <div>
          
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
              <div className="text-center mb-8">
            {msg ? (
             <div className="flex-1 bg-red-50 p-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Please sign in to access this page</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">You need to be signed in to continue. Signing in will return you here.</p>

                    </div>
            ): (
                <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
                <p className="text-gray-600">Sign in to your account or create a new one</p>
                </>
            ) }
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-emerald-400 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
                      <span>Sign in with Google</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account with Google</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500 space-y-3">
                <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
                <p>
                  We protect your data and use Google OAuth for secure, easy authentication without storing passwords.
                </p>
              </div>

            
            </div>
          </div>
    </div>
  )
}
