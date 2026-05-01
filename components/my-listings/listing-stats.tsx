'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ListingStats } from '@/types/vendor';
import { TrendingUp, Eye, Heart, MessageCircle, Package, CircleCheck as CheckCircle, DollarSign, Zap } from 'lucide-react';

interface ListingStatsDisplayProps {
  stats: ListingStats;
  isLoading?: boolean;
}

export function ListingStatsDisplay({ stats, isLoading }: ListingStatsDisplayProps) {
  const statCards = [
    {
      icon: Package,
      label: 'Total Listings',
      value: stats.totalListings,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
      trend: null,
    },
    {
      icon: Zap,
      label: 'Active',
      value: stats.activeListings,
      color: 'bg-emerald-100',
      textColor: 'text-emerald-600',
      trend: null,
    },
    {
      icon: CheckCircle,
      label: 'Sold',
      value: stats.soldListings,
      color: 'bg-green-100',
      textColor: 'text-green-600',
      trend: null,
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: stats.totalViews,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
      trend: 'up',
    },
    {
      icon: Heart,
      label: 'Liked Items',
      value: stats.totalFavorites,
      color: 'bg-pink-100',
      textColor: 'text-pink-600',
      trend: null,
    },
  
   
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-8 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isHighlight = stat.label === 'Total Revenue' || stat.label === 'Total Views';

        return (
          <Card
            key={index}
            className={`transition-all hover:shadow-lg ${isHighlight ? 'lg:col-span-1' : ''}`}
          >
            <CardContent className="p-2">
              <div className="flex items-start justify-between p-2">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
              {stat.trend === 'up' && (
                <div className="mt-3 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <p className="text-xs font-semibold text-emerald-600">Up this month</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
