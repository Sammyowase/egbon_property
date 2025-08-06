'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface AnalyticsProps {
  googleAnalyticsId?: string
  facebookPixelId?: string
}

function AnalyticsInner({ googleAnalyticsId, facebookPixelId }: AnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (googleAnalyticsId) {
      // Track page views
      window.gtag?.('config', googleAnalyticsId, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      })
    }
  }, [pathname, searchParams, googleAnalyticsId])

  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebookPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  )
}

export default function Analytics(props: AnalyticsProps) {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner {...props} />
    </Suspense>
  )
}

// Analytics event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

export const trackPropertyView = (propertyId: string, propertyName: string, price: string) => {
  trackEvent('view_item', {
    item_id: propertyId,
    item_name: propertyName,
    value: parseFloat(price.replace(/[^\d.]/g, '')),
    currency: 'NGN',
    item_category: 'Property'
  })
}

export const trackPropertyInquiry = (propertyId: string, inquiryType: string) => {
  trackEvent('generate_lead', {
    item_id: propertyId,
    lead_type: inquiryType,
    value: 1
  })
}

export const trackSearch = (searchTerm: string, filters?: Record<string, any>) => {
  trackEvent('search', {
    search_term: searchTerm,
    ...filters
  })
}
