'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Listing } from '@/types/vendor';
import { Eye, Heart, MessageCircle, MoveVertical as MoreVertical, Trash2, CreditCard as Edit, CircleCheck as CheckCircle, Clock, Star, MapPin, Sparkles } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
//import { formatDistanceToNow } from 'date-fns';

interface ListingCardProps {
  listing: Listing;
  onEdit?: (listing: Listing) => void;
  onDelete?: (listingId: string) => void;
  onViewDetails?: (listing: Listing) => void;
}

const conditionColors: Record<Listing['condition'], { bg: string; text: string; label: string }> =
  {
    new: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Brand New' },
    'like-new': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Like New' },
    good: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Good' },
    fair: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Fair' },
  };

export function ListingCard({
  listing,
  onEdit,
  onDelete,
  onViewDetails,
}: ListingCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const mainImage = listing.images?.[0] || '/placeholder.jpg';
  const colors = conditionColors[listing.condition];
  const isSold = listing.status === 'sold';

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setIsDeleting(true);
      onDelete?.(listing.id);
    }
  };

  //const relativeTime = formatDistanceToNow(new Date(listing.created_at), { addSuffix: true });

  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-xl ${isSold ? 'opacity-75' : ''}`}>
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={mainImage}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-white mx-auto mb-2" />
              <p className="text-white font-bold text-lg">SOLD</p>
            </div>
          </div>
        )}

        {listing.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </Badge>
          </div>
        )}

        {listing.images && listing.images.length > 1 && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur">
              {listing.images.length} photos
            </Badge>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-end justify-between">
          <div className="text-white">
            <p className="text-xs opacity-75">{listing.location}</p>
          </div>
          {!isSold && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-900"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onEdit?.(listing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Listing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-emerald-600 transition-colors cursor-pointer"
            onClick={() => onViewDetails?.(listing)}>
            {listing.title}
          </h3>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Posted 
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-emerald-600">
            {listing.currency} {listing.price.toLocaleString()}
          </p>
          <Badge className={`${colors.bg} ${colors.text}`}>
            {colors.label}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">{listing.category || 'General'}</Badge>
          {listing.featured_until && new Date(listing.featured_until) > new Date() && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-gray-600 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-4">
          <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <Eye className="w-4 h-4" />
            <span>{listing.views}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
            <Heart className="w-4 h-4" />
            <span>{listing.favorites}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{listing.inquiries}</span>
          </button>
        </div>
        {isSold && (
          <span className="text-gray-500 font-medium">
            Sold 
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
