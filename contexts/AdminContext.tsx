'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

// Enhanced interfaces for complete admin functionality
interface Page {
  id: string;
  title: { tr: string; en: string };
  slug: { tr: string; en: string };
  content: { tr: string; en: string };
  metaDescription: { tr: string; en: string };
  metaKeywords: string[];
  published: boolean;
  featured: boolean;
  order: number;
  template: 'default' | 'landing' | 'blog' | 'gallery';
  createdAt: string;
  updatedAt: string;
  author: string;
  views: number;
}

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  alt: string;
  tags: string[];
  uploadDate: string;
  folder: string;
  dimensions?: { width: number; height: number };
}

interface SEOSettings {
  siteName: { tr: string; en: string };
  siteDescription: { tr: string; en: string };
  keywords: string[];
  googleAnalyticsId: string;
  googleSearchConsoleId: string;
  facebookPixelId: string;
  twitterCard: 'summary' | 'summary_large_image';
  ogImage: string;
  robots: string;
  canonical: string;
  structuredData: any;
}

interface Analytics {
  pageViews: { [key: string]: number };
  visitors: { [key: string]: number };
  topPages: Array<{ page: string; views: number }>;
  topKeywords: Array<{ keyword: string; count: number }>;
  referrers: Array<{ source: string; count: number }>;
  deviceStats: { desktop: number; mobile: number; tablet: number };
  lastUpdated: string;
}

interface Article {
  id: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  content: { tr: string; en: string };
  image: string;
  tags: { tr: string[]; en: string[] };
  keywords: string[];
  publishDate: string;
  author: string;
  category: string;
  readTime: number;
  views: number;
  featured: boolean;
  published: boolean;
  seoTitle: { tr: string; en: string };
  seoDescription: { tr: string; en: string };
  slug: { tr: string; en: string };
}

// Enhanced existing pages content structure
interface ExistingPagesContent {
  about: {
    hero: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      backgroundImage: string;
    };
    story: {
      title: { tr: string; en: string };
      content: { tr: string; en: string };
      image: string;
    };
    values: {
      title: { tr: string; en: string };
      items: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        icon: string;
      }>;
    };
    team: {
      title: { tr: string; en: string };
      description: { tr: string; en: string };
      members: Array<{
        name: string;
        position: { tr: string; en: string };
        image: string;
        bio: { tr: string; en: string };
      }>;
    };
  };
  contact: {
    hero: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
    };
    info: {
      address: { tr: string; en: string };
      phone: string;
      email: string;
      workingHours: { tr: string; en: string };
      directions: { tr: string; en: string };
    };
    form: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      successMessage: { tr: string; en: string };
      fields: {
        name: { tr: string; en: string };
        email: { tr: string; en: string };
        phone: { tr: string; en: string };
        subject: { tr: string; en: string };
        message: { tr: string; en: string };
        submitButton: { tr: string; en: string };
      };
    };
  };
  professional: {
    hero: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      backgroundImage: string;
    };
    services: {
      title: { tr: string; en: string };
      description: { tr: string; en: string };
      items: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        features: { tr: string[]; en: string[] };
        image: string;
        icon: string;
      }>;
    };
    process: {
      title: { tr: string; en: string };
      description: { tr: string; en: string };
      steps: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        icon: string;
      }>;
    };
    portfolio: {
      title: { tr: string; en: string };
      description: { tr: string; en: string };
      projects: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        image: string;
        category: string;
        client: string;
      }>;
    };
  };
  fabrics: {
    hero: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      backgroundImage: string;
    };
    categories: {
      title: { tr: string; en: string };
      description: { tr: string; en: string };
      items: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        features: { tr: string[]; en: string[] };
        image: string;
        gallery: string[];
        specifications: {
          material: { tr: string; en: string };
          width: string;
          weight: string;
          care: { tr: string; en: string };
        };
      }>;
    };
    guide: {
      title: { tr: string; en: string };
      description: { tr: string; en: string };
      tips: Array<{
        title: { tr: string; en: string };
        content: { tr: string; en: string };
        icon: string;
      }>;
    };
  };
  home: {
    hero: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      backgroundImage: string;
      ctaText: { tr: string; en: string };
      ctaLink: string;
    };
    boucle: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      features: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        icon: string;
      }>;
      gallery: string[];
    };
    velvet: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      features: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        icon: string;
      }>;
      gallery: string[];
    };
    design: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      services: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        icon: string;
      }>;
    };
    commercial: {
      title: { tr: string; en: string };
      subtitle: { tr: string; en: string };
      description: { tr: string; en: string };
      solutions: Array<{
        title: { tr: string; en: string };
        description: { tr: string; en: string };
        benefits: { tr: string[]; en: string[] };
        icon: string;
      }>;
    };
  };
}

