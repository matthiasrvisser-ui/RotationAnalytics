export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Rotation Analytics Inc',
    alternateName: 'Rotation Analytics',
    url: 'https://www.rotationanalytics.ca',
    logo: 'https://www.rotationanalytics.ca/logo/rotation-analytics-logo.svg',
    image: 'https://www.rotationanalytics.ca/logo/rotation-analytics-logo.svg',
    description:
      'Independent rotational risk analysis firm providing structured third-party review of rotation schedules — identifying collective agreement non-compliance, fatigue risk exposure, and scheduling vulnerabilities through biomathematical modelling and OHS standards.',
    email: 'hello@rotationanalytics.ca',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    serviceType: [
      'Rotation Schedule Analysis',
      'Collective Agreement Compliance Review',
      'Fatigue Risk Assessment',
      'Shift Schedule Audit',
    ],
    knowsAbout: [
      'Rotation schedule analysis',
      'Collective agreement compliance',
      'Fatigue risk assessment',
      'Biomathematical fatigue modeling',
      'Shift scheduling',
      'Labour standards compliance',
      'Occupational health and safety',
    ],
    slogan: 'Clarity from Complexity.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Visser Ventures Corp.',
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rotation Analytics',
    url: 'https://www.rotationanalytics.ca',
    description:
      'Structured, independent analysis of rotation schedules — identifying collective agreement non-compliance, fatigue risk, and scheduling vulnerabilities.',
    publisher: {
      '@type': 'Organization',
      name: 'Rotation Analytics Inc',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Rotation Schedule Analysis',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Rotation Analytics Inc',
      url: 'https://www.rotationanalytics.ca',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    description:
      'Independent rotational risk analysis of complex staffing schedules against collective agreements, occupational health and safety standards, and fatigue science principles including biomathematical modelling.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0.35',
      highPrice: '0.50',
      priceCurrency: 'CAD',
      description:
        'Per-shift pricing: $0.35 CAD/shift for Compliance Analysis, $0.50 CAD/shift combined with Fatigue Risk Analysis. DDO surcharge +$0.15/shift where applicable. $225 CAD minimum engagement.',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Rotation Analysis Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Collective Agreement Compliance Review',
            description:
              'Every shift evaluated against applicable collective agreement provisions across the full rotation cycle.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fatigue Risk Analysis',
            description:
              'Biomathematical fatigue modelling applied across the full rotation cycle, assessing sleep opportunity, circadian disruption, and cumulative fatigue exposure.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Executive Summary Report',
            description:
              'Structured findings report with risk-classified findings, agreement references, and marked rotation schedule.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
