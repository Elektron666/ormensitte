'use client';

import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sofa, Shield, Sun, Home, Building2, Palette, Sparkles, Scissors } from 'lucide-react';

interface FabricTypesPageProps {
  language: 'tr' | 'en';
}

export function FabricTypesPage({ language }: FabricTypesPageProps) {
  const fabricCategories = [
    {
      title: language === 'tr' ? 'Döşemelik Kumaş' : 'Upholstery Fabric',
      description: language === 'tr' 
        ? 'Mobilya ve döşeme için özel olarak tasarlanmış dayanıklı ve estetik kumaşlar'
        : 'Durable and aesthetic fabrics specially designed for furniture and upholstery',
      icon: Sofa,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=90',
      features: language === 'tr' 
        ? ['Yüksek Dayanıklılık', 'Leke Direnci', 'Renk Haslığı', 'Flame Retardant']
        : ['High Durability', 'Stain Resistance', 'Color Fastness', 'Flame Retardant'],
      colors: ['bg-blue-50', 'text-blue-700', 'border-blue-200']
    },
    {
      title: language === 'tr' ? 'Deri Ürünlerimiz' : 'Our Leather Products',
      description: language === 'tr'
        ? 'Premium kalite doğal ve sentetik deri chester koltuk ve döşeme çözümleri'
        : 'Premium quality natural and synthetic leather chesterfield sofa and upholstery solutions',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=90',
      features: language === 'tr'
        ? ['Doğal Görünüm', 'Kolay Temizlik', 'Solmaz Renkler', 'Esnek Yapı']
        : ['Natural Look', 'Easy Cleaning', 'Fade-resistant Colors', 'Flexible Structure'],
      colors: ['bg-amber-50', 'text-amber-700', 'border-amber-200']
    },
    {
      title: language === 'tr' ? 'Dış Mekan Kumaşları' : 'Outdoor Fabrics',
      description: language === 'tr'
        ? 'Hava koşullarına dayanıklı outdoor kumaş çözümleri'
        : 'Weather-resistant outdoor fabric solutions',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&q=90',
      features: language === 'tr'
        ? ['Su Geçirmez', 'UV Dayanımlı', 'Küf Direnci', 'Yırtılmaz']
        : ['Waterproof', 'UV Resistant', 'Mold Resistant', 'Tear-resistant'],
      colors: ['bg-green-50', 'text-green-700', 'border-green-200']
    },
    {
      title: language === 'tr' ? 'İç Mekan Kumaşları' : 'Indoor Fabrics',
      description: language === 'tr'
        ? 'İç mekan projeleriniz için konforlu ve şık kumaş seçenekleri'
        : 'Comfortable and stylish fabric options for your indoor projects',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1572556799642-b7d4e6bf8c3a?w=800&q=90',
      features: language === 'tr'
        ? ['Nefes Alabilen', 'Anti-Alerjik', 'Ses Yalıtımı', 'Yumuşak Dokulu']
        : ['Breathable', 'Anti-Allergic', 'Sound Insulation', 'Soft Texture'],
      colors: ['bg-purple-50', 'text-purple-700', 'border-purple-200']
    },
    {
      title: language === 'tr' ? 'Contract Kumaşları' : 'Contract Fabrics',
      description: language === 'tr'
        ? 'Otel, restoran ve ticari alanlar için profesyonel kumaş çözümleri'
        : 'Professional fabric solutions for hotels, restaurants and commercial spaces',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=90',
      features: language === 'tr'
        ? ['Ağır Kullanım', 'FR Sertifikalı', 'Antibakteriyel', 'Kolay Bakım']
        : ['Heavy Duty', 'FR Certified', 'Antibacterial', 'Easy Care'],
      colors: ['bg-slate-50', 'text-slate-700', 'border-slate-200']
    }
  ];

  const inspirationSections = [
    {
      title: language === 'tr' ? 'Bukle İlhamları' : 'Bouclé Inspirations',
      subtitle: language === 'tr' ? 'Tekstürel zenginlik ve modern estetik' : 'Textural richness and modern aesthetics',
      description: language === 'tr'
        ? 'Bukle kumaşların kendine özgü dokusu ile mekanlarınıza karakter katın'
        : 'Add character to your spaces with the unique texture of bouclé fabrics',
      image: 'https://images.unsplash.com/photo-1604147495798-57beb5bf6991?w=1200&q=90',
      features: language === 'tr'
        ? ['Zengin Tekstür', 'Modern Tasarım', 'Dayanıklı Yapı', 'Çeşitli Renkler']
        : ['Rich Texture', 'Modern Design', 'Durable Structure', 'Various Colors'],
      icon: Palette
    },
    {
      title: language === 'tr' ? 'Kadife Zarafeti' : 'Velvet Elegance',
      subtitle: language === 'tr' ? 'Lüks ve konforun mükemmel uyumu' : 'Perfect harmony of luxury and comfort',
      description: language === 'tr'
        ? 'Kadife kumaşların yumuşak dokunuşu ile mekanlarınıza lüks katın'
        : 'Add luxury to your spaces with the soft touch of velvet fabrics',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=90',
      features: language === 'tr'
        ? ['Kadifemsi Doku', 'Zengin Renkler', 'Lüks Hiss', 'Işık Oyunları']
        : ['Velvety Texture', 'Rich Colors', 'Luxury Feel', 'Light Play'],
      icon: Sparkles
    },
    {
      title: language === 'tr' ? 'Tasarımınızı Yaratın' : 'Create Your Design',
      subtitle: language === 'tr' ? 'Kişisel tarzınızı yansıtan özel çözümler' : 'Custom solutions reflecting your personal style',
      description: language === 'tr'
        ? 'Size özel tasarım seçenekleri ile hayalinizdeki mekanı yaratın'
        : 'Create your dream space with custom design options tailored for you',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=90',
      features: language === 'tr'
        ? ['Özel Tasarım', 'Renk Seçenekleri', 'Desen Çeşitliliği', 'Uzman Desteği']
        : ['Custom Design', 'Color Options', 'Pattern Variety', 'Expert Support'],
      icon: Scissors
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl lg:text-6xl font-extralight mb-6">
              {language === 'tr' ? 'Kumaş' : 'Fabric'} <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">{language === 'tr' ? 'Çeşitlerimiz' : 'Types'}</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'tr'
                ? 'Her proje için özel olarak seçilmiş, kaliteli kumaş koleksiyonumuzla mekanlarınıza değer katıyoruz. 1999\'dan bu yana tekstil sektörünün güvenilir adresi.'
                : 'We add value to your spaces with our quality fabric collection specially selected for each project. Trusted address of the textile industry since 1999.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fabric Categories Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-4">
              {language === 'tr' ? 'Kumaş Kategorilerimiz' : 'Our Fabric Categories'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'tr'
                ? 'İhtiyacınıza uygun kumaş tipini keşfedin ve projelerinize özel çözümler bulun'
                : 'Discover the fabric type that suits your needs and find special solutions for your projects'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fabricCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full luxury-card hover:shadow-xl transition-all duration-500 border-2 ${category.colors[2]} group`}>
                  <div className="p-6">
                    {/* Image */}
                    <div className="relative mb-6 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className={`absolute top-4 left-4 p-3 rounded-full ${category.colors[0]} ${category.colors[1]}`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-medium mb-3 group-hover:text-amber-600 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="secondary" 
                          className={`text-xs ${category.colors[0]} ${category.colors[1]} border-0`}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Sections */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-4">
              {language === 'tr' ? 'İlham Veren Koleksiyonlar' : 'Inspiring Collections'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'tr'
                ? 'Benzersiz kumaş koleksiyonlarımızla mekanlarınıza karakter katın'
                : 'Add character to your spaces with our unique fabric collections'
              }
            </p>
          </motion.div>

          <div className="space-y-20">
            {inspirationSections.map((section, index) => (
              <motion.div
                key={section.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-full mr-4">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-light">{section.title}</h3>
                      <p className="text-amber-600 text-sm font-medium tracking-wide">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {section.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative overflow-hidden rounded-lg luxury-card">
                    <ImageWithFallback
                      src={section.image}
                      alt={section.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-6">
              {language === 'tr' ? 'Projeleriniz İçin' : 'For Your Projects'} <span className="text-amber-400">{language === 'tr' ? 'Özel Çözümler' : 'Custom Solutions'}</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {language === 'tr'
                ? 'Uzman ekibimizle birlikte projelerinize en uygun kumaş seçimini yapın. 25 yıllık deneyimimizle size rehberlik edelim.'
                : 'Choose the most suitable fabric for your projects together with our expert team. Let us guide you with our 25 years of experience.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-600 text-black px-8 py-3 hover:bg-amber-500 transition-colors duration-300 font-medium tracking-wide">
                {language === 'tr' ? 'Ücretsiz Danışmanlık' : 'Free Consultation'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
