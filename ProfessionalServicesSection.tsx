'use client';

import { motion } from 'framer-motion';
import { Compass, FileText, Truck, HeadphonesIcon, Calculator, Award } from 'lucide-react';

export function ProfessionalServicesSection() {
  const services = [
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Proje Danışmanlığı",
      description: "Mimarlık ve iç mimarlık projeleriniz için uzman kumaş seçimi danışmanlığı",
      details: ["Teknik özellik analizi", "Maliyet optimizasyonu", "Estetik uyum"]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Teknik Dokümantasyon",
      description: "İhale ve proje dosyalarınız için detaylı teknik şartnameler",
      details: ["Test raporları", "Sertifika belgeler", "3D görselleştirme"]
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Metraj & Fiyatlandırma",
      description: "Doğru metraj hesabı ve şeffaf fiyatlandırma ile bütçe planlaması",
      details: ["Detaylı metraj listesi", "Toplu proje indirimleri", "Ödeme kolaylıkları"]
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Lojistik Çözümler",
      description: "Türkiye geneli hızlı ve güvenli teslimat ağımızla zamanında teslimat",
      details: ["Şantiye teslimi", "Depo hizmetleri", "Acil sevkiyat"]
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "7/24 Destek",
      description: "Proje süresince kesintisiz teknik destek ve müşteri hizmetleri",
      details: ["Anlık iletişim", "Sahada destek", "Sorun çözme"]
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Kalite Garantisi",
      description: "Sektör standartlarının üzerinde kalite garantisi ve servis hizmetleri",
      details: ["Ürün garantisi", "Performans takibi", "Servis desteği"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "İlk Görüşme",
      description: "Projenizin ihtiyaçlarını analiz ediyor, teknik gereksinimleri belirliyoruz."
    },
    {
      step: "02", 
      title: "Öneri Sunumu",
      description: "Size özel kumaş önerileri ve teknik çözümlerle detaylı sunum hazırlıyoruz."
    },
    {
      step: "03",
      title: "Numune Teslimi",
      description: "Seçtiğiniz kumaşların numunelerini en kısa sürede size ulaştırıyoruz."
    },
    {
      step: "04",
      title: "Sipariş & Üretim",
      description: "Onayladığınız ürünlerin üretimini başlatıyor, süreç takibi yapıyoruz."
    },
    {
      step: "05",
      title: "Teslimat & Montaj",
      description: "Ürünlerinizi zamanında teslim ediyor, gerekirse montaj desteği sağlıyoruz."
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
            Profesyonel Hizmetler
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Projelerinizin başından sonuna kadar yanınızda olan kapsamlı hizmet ağımızla, 
            en karmaşık projeleri bile başarıyla tamamlıyoruz.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="luxury-card p-6 group hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-500">
                  <div className="text-gray-600 group-hover:text-white transition-colors duration-500">
                    {service.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-light mb-3 text-gray-900">
                {service.title}
              </h3>
              
              <p className="text-gray-600 font-light text-sm mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-1">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="text-xs text-gray-500 font-light flex items-center">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <motion.div
          className="luxury-gradient-1 rounded-lg p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-light mb-4">
              Çalışma Sürecimiz
            </h3>
            <p className="text-gray-600 font-light">
              Projenizin her aşamasında profesyonel bir deneyim yaşamanız için özenle tasarlanmış sürecimiz
            </p>
          </div>

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Connection Line - Desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-16 w-full h-px bg-gray-300 z-0"></div>
                )}
                
                {/* Connection Line - Mobile */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden absolute top-12 left-6 w-px h-16 bg-gray-300 z-0"></div>
                )}

                <div className="relative z-10 bg-white">
                  <div className="flex items-start lg:flex-col lg:items-center lg:text-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium mb-4">
                      {step.step}
                    </div>
                    <div className="ml-4 lg:ml-0">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 font-light text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-light mb-6">
            Projenizi Başlatmaya Hazır mısınız?
          </h3>
          <p className="text-gray-600 font-light mb-8 max-w-2xl mx-auto">
            Uzman ekibimiz size en uygun çözümleri bulmanız için burada. 
            Ücretsiz danışmanlık için hemen iletişime geçin.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <button className="border border-black text-black px-6 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-500 font-light">
              WhatsApp: 0540 349 6888
            </button>
            <button className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition-all duration-500 font-light">
              Hemen Ara: 0312 349 6888
            </button>
            <button className="border border-black text-black px-6 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-500 font-light">
              E-posta Gönder
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