interface SiteContent {
  // Existing basic content
  hero: {
    title: { tr: string; en: string };
    subtitle: { tr: string; en: string };
    description: { tr: string; en: string };
    backgroundImage: string;
    ctaText: { tr: string; en: string };
    ctaLink: string;
  };
  about: {
    title: { tr: string; en: string };
    description: { tr: string; en: string };
    features: Array<{
      title: { tr: string; en: string };
      description: { tr: string; en: string };
      icon: string;
    }>;
  };
  contact: {
    address: { tr: string; en: string };
    phone: string;
    email: string;
    workingHours: { tr: string; en: string };
    socialMedia: {
      facebook: string;
      instagram: string;
      twitter: string;
      linkedin: string;
    };
  };
  // Enhanced with new sections
  pages: { posts: Page[] };
  media: { files: MediaFile[] };
  seo: SEOSettings;
  analytics: Analytics;
  articles: { posts: Article[] };
  // New comprehensive existing pages content
  existingPages: ExistingPagesContent;
}

interface AdminContextType {
  siteContent: SiteContent;
  updateSiteContent: (content: SiteContent) => void;
  resetToDefaults: () => void;
  exportContent: () => void;
  importContent: (content: SiteContent) => void;
  
  // Article management
  addArticle: (article: Article) => void;
  updateArticle: (id: string, article: Article) => void;
  deleteArticle: (id: string) => void;
  
  // Page management
  addPage: (page: Page) => void;
  updatePage: (id: string, page: Page) => void;
  deletePage: (id: string) => void;
  getPageBySlug: (slug: string, language: 'tr' | 'en') => Page | undefined;
  
  // Media management
  addMedia: (file: MediaFile) => void;
  updateMedia: (id: string, file: MediaFile) => void;
  deleteMedia: (id: string) => void;
  getMediaByType: (type: 'image' | 'video' | 'document') => MediaFile[];
  
  // SEO management
  updateSEO: (seo: SEOSettings) => void;
  
  // Analytics
  updateAnalytics: (analytics: Analytics) => void;
  trackPageView: (page: string) => void;
  
  // Existing pages management
  updateExistingPage: (pageName: keyof ExistingPagesContent, content: any) => void;
  getExistingPageContent: (pageName: keyof ExistingPagesContent) => any;
}

