/**
 * Cookie utility functions for storing and retrieving customer data
 */

export const setCookie = (name: string, value: string, days: number = 365): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Save customer data to cookies
 */
export const saveCustomerData = (data: {
  customerName?: string;
  contactNumber?: string;
  serviceType?: string;
  address?: string;
  landmark?: string;
  pickupTime?: string;
  customTime?: string;
  partySize?: number;
  dineInTime?: string;
  deliveryDateTime?: string;
  paymentMethod?: string;
  notes?: string;
}): void => {
  // Save each field individually
  if (data.customerName !== undefined) {
    setCookie('kuya_baker_customer_name', data.customerName);
  }
  if (data.contactNumber !== undefined) {
    setCookie('kuya_baker_contact_number', data.contactNumber);
  }
  if (data.serviceType !== undefined) {
    setCookie('kuya_baker_service_type', data.serviceType);
  }
  if (data.address !== undefined) {
    setCookie('kuya_baker_address', data.address);
  }
  if (data.landmark !== undefined) {
    setCookie('kuya_baker_landmark', data.landmark);
  }
  if (data.pickupTime !== undefined) {
    setCookie('kuya_baker_pickup_time', data.pickupTime);
  }
  if (data.customTime !== undefined) {
    setCookie('kuya_baker_custom_time', data.customTime);
  }
  if (data.partySize !== undefined) {
    setCookie('kuya_baker_party_size', data.partySize.toString());
  }
  if (data.dineInTime !== undefined) {
    setCookie('kuya_baker_dine_in_time', data.dineInTime);
  }
  if (data.deliveryDateTime !== undefined) {
    setCookie('kuya_baker_delivery_date_time', data.deliveryDateTime);
  }
  if (data.paymentMethod !== undefined) {
    setCookie('kuya_baker_payment_method', data.paymentMethod);
  }
  if (data.notes !== undefined) {
    setCookie('kuya_baker_notes', data.notes);
  }
};

/**
 * Load customer data from cookies
 */
export const loadCustomerData = (): {
  customerName: string;
  contactNumber: string;
  serviceType: string;
  address: string;
  landmark: string;
  pickupTime: string;
  customTime: string;
  partySize: number;
  dineInTime: string;
  deliveryDateTime: string;
  paymentMethod: string;
  notes: string;
} => {
  return {
    customerName: getCookie('kuya_baker_customer_name') || '',
    contactNumber: getCookie('kuya_baker_contact_number') || '',
    serviceType: getCookie('kuya_baker_service_type') || 'pickup',
    address: getCookie('kuya_baker_address') || '',
    landmark: getCookie('kuya_baker_landmark') || '',
    pickupTime: getCookie('kuya_baker_pickup_time') || '5-10',
    customTime: getCookie('kuya_baker_custom_time') || '',
    partySize: parseInt(getCookie('kuya_baker_party_size') || '1', 10),
    dineInTime: getCookie('kuya_baker_dine_in_time') || '',
    deliveryDateTime: getCookie('kuya_baker_delivery_date_time') || '',
    paymentMethod: getCookie('kuya_baker_payment_method') || 'gcash',
    notes: getCookie('kuya_baker_notes') || '',
  };
};

