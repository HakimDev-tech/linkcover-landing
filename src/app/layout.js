import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'LinkCover - Never share a naked link again',
  description: 'Generate social preview images for your links in 3 seconds. No account needed.',
  icons: {
    icon: '/images/favicon.ico',
  },
  openGraph: {
    title: 'LinkCover - Never share a naked link again',
    description: 'Generate social preview images for your links in 3 seconds.',
    images: ['/imaes/og-default.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Analytics />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
