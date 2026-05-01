'use client';

import { useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Chrome } from 'lucide-react';

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AuthModal({ open, onOpenChange }: AuthModalProps) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Buyam</DialogTitle>
          <DialogDescription>
            Sign in or create an account to start shopping with trusted vendors
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-emerald-300 transition-all rounded-xl font-medium text-base flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Chrome className="w-5 h-5" />
                  Sign in with Google
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4 text-center text-sm text-gray-600">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
            <p className="text-xs text-gray-500">
              We only use your information to enhance your shopping experience and improve our service.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600 pt-4 border-t">
            <div>
              <div className="font-semibold text-emerald-600 mb-1">10K+</div>
              <div>Vendors</div>
            </div>
            <div>
              <div className="font-semibold text-amber-600 mb-1">100K+</div>
              <div>Products</div>
            </div>
            <div>
              <div className="font-semibold text-emerald-600 mb-1">99%</div>
              <div>Trusted</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
