import { Star, StarHalf } from 'lucide-react'

interface RatingProps {
  rating: number
  max?: number
}

export function Rating({ rating, max = 5 }: RatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="sm:w-4 sm:h-4 w-3 h-3 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="sm:w-4 sm:h-4 w-3 h-3 fill-yellow-400 text-yellow-400" />}
      {[...Array(max - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="sm:w-4 sm:h-4 w-3 h-3 text-gray-300" />
      ))}
      <span className="ml-2 text-sm text-gray-600 dark:text-white max-sm:text-xs">{rating}</span>
    </div>
  )
}

