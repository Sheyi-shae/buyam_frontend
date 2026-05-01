"use client"
import { ChevronRight, ChevronLeft, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

interface ProductGalleryProps {
  images: string[];
  username: string;
  online:boolean | undefined
}

// Blocks right-click, drag, and long-press context menu on images
const protect = {
  onContextMenu: (e: React.MouseEvent | React.TouchEvent) => e.preventDefault(),
  onDragStart:   (e: React.DragEvent)                     => e.preventDefault(),
  onTouchStart:  (e: React.TouchEvent) => { e.preventDefault(); },
};

export default function ProductGallery({ images,online, username }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning]     = useState(false);
  const [lightboxOpen, setLightboxOpen]           = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 180);
  }, [isTransitioning]);

  const nextImage = () => goTo((currentImageIndex + 1) % images.length);
  const prevImage = () => goTo((currentImageIndex - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((currentImageIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images, currentImageIndex, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft')  prevImage();
      if (e.key === 'Escape')     setLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentImageIndex]);

  const watermarkText = `@${username}`;

  return (
    <>
      

      <div className="gallery-root" {...protect}>
        <div className="gallery-stage">

          <div className={`gallery-img-wrap ${isTransitioning ? 'fading' : ''}`}>
            <Image
              key={currentImageIndex}
              src={images[currentImageIndex]}
              width={1200}
              height={800}
              alt={`Product image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
              placeholder="blur"
              blurDataURL="/lazy-loader.png"
              priority={currentImageIndex === 0}
              {...protect}
            />
          </div>

          {/* Transparent shield — sits above image, below controls, absorbs all pointer events */}
          <div className="img-shield" {...protect} />

          {/* Tiled watermark */}
          <div className="gallery-watermark">
            <div className="watermark-grid">
              {Array.from({ length: 1 }).map((_, row) => (
                <div className="watermark-row" key={row}>
                  {Array.from({ length: 1 }).map((_, col) => (
                    <span className="watermark-text" key={col}>{watermarkText}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="watermark-corner">
            {online ? (
           <span className="watermark-corner-dot" />
            ) : (
              <span className='w-3 h-3 bg-slate-200 rounded-full '/>
           )} 
            {watermarkText}
          </div>

          <div className="gallery-counter">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Zoom — z-index 7 so it sits above the shield */}
          <button className="gallery-zoom" onClick={() => setLightboxOpen(true)} aria-label="Zoom image">
            <ZoomIn size={15} />
          </button>

          {images.length > 1 && (
            <>
              <button className="gallery-nav gallery-nav-prev" onClick={prevImage} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button className="gallery-nav gallery-nav-next" onClick={nextImage} aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="gallery-dots">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`gallery-dot ${i === currentImageIndex ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}

          <div className="gallery-progress">
            <div className="gallery-progress-fill" style={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }} />
          </div>
        </div>

        {images.length > 1 && (
          <div className="gallery-thumbs">
            {images.map((img, index) => (
              <div
                key={index}
                className={`gallery-thumb ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goTo(index)}
                {...protect}
              >
                <Image src={img} width={60} height={44} alt={`Thumb ${index + 1}`} {...protect} />
                <div className="thumb-wm"><span>{watermarkText}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()} {...protect}>
            <Image
              src={images[currentImageIndex]}
              width={1600}
              height={1200}
              alt="Zoomed product image"
              style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', display: 'block' }}
              {...protect}
            />
            <div className="lightbox-wm">
              <div className="lightbox-wm-grid">
                {Array.from({ length: 10 }).map((_, row) => (
                  <div className="lightbox-wm-row" key={row}>
                    {Array.from({ length: 8 }).map((_, col) => (
                      <span className="lightbox-wm-text" key={col}>{watermarkText}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}