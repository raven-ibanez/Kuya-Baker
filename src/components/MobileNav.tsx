import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeCategory, onCategoryClick }) => {
  const { categories } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-baker-beige/95 backdrop-blur-sm border-b-3 border-baker-brown-dark md:hidden shadow-lg">
      <div className="flex overflow-x-auto scrollbar-hide px-4 py-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-lg mr-3 transition-all duration-200 border border-baker-brown-dark text-sm font-bold whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-baker-brown-dark text-white'
                : 'bg-transparent text-baker-brown-dark hover:bg-baker-beige'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;