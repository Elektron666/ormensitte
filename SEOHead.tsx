'use client';

import { useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface SEOHeadProps {
  page: 'home' | 'about' | 'fabrics' | 'contact' | 'professional' | 'articles' | string;
  language: 'tr' | 'en';
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  customImage?: string;
  customUrl?: string;
}

export function SEOHead({ 
  page, 
  language, 
  customTitle, 
  customDescription, 
  customKeywords,
  customImage,
  customUrl 
}: SEOHeadProps) {
  const { siteContent } = useAdmin();

  useEffect(() => {
    // Get SEO settings from admin context
    const seoSettings = siteContent?.seo;
    
    // Page-specific SEO data
    const pageData = {
      home: {
        title: {
          tr: customTitle || seoSettings?.siteName?.tr || 'Ormen Tekstil - Ankara Kumaş',
          en: customTitle || seoSettings?.siteName?.en || 'Ormen Tekstil - Ankara Fabric'
        },
        description: {
          tr: customDescription || seoSettings?.siteDescription?.tr || 'Ankara\'nın en köklü kumaş firması. Boucle, kadife, döşemelik kumaş çeşitleri. 25 yıllık deneyim.',
          en: customDescription || seoSettings?.siteDescription?.en || 'Ankara\'s most established fabric company. Boucle, velvet, upholstery fabric varieties. 25 years of experience.'
        },
        keywords: customKeywords || seoSettings?.keywords || ['ankara kumaş', 'döşemelik kumaş', 'boucle kumaş', 'kadife kumaş']
      },
      articles: {
        title: {
          tr: 'SEO Makaleleri - Ormen Tekstil',
          en: 'SEO Articles - Ormen Tekstil'
        },
        description: {
          tr: 'Ankara kumaş dünyasından uzman yazıları, trend analizleri ve rehberler. SEO optimizasyonlu içerikler.',
          en: 'Expert articles, trend analysis and guides from Ankara fabric world. SEO optimized content.'
        },
        keywords: ['ankara kumaş makaleler', 'kumaş rehberi', 'döşemelik kumaş seo', 'boucle kumaş blog']
      }
    };

    // Get current page data or default to home
    const currentPageData = pageData[page as keyof typeof pageData] || pageData.home;
    
    // Set title
    const title = currentPageData.title[language];
    document.title = title;
    
    // Set meta description
    const description = currentPageData.description[language];
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Set keywords
    const keywords = currentPageData.keywords.join(', ');
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
    
    // Set canonical URL
    const canonicalUrl = customUrl || seoSettings?.canonical || 'https://ormentekstil.com.tr';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Set Open Graph tags
    const ogImage = customImage || seoSettings?.ogImage || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=630&fit=crop';
    
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: seoSettings?.siteName?.tr || 'Ormen Tekstil' }
    ];
    
    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Set Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: seoSettings?.twitterCard || 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ];
    
    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Set robots
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', seoSettings?.robots || 'index, follow');
    
    // Set language
    document.documentElement.setAttribute('lang', language);
    
  }, [page, language, customTitle, customDescription, customKeywords, customImage, customUrl, siteContent]);

  return null;
}
