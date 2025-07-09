'use client'

export const dynamic = 'force-dynamic'

import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { sendOrderConfirmation } from '@/utils/emailService'
import { validateHoneypot } from '@/utils/orderSecurity'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import type { CartItem } from '@/contexts/CartContext'

type CheckoutFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  website?: string // Honeypot field
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [isClient, setIsClient] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormData>()

  useEffect(() => {
    setIsClient(true)
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items.length, router])

  const subtotal = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 250 // Updated shipping threshold to ₱5000
  const tax = subtotal * 0.12 // 12% VAT rate for Philippines
  const total = subtotal + shipping + tax

  const onSubmit = async (data: CheckoutFormData) => {
    // Check honeypot
    if (!validateHoneypot(data.website)) {
      console.log('Bot submission detected');
      toast.error('Invalid submission');
      return;
    }

    const loadingToast = toast.loading('Processing your order...');
    
    try {
      // Check rate limit
      const limitCheck = await fetch('/api/check-order-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email })
      });

      const limitResult = await limitCheck.json();
      
      if (!limitCheck.ok) {
        throw new Error(limitResult.error || 'Rate limit exceeded');
      }

      // Generate a unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Format order data for confirmation email
      const orderData = {
        email: data.email,
        orderId,
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          units: item.quantity,
          image: item.image
        })),
        shipping,
        tax,
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
          phone: data.phone
        }
      };

      // Send order confirmation email
      const emailResult = await sendOrderConfirmation(orderData);

      if (!emailResult.success) {
        throw new Error(emailResult.message);
      }

      // Clear cart and show success message
      clearCart();
      toast.success('Order placed successfully!', { id: loadingToast });
      router.push('/thankyou');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to process order. Please try again.',
        { id: loadingToast }
      );
    }
  };

  if (!isClient) {
    return null; // Return null during server-side rendering
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="container py-16">
        <h1 className="heading-2 text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="checkout-form">
                {/* Honeypot field - hidden from real users */}
                <div className="hidden">
                  <input
                    type="text"
                    id="website"
                    {...register('website')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="label">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className={`input ${errors.firstName ? 'border-red-500' : ''}`}
                        {...register('firstName', { required: 'First name is required' })}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="label">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className={`input ${errors.lastName ? 'border-red-500' : ''}`}
                        {...register('lastName', { required: 'Last name is required' })}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="label">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`input ${errors.email ? 'border-red-500' : ''}`}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="label">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className={`input ${errors.phone ? 'border-red-500' : ''}`}
                        {...register('phone', { required: 'Phone number is required' })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="label">
                        Street Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        className={`input ${errors.address ? 'border-red-500' : ''}`}
                        {...register('address', { required: 'Address is required' })}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="label">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          className={`input ${errors.city ? 'border-red-500' : ''}`}
                          {...register('city', { required: 'City is required' })}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="state" className="label">
                          State/Province
                        </label>
                        <input
                          id="state"
                          type="text"
                          className={`input ${errors.state ? 'border-red-500' : ''}`}
                          {...register('state', { required: 'State/Province is required' })}
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="label">
                          ZIP/Postal Code
                        </label>
                        <input
                          id="zipCode"
                          type="text"
                          className={`input ${errors.zipCode ? 'border-red-500' : ''}`}
                          {...register('zipCode', { required: 'ZIP/Postal Code is required' })}
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="country" className="label">
                          Country
                        </label>
                        <input
                          id="country"
                          type="text"
                          className={`input ${errors.country ? 'border-red-500' : ''}`}
                          {...register('country', { required: 'Country is required' })}
                        />
                        {errors.country && (
                          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary for Mobile */}
                <div className="lg:hidden">
                  <div className="border-t pt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4 text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₱{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        {shipping === 0 ? (
                          <span className="text-primary-500">Free</span>
                        ) : (
                          <span>₱{shipping.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>VAT (12%)</span>
                        <span>₱{tax.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-gray-900">
                          <span>Total</span>
                          <span>₱{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary for Desktop */}
          <div className="hidden lg:block">
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-primary-500">Free</span>
                  ) : (
                    <span>₱{shipping.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>VAT (12%)</span>
                  <span>₱{tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Add ₱{(5000 - subtotal).toLocaleString()} more to qualify for free shipping
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 