"use client"

import { Product } from "@/types/users"
import { timeAgo } from "@/utils/date-format"
import { formatCurrency } from "@/utils/format-currency"
import { Clock, MapPin, ArrowRight, User2 } from "lucide-react"
import { ProductCardSlide } from "../animations/product-slider"
import Link from "next/link"

export default function CategoryProductCard({ items }: { items: Product[] }) {
  return (
    <>
    

      <div className="pcard-grid sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="pcard-wrap">
            <div className="pcard">

              {/* Image */}
              <div className="">
                <ProductCardSlide item={item} intervalMs={3000} queryFn="home-categories" />
               
              </div>

              {/* Body */}
              <div className="pcard-body">
                <h4 className="pcard-title capitalize">{item.name}</h4>

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

                <div className="pcard-divider" />

                <div className="pcard-footer">
                  <span className="pcard-price">{formatCurrency(item.price)}</span>
                  <Link
                    href={`/categories/${item.subCategory?.slug}/${item.slug}`}
                    className="pcard-cta"
                  >
                    View details
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  )
}