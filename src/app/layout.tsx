import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioBackground from "@/components/AudioBackground";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import StructuredData from "@/components/seo/StructuredData";
import LinkEnhancer from "@/components/ui/LinkEnhancer";
import Analytics from "@/components/seo/Analytics";
import LoadingProvider from "@/components/providers/LoadingProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import CustomCursor from "@/components/ui/CustomCursor";

// Import Google Fonts
import { Playfair_Display, Montserrat, Cormorant_Garamond } from 'next/font/google';

// Initialize fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://vistagranderealty.com'),
  title: "Vista Grande Realty LTD - Where Vision Meets Value",
  description: "Transforming Spaces. Elevating Lifestyles. Building Tomorrow. Premium real estate developments across Nigeria starting from Ibadan.",
  keywords: "Vista Grande, real estate, luxury properties, Nigeria, Ibadan, Lagos, Ogun, Oyo, residential development, commercial properties, investment",
  authors: [{ name: "Vista Grande Realty LTD" }],
  creator: "Vista Grande Realty LTD",
  publisher: "Vista Grande Realty LTD",
  openGraph: {
    title: "Vista Grande Realty LTD - Where Vision Meets Value",
    description: "Transforming Spaces. Elevating Lifestyles. Building Tomorrow.",
    url: "https://vistagranderealty.com",
    siteName: "Vista Grande Realty LTD",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vista Grande Realty LTD",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vista Grande Realty LTD - Where Vision Meets Value",
    description: "Transforming Spaces. Elevating Lifestyles. Building Tomorrow.",
    images: ["/twitter-image.jpg"],
    creator: "@vistagranderealty",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <StructuredData
          type="Organization"
          data={{
            streetAddress: "Ibadan, Oyo State",
            telephone: "+234-XXX-XXX-XXXX"
          }}
        />
        <StructuredData type="WebSite" data={{}} />
        <Suspense fallback={null}>
          <Analytics
            googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
            facebookPixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID}
          />
        </Suspense>
      </head>
      <body className="font-body luxury-bg-gradient luxury-bg-pattern text-white min-h-screen flex flex-col relative">
        {/* Enhanced Background Elements */}
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="luxury-bg-mesh fixed inset-0 pointer-events-none z-0"></div>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-gold text-primary-black px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <LoadingProvider>
          <Suspense fallback={null}>
            <PageTransitionProvider>
              {/* Custom cursor removed for a more mature design */}
              <ErrorBoundary>
                <div className="relative z-10">
                  <Navbar />
                  <LinkEnhancer />
                  <AudioBackground />
                  <main id="main-content" className="flex-grow relative z-10" role="main">
                    {children}
                  </main>
                  <Footer />
                </div>
              </ErrorBoundary>
            </PageTransitionProvider>
          </Suspense>
        </LoadingProvider>
      </body>
    </html>
  );
}
