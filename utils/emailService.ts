'use client'

import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/config/emailjs';

export type EmailData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
};

export type OrderConfirmationData = {
  email: string;
  orderId: string;
  items: Array<{
    name: string;
    price: number;
    units: number;
    image: string;
  }>;
  shipping: number;
  tax: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
};

// Validate EmailJS configuration
const validateConfig = () => {
  const missingVars = [];
  if (!emailjsConfig.serviceId) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
  if (!emailjsConfig.orderTemplateId) missingVars.push('NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID');
  if (!emailjsConfig.publicKey) missingVars.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');

  if (missingVars.length > 0) {
    throw new Error(`Missing required EmailJS configuration: ${missingVars.join(', ')}`);
  }
};

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    validateConfig();
    
    const templateParams = {
      to_name: 'USANA Support',
      from_name: data.name,
      reply_to: data.email,
      subject: data.subject || 'Contact Form Submission',
      message: data.message,
      phone_number: data.phone || 'Not provided',
      email: data.email
    };

    console.log('Sending contact email with params:', templateParams);

    const response = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    );

    console.log('Contact email response:', response);

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email. Please try again later.'
    };
  }
};

export const sendOrderConfirmation = async (data: OrderConfirmationData): Promise<{ success: boolean; message: string }> => {
  try {
    validateConfig();

    // Calculate subtotal and format items for the email template
    const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.units), 0);
    const formattedItems = data.items.map(item => ({
      name: item.name,
      unit_price: item.price.toLocaleString(),
      units: item.units,
      line_total: (item.price * item.units).toLocaleString(),
      image_url: item.image
    }));

    const templateParams = {
      email: data.email,
      order_id: data.orderId,
      orders: formattedItems,
      cost: {
        subtotal: subtotal.toLocaleString(),
        shipping: data.shipping.toLocaleString(),
        tax: data.tax.toLocaleString(),
        total: (subtotal + data.shipping + data.tax).toLocaleString(),
        free_shipping: data.shipping === 0
      },
      customer_name: `${data.shippingAddress.firstName} ${data.shippingAddress.lastName}`,
      shipping_address: `${data.shippingAddress.address}, ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zipCode}, ${data.shippingAddress.country}`,
      phone: data.shippingAddress.phone
    };

    console.log('Sending order confirmation with params:', templateParams);
    console.log('Using EmailJS config:', {
      serviceId: emailjsConfig.serviceId,
      orderTemplateId: emailjsConfig.orderTemplateId,
      hasPublicKey: !!emailjsConfig.publicKey
    });

    const response = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.orderTemplateId,
      templateParams,
      emailjsConfig.publicKey
    );

    console.log('Order confirmation response:', response);

    if (response.status === 200) {
      return {
        success: true,
        message: 'Order confirmation email sent successfully!'
      };
    } else {
      throw new Error('Failed to send order confirmation');
    }
  } catch (error) {
    console.error('Order confirmation email error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send order confirmation email.'
    };
  }
}; 