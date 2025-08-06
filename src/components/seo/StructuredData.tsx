interface StructuredDataProps {
  type: 'Organization' | 'RealEstateAgent' | 'Property' | 'WebSite'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type
    }

    switch (type) {
      case 'Organization':
        return {
          ...baseData,
          name: "Vista Grande Realty LTD",
          alternateName: "Vista Grande",
          url: "https://vistagranderealty.com",
          logo: "https://vistagranderealty.com/logo.png",
          description: "Where Vision Meets Value. Transforming Spaces. Elevating Lifestyles. Building Tomorrow.",
          address: {
            "@type": "PostalAddress",
            streetAddress: data.streetAddress || "Ibadan",
            addressLocality: "Ibadan",
            addressRegion: "Oyo State",
            addressCountry: "Nigeria"
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: data.telephone || "+234-XXX-XXX-XXXX",
            contactType: "customer service",
            availableLanguage: ["English"]
          },
          sameAs: [
            "https://facebook.com/VistaGrandeRealty",
            "https://instagram.com/vistagranderealty",
            "https://linkedin.com/company/vista-grande-realty-ltd"
          ],
          foundingDate: "2010",
          numberOfEmployees: "50+",
          slogan: "Where Vision Meets Value"
        }

      case 'RealEstateAgent':
        return {
          ...baseData,
          name: "Vista Grande Realty LTD",
          description: "Premium real estate developments across Nigeria",
          serviceArea: {
            "@type": "State",
            name: ["Lagos", "Ogun", "Oyo"]
          },
          areaServed: ["Nigeria"],
          knowsAbout: [
            "Residential Development",
            "Commercial Properties", 
            "Land Development",
            "Property Investment",
            "Real Estate Advisory"
          ]
        }

      case 'Property':
        return {
          ...baseData,
          "@type": "RealEstateListing",
          name: data.name,
          description: data.description,
          price: {
            "@type": "PriceSpecification",
            price: data.price,
            priceCurrency: "NGN"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: data.location,
            addressCountry: "Nigeria"
          },
          floorSize: {
            "@type": "QuantitativeValue",
            value: data.size,
            unitText: "sqm"
          },
          datePosted: data.datePosted || new Date().toISOString(),
          availabilityStarts: data.availabilityStarts || new Date().toISOString()
        }

      case 'WebSite':
        return {
          ...baseData,
          name: "Vista Grande Realty LTD",
          url: "https://vistagranderealty.com",
          description: "Where Vision Meets Value. Premium real estate developments across Nigeria.",
          publisher: {
            "@type": "Organization",
            name: "Vista Grande Realty LTD"
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://vistagranderealty.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }

      default:
        return baseData
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData())
      }}
    />
  )
}
