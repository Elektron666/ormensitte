'use client';

import { motion } from 'framer-motion';
import { OrmenLogoMinimal } from './OrmenLogo';
import { MapPin, Phone, Mail, MessageCircle, Instagram } from 'lucide-react';

interface FooterProps {
  language: 'tr' | 'en';
}

export function Footer({ language }: FooterProps) {
  return (
    <footer className="luxury-gradient-2 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <OrmenLogoMinimal variant="dark" />
            </div>
            
            <div className="space-y-4 text-sm text-gray-600 font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Önder Mahallesi</p>
                  <p>Karpuzlu 1. Cadde No: 89/A</p>
                  <p>Altındağ / Ankara</p>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p>0312 349 6888</p>
                    <p>0312 349 6889</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <p>WhatsApp: 0540 349 6888</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <p>info@ormentekstil.com.tr</p>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <Instagram className="w-4 h-4 text-gray-500" />
                  <a 
                    href="https://www.instagram.com/ormenevtekstil/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                  >
                    @ormenevtekstil
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ürünler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-base font-light tracking-wide">
              {language === 'tr' ? 'Ürün Kategorileri' : 'Product Categories'}
            </h4>
            <div className="space-y-4">
              {(language === 'tr' ? [
                'Döşemelik Kumaşlar',
                'Deri Ürünlerimiz',
                'Bukle Kumaşlar', 
                'Kadife Kumaşlar', 
                'Dış Mekan Kumaşları',
                'Contract Kumaşları'
              ] : [
                'Upholstery Fabrics',
                'Leather Products',
                'Bouclé Fabrics', 
                'Velvet Fabrics', 
                'Outdoor Fabrics',
                'Contract Fabrics'
              ]).map((item) => (
                <a key={item} href="#" className="block text-sm text-gray-600 hover:text-black transition-colors font-light hover:translate-x-1 transform duration-300">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Hizmetler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-base font-light tracking-wide">
              {language === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
            </h4>
            <div className="space-y-4">
              {(language === 'tr' ? [
                'Profesyonel Danışmanlık',
                'Proje Yönetimi',
                'Teknik Destek',
                'Kalite Garantisi',
                'Hızlı Teslimat',
                'Müşteri Hizmetleri'
              ] : [
                'Professional Consultancy',
                'Project Management',
                'Technical Support',
                'Quality Guarantee',
                'Fast Delivery',
                'Customer Service'
              ]).map((item) => (
                <a key={item} href="#" className="block text-sm text-gray-600 hover:text-black transition-colors font-light hover:translate-x-1 transform duration-300">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Haber Bülteni */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-base font-light tracking-wide">
              {language === 'tr' ? 'Haber Bülteni' : 'Newsletter'}
            </h4>
            <p className="text-sm text-gray-600 mb-6 font-light leading-relaxed">
              {language === 'tr' 
                ? 'Yeni koleksiyonlarımız ve özel tekliflerimizden haberdar olmak için abone olun.'
                : 'Subscribe to stay informed about our new collections and special offers.'
              }
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder={language === 'tr' ? 'E-posta adresiniz' : 'Your email address'}
                className="w-full border-0 border-b border-gray-300 bg-transparent py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-light"
              />
              <button className="border border-black text-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500 font-light tracking-wide w-full">
                {language === 'tr' ? 'Abone Ol' : 'Subscribe'}
              </button>
            </div>
            
            {/* Quick Contact */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h5 className="text-sm font-light tracking-wide mb-4">
                {language === 'tr' ? 'Hızlı İletişim' : 'Quick Contact'}
              </h5>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700 transition-colors font-light rounded-sm flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
                <button className="w-full border border-black text-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-all duration-300 font-light">
                  {language === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}
                </button>
                <a 
                  href="https://www.instagram.com/ormenevtekstil/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-light flex items-center justify-center space-x-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Articles Section */}
        <motion.div
          className="mt-16 pt-16 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="mb-8 text-base font-light tracking-wide text-center">
            {language === 'tr' ? 'Makaleler' : 'Articles'}
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            {(language === 'tr' ? [
              {
                title: 'Döşemelik Kumaş Seçim Rehberi',
                excerpt: 'Eviniz için en uygun döşemelik kumaş nasıl seçilir? Uzman ipuçlarıyla...',
                date: '15 Aralık 2024'
              },
              {
                title: 'Pati Dostu Kumaşların Avantajları',
                excerpt: 'Evcil hayvan sahipleri için özel üretilen kumaşların faydaları...',
                date: '10 Aralık 2024'
              },
              {
                title: 'Ankara Kumaş Sektöründe Trendler',
                excerpt: '2024 yılında Ankara kumaş sektöründe öne çıkan trend ve renkler...',
                date: '5 Aralık 2024'
              }
            ] : [
              {
                title: 'Upholstery Fabric Selection Guide',
                excerpt: 'How to choose the most suitable upholstery fabric for your home? Expert tips...',
                date: 'December 15, 2024'
              },
              {
                title: 'Benefits of Pet-Friendly Fabrics',
                excerpt: 'Advantages of specially produced fabrics for pet owners...',
                date: 'December 10, 2024'
              },
              {
                title: 'Trends in Ankara Fabric Industry',
                excerpt: 'Prominent trends and colors in Ankara fabric industry in 2024...',
                date: 'December 5, 2024'
              }
            ]).map((article, index) => (
              <div key={index} className="bg-white/50 p-6 rounded-lg hover:bg-white/80 transition-all duration-300 cursor-pointer">
                <h5 className="font-medium text-gray-900 mb-2 text-sm">{article.title}</h5>
                <p className="text-xs text-gray-600 mb-3 font-light leading-relaxed">{article.excerpt}</p>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a 
              href="#articles" 
              className="text-sm text-gray-600 hover:text-black transition-colors font-light border-b border-gray-300 hover:border-black"
            >
              {language === 'tr' ? 'Tüm Makaleleri Görüntüle' : 'View All Articles'}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 lg:mt-20 pt-8 border-t border-gray-200 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-gray-500 font-light">
            {language === 'tr' 
              ? '© 2024 Ormen Tekstil. Tüm hakları saklıdır.'
              : '© 2024 Ormen Tekstil. All rights reserved.'
            }
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors font-light">
              {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors font-light">
              {language === 'tr' ? 'Kullanım Şartları' : 'Terms of Use'}
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors font-light">
              {language === 'tr' ? 'Çerez Politikası' : 'Cookie Policy'}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
