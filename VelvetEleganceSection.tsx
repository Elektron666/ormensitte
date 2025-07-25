'use client';

import { motion } from 'framer-motion';
import { PhotoGallery } from './PhotoGallery';
import { useAdmin } from '../contexts/AdminContext';

interface VelvetEleganceSectionProps {
  language: 'tr' | 'en';
}

export function VelvetEleganceSection({ language }: VelvetEleganceSectionProps) {
  const { siteContent } = useAdmin();
  
  // Get content from AdminContext or use defaults
  const velvetContent = siteContent?.velvet || {
    title: {
      tr: 'Kadife Zarafeti',
      en: 'Velvet Elegance'
    },
    content: {
      tr: 'Kadife koleksiyonumuz, lüks tekstil tasarımının doruk noktasını temsil etmektedir. Her parça, kadifeyi dünya çapında seçkin iç mimar ve dekoratörlerin tercihi yapan zengin dokular ve derin renkleri sergilemek için özenle hazırlanmıştır. Klasik koyu mavilerden modern nötr tonlara kadar, kadife seçkimiz sofistike mekanlar yaratmak için sonsuz olanaklar sunmaktadır.',
      en: 'Our velvet collection represents the pinnacle of luxury textile design. Each piece is carefully crafted to showcase the rich textures and deep colors that make velvet the choice of distinguished interior designers and decorators worldwide. From classic deep blues to modern neutral tones, our velvet selection offers endless possibilities for creating sophisticated spaces.'
    },
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=90',
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&q=90',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=90',
      'https://images.unsplash.com/photo-1560472354-9d60e2b5f6f8?w=1200&q=90',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=90'
    ]
  };

  const velvetAlts = [
    'Zarif bir şekilde düzenlenmiş renkli kadife kumaş örnekleri - Ormen Tekstil',
    'Zengin kadife tekstil koleksiyonu - Ankara lüks kumaş',
    'Premium kadife kumaş dokuları - Yüksek kalite',
    'Lüks kadife malzeme örnekleri - Designer koleksiyon',
    'İnce kadife kumaş detayı - El işçiliği'
  ];

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Photo Gallery */}
        <motion.div
          className="relative overflow-hidden h-64 sm:h-80 lg:h-auto order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <PhotoGallery 
            images={velvetContent.images} 
            alts={velvetAlts}
            className="h-full"
            direction="right"
          />
          
          {/* Mobile overlay gradient */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Right side - Text Content */}
        <motion.div
          className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 order-2"
          initial={{ opacity: 0, x: 50 }}
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
              {velvetContent.title[language]}
            </motion.h2>

            <motion.p
              className="text-gray-600 leading-relaxed mb-6 sm:mb-8 lg:mb-12 text-sm sm:text-base font-light text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {velvetContent.content[language]}
            </motion.p>

            {/* Quality indicators for mobile */}
            <motion.div
              className="lg:hidden grid grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                <div className="text-lg font-medium text-amber-700">25+</div>
                <div className="text-xs text-amber-600">
                  {language === 'tr' ? 'Yıl Deneyim' : 'Years Experience'}
                </div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                <div className="text-lg font-medium text-amber-700">500+</div>
                <div className="text-xs text-amber-600">
                  {language === 'tr' ? 'Kadife Çeşidi' : 'Velvet Varieties'}
                </div>
              </div>
            </motion.div>

            {/* Mobile CTA */}
            <motion.div
              className="lg:hidden text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-light tracking-wide hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg">
                {language === 'tr' ? 'Kadife Koleksiyonu' : 'Velvet Collection'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile-specific features section */}
      <div className="lg:hidden px-6 py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-6 text-center text-gray-900">
            {language === 'tr' ? 'Kadife Kumaş Avantajları' : 'Velvet Fabric Advantages'}
          </h3>
          <div className="space-y-4">
            {(language === 'tr' ? [
              { title: 'Lüks Görünüm', desc: 'Zengin doku ve parlak yüzey' },
              { title: 'Dayanıklılık', desc: 'Uzun ömürlü kaliteli malzeme' },
              { title: 'Konfor', desc: 'Yumuşak ve rahat dokunuş' },
              { title: 'Çeşitlilik', desc: 'Geniş renk ve desen seçeneği' }
            ] : [
              { title: 'Luxury Appearance', desc: 'Rich texture and lustrous surface' },
              { title: 'Durability', desc: 'Long-lasting quality material' },
              { title: 'Comfort', desc: 'Soft and comfortable touch' },
              { title: 'Variety', desc: 'Wide color and pattern options' }
            ]).map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{feature.title}</div>
                  <div className="text-gray-600 text-xs">{feature.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
