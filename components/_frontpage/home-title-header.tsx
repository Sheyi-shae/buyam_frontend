import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface HomeTitleHeaderProps {
    title: string;
    desc: string;
    link?: boolean;
}

export default function HomeTitleHeader({ title, desc, link = false }: HomeTitleHeaderProps) {
  return (
     <div
                className="cat-header-anim"
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: '1.75rem',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div className="cat-eyebrow">
                    <span className="eyebrow-dot" />
                    {desc}
                  </div>
                  <h2
                    className="cat-heading"
                    style={{
                      fontSize: 'clamp(1.7rem, 1.5vw, 1.2rem)',
                      fontWeight: 700,
                      color: 'var(--foreground, #1a1a1a)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.15,
                      margin: 0,
                    }}
                  >
                    {title}
                  </h2>
                </div>

                {link && (
                  <Link href="/categories" className="view-all-btn">
                    View All
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
  )
}
