import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CategoryD } from '@/types/users'
import SectionReveal from './section-reveal'
import { PageLoader } from '../loading-spinners'
import { Skeleton } from '../ui/skeleton'
import HomeTitleHeader from './home-title-header'

const getItemCountLabel = (count: number) =>
  `${count.toLocaleString()} ${count === 1 ? 'listing' : 'listings'}`

interface CategorySectionsProps {
  category: CategoryD[]
  isLoading?: boolean
}

export default function CategorySections({ category,isLoading }: CategorySectionsProps) {
  return (
 
    
        <SectionReveal>
          <section
            className="cat-section"
            style={{ background: 'var(--background, #fafaf8)', marginTop: '2.5rem', paddingBottom: '0.5rem' }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem' }}>

             
          <HomeTitleHeader title="Explore Categories" desc="Browse by category" link={true}/>
          
          {isLoading ? (
          
             <div className="cat-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="cat-card">
          
          <div className="cat-icon-wrap">
            <Skeleton className="h-[26px] w-[26px] rounded-full" />
          </div>

          <Skeleton className="h-3 w-3/4 mt-2" />

          <Skeleton className="h-3 w-10 mt-2 rounded-full" />
          
        </div>
      ))}
    </div>
          ): (
            
                 /* ── Grid ── */
              <div className="cat-grid">
                {category.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/categories/${cat.name.toLowerCase().replace(/\s/g, '-')}`}
                    style={{ textDecoration: 'none' }}
                    className="cat-card-anim"
                  >
                    <div className="cat-card">
                      <div className="cat-icon-wrap">
                        <Image
                          src={cat.avatar}
                          width={26}
                          height={26}
                          alt={`${cat.name} icon`}
                        />
                      </div>
                      <p className="cat-name">{cat.name}</p>
                      <span className="cat-badge">
                        {getItemCountLabel(cat?.products?.length || 0)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
          )}

           

            </div>
          </section>
        </SectionReveal>
     
  )
}