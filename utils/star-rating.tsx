import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
  const safeRating = Math.max(0, Math.min(rating || 0, 5));

  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-amber-500 fill-amber-500" />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <Star size={16} className="absolute text-gray-300" />
          <Star
            size={16}
            className="absolute text-amber-500 fill-amber-500"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      )}

     
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
    </div>
  );
};
