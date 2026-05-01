'use client'

import React from 'react'
import { Star, Phone, MapPin, Mail } from 'lucide-react'

// Mock Data
const mockVendor = {
  id: 1,
  name: 'Seyi Adeniyi',
  publicId: 'tAL0-_xHUT0E',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  address: 'Lagos, Nigeria',
  phone: '+234 801 234 5678',
  email: 'seyi@example.com',
}

const mockReviews = [
  {
    id: 1,
    userId: 8,
    user: { name: 'Roselyn Bianca', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    comment: 'Great service, very responsive!',
    ratings: 5,
    createdAt: new Date('2025-12-05T10:15:00'),
    replies: [
      { id: 1, name: 'Seyi Adeniyi', reply: 'Thank you for your feedback!' },
    ],
    likes: [{ id: 1, userId: 10 }],
  },
  {
    id: 2,
    userId: 9,
    user: { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
    comment: 'Product quality could be better.',
    ratings: 3,
    createdAt: new Date('2025-12-04T14:30:00'),
    replies: [],
    likes: [{ id: 2, userId: 8 }],
  },
]

// Utility to show "time ago"
const timeAgo = (date: Date) => {
  const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  return `${Math.floor(diff / 86400)} days ago`
}

export default function VendorProfile() {
  const averageRating =
    mockReviews.length > 0
      ? mockReviews.reduce((acc, r) => acc + r.ratings, 0) / mockReviews.length
      : 0

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Vendor Profile Card */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow-lg p-6">
        <img
          src={mockVendor.avatar}
          alt={mockVendor.name}
          className="w-32 h-32 rounded-full object-cover border-2 border-emerald-500"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">{mockVendor.name}</h2>
          <p className="text-sm text-gray-500">@{mockVendor.publicId}</p>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            {mockVendor.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{mockVendor.phone}</span>
              </div>
            )}
            {mockVendor.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{mockVendor.email}</span>
              </div>
            )}
            {mockVendor.address && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{mockVendor.address}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">{averageRating.toFixed(1)} / 5</span>
            </div>
            <div className="text-sm text-gray-500">{mockReviews.length} Reviews</div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Recent Reviews</h3>
        {mockReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No reviews yet for this vendor.</p>
        ) : (
          mockReviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.user.name}</p>
                    <p className="text-xs text-gray-500">{timeAgo(review.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.ratings ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-800">{review.comment}</p>

              {/* Replies */}
              {review.replies.length > 0 && (
                <div className="mt-2 border-l border-gray-200 pl-4 space-y-1">
                  {review.replies.map((reply) => (
                    <div key={reply.id} className="text-xs text-gray-500">
                      <span className="font-semibold">{reply.name}:</span> {reply.reply}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
