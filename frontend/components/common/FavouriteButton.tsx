// components/common/FavoriteButton.tsx
import { useState } from 'react';
import { api } from '../../utils/api';

interface FavoriteButtonProps {
  itemId: string;
  itemType: 'blog' | 'tutorial';
  initialIsFavorite?: boolean;
}

export default function FavoriteButton({
  itemId,
  itemType,
  initialIsFavorite = false
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavorite = async () => {
    try {
      await api.toggleFavorite(itemId, itemType);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full ${
        isFavorite ? 'text-red-500' : 'text-gray-400'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={isFavorite ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
