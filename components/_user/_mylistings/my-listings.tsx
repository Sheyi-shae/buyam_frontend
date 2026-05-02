'use client';

import { ProductCardSlide } from '@/components/animations/product-slider';
import { PageLoader } from '@/components/loading-spinners';
import { ListingFilters, SortOption } from '@/components/my-listings/listing-filters';
import { ListingStatsDisplay } from '@/components/my-listings/listing-stats';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProductListing, User } from '@/types/users';
import { Listing, ListingStats } from '@/types/vendor';
import { timeAgo } from '@/utils/date-format';
import { useFetchPrivateData } from '@/utils/fetch-hooks';
import { formatCurrency } from '@/utils/format-currency';
import { ArrowRight, Clock, Eye, Heart, MapPin, MessageCircle, Package, Plus, User2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';




export default function MyListings() {
  // fetch listings from API and calculate stats
  const { data, isLoading } = useFetchPrivateData({
    queryKey: "my-listings",
    requestUrl:"/user/me"
  }) 
  const user = useMemo(
    () => (data as User) || null,
    [data]
  );

  const userListings = useMemo(() => {
    if (!user) return [];
    return user.products as ProductListing[] || [];
  }, [user]);



  const listings =userListings
  const [selectedStatus, setSelectedStatus] = useState<false| true | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const stats: ListingStats = useMemo(() => {
    const activeListings = listings.filter((l) => l.isSold === false);
    const soldListings = listings.filter((l) => l.isSold === true);

    return {
      totalListings: listings.length,
      activeListings: activeListings.length,
      soldListings: soldListings.length,
      totalViews: listings.reduce((sum, l) => sum + l.views, 0),
      totalFavorites: listings.reduce((sum, l) => sum + l.likes.length, 0),
      totalInquiries: listings.reduce((sum, l) => sum + l?.conversations?.length || 0, 0),
      totalRevenue: soldListings.reduce((sum, l) => sum + l.price, 0),
    };
  }, [listings]);


  const filteredListings = useMemo(() => {
    let result = listings;

    if (selectedStatus !==  null) {
      result = result.filter((l) => l.isSold === selectedStatus);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.description?.toLowerCase().includes(query) ||
          l.category?.name.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'most-viewed':
        result.sort((a, b) => b.views - a.views);
        break;
    }


    return result;
  }, [listings, selectedStatus, sortOption, searchQuery]);
  //console.log("Filtered listings:", filteredListings);

  const handleEdit = (listing: Listing) => {
    console.log('Edit listing:', listing);
  };

 

  const handleViewDetails = (listing: Listing) => {
    console.log('View details:', listing);
  };

    if (isLoading) {
        return <PageLoader/>
    }
  return (
    <div className="min-h-screen  bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
     


        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Overview</h2>
          <ListingStatsDisplay stats={stats} />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Listings</h2>
            <ListingFilters
              onStatusChange={setSelectedStatus}
              onSortChange={setSortOption}
              onSearchChange={setSearchQuery}
              activeStatus={selectedStatus}
              activeSortOption={sortOption}
            />
          </div>

          {filteredListings.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : 'Start by posting your first item to get started'}
                </p>
                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4" />
                  Post Your First Item
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredListings.length}</span> of{' '}
                  <span className="font-semibold">{listings.length}</span> listings
                </p>
                {selectedStatus !== null && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Filtered by: <span className="font-semibold capitalize">{selectedStatus}</span>
                  </Badge>
                )}
              </div>

              
                {/* {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewDetails={handleViewDetails}
                  />
                ))} */}
                  
            <div className="pcard-grid sm:grid-cols-2">
                    {filteredListings?.map((item) => (
                      <div
                        key={item.id}
                        className=" pcard-wrap"
                      >
                      <div className="pcard">
                        {/* product image here */}
                          <ProductCardSlide
                            item={item}
                            intervalMs={3000}
                            queryFn="subcategory-products"
                            //disable like button
                            mode="profile"
                          />
            
                          {/* Body */}
                          <div className="pcard-body">
                          <p className="uppercase font-light text-primary text-xs">{item.subCategory.name}</p>
                          <h4 className="pcard-title capitalize">{item.name}</h4>
                          
                        {/* data */}
                              <div className="pcard-meta">
                              <div className="pcard-meta-row">
                                <User2 size={13} />
                              {item.seller.storeName || item.seller.name}
                              </div>
                              <div className="pcard-meta-row">
                                <MapPin size={13} />
                                {item.state}
                              </div>
                              <div className="pcard-meta-row">
                                <Clock size={13} />
                                {timeAgo(item.createdAt)}
                              </div>
                            </div>
                            
                                            <div className="pcard-footer pb-2">
                                              <span className="pcard-price">{formatCurrency(item.price)}</span>
                                              <Link
                                                href={`/categories/${item.subCategory.slug}/${item.slug}`}
                                                className="pcard-cta"
                                              >
                                                View details
                                                <ArrowRight size={13} />
                                              </Link>
                                            </div>
                        
    <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-emerald-600 bg-emerald-50 border-t border-emerald-100">
        <div className="flex gap-4 mx-auto">
          <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <Eye className="w-4 h-4" />
            <span>{stats.totalViews}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
            <Heart className="w-4 h-4" />
            <span>{stats.totalFavorites}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{stats.totalInquiries}</span>
          </button>
        </div>
       
      </CardFooter>                          

            
    </div>
    </div>
    </div>
                    ))}
                  </div>
             
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
