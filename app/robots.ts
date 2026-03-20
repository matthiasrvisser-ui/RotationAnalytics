import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/status/', '/submit'],
      },
    ],
    sitemap: 'https://www.rotationanalytics.ca/sitemap.xml',
  }
}
