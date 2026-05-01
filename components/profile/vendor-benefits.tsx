import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format-currency';
import {
    Award,
    BarChart3,
    CheckCircle,
    Globe,
    ShieldCheck,
    Sparkles,
    Store,
    TrendingUp,
    Zap
} from 'lucide-react';

const benefits = [
  {
    id: 'ai-feature',
    title: 'AI-Powered Recommendations',
    description: 'Your products are intelligently recommended to relevant customers',
    icon: Sparkles,
    premium: false,
  },
  {
    id: 'front-page',
    title: 'Featured on Front Page',
    description: 'Your store gets prime placement on our marketplace homepage',
    icon: Globe,
    premium: false,
  },
  {
    id: 'store-profile',
    title: 'Professional Store Profile',
    description: 'Create a branded store with name, description, and address',
    icon: Store,
    premium: false,
  },
  {
    id: 'verification',
    title: 'Verified Seller Badge',
    description: 'Build customer trust with our official verification badge',
    icon: ShieldCheck,
    premium: true,
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Track sales, customer behavior, and inventory performance',
    icon: BarChart3,
    premium: true,
  },
  {
    id: 'priority-support',
    title: 'Priority Support',
    description: '24/7 dedicated support team for your store',
    icon: Zap,
    premium: true,
  },
  {
    id: 'higher-visibility',
    title: 'Higher Search Visibility',
    description: 'Rank higher in marketplace search results',
    icon: TrendingUp,
    premium: true,
  },
  {
    id: 'customer-trust',
    title: 'Increased Customer Trust',
    description: 'Verified stores receive 3x more inquiries',
    icon: Award,
    premium: false,
  },
];

export function VendorBenefits() {
  const basicBenefits = benefits.filter((b) => !b.premium);

  return (
    <div className="space-y-8">
      
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {basicBenefits.map((benefit) => {
        
            return (
              <Card key={benefit.id} className="p-4 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
     

     

      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex gap-4">
          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-emerald-900 mb-2">Why Verify Your Store?</h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li>• Verified sellers get 3x more customer inquiries</li>
              <li>• Build credibility and trust with customers</li>
              <li>• Unlock exclusive premium features</li>
              <li>• One-time payment of {formatCurrency(2000)}, lifetime benefits</li>
              <li>• Stand out from unverified competitors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
