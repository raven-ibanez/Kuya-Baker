import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-baker-beige/95 backdrop-blur-md border-b-4 border-baker-brown-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-baker-brown-dark hover:text-baker-orange transition-colors duration-200 group"
          >
            {loading ? (
              <div className="w-14 h-14 bg-baker-beige-dark rounded-full animate-pulse border-3 border-baker-brown-dark" />
            ) : (
              <div className="relative">
                <img 
                  src={siteSettings?.site_logo || "/logo.jpg"} 
                  alt={siteSettings?.site_name || "Kuya Baker"}
                  className="w-14 h-14 rounded-full object-cover border-3 border-baker-brown-dark retro-badge group-hover:animate-wiggle transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = "/logo.jpg";
                  }}
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-baker-gold rounded-full border-2 border-baker-brown-dark"></div>
              </div>
            )}
            <h1 className="text-3xl font-fredoka font-bold text-baker-brown-dark">
              {loading ? (
                <div className="w-32 h-8 bg-baker-beige-dark rounded animate-pulse border-2 border-baker-brown-dark" />
              ) : (
                siteSettings?.site_name || "KUYA BAKER"
              )}
            </h1>
          </button>

          <div className="flex items-center space-x-3">
            <button 
              onClick={onCartClick}
              className="relative p-3 bg-baker-gold hover:bg-baker-gold-light text-baker-brown-dark rounded-full transition-all duration-200 retro-button group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-baker-red text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-baker-brown-dark animate-bounce-gentle">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;