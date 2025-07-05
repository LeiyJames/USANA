export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export const CART_STORAGE_KEY = 'usana-cart'

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY)
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Failed to save cart:', error)
  }
}

export const addToCart = (item: Omit<CartItem, 'quantity'>): CartItem[] => {
  const cart = getCart()
  const existingItem = cart.find(cartItem => cartItem.id === item.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }
  
  saveCart(cart)
  return cart
}

export const removeFromCart = (itemId: string): CartItem[] => {
  const cart = getCart().filter(item => item.id !== itemId)
  saveCart(cart)
  return cart
}

export const updateQuantity = (itemId: string, quantity: number): CartItem[] => {
  const cart = getCart()
  const item = cart.find(item => item.id === itemId)
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(itemId)
    }
    item.quantity = quantity
    saveCart(cart)
  }
  
  return cart
}

export const clearCart = (): void => {
  saveCart([])
}

export const getCartTotal = (): number => {
  const cart = getCart()
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const getCartItemCount = (): number => {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
} 