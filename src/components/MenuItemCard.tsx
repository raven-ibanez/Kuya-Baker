import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  onAddToCart, 
  quantity, 
  onUpdateQuantity 
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);
  const [displayQuantity, setDisplayQuantity] = useState(1);

  const calculatePrice = () => {
    // Use effective price (discounted or regular) as base
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) {
      price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, displayQuantity);
    }
  };
  
  const handleIncrementDisplay = () => {
    if (item.available) {
      setDisplayQuantity(prev => prev + 1);
    }
  };
  
  const handleDecrementDisplay = () => {
    if (displayQuantity > 1) {
      setDisplayQuantity(prev => prev - 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn => 
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, displayQuantity, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);
      
      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }
      
      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-baker-beige rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group animate-scale-in ${!item.available ? 'opacity-60' : ''}`}>
        <div className="flex flex-col md:flex-row">
          {/* Image Container with Badges - Left Side */}
          <div className="relative w-full md:w-2/5 h-96 md:h-[500px] bg-baker-beige-light" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}>
            {item.image ? (
              <div className="relative h-full flex items-center justify-center p-8">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              </div>
            ) : null}
            <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
              <div className="text-6xl opacity-20 text-gray-400">🍞</div>
            </div>
            
            {/* Decorative Star Emblem - Top Left */}
            <div className="absolute top-2 left-2 w-8 h-8 opacity-60">
              <div className="w-full h-full bg-gradient-to-br from-red-500 via-green-500 to-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Orange Price Tag - Top Right (Irregular Shape, Rotated) */}
            <div className="absolute top-4 right-4 transform rotate-3 z-10">
              <div className="bg-baker-orange text-white px-5 py-3 shadow-xl relative" style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
              }}>
                <span className="text-2xl font-bold">
                  ₱{item.isOnDiscount && item.discountPrice ? item.discountPrice.toFixed(0) : item.basePrice.toFixed(0)}
                </span>
              </div>
            </div>
            
            {/* FAST DELIVERY Badge - Below Price Tag */}
            {item.isOnDiscount && item.discountPrice && (
              <div className="absolute top-20 right-4 z-10">
                <div className="bg-baker-orange text-white text-xs font-bold px-3 py-1.5 rounded shadow-md flex items-center gap-1">
                  <span className="w-2 h-0.5 bg-white"></span>
                  <span>FAST DELIVERY</span>
                  <span className="w-2 h-0.5 bg-white"></span>
                </div>
              </div>
            )}
            
            {/* #1 BEST SELLER Badge - Bottom Right (Orange) */}
            {item.popular && (
              <div className="absolute bottom-4 right-4 bg-baker-orange text-white px-4 py-3 rounded-lg shadow-lg">
                <div className="text-sm font-bold">#1 BEST SELLER</div>
                <div className="text-xs mt-1">1 item per pack</div>
              </div>
            )}
            
            {!item.available && (
              <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md z-20">
                UNAVAILABLE
              </div>
            )}
          </div>
          
          {/* Content Section - Right Side Info */}
          <div className="w-full md:w-3/5 p-8 bg-baker-beige flex flex-col justify-center">
          {/* Product Title */}
          <h4 className="text-2xl font-serif text-baker-brown-dark mb-2 leading-tight">{item.name}</h4>
          
          {/* Price Display */}
          <div className="mb-5">
            <span className="text-3xl font-bold text-baker-brown-dark">
              ₱{item.isOnDiscount && item.discountPrice ? item.discountPrice.toFixed(2) : item.basePrice.toFixed(2)}
            </span>
          </div>
          
          {/* Quantity Selector and Size Dropdown - Side by Side */}
          <div className="flex items-center gap-4 mb-5">
            {/* Quantity Selector */}
            <div className="flex items-center border border-baker-brown-dark/30 rounded-lg overflow-hidden bg-baker-beige-light">
              <button
                onClick={handleDecrementDisplay}
                disabled={displayQuantity <= 1}
                className="px-3 py-2 bg-baker-beige-dark hover:bg-baker-beige text-baker-brown-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={displayQuantity}
                readOnly
                className="w-12 text-center border-0 focus:ring-0 text-baker-brown-dark font-semibold bg-baker-beige-light"
              />
              <button
                onClick={handleIncrementDisplay}
                disabled={!item.available}
                className="px-3 py-2 bg-baker-beige-dark hover:bg-baker-beige text-baker-brown-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {/* Size Dropdown (if variations exist) */}
            {item.variations && item.variations.length > 0 && (
              <select 
                className="flex-1 px-4 py-2 border border-baker-brown-dark/30 rounded-lg text-baker-brown-dark bg-baker-beige-light focus:ring-2 focus:ring-baker-orange focus:border-baker-orange"
                onChange={(e) => {
                  const selected = item.variations?.find(v => v.id === e.target.value);
                  if (selected) setSelectedVariation(selected);
                }}
                value={selectedVariation?.id || ''}
              >
                {item.variations.map((variation) => (
                  <option key={variation.id} value={variation.id}>
                    {variation.name} {variation.name.includes('g') ? '' : '320g'}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          {/* Add to Cart Button */}
          {!item.available ? (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed font-semibold text-sm mb-4"
            >
              Unavailable
            </button>
          ) : (
              <button
                onClick={handleAddToCart}
                className="bg-baker-orange text-white px-8 py-2.5 rounded-full hover:bg-baker-orange-light transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg mb-5"
              >
                Add to Cart
              </button>
          )}
          
          {/* Product Description */}
          <p className={`text-base leading-relaxed text-baker-brown-dark mb-4 ${!item.available ? 'text-gray-400' : ''}`}>
            {!item.available ? 'Currently Unavailable' : item.description}
          </p>
          
          {/* Slogan */}
          <p className="text-base italic text-baker-brown-dark mb-4">
            With Kuya Baker, it's Easy!
          </p>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-baker-brown-dark/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="retro-card rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-baker-beige-light border-b-3 border-baker-brown-dark p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-fredoka font-bold text-baker-brown-dark">Customize {item.name}</h3>
                <p className="text-sm text-baker-brown mt-1 font-nunito">Choose your preferences</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-baker-gold-light rounded-full transition-colors duration-200 border-2 border-baker-brown-dark"
              >
                <X className="h-5 w-5 text-baker-brown-dark" />
              </button>
            </div>

            <div className="p-6 bg-baker-beige-light">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-fredoka font-bold text-baker-brown-dark mb-4">Choose Size</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border-3 rounded-xl cursor-pointer transition-all duration-200 retro-card-hover ${
                          selectedVariation?.id === variation.id
                            ? 'border-baker-orange bg-baker-gold-light'
                            : 'border-baker-brown-dark hover:bg-baker-beige'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-baker-orange focus:ring-baker-orange"
                          />
                          <span className="font-fredoka font-semibold text-baker-brown-dark">{variation.name}</span>
                        </div>
                        <span className="text-baker-brown-dark font-fredoka font-bold">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-fredoka font-bold text-baker-brown-dark mb-4">Add-ons</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-fredoka font-semibold text-baker-brown mb-3 capitalize">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border-2 border-baker-brown-dark rounded-xl hover:bg-baker-beige transition-all duration-200 retro-card-hover"
                          >
                            <div className="flex-1">
                              <span className="font-fredoka font-semibold text-baker-brown-dark">{addOn.name}</span>
                              <div className="text-sm text-baker-brown font-nunito">
                                {addOn.price > 0 ? `₱${addOn.price.toFixed(2)} each` : 'Free'}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-baker-gold-light rounded-xl p-1 border-2 border-baker-brown-dark">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1.5 hover:bg-baker-gold rounded-lg transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-baker-brown-dark" />
                                  </button>
                                  <span className="font-fredoka font-bold text-baker-brown-dark min-w-[24px] text-center text-sm">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1.5 hover:bg-baker-gold rounded-lg transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-baker-brown-dark" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-baker-orange text-white rounded-xl hover:bg-baker-orange-light transition-all duration-200 text-sm font-fredoka font-bold retro-button"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t-3 border-baker-brown-dark pt-4 mb-6">
                <div className="flex items-center justify-between text-2xl font-fredoka font-bold text-baker-brown-dark">
                  <span>Total:</span>
                  <span className="text-baker-red">₱{calculatePrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-baker-orange text-white py-4 rounded-xl hover:bg-baker-orange-light transition-all duration-200 font-fredoka font-bold flex items-center justify-center space-x-2 retro-button"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - ₱{calculatePrice().toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;