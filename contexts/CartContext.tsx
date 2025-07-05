'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Toast from '@/app/components/Toast'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export type CartContextType = {
  items: CartItem[]
  itemCount: number
  totalQuantity: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Helper function to safely access localStorage
const getStorageValue = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') {
    return defaultValue
  }
  
  try {
    const saved = localStorage.getItem(key)
    if (!saved) {
      return defaultValue
    }
    return JSON.parse(saved)
  } catch (err) {
    console.error('Error reading from localStorage:', err)
    return defaultValue
  }
}

type ToastType = 'success' | 'error' | 'info'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success' as ToastType
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedItems = getStorageValue('cart', [])
    setItems(savedItems)
    setIsLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('cart', JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
      }
    }
  }, [items, isLoading])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ isVisible: true, message, type })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  const addItem = (newItem: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id)
      
      if (existingItem) {
        showToast(`Updated ${newItem.name} quantity in cart`)
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      showToast(`Added ${newItem.name} to cart`)
      return [...currentItems, { ...newItem, quantity }]
    })
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find(item => item.id === id)
      if (itemToRemove) {
        showToast(`Removed ${itemToRemove.name} from cart`, 'info')
      }
      return currentItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.length
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    items,
    itemCount,
    totalQuantity,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 