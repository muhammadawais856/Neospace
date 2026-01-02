// Cart utility functions for managing cart in localStorage

const CART_STORAGE_KEY = 'neospace_cart';

/**
 * Get cart from localStorage
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : { items: [] };
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
    return { items: [] };
  }
};

/**
 * Save cart to localStorage
 */
export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

/**
 * Add item to cart
 */
export const addToCart = (item) => {
  const cart = getCart();
  
  // Create cart item
  const cartItem = {
    id: `${item.business_name}_${item.product_id}_${Date.now()}`,
    business_name: item.business_name || 'Unknown Store',
    product_id: item.product_id,
    product_name: item.product_name,
    price: parseFloat(item.price) || 0,
    quantity: parseFloat(item.quantity) || 1,
    total_amount: (parseFloat(item.price) || 0) * (parseFloat(item.quantity) || 1),
    date: new Date().toISOString(),
    user_id: item.user_id || 'default_user',
    image: item.image || '',
    store_type: item.store_type || 'small_business', // 'small_business' or 'nustfruita'
    description: item.description || '',
    unit_type: item.unit_type || null // For NUSTFruita (kg, etc.)
  };

  // Add item to cart
  cart.items.push(cartItem);
  
  // Save cart
  saveCart(cart);
  
  // Dispatch custom event for cart update
  window.dispatchEvent(new Event('cartUpdated'));
  
  return cart;
};

/**
 * Remove item from cart
 */
export const removeFromCart = (itemId) => {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.id !== itemId);
  saveCart(cart);
  
  // Dispatch custom event for cart update
  window.dispatchEvent(new Event('cartUpdated'));
  
  return cart;
};

/**
 * Update item quantity in cart
 */
export const updateCartItemQuantity = (itemId, newQuantity) => {
  const cart = getCart();
  const item = cart.items.find(item => item.id === itemId);
  
  if (item) {
    item.quantity = parseFloat(newQuantity) || 1;
    item.total_amount = item.price * item.quantity;
    saveCart(cart);
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
  }
  
  return cart;
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  saveCart({ items: [] });
  
  // Dispatch custom event for cart update
  window.dispatchEvent(new Event('cartUpdated'));
  
  return { items: [] };
};

/**
 * Get cart organized by store/business
 */
export const getCartByStores = () => {
  const cart = getCart();
  const stores = {};
  
  cart.items.forEach(item => {
    const storeName = item.business_name;
    if (!stores[storeName]) {
      stores[storeName] = {
        business_name: storeName,
        store_type: item.store_type,
        items: [],
        subtotal: 0
      };
    }
    
    stores[storeName].items.push(item);
    stores[storeName].subtotal += item.total_amount;
  });
  
  return Object.values(stores);
};

/**
 * Get total cart amount
 */
export const getCartTotal = () => {
  const cart = getCart();
  return cart.items.reduce((total, item) => total + item.total_amount, 0);
};

/**
 * Get total items count
 */
export const getCartItemsCount = () => {
  const cart = getCart();
  return cart.items.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Check if product already exists in cart
 */
export const isProductInCart = (productId, businessName) => {
  const cart = getCart();
  return cart.items.some(item => 
    item.product_id === productId && item.business_name === businessName
  );
};

