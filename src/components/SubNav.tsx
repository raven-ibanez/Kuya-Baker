import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-baker-beige/95 backdrop-blur-md border-b-3 border-baker-brown-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-24 bg-baker-beige-dark rounded-full animate-pulse border-2 border-baker-brown-dark" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 border border-baker-brown-dark flex-shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-baker-brown-dark text-white'
                    : 'bg-transparent text-baker-brown-dark hover:bg-baker-beige'
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 border border-baker-brown-dark flex-shrink-0 ${
                    selectedCategory === c.id
                      ? 'bg-baker-brown-dark text-white'
                      : 'bg-transparent text-baker-brown-dark hover:bg-baker-beige'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