const defaultExistingPagesContent: ExistingPagesContent = {
  about: {
    hero: {
      title: { tr: 'Hakkımızda', en: 'About Us' },
      subtitle: { tr: '25 Yıllık Deneyim', en: '25 Years of Experience' },
      description: { tr: 'Ormen Tekstil olarak 1998 yılından bu yana Ankara\'da faaliyet göstermekteyiz.', en: 'As Ormen Tekstil, we have been operating in Ankara since 1998.' },
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop'
    },
    story: {
      title: { tr: 'Hikayemiz', en: 'Our Story' },
      content: { tr: '1998 yılında küçük bir atölye olarak başlayan yolculuğumuz, bugün Ankara\'nın en köklü kumaş firmalarından biri haline gelmiştir.', en: 'Our journey that started as a small workshop in 1998 has become one of Ankara\'s most established fabric companies today.' },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    },
    values: {
      title: { tr: 'Değerlerimiz', en: 'Our Values' },
      items: [
        {
          title: { tr: 'Kalite', en: 'Quality' },
          description: { tr: 'En yüksek kalite standartları', en: 'Highest quality standards' },
          icon: 'shield'
        },
        {
          title: { tr: 'Güven', en: 'Trust' },
          description: { tr: 'Müşteri memnuniyeti odaklı hizmet', en: 'Customer satisfaction focused service' },
          icon: 'heart'
        },
        {
          title: { tr: 'İnovasyon', en: 'Innovation' },
          description: { tr: 'Sürekli gelişim ve yenilik', en: 'Continuous development and innovation' },
          icon: 'lightbulb'
        }
      ]
    },
    team: {
      title: { tr: 'Ekibimiz', en: 'Our Team' },
      description: { tr: 'Uzman kadromuz ile size hizmet veriyoruz', en: 'We serve you with our expert staff' },
      members: [
        {
          name: 'Fatih Baba',
          position: { tr: 'Genel Müdür', en: 'General Manager' },
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          bio: { tr: '25 yıllık sektör deneyimi', en: '25 years of industry experience' }
        }
      ]
    }
  },
  contact: {
    hero: {
      title: { tr: 'İletişime Geçin', en: 'Get in Touch' },
      subtitle: { tr: 'Size Nasıl Yardımcı Olabiliriz?', en: 'How Can We Help You?' },
      description: { tr: 'Kumaş ihtiyaçlarınız için bizimle iletişime geçin', en: 'Contact us for your fabric needs' }
    },
    info: {
      address: { tr: 'Altındağ/Ankara, Türkiye', en: 'Altındağ/Ankara, Turkey' },
      phone: '0312 349 6888',
      email: 'info@ormentekstil.com.tr',
      workingHours: { tr: 'Pazartesi - Cumartesi: 09:00 - 18:00', en: 'Monday - Saturday: 09:00 - 18:00' },
      directions: { tr: 'Ankara merkeze yakın konumumuzda hizmet veriyoruz', en: 'We serve at our location close to Ankara center' }
    },
    form: {
      title: { tr: 'Mesaj Gönderin', en: 'Send Message' },
      subtitle: { tr: 'Sorularınızı bize iletin', en: 'Send us your questions' },
      successMessage: { tr: 'Mesajınız başarıyla gönderildi!', en: 'Your message has been sent successfully!' },
      fields: {
        name: { tr: 'Adınız Soyadınız', en: 'Your Name' },
        email: { tr: 'E-posta Adresiniz', en: 'Your Email' },
        phone: { tr: 'Telefon Numaranız', en: 'Your Phone' },
        subject: { tr: 'Konu', en: 'Subject' },
        message: { tr: 'Mesajınız', en: 'Your Message' },
        submitButton: { tr: 'Gönder', en: 'Send' }
      }
    }
  },
  professional: {
    hero: {
      title: { tr: 'Profesyonel Çözümler', en: 'Professional Solutions' },
      subtitle: { tr: 'Ticari Projeleriniz İçin', en: 'For Your Commercial Projects' },
      description: { tr: 'Otel, restoran, ofis ve diğer ticari alanlar için özel kumaş çözümleri', en: 'Special fabric solutions for hotels, restaurants, offices and other commercial spaces' },
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop'
    },
    services: {
      title: { tr: 'Hizmetlerimiz', en: 'Our Services' },
      description: { tr: 'Profesyonel projeleriniz için kapsamlı hizmetler', en: 'Comprehensive services for your professional projects' },
      items: [
        {
          title: { tr: 'Otel Projesi', en: 'Hotel Projects' },
          description: { tr: 'Otel odaları ve ortak alanlar için kumaş çözümleri', en: 'Fabric solutions for hotel rooms and common areas' },
          features: { tr: ['Dayanıklı kumaşlar', 'Leke karşıtı özellik', 'Geniş renk seçenekleri'], en: ['Durable fabrics', 'Stain resistant feature', 'Wide color options'] },
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
          icon: 'building'
        },
        {
          title: { tr: 'Restoran & Cafe', en: 'Restaurant & Cafe' },
          description: { tr: 'Yiyecek içecek sektörü için özel kumaşlar', en: 'Special fabrics for food and beverage sector' },
          features: { tr: ['Su itici özellik', 'Kolay temizlik', 'Hijyenik yapı'], en: ['Water repellent feature', 'Easy cleaning', 'Hygienic structure'] },
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
          icon: 'utensils'
        },
        {
          title: { tr: 'Ofis Projesi', en: 'Office Projects' },
          description: { tr: 'Modern ofisler için şık ve fonksiyonel kumaşlar', en: 'Stylish and functional fabrics for modern offices' },
          features: { tr: ['Ses yalıtımı', 'Uzun ömür', 'Profesyonel görünüm'], en: ['Sound insulation', 'Long life', 'Professional appearance'] },
          image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
          icon: 'briefcase'
        }
      ]
    },
    process: {
      title: { tr: 'Çalışma Sürecimiz', en: 'Our Work Process' },
      description: { tr: 'Profesyonel projelerinizi adım adım gerçekleştiriyoruz', en: 'We realize your professional projects step by step' },
      steps: [
        {
          title: { tr: 'Keşif ve Analiz', en: 'Discovery and Analysis' },
          description: { tr: 'Projenizi detaylıca analiz ediyoruz', en: 'We analyze your project in detail' },
          icon: 'search'
        },
        {
          title: { tr: 'Tasarım ve Planlama', en: 'Design and Planning' },
          description: { tr: 'Size özel çözümler tasarlıyoruz', en: 'We design custom solutions for you' },
          icon: 'palette'
        },
        {
          title: { tr: 'Uygulama', en: 'Implementation' },
          description: { tr: 'Projenizi profesyonelce uyguluyoruz', en: 'We implement your project professionally' },
          icon: 'tools'
        }
      ]
    },
    portfolio: {
      title: { tr: 'Projelerimiz', en: 'Our Projects' },
      description: { tr: 'Tamamladığımız başarılı projeler', en: 'Successful projects we have completed' },
      projects: [
        {
          title: { tr: 'Lüks Otel Projesi', en: 'Luxury Hotel Project' },
          description: { tr: '5 yıldızlı otel için kapsamlı kumaş çözümü', en: 'Comprehensive fabric solution for 5-star hotel' },
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
          category: 'Otel',
          client: 'Ankara Palace Hotel'
        }
      ]
    }
  },
  fabrics: {
    hero: {
      title: { tr: 'Kumaş Çeşitlerimiz', en: 'Our Fabric Types' },
      subtitle: { tr: 'Kalite ve Zarafet', en: 'Quality and Elegance' },
      description: { tr: 'En kaliteli kumaşlarla hayallerinizdeki mekanları yaratın', en: 'Create your dream spaces with the highest quality fabrics' },
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop'
    },
    categories: {
      title: { tr: 'Kumaş Kategorileri', en: 'Fabric Categories' },
      description: { tr: 'Her ihtiyacınıza uygun kumaş çeşitleri', en: 'Fabric types suitable for all your needs' },
      items: [
        {
          title: { tr: 'Boucle Kumaş', en: 'Boucle Fabric' },
          description: { tr: 'Modern ve şık görünüm sunan dayanıklı kumaş', en: 'Durable fabric offering modern and stylish appearance' },
          features: { tr: ['Dayanıklı yapı', 'Şık görünüm', 'Kolay bakım'], en: ['Durable structure', 'Stylish appearance', 'Easy care'] },
          image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop'
          ],
          specifications: {
            material: { tr: '100% Polyester', en: '100% Polyester' },
            width: '140 cm',
            weight: '350 gr/m²',
            care: { tr: '30°C Yıkama', en: '30°C Wash' }
          }
        },
        {
          title: { tr: 'Kadife Kumaş', en: 'Velvet Fabric' },
          description: { tr: 'Lüks ve zarif atmosfer yaratan kadife kumaşlar', en: 'Velvet fabrics creating luxurious and elegant atmosphere' },
          features: { tr: ['Lüks dokunuş', 'Zengin renkler', 'Uzun ömür'], en: ['Luxurious touch', 'Rich colors', 'Long lasting'] },
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop'
          ],
          specifications: {
            material: { tr: '100% Polyester Kadife', en: '100% Polyester Velvet' },
            width: '140 cm',
            weight: '400 gr/m²',
            care: { tr: 'Kuru Temizleme', en: 'Dry Clean Only' }
          }
        }
      ]
    },
    guide: {
      title: { tr: 'Kumaş Seçim Rehberi', en: 'Fabric Selection Guide' },
      description: { tr: 'Doğru kumaş seçimi için ipuçları', en: 'Tips for choosing the right fabric' },
      tips: [
        {
          title: { tr: 'Kullanım Alanını Belirleyin', en: 'Determine Usage Area' },
          content: { tr: 'Kumaşın hangi amaçla kullanılacağını düşünün', en: 'Think about the purpose of the fabric' },
          icon: 'home'
        },
        {
          title: { tr: 'Bakım Koşullarını Değerlendirin', en: 'Evaluate Care Conditions' },
          content: { tr: 'Kumaşın bakım gereksinimlerini göz önünde bulundurun', en: 'Consider the care requirements of the fabric' },
          icon: 'heart'
        }
      ]
    }
  },
  home: {
    hero: {
      title: { tr: 'Lüks Kumaş Dünyasına Hoş Geldiniz', en: 'Welcome to the World of Luxury Fabrics' },
      subtitle: { tr: 'Ormen Tekstil - 25 Yıllık Deneyim', en: 'Ormen Tekstil - 25 Years of Experience' },
      description: { tr: 'Ankara\'nın en köklü kumaş firması olarak, boucle, kadife ve özel tasarım kumaşlarla yaşam alanlarınızı dönüştürüyoruz.', en: 'As Ankara\'s most established fabric company, we transform your living spaces with boucle, velvet, and custom-designed fabrics.' },
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop',
      ctaText: { tr: 'Koleksiyonu Keşfedin', en: 'Explore Collection' },
      ctaLink: '#fabrics'
    },
    boucle: {
      title: { tr: 'Boucle İlham', en: 'Boucle Inspiration' },
      subtitle: { tr: 'Modern ve Şık', en: 'Modern and Stylish' },
      description: { tr: 'Boucle kumaşlarımızla mekanlarınıza modern ve şık bir dokunuş katın.', en: 'Add a modern and stylish touch to your spaces with our boucle fabrics.' },
      features: [
        {
          title: { tr: 'Dayanıklılık', en: 'Durability' },
          description: { tr: 'Uzun yıllar kullanım garantisi', en: 'Long-term usage guarantee' },
          icon: 'shield'
        },
        {
          title: { tr: 'Şıklık', en: 'Elegance' },
          description: { tr: 'Modern tasarım anlayışı', en: 'Modern design concept' },
          icon: 'star'
        }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop'
      ]
    },
    velvet: {
      title: { tr: 'Kadife Zarafeti', en: 'Velvet Elegance' },
      subtitle: { tr: 'Lüks ve Konfor', en: 'Luxury and Comfort' },
      description: { tr: 'Kadife kumaşlarımızla yaşam alanlarınızı lüks ve konforla buluşturun.', en: 'Meet your living spaces with luxury and comfort with our velvet fabrics.' },
      features: [
        {
          title: { tr: 'Lüks Dokunuş', en: 'Luxurious Touch' },
          description: { tr: 'Benzersiz yumuşaklık', en: 'Unique softness' },
          icon: 'heart'
        },
        {
          title: { tr: 'Zengin Renkler', en: 'Rich Colors' },
          description: { tr: 'Geniş renk paleti', en: 'Wide color palette' },
          icon: 'palette'
        }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop'
      ]
    },
    design: {
      title: { tr: 'Tasarım Dokunuşunuz', en: 'Your Design Touch' },
      subtitle: { tr: 'Kişisel Tasarım Hizmeti', en: 'Personal Design Service' },
      description: { tr: 'Uzman tasarım ekibimizle hayallerinizdeki mekanları birlikte yaratın.', en: 'Create your dream spaces together with our expert design team.' },
      services: [
        {
          title: { tr: 'Ücretsiz Danışmanlık', en: 'Free Consultation' },
          description: { tr: 'Uzmanlarımızdan ücretsiz destek alın', en: 'Get free support from our experts' },
          icon: 'users'
        },
        {
          title: { tr: 'Özel Tasarım', en: 'Custom Design' },
          description: { tr: 'Size özel tasarım çözümleri', en: 'Custom design solutions for you' },
          icon: 'palette'
        }
      ]
    },
    commercial: {
      title: { tr: 'Ticari Çözümler', en: 'Commercial Solutions' },
      subtitle: { tr: 'Profesyonel Projeler', en: 'Professional Projects' },
      description: { tr: 'Otel, restoran, ofis ve diğer ticari projeleriniz için profesyonel kumaş çözümleri sunuyoruz.', en: 'We offer professional fabric solutions for your hotel, restaurant, office and other commercial projects.' },
      solutions: [
        {
          title: { tr: 'Otel Projeleri', en: 'Hotel Projects' },
          description: { tr: 'Otelleriniz için dayanıklı ve şık kumaşlar', en: 'Durable and stylish fabrics for your hotels' },
          benefits: { tr: ['Yüksek dayanıklılık', 'Leke karşıtı', 'Kolay bakım'], en: ['High durability', 'Stain resistant', 'Easy maintenance'] },
          icon: 'building'
        },
        {
          title: { tr: 'Restoran Çözümleri', en: 'Restaurant Solutions' },
          description: { tr: 'Restoranlar için hijyenik kumaş seçenekleri', en: 'Hygienic fabric options for restaurants' },
          benefits: { tr: ['Hijyenik yapı', 'Su itici', 'Ateş geciktirici'], en: ['Hygienic structure', 'Water repellent', 'Fire retardant'] },
          icon: 'utensils'
        }
      ]
    }
  }
};

