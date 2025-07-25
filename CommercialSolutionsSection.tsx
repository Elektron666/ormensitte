'use client';

import { motion } from 'framer-motion';
import { Shield, Droplets, Flame, Building2, Coffee, Hotel } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommercialSolutionsSectionProps {
  language: 'tr' | 'en';
}

export function CommercialSolutionsSection({ language }: CommercialSolutionsSectionProps) {
  const solutions = [
    {
      icon: <Hotel className="w-8 h-8" />,
      title: language === 'tr' ? "Otel Projeleri" : "Hotel Projects",
      description: language === 'tr' 
        ? "5 yıldızlı oteller için dayanıklı, şık ve kolay bakım kumaşlar"
        : "Durable, stylish and easy-care fabrics for 5-star hotels",
      features: language === 'tr'
        ? ["FR sertifikalı", "Leke direnci", "Yoğun kullanım"]
        : ["FR certified", "Stain resistance", "Heavy duty use"]
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: language === 'tr' ? "Restoran & Kafe" : "Restaurant & Cafe",
      description: language === 'tr'
        ? "Yiyecek-içecek sektörü için hijyenik ve pratik çözümler"
        : "Hygienic and practical solutions for the food and beverage industry",
      features: language === 'tr'
        ? ["Su itici", "Antibakteriyel", "Kolay temizlik"]
        : ["Water repellent", "Antibacterial", "Easy cleaning"]
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: language === 'tr' ? "Ofis & Kurumsal" : "Office & Corporate",
      description: language === 'tr'
        ? "Modern ofisler için profesyonel görünüm ve dayanıklılık"
        : "Professional appearance and durability for modern offices",
      features: language === 'tr'
        ? ["Akustik özellik", "Renk haslığı", "Ekonomik"]
        : ["Acoustic properties", "Color fastness", "Economical"]
    }
  ];

  const technicalFeatures = [
    {
      icon: <Flame className="w-6 h-6 text-red-600" />,
      title: language === 'tr' ? "FR (Yanmaz) Kumaşlar" : "FR (Fire Retardant) Fabrics",
      description: language === 'tr'
        ? "EN 1021-1 ve EN 1021-2 standartlarında sertifikalı yangın geciktirici kumaşlar"
        : "Fire retardant fabrics certified to EN 1021-1 and EN 1021-2 standards"
    },
    {
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      title: language === 'tr' ? "Su & Leke İtici" : "Water & Stain Repellent",
      description: language === 'tr'
        ? "Teflon® ve Scotchgard™ uygulamalı, kolayca temizlenebilen kumaşlar"
        : "Easily cleanable fabrics with Teflon® and Scotchgard™ applications"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: language === 'tr' ? "Antibakteriyel" : "Antibacterial",
      description: language === 'tr'
        ? "Hygiene+ teknolojisi ile mikroorganizmalara karşı korumalı yüzeyler"
        : "Surfaces protected against microorganisms with Hygiene+ technology"
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-wide mb-6">
            {language === 'tr' ? 'Profesyonel Çözümler' : 'Professional Solutions'}
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            {language === 'tr'
              ? 'Mimarlar, iç mekan tasarımcıları ve ticari proje yöneticileri için özel olarak tasarlanmış, teknik özellikleri ile öne çıkan kumaş koleksiyonumuz.'
              : 'Our fabric collection specially designed for architects, interior designers and commercial project managers, standing out with its technical features.'
            }
          </p>
        </motion.div>

        {/* Industry Solutions */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              className="luxury-card p-8 text-center group hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-500">
                  <div className="text-gray-600 group-hover:text-white transition-colors duration-500">
                    {solution.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-light mb-4 text-gray-900">
                {solution.title}
              </h3>
              <p className="text-gray-600 font-light text-sm mb-6 leading-relaxed">
                {solution.description}
              </p>
              <div className="space-y-2">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="text-xs text-gray-500 font-light">
                    • {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Features */}
        <motion.div
          className="luxury-gradient-1 rounded-lg p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-light mb-4">
              {language === 'tr' ? 'Teknik Özellikler' : 'Technical Features'}
            </h3>
            <p className="text-gray-600 font-light">
              {language === 'tr'
                ? 'Sektör standartlarının üzerinde performans sunan kumaş teknolojileri'
                : 'Fabric technologies that offer performance above industry standards'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technicalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 font-light text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <button className="bg-black text-white px-8 py-4 text-sm tracking-wide hover:bg-gray-800 transition-all duration-500 font-light">
            {language === 'tr' ? 'Proje Danışmanlığı Alın' : 'Get Project Consultation'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
