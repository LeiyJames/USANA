import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from './ClientLayout';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'USANA Health Sciences',
  description: 'Premium nutritional supplements and skincare products.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
} 