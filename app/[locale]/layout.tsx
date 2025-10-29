import type { Metadata } from "next";
import "../../styles/globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FloatingCartButton from "@/components/FloatingCartButton";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import { CartProvider } from "@/components/cart/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bakery — Anthropic-inspired Starter",
  description:
    "Clean, typographic bakery website starter built with Next.js and Tailwind.",
  openGraph: {
    title: "Bakery — Anthropic-inspired Starter",
    description:
      "Clean, typographic bakery website starter built with Next.js and Tailwind.",
    url: "http://localhost:3000",
    siteName: "Bakery Starter",
    images: [{ url: "/home/seasonal.svg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const t = await getTranslations('cta');

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 
                                     bg-black text-white px-3 py-2 rounded"
          >
            Skip to content
          </a>
          <CartProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            {/* Chat + floating cart on mobile (inside provider so cart is accessible) */}
            <ChatWidget />
            <FloatingCartButton />
          </CartProvider>
          {/* Removed mobile floating Order Now button per request */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
