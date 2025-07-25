'use client';

import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Users, Calendar } from 'lucide-react';

export function ProjectShowcaseSection() {
  const projects = [
    {
      title: "Luxe Hotel Istanbul",
      category: "5 Yıldızlı Otel",
      location: "İstanbul, Türkiye",
      area: "12,000 m²",
      year: "2023",
      description: "Modern lüks otel projesi için FR sertifikalı kadife ve bukle kumaşlarla 500 oda ve ortak alan döşemesi.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90",
      features: ["FR Sertifikalı", "Antibakteriyel", "Leke Direnci"]
    },
    {
      title: "Noa Restaurant Chain",
      category: "Restoran Zinciri",
      location: "Ankara, Türkiye", 
      area: "800 m²",
      year: "2024",
      description: "Premium restoran zinciri için kolay temizlenebilir ve su itici özellikli kumaşlar ile 15 şube döşemesi.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=90",
      features: ["Su İtici", "Kolay Temizlik", "Dayanıklılık"]
    },
    {
      title: "Corporate Plaza",
      category: "Kurumsal Ofis",
      location: "Ankara, Türkiye",
      area: "5,500 m²",
      year: "2023",
      description: "Modern ofis kompleksi için akustik özellikli kumaşlar ile executive ofisler ve toplantı salonları döşemesi.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=90",
      features: ["Akustik", "Renk Haslığı", "Ergonomik"]
    }
  ];

  return (
    <section className="luxury-gradient-2 py-20 lg:py-28">
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
            Referans Projeler
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Türkiye'nin önde gelen mimarlık firmalarının ve proje yöneticilerinin tercihi olan 
            başarılı projelerimizden örnekler.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16 lg:space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <ImageWithFallback
                  src={project.image}
                  alt={`${project.title} proje görseli`}
                  className="w-full h-80 lg:h-96 object-cover rounded-sm shadow-xl"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm">
                  <span className="text-xs font-medium text-gray-800">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-light mb-4 text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 font-light">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 font-light">{project.area}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 font-light">{project.year}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Kullanılan Özellikler:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white border border-gray-200 text-xs text-gray-600 font-light rounded-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="border border-black text-black px-6 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-500 font-light">
                    Proje Detayları
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="luxury-card p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-light mb-4">
              Projeniz İçin Özel Çözüm
            </h3>
            <p className="text-gray-600 font-light mb-8 leading-relaxed">
              Her proje kendine özgüdür. Size özel kumaş seçimi ve teknik danışmanlık hizmeti için 
              uzman ekibimizle iletişime geçin.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button className="border border-black text-black px-6 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-500 font-light">
                Ücretsiz Keşif
              </button>
              <button className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition-all duration-500 font-light">
                Hemen Ara: 0312 349 6888
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
