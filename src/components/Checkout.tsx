import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { saveCustomerData, loadCustomerData } from '../utils/cookies';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  
  // Load customer data from cookies on mount
  const savedData = loadCustomerData();
  const [customerName, setCustomerName] = useState(savedData.customerName);
  const [contactNumber, setContactNumber] = useState(savedData.contactNumber);
  const [serviceType, setServiceType] = useState<ServiceType>(savedData.serviceType as ServiceType || 'dine-in');
  const [address, setAddress] = useState(savedData.address);
  const [landmark, setLandmark] = useState(savedData.landmark);
  const [pickupTime, setPickupTime] = useState(savedData.pickupTime);
  const [customTime, setCustomTime] = useState(savedData.customTime);
  // Dine-in specific state
  const [partySize, setPartySize] = useState(savedData.partySize);
  const [dineInTime, setDineInTime] = useState(savedData.dineInTime);
  // Delivery specific state
  const [deliveryDateTime, setDeliveryDateTime] = useState(savedData.deliveryDateTime);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(savedData.paymentMethod as PaymentMethod || 'gcash');
  const [notes, setNotes] = useState(savedData.notes);

  // Load saved data on mount
  useEffect(() => {
    const data = loadCustomerData();
    if (data.customerName) setCustomerName(data.customerName);
    if (data.contactNumber) setContactNumber(data.contactNumber);
    if (data.serviceType) setServiceType(data.serviceType as ServiceType);
    if (data.address) setAddress(data.address);
    if (data.landmark) setLandmark(data.landmark);
    if (data.pickupTime) setPickupTime(data.pickupTime);
    if (data.customTime) setCustomTime(data.customTime);
    if (data.partySize) setPartySize(data.partySize);
    if (data.dineInTime) setDineInTime(data.dineInTime);
    if (data.deliveryDateTime) setDeliveryDateTime(data.deliveryDateTime);
    if (data.paymentMethod) setPaymentMethod(data.paymentMethod as PaymentMethod);
    if (data.notes) setNotes(data.notes);
  }, []);

  // Save customer data to cookies whenever fields change
  useEffect(() => {
    saveCustomerData({
      customerName,
      contactNumber,
      serviceType,
      address,
      landmark,
      pickupTime,
      customTime,
      partySize,
      dineInTime,
      deliveryDateTime,
      paymentMethod,
      notes,
    });
  }, [customerName, contactNumber, serviceType, address, landmark, pickupTime, customTime, partySize, dineInTime, deliveryDateTime, paymentMethod, notes]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Set default payment method when payment methods are loaded
  useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup' 
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';
    
    const dineInInfo = serviceType === 'dine-in' 
      ? `👥 Party Size: ${partySize} person${partySize !== 1 ? 's' : ''}\n📅 Preferred Date: ${dineInTime ? new Date(dineInTime).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        }) : 'Not selected'}`
      : '';
    
    const deliveryInfo = serviceType === 'delivery' && deliveryDateTime
      ? `📅 Delivery Date: ${deliveryDateTime ? new Date(deliveryDateTime).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        }) : 'Not selected'}`
      : '';
    
    const orderDetails = `
🛒 Kuya Baker ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}${landmark ? `\n🗺️ Landmark: ${landmark}` : ''}${deliveryInfo ? `\n${deliveryInfo}` : ''}` : ''}
${serviceType === 'pickup' ? `⏰ Pickup Time: ${timeInfo}` : ''}
${serviceType === 'dine-in' ? dineInInfo : ''}


📋 ORDER DETAILS:
${cartItems.map(item => {
  let itemDetails = `• ${item.name}`;
  if (item.selectedVariation) {
    itemDetails += ` (${item.selectedVariation.name})`;
  }
  if (item.selectedAddOns && item.selectedAddOns.length > 0) {
    itemDetails += ` + ${item.selectedAddOns.map(addOn => 
      addOn.quantity && addOn.quantity > 1 
        ? `${addOn.name} x${addOn.quantity}`
        : addOn.name
    ).join(', ')}`;
  }
  itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
  return itemDetails;
}).join('\n')}

💰 TOTAL: ₱${totalPrice}
${serviceType === 'delivery' ? `🛵 DELIVERY FEE:` : ''}

💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
📸 Payment Screenshot: Please attach your payment receipt screenshot

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing Kuya Baker! 🥟
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/463644283495431?text=${encodedMessage}`;
    
    window.open(messengerUrl, '_blank');
    
  };

  const isDetailsValid = customerName && contactNumber && 
    (serviceType !== 'delivery' || (address && deliveryDateTime)) && 
    (serviceType !== 'pickup' || (pickupTime !== 'custom' || customTime)) &&
    (serviceType !== 'dine-in' || (partySize > 0 && dineInTime));

  if (step === 'details') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-baker-brown hover:text-baker-orange transition-colors duration-200 font-nunito font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-fredoka font-bold text-baker-brown-dark ml-8">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="retro-card rounded-xl p-6">
            <h2 className="text-2xl font-fredoka font-bold text-baker-brown-dark mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b-2 border-baker-brown-dark">
                  <div>
                    <h4 className="font-fredoka font-semibold text-baker-brown-dark">{item.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-sm text-baker-brown font-nunito">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm text-baker-brown font-nunito">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-baker-brown font-nunito">₱{item.totalPrice} x {item.quantity}</p>
                  </div>
                  <span className="font-fredoka font-bold text-baker-brown-dark">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t-3 border-baker-brown-dark pt-4">
              <div className="flex items-center justify-between text-2xl font-fredoka font-bold text-baker-brown-dark">
                <span>Total:</span>
                <span className="text-baker-red">₱{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="retro-card rounded-xl p-6">
            <h2 className="text-2xl font-fredoka font-bold text-baker-brown-dark mb-6">Customer Information</h2>
            
            <form className="space-y-6">
              {/* Customer Information */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-3">Service Type *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'dine-in', label: 'Dine In', icon: '🪑' },
                    { value: 'pickup', label: 'Pickup', icon: '🚶' },
                    { value: 'delivery', label: 'Delivery', icon: '🛵' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                      className={`p-4 rounded-xl border-3 transition-all duration-200 retro-button font-fredoka font-semibold ${
                        serviceType === option.value
                          ? 'border-baker-brown-dark bg-baker-orange text-white'
                          : 'border-baker-brown-dark bg-baker-beige-light text-baker-brown-dark hover:bg-baker-gold-light'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dine-in Details */}
              {serviceType === 'dine-in' && (
                <>
                  <div>
                    <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Party Size *</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-10 h-10 rounded-xl border-3 border-baker-brown-dark flex items-center justify-center text-baker-brown-dark hover:bg-baker-gold-light transition-all duration-200 retro-button"
                      >
                        -
                      </button>
                      <span className="text-2xl font-fredoka font-bold text-baker-brown-dark min-w-[3rem] text-center">{partySize}</span>
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.min(20, partySize + 1))}
                        className="w-10 h-10 rounded-xl border-3 border-baker-brown-dark flex items-center justify-center text-baker-brown-dark hover:bg-baker-gold-light transition-all duration-200 retro-button"
                      >
                        +
                      </button>
                      <span className="text-sm text-baker-brown ml-2 font-nunito">person{partySize !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      value={dineInTime ? dineInTime.split('T')[0] : ''}
                      onChange={(e) => setDineInTime(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                      required
                    />
                    <p className="text-xs text-baker-brown mt-1 font-nunito">Please select your preferred dining date</p>
                  </div>
                </>
              )}

              {/* Pickup Time Selection */}
              {serviceType === 'pickup' && (
                <div>
                  <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-3">Pickup Time *</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '5-10', label: '5-10 minutes' },
                        { value: '15-20', label: '15-20 minutes' },
                        { value: '25-30', label: '25-30 minutes' },
                        { value: 'custom', label: 'Custom Time' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPickupTime(option.value)}
                          className={`p-3 rounded-xl border-3 transition-all duration-200 text-sm retro-button font-fredoka font-semibold ${
                            pickupTime === option.value
                              ? 'border-baker-brown-dark bg-baker-orange text-white'
                              : 'border-baker-brown-dark bg-baker-beige-light text-baker-brown-dark hover:bg-baker-gold-light'
                          }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                    
                    {pickupTime === 'custom' && (
                      <input
                        type="text"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full px-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                        placeholder="e.g., 45 minutes, 1 hour, 2:30 PM"
                        required
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              {serviceType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Delivery Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                      placeholder="e.g., Near McDonald's, Beside 7-Eleven, In front of school"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Delivery Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-baker-brown-dark pointer-events-none z-10" />
                      <input
                        type="date"
                        value={deliveryDateTime ? deliveryDateTime.split('T')[0] : ''}
                        onChange={(e) => setDeliveryDateTime(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <p className="text-xs text-baker-brown mt-1 font-nunito">
                      Select the date when you want to receive your order
                    </p>
                    {deliveryDateTime && (
                      <div className="mt-2 p-3 bg-baker-gold-light rounded-lg border-2 border-baker-brown-dark">
                        <p className="text-sm font-fredoka font-semibold text-baker-brown-dark">
                          📅 Scheduled Delivery: {new Date(deliveryDateTime).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-baker-brown-dark rounded-xl focus:ring-2 focus:ring-baker-orange focus:border-baker-orange transition-all duration-200 bg-baker-beige-light text-baker-brown-dark font-nunito"
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={!isDetailsValid}
                className={`w-full py-4 rounded-xl font-fredoka font-bold text-lg transition-all duration-200 ${
                  isDetailsValid
                    ? 'bg-baker-orange text-white hover:bg-baker-orange-light retro-button'
                    : 'bg-baker-beige-dark text-baker-brown-light cursor-not-allowed border-3 border-baker-brown-dark'
                }`}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setStep('details')}
          className="flex items-center space-x-2 text-baker-brown hover:text-baker-orange transition-colors duration-200 font-nunito font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Details</span>
        </button>
        <h1 className="text-4xl font-fredoka font-bold text-baker-brown-dark ml-8">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method Selection */}
        <div className="retro-card rounded-xl p-6">
          <h2 className="text-2xl font-fredoka font-bold text-baker-brown-dark mb-6">Choose Payment Method</h2>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`p-4 rounded-xl border-3 transition-all duration-200 flex items-center space-x-3 retro-button font-fredoka font-semibold ${
                  paymentMethod === method.id
                    ? 'border-baker-brown-dark bg-baker-orange text-white'
                    : 'border-baker-brown-dark bg-baker-beige-light text-baker-brown-dark hover:bg-baker-gold-light'
                }`}
              >
                <span className="text-2xl">💳</span>
                <span>{method.name}</span>
              </button>
            ))}
          </div>

          {/* Payment Details with QR Code */}
          {selectedPaymentMethod && (
            <div className="bg-baker-gold-light rounded-xl p-6 mb-6 border-3 border-baker-brown-dark">
              <h3 className="font-fredoka font-bold text-baker-brown-dark mb-4">Payment Details</h3>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-baker-brown mb-1 font-nunito">{selectedPaymentMethod.name}</p>
                  <p className="font-mono text-baker-brown-dark font-fredoka font-bold">{selectedPaymentMethod.account_number}</p>
                  <p className="text-sm text-baker-brown mb-3 font-nunito">Account Name: {selectedPaymentMethod.account_name}</p>
                  <p className="text-xl font-fredoka font-bold text-baker-brown-dark">Amount: ₱{totalPrice}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={selectedPaymentMethod.qr_code_url} 
                    alt={`${selectedPaymentMethod.name} QR Code`}
                    className="w-32 h-32 rounded-xl border-3 border-baker-brown-dark shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                    }}
                  />
                  <p className="text-xs text-baker-brown text-center mt-2 font-nunito">Scan to pay</p>
                </div>
              </div>
            </div>
          )}

          {/* Reference Number */}
          <div className="bg-baker-gold-light border-3 border-baker-brown-dark rounded-xl p-4">
            <h4 className="font-fredoka font-bold text-baker-brown-dark mb-2">📸 Payment Proof Required</h4>
            <p className="text-sm text-baker-brown font-nunito">
              After making your payment, please take a screenshot of your payment receipt and attach it when you send your order via Messenger. This helps us verify and process your order quickly.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="retro-card rounded-xl p-6">
          <h2 className="text-2xl font-fredoka font-bold text-baker-brown-dark mb-6">Final Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-baker-gold-light rounded-xl p-4 border-3 border-baker-brown-dark">
              <h4 className="font-fredoka font-bold text-baker-brown-dark mb-2">Customer Details</h4>
              <p className="text-sm text-baker-brown font-nunito">Name: {customerName}</p>
              <p className="text-sm text-baker-brown font-nunito">Contact: {contactNumber}</p>
              <p className="text-sm text-baker-brown font-nunito">Service: {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
              {serviceType === 'delivery' && (
                <>
                  <p className="text-sm text-baker-brown font-nunito">Address: {address}</p>
                  {landmark && <p className="text-sm text-baker-brown font-nunito">Landmark: {landmark}</p>}
                  {deliveryDateTime && (
                    <p className="text-sm text-baker-brown font-nunito">
                      Delivery Date: {new Date(deliveryDateTime).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </>
              )}
              {serviceType === 'pickup' && (
                <p className="text-sm text-baker-brown font-nunito">
                  Pickup Time: {pickupTime === 'custom' ? customTime : `${pickupTime} minutes`}
                </p>
              )}
              {serviceType === 'dine-in' && (
                <>
                  <p className="text-sm text-baker-brown font-nunito">
                    Party Size: {partySize} person{partySize !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-baker-brown font-nunito">
                    Preferred Date: {dineInTime ? new Date(dineInTime).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    }) : 'Not selected'}
                  </p>
                </>
              )}
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b-2 border-baker-brown-dark">
                <div>
                  <h4 className="font-fredoka font-semibold text-baker-brown-dark">{item.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-sm text-baker-brown font-nunito">Size: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-sm text-baker-brown font-nunito">
                      Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-baker-brown font-nunito">₱{item.totalPrice} x {item.quantity}</p>
                </div>
                <span className="font-fredoka font-bold text-baker-brown-dark">₱{item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t-3 border-baker-brown-dark pt-4 mb-6">
            <div className="flex items-center justify-between text-2xl font-fredoka font-bold text-baker-brown-dark">
              <span>Total:</span>
              <span className="text-baker-red">₱{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 rounded-xl font-fredoka font-bold text-lg transition-all duration-200 bg-baker-orange text-white hover:bg-baker-orange-light retro-button"
          >
            Place Order via Messenger
          </button>
          
          <p className="text-xs text-baker-brown text-center mt-3 font-nunito">
            You'll be redirected to Facebook Messenger to confirm your order. Don't forget to attach your payment screenshot!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;