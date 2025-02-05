// components/common/RatingSystem.tsx
import { useState } from 'react';
import { api } from '../../utils/api';

interface RatingSystemProps {
  itemId: string;
  itemType: 'blog' | 'tutorial';
  initialRating?: number;
  onRatingChange?: (newRating: number) => void;
}

export default function RatingSystem({
  itemId,
  itemType,
  initialRating = 0,
  onRatingChange
}: RatingSystemProps) {
  const [rating, setRating] = useState(initialRating);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRating = async (value: number) => {
    setIsSubmitting(true);
    try {
      await api.submitRating(itemId, itemType, value);
      setRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          disabled={isSubmitting}
          className={`text-2xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
