'use client';

import { motion } from 'framer-motion';
import { PhotoGallery } from './PhotoGallery';
import { useAdmin } from '../contexts/AdminContext';

interface DesignYourTouchSectionProps {
  language: 'tr' | 'en';
}

export function DesignYourTouchSection({ language }: DesignYourTouchSectionProps) {
  const { siteContent } = useAdmin();
  
  // Get content from AdminContext or use defaults
  const designContent = siteContent?.design || {
    title: {
      tr: 'Tasarımınızı Yaratın',
      en: 'Create Your Design'
    },
    content: {
      tr: 'Özel tasarım hizmetimizle mükemmel iç mekanınızı yaratın. Uzman ekibimiz, vizyonunuzu anlamak ve özenle seçilmiş kumaşlar ve dokular aracılığıyla hayata geçirmek için sizinle yakın çalışır. İlk danışmanlıktan son uygulamaya kadar, her detayın kişisel tarzınızı yansıttığından ve yaşam alanınızı zenginleştirdiğinden emin oluyoruz.',
      en: 'Create your perfect interior with our custom design service. Our expert team works closely with you to understand your vision and bring it to life through carefully selected fabrics and textures. From initial consultation to final implementation, we ensure every detail reflects your personal style and enriches your living space.'
    },
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=90',
      'https://images.unsplash.com/photo-1560472354-9d60e2b5f6f8?w=1200&q=90',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=90',
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&q=90'
    ]
  };

  const designAlts = [
    'İç mekan tasarımı için lüks kumaş dokuları ve örnekleri - Ormen Tekstil',
    'Özel iç mekanlar için özel kumaş seçimi - Ankara tasarım',
    'Tasarımcı kumaş koleksiyonu sergileme - Premium kalite',
    'Ev dekorasyonu için premium tekstil örnekleri - Özel tasarım'
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
              {designContent.title[language]}
            </motion.h2>

            <motion.p
              className="text-gray-600 leading-relaxed mb-6 sm:mb-8 lg:mb-12 text-sm sm:text-base font-light text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {designContent.content[language]}
            </motion.p>

            {/* Design process steps for mobile */}
            <motion.div
              className="lg:hidden space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-medium text-center mb-4 text-gray-900">
                {language === 'tr' ? 'Tasarım Süreci' : 'Design Process'}
              </h3>
              
              {(language === 'tr' ? [
                { step: '01', title: 'Konsültasyon', desc: 'Ücretsiz danışmanlık' },
                { step: '02', title: 'Tasarım', desc: 'Özel çözüm geliştirme' },
                { step: '03', title: 'Uygulama', desc: 'Profesyonel montaj' }
              ] : [
                { step: '01', title: 'Consultation', desc: 'Free consultation' },
                { step: '02', title: 'Design', desc: 'Custom solution development' },
                { step: '03', title: 'Implementation', desc: 'Professional installation' }
              ]).map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                    <div className="text-gray-600 text-xs">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile CTA */}
            <motion.div
              className="lg:hidden flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <button className="flex-1 sm:flex-none px-6 py-3 bg-amber-600 text-white font-light tracking-wide hover:bg-amber-700 transition-colors duration-300">
                {language === 'tr' ? 'Ücretsiz Danışmanlık' : 'Free Consultation'}
              </button>
              <button className="flex-1 sm:flex-none px-6 py-3 border border-amber-600 text-amber-600 font-light tracking-wide hover:bg-amber-50 transition-colors duration-300">
                {language === 'tr' ? 'Portföy İncele' : 'View Portfolio'}
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
            images={designContent.images} 
            alts={designAlts}
            className="h-full"
            direction="left"
          />
          
          {/* Mobile overlay with design stats */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
            <div className="flex justify-center space-x-6 text-white text-center">
              <div>
                <div className="text-lg font-medium">100+</div>
                <div className="text-xs">
                  {language === 'tr' ? 'Proje' : 'Projects'}
                </div>
              </div>
              <div>
                <div className="text-lg font-medium">25+</div>
                <div className="text-xs">
                  {language === 'tr' ? 'Yıl' : 'Years'}
                </div>
              </div>
              <div>
                <div className="text-lg font-medium">500+</div>
                <div className="text-xs">
                  {language === 'tr' ? 'Müşteri' : 'Customers'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile-specific service highlights */}
      <div className="lg:hidden px-6 py-8 bg-gray-50">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-6 text-center text-gray-900">
            {language === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {(language === 'tr' ? [
              { icon: '🏠', title: 'Ev Dekorasyonu', desc: 'Yaşam alanlarınız için özel tasarımlar' },
              { icon: '🏢', title: 'Ticari Projeler', desc: 'Otel, restoran ve ofis projeleri' },
              { icon: '🎨', title: 'Renk Danışmanlığı', desc: 'Profesyonel renk uyumu önerileri' },
              { icon: '📏', title: 'Ölçü Alımı', desc: 'Ücretsiz ev ziyareti ve ölçü alımı' }
            ] : [
              { icon: '🏠', title: 'Home Decoration', desc: 'Custom designs for your living spaces' },
              { icon: '🏢', title: 'Commercial Projects', desc: 'Hotel, restaurant and office projects' },
              { icon: '🎨', title: 'Color Consultation', desc: 'Professional color harmony recommendations' },
              { icon: '📏', title: 'Measurement', desc: 'Free home visit and measurement service' }
            ]).map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{service.title}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
