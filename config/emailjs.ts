export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  orderTemplateId: process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
}

// Debug log
console.log('EmailJS Config:', {
  serviceId: !!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: !!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  orderTemplateId: !!process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID,
  publicKey: !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
}); 