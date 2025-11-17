import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-float">🍞</div>
          <h2 className="text-3xl font-fredoka font-bold text-baker-brown-dark mb-2">Your cart is empty</h2>
          <p className="text-baker-brown mb-6 font-nunito text-lg">Add some delicious baked goods to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-baker-orange text-white px-8 py-4 rounded-xl hover:bg-baker-orange-light transition-all duration-200 font-fredoka font-bold retro-button"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-baker-brown hover:text-baker-orange transition-colors duration-200 font-nunito font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-4xl font-fredoka font-bold text-baker-brown-dark">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-baker-red hover:text-baker-red-dark transition-colors duration-200 font-fredoka font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="retro-card rounded-xl overflow-hidden mb-8">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 bg-baker-beige-light ${index !== cartItems.length - 1 ? 'border-b-3 border-baker-brown-dark' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-fredoka font-bold text-baker-brown-dark mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-baker-brown mb-1 font-nunito">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-baker-brown mb-1 font-nunito">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-fredoka font-bold text-baker-brown-dark">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-3 bg-baker-gold-light rounded-full p-1 border-2 border-baker-brown-dark">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-baker-gold rounded-full transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-baker-brown-dark" />
                  </button>
                  <span className="font-fredoka font-bold text-baker-brown-dark min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-baker-gold rounded-full transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-baker-brown-dark" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-fredoka font-bold text-baker-brown-dark">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-baker-red hover:text-baker-red-dark hover:bg-baker-gold-light rounded-full transition-all duration-200 border-2 border-baker-brown-dark"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="retro-card rounded-xl p-6">
        <div className="flex items-center justify-between text-2xl font-fredoka font-bold text-baker-brown-dark mb-6">
          <span>Total:</span>
          <span className="text-baker-red">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-baker-orange text-white py-4 rounded-xl hover:bg-baker-orange-light transition-all duration-200 font-fredoka font-bold text-lg retro-button"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;