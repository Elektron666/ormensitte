'use client';

import { motion } from 'framer-motion';
import { PhotoGallery } from './PhotoGallery';
import { useAdmin } from '../contexts/AdminContext';

interface BoucleInspirationsSectionProps {
  language: 'tr' | 'en';
}

export function BoucleInspirationsSection({ language }: BoucleInspirationsSectionProps) {
  const { siteContent } = useAdmin();
  
  // Get content from AdminContext or use defaults
  const boucleContent = siteContent?.boucle || {
    title: {
      tr: 'Bukle İlhamları',
      en: 'Bouclé Inspirations'
    },
    content: {
      tr: 'Bukle ilhamları ile Ormen Tekstil ekibi, eşsiz mekanlarınıza ilham verecek çeşitli renk şemalarını sizler için hazırladı. Kadife, yün dokuları ve zarif tasarımların yeni yorumlarını bukle ile deneyimlerken, iç mekan dekorasyonunuzu yeniden tasarlama konusunda size sınırsız ilham sunuyoruz. Çarpıcı mobilya parçaları yaratmak için 100\'den fazla katalogumuz arasından seçiminizi yapın.',
      en: 'With bouclé inspirations, the Ormen Tekstil team has prepared various color schemes that will inspire your unique spaces. While experiencing new interpretations of velvet, wool textures and elegant designs with bouclé, we offer you unlimited inspiration for redesigning your interior decoration. Choose from over 100 catalogs to create striking furniture pieces.'
    },
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=90',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=90',
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&q=90',
      'https://images.unsplash.com/photo-1560472354-9d60e2b5f6f8?w=1200&q=90'
    ]
  };

  const boucleAlts = [
    'Krem rengi bukle kumaş doku detayı - Ormen Tekstil',
    'Renkli bukle kumaş örnekleri - Ankara kumaş koleksiyonu',
    'Doğal bukle tekstil detayı - Premium kalite',
    'Lüks bukle kumaş koleksiyonu - Modern tasarım'
  ];

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Text Content */}
        <motion.div
          className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-lg mx-auto lg:mx-0">
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-6 sm:mb-8 lg:mb-12 font-light tracking-wide text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {boucleContent.title[language]}
            </motion.h2>

            <motion.p
              className="text-gray-600 leading-relaxed mb-6 sm:mb-8 lg:mb-12 text-sm sm:text-base font-light text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {boucleContent.content[language]}
            </motion.p>

            {/* CTA Button for mobile */}
            <motion.div
              className="lg:hidden text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <button className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-light tracking-wide hover:bg-amber-700 transition-colors duration-300">
                {language === 'tr' ? 'Koleksiyonu İncele' : 'Explore Collection'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Photo Gallery */}
        <motion.div
          className="relative overflow-hidden order-1 lg:order-2 h-64 sm:h-80 lg:h-auto"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <PhotoGallery 
            images={boucleContent.images} 
            alts={boucleAlts}
            className="h-full"
            direction="left"
          />
          
          {/* Mobile overlay gradient for better text readability */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Mobile-specific additional content */}
      <div className="lg:hidden px-6 py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-medium mb-4 text-gray-900">
            {language === 'tr' ? 'Bukle Kumaş Özellikleri' : 'Bouclé Fabric Features'}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-medium text-amber-600 mb-1">
                {language === 'tr' ? '100+ Desen' : '100+ Patterns'}
              </div>
              <div className="text-gray-600">
                {language === 'tr' ? 'Geniş koleksiyon' : 'Wide collection'}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-medium text-amber-600 mb-1">
                {language === 'tr' ? 'Premium Kalite' : 'Premium Quality'}
              </div>
              <div className="text-gray-600">
                {language === 'tr' ? 'Uzun ömürlü' : 'Long-lasting'}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-medium text-amber-600 mb-1">
                {language === 'tr' ? 'Özel Tasarım' : 'Custom Design'}
              </div>
              <div className="text-gray-600">
                {language === 'tr' ? 'Size özel' : 'Customized'}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-medium text-amber-600 mb-1">
                {language === 'tr' ? 'Hızlı Teslimat' : 'Fast Delivery'}
              </div>
              <div className="text-gray-600">
                {language === 'tr' ? 'Ankara geneli' : 'Ankara-wide'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