const defaultSiteContent: SiteContent = {
  hero: {
    title: { 
      tr: 'Lüks Kumaş Dünyasına Hoş Geldiniz', 
      en: 'Welcome to the World of Luxury Fabrics' 
    },
    subtitle: { 
      tr: 'Ormen Tekstil - 25 Yıllık Deneyim', 
      en: 'Ormen Tekstil - 25 Years of Experience' 
    },
    description: { 
      tr: 'Ankara\'nın en köklü kumaş firması olarak, boucle, kadife ve özel tasarım kumaşlarla yaşam alanlarınızı dönüştürüyoruz.',
      en: 'As Ankara\'s most established fabric company, we transform your living spaces with boucle, velvet, and custom-designed fabrics.'
    },
    backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop',
    ctaText: { tr: 'Koleksiyonu Keşfedin', en: 'Explore Collection' },
    ctaLink: '#fabrics'
  },
  about: {
    title: { tr: 'Hakkımızda', en: 'About Us' },
    description: { 
      tr: '1998 yılından bu yana Ankara\'da faaliyet gösteren Ormen Tekstil, kaliteli kumaş üretimi ve satışında öncü konumdadır.',
      en: 'Operating in Ankara since 1998, Ormen Tekstil is a pioneer in quality fabric production and sales.'
    },
    features: [
      {
        title: { tr: 'Kalite Garantisi', en: 'Quality Guarantee' },
        description: { tr: 'Tüm ürünlerimizde kalite garantisi', en: 'Quality guarantee on all our products' },
        icon: 'shield'
      }
    ]
  },
  contact: {
    address: { 
      tr: 'Altındağ/Ankara, Türkiye', 
      en: 'Altındağ/Ankara, Turkey' 
    },
    phone: '0312 349 6888',
    email: 'info@ormentekstil.com.tr',
    workingHours: { 
      tr: 'Pazartesi - Cumartesi: 09:00 - 18:00', 
      en: 'Monday - Saturday: 09:00 - 18:00' 
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  },
  pages: { posts: [] },
  media: { files: [] },
  articles: { posts: [] },
  existingPages: defaultExistingPagesContent,
  seo: {
    siteName: { 
      tr: 'Ormen Tekstil - Ankara Kumaş', 
      en: 'Ormen Tekstil - Ankara Fabric' 
    },
    siteDescription: { 
      tr: 'Ankara\'nın en köklü kumaş firması. Boucle, kadife, döşemelik kumaş çeşitleri. 25 yıllık deneyim.',
      en: 'Ankara\'s most established fabric company. Boucle, velvet, upholstery fabric varieties. 25 years of experience.'
    },
    keywords: [
      'ankara kumaş', 'döşemelik kumaş', 'boucle kumaş', 'kadife kumaş',
      'kumaş mağazası', 'ormen tekstil', 'fabric ankara', 'upholstery fabric'
    ],
    googleAnalyticsId: '',
    googleSearchConsoleId: '',
    facebookPixelId: '',
    twitterCard: 'summary_large_image',
    ogImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=630&fit=crop',
    robots: 'index, follow',
    canonical: 'https://ormentekstil.com.tr',
    structuredData: {}
  },
  analytics: {
    pageViews: {},
    visitors: {},
    topPages: [],
    topKeywords: [],
    referrers: [],
    deviceStats: { desktop: 0, mobile: 0, tablet: 0 },
    lastUpdated: new Date().toISOString()
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('ormen-site-content');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        // Merge with defaults to ensure all properties exist
        setSiteContent({ ...defaultSiteContent, ...parsedContent });
      }
    } catch (error) {
      console.error('Error loading site content:', error);
      toast.error('İçerik yüklenirken hata oluştu');
    }
  }, []);

  // Save to localStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem('ormen-site-content', JSON.stringify(siteContent));
    } catch (error) {
      console.error('Error saving site content:', error);
      toast.error('İçerik kaydedilirken hata oluştu');
    }
  }, [siteContent]);

  const updateSiteContent = useCallback((content: SiteContent) => {
    setSiteContent(content);
  }, []);

  const resetToDefaults = useCallback(() => {
    setSiteContent(defaultSiteContent);
    toast.success('İçerik varsayılan ayarlara sıfırlandı');
  }, []);

  const exportContent = useCallback(() => {
    try {
      const dataStr = JSON.stringify(siteContent, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ormen-site-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('İçerik başarıyla dışa aktarıldı');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Dışa aktarma sırasında hata oluştu');
    }
  }, [siteContent]);

  const importContent = useCallback((content: SiteContent) => {
    try {
      setSiteContent({ ...defaultSiteContent, ...content });
      toast.success('İçerik başarıyla içe aktarıldı');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('İçe aktarma sırasında hata oluştu');
    }
  }, []);

  // Article management
  const addArticle = useCallback((article: Article) => {
    setSiteContent(prev => ({
      ...prev,
      articles: {
        ...prev.articles,
        posts: [...prev.articles.posts, article]
      }
    }));
  }, []);

  const updateArticle = useCallback((id: string, updatedArticle: Article) => {
    setSiteContent(prev => ({
      ...prev,
      articles: {
        ...prev.articles,
        posts: prev.articles.posts.map(article => 
          article.id === id ? updatedArticle : article
        )
      }
    }));
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setSiteContent(prev => ({
      ...prev,
      articles: {
        ...prev.articles,
        posts: prev.articles.posts.filter(article => article.id !== id)
      }
    }));
  }, []);

  // Page management
  const addPage = useCallback((page: Page) => {
    setSiteContent(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        posts: [...prev.pages.posts, page]
      }
    }));
    toast.success('Sayfa başarıyla eklendi');
  }, []);

  const updatePage = useCallback((id: string, updatedPage: Page) => {
    setSiteContent(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        posts: prev.pages.posts.map(page => 
          page.id === id ? updatedPage : page
        )
      }
    }));
    toast.success('Sayfa başarıyla güncellendi');
  }, []);

  const deletePage = useCallback((id: string) => {
    setSiteContent(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        posts: prev.pages.posts.filter(page => page.id !== id)
      }
    }));
    toast.success('Sayfa silindi');
  }, []);

  const getPageBySlug = useCallback((slug: string, language: 'tr' | 'en') => {
    return siteContent.pages.posts.find(page => 
      page.slug[language] === slug && page.published
    );
  }, [siteContent.pages.posts]);

  // Media management
  const addMedia = useCallback((file: MediaFile) => {
    setSiteContent(prev => ({
      ...prev,
      media: {
        ...prev.media,
        files: [...prev.media.files, file]
      }
    }));
    toast.success('Medya dosyası eklendi');
  }, []);

  const updateMedia = useCallback((id: string, updatedFile: MediaFile) => {
    setSiteContent(prev => ({
      ...prev,
      media: {
        ...prev.media,
        files: prev.media.files.map(file => 
          file.id === id ? updatedFile : file
        )
      }
    }));
    toast.success('Medya dosyası güncellendi');
  }, []);

  const deleteMedia = useCallback((id: string) => {
    setSiteContent(prev => ({
      ...prev,
      media: {
        ...prev.media,
        files: prev.media.files.filter(file => file.id !== id)
      }
    }));
    toast.success('Medya dosyası silindi');
  }, []);

  const getMediaByType = useCallback((type: 'image' | 'video' | 'document') => {
    return siteContent.media.files.filter(file => file.type === type);
  }, [siteContent.media.files]);

  // SEO management
  const updateSEO = useCallback((seo: SEOSettings) => {
    setSiteContent(prev => ({
      ...prev,
      seo
    }));
    toast.success('SEO ayarları güncellendi');
  }, []);

  // Analytics
  const updateAnalytics = useCallback((analytics: Analytics) => {
    setSiteContent(prev => ({
      ...prev,
      analytics
    }));
  }, []);

  const trackPageView = useCallback((page: string) => {
    const today = new Date().toISOString().split('T')[0];
    setSiteContent(prev => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        pageViews: {
          ...prev.analytics.pageViews,
          [page]: (prev.analytics.pageViews[page] || 0) + 1
        },
        visitors: {
          ...prev.analytics.visitors,
          [today]: (prev.analytics.visitors[today] || 0) + 1
        },
        lastUpdated: new Date().toISOString()
      }
    }));
  }, []);

  // Existing pages management
  const updateExistingPage = useCallback((pageName: keyof ExistingPagesContent, content: any) => {
    setSiteContent(prev => ({
      ...prev,
      existingPages: {
        ...prev.existingPages,
        [pageName]: { ...prev.existingPages[pageName], ...content }
      }
    }));
    toast.success(`${pageName} sayfası güncellendi`);
  }, []);

  const getExistingPageContent = useCallback((pageName: keyof ExistingPagesContent) => {
    return siteContent.existingPages[pageName];
  }, [siteContent.existingPages]);

  const value = {
    siteContent,
    updateSiteContent,
    resetToDefaults,
    exportContent,
    importContent,
    addArticle,
    updateArticle,
    deleteArticle,
    addPage,
    updatePage,
    deletePage,
    getPageBySlug,
    addMedia,
    updateMedia,
    deleteMedia,
    getMediaByType,
    updateSEO,
    updateAnalytics,
    trackPageView,
    updateExistingPage,
    getExistingPageContent
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export type { Page, MediaFile, SEOSettings, Analytics, Article, SiteContent, ExistingPagesContent };
