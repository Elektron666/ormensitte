'use client';

import { motion } from 'framer-motion';
import { Shield, Droplets, Flame, Building2, Coffee, Hotel, Compass, FileText, Calculator, Award, Sparkles, Heart, Leaf, Zap, Star, CheckCircle2, PawPrint, Wind, Sun, Microscope } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProfessionalSolutionsPage() {
  const solutions = [
    {
      icon: <Hotel className="w-8 h-8" />,
      title: "Otelcilik & Konaklama",
      description: "5 yıldızlı oteller ve butik konaklama tesisleri için lüks görünüm ve üstün performans",
      features: ["FR sertifikalı", "Leke direnci", "Yoğun kullanım", "Hijyenik", "Sessizlik"],
      details: "Otel lobilerinden VIP süitlere kadar tüm alanlarda kullanıma uygun, uluslararası yangın güvenlik standartlarına uygun ve 7/24 kullanıma dayanıklı premium kumaşlar.",
      applications: ["Otel lobi", "Süit odalar", "Konferans salonları", "SPA alanları"],
      techSpecs: "EN 1021-1/2, Martindale 100.000+, UV dayanım Level 6"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Restoran & Gastronomi",
      description: "Yiyecek-içecek sektörünün zorlu koşullarına dayanıklı, hijyenik çözümler",
      features: ["Su itici", "Antibakteriyel", "Easyclean®", "Renk haslığı", "Aroma barrier"],
      details: "Yoğun servis temposu, sıcak yemek servisi ve sürekli temizlik gerektiren ortamlar için özel geliştirilmiş akıllı kumaş teknolojileri.",
      applications: ["Fine dining", "Casual dining", "Kafeler", "Pastaneler"],
      techSpecs: "Aquafend™ Level 5, Bioshield+ aktif, pH 6.5-8.5 dayanım"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Kurumsal & Ofis",
      description: "Modern iş dünyasının dinamik ihtiyaçlarına yönelik profesyonel çözümler",
      features: ["Akustik", "Ergonomik", "Antistatik", "Renk tutarlılığı", "Ekonomik"],
      details: "Uzun çalışma saatleri, yoğun toplantı trafiği ve profesyonel görünüm gereksinimleri için tasarlanmış fonksiyonel kumaşlar.",
      applications: ["Executive ofisler", "Toplantı odaları", "Co-working", "Resepsiyon"],
      techSpecs: "NRC 0.85, <50 Ohm iletkenlik, 100+ renk seçeneği"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Sağlık & Medikal",
      description: "Hasta güvenliği ve hijyen standartlarına uygun medikal grade kumaşlar",
      features: ["Antibakteriyel", "Antiviral", "Kimyasal direnci", "Sterilizasyon", "Hipoalerjenik"],
      details: "Hastane enfeksiyon kontrol protokollerine uygun, hasta konforunu artıran ve medikal ekipman uyumlu özel dokular.",
      applications: ["Hastane odaları", "Ameliyathaneler", "Klinikler", "Yaşlı bakım"],
      techSpecs: "ISO 22196, EN 14476, Bleach 5000ppm dayanım"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Eğitim & Akademik",
      description: "Eğitim kurumlarının dinamik ortamlarına uygun dayanıklı ve güvenli seçenekler",
      features: ["Çocuk güvenliği", "Dayanıklılık", "Kolay bakım", "Renk canlılığı", "Sessizlik"],
      details: "Yoğun öğrenci kullanımı, sürekli temizlik ve güvenlik gereksinimlerini karşılayan, yaratıcılığı destekleyen kumaşlar.",
      applications: ["Sınıflar", "Kütüphaneler", "Kafeteryalar", "Yurtlar"],
      techSpecs: "Oeko-Tex Standard 100, Martindale 80.000+, Class A yanıcılık"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Perakende & Mağazacılık",
      description: "Marka kimliğini yansıtan, müşteri deneyimini artıran estetik çözümler",
      features: ["Trend renkleri", "Hızlı değişim", "Marka uyumu", "Dayanıklılık", "LED uyumlu"],
      details: "Sık değişen konseptler, yoğun müşteri trafiği ve marka imajı gereksinimlerine uygun esnek tasarım çözümleri.",
      applications: ["Butikler", "AVM mağazaları", "Showroom", "Pop-up store"],
      techSpecs: "Fade Level 7-8, Quick-change sistem, 500+ pantone uyumu"
    },
    {
      icon: <PawPrint className="w-8 h-8" />,
      title: "Pet-Friendly Alanlar",
      description: "Evcil hayvan dostu mekanlar için özel geliştirilmiş hijyenik ve dayanıklı kumaşlar",
      features: ["Pet-safe", "Kolay temizlik", "Koku kontrolü", "Pençe direnci", "Antibakteriyel"],
      details: "Pet cafe, veteriner klinikleri ve evcil hayvan kabul eden işletmeler için güvenli, hijyenik ve pratik kumaş teknolojileri.",
      applications: ["Pet cafe", "Veteriner klinik", "Pet otel", "Pet grooming"],
      techSpecs: "Non-toxic sertifika, Odor-block teknoloji, Claw-resistant+"
    }
  ];

  const advancedTechnologies = [
    {
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      title: "Easyclean® Technology",
      subtitle: "Liquid Repellent System",
      description: "Patentli nano-kaplama teknolojisi ile sıvı ve leke itici özellik. Kahve, şarap, yağ gibi zorlu lekelerde bile kolay temizlik.",
      features: ["10 dakikada kuru temizlik", "Deterjan tasarrufu %70", "Su iticilik Level 5", "5 yıl garanti"],
      performance: "99.9% leke direnci",
      applications: ["Restoranlar", "Otel lobiler", "Ofis alanları"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Bioshield+™ Protection",
      subtitle: "Advanced Antimicrobial System",
      description: "Gümüş iyon teknolojisi ile 99.99% bakteri, virüs ve mantar koruması. 24 saat sürekli hijyen sağlar.",
      features: ["Anti-bacterial", "Anti-viral", "Anti-fungal", "24/7 aktif korunma"],
      performance: "99.99% mikrop eliminasyonu",
      applications: ["Sağlık kurumları", "Eğitim kurumları", "Kafe & restoranlar"]
    },
    {
      icon: <Flame className="w-8 h-8 text-red-600" />,
      title: "FireGuard™ FR System",
      subtitle: "Fire Retardant Technology",
      description: "Avrupa standartlarında yangın geciktirici özellik. İnsan sağlığına zararsız, çevre dostu formülasyon.",
      features: ["EN 1021-1/2 uyumlu", "Toksik gaz yaymaz", "Kendiliğinden söner", "Çevre dostu"],
      performance: "Class 1 fire rating",
      applications: ["Oteller", "Hastaneler", "Kamu binaları"]
    },
    {
      icon: <Wind className="w-8 h-8 text-purple-600" />,
      title: "AcousticPlus® Sound Control",
      subtitle: "Noise Reduction Technology",
      description: "Ses yalıtım ve akustik konfor için özel doku yapısı. Ofis ve toplantı odalarında ideal ses kontrolü.",
      features: ["NRC 0.85 emilim", "Echo azaltma", "Konuşma netliği", "Çalışma verimliliği"],
      performance: "85% ses emilimi",
      applications: ["Ofisler", "Toplantı salonları", "Call center"]
    },
    {
      icon: <Sun className="w-8 h-8 text-yellow-600" />,
      title: "UV-Shield™ Protection",
      subtitle: "Color Fastness System",
      description: "Güneş ışığı ve UV radyasyonuna karşı üstün direnç. Renk canlılığını yıllarca korur.",
      features: ["UV Level 8 direnç", "Renk solmaması", "10 yıl garanti", "Energy efficient"],
      performance: "2000+ saat UV testi",
      applications: ["Güneş alan alanlar", "Cam kenarı mobilyalar"]
    },
    {
      icon: <PawPrint className="w-8 h-8 text-orange-600" />,
      title: "Pet-Safe™ Technology",
      subtitle: "Animal Friendly System",
      description: "Evcil hayvanlar için tamamen güvenli, non-toksik malzemeler. Kolay temizlik ve koku kontrolü.",
      features: ["Non-toxic sertifika", "Koku absorbe", "Pençe direnci", "Allergen-free"],
      performance: "100% pet güvenlik",
      applications: ["Pet cafe", "Vet klinikleri", "Pet friendly ofisler"]
    }
  ];

  const performanceMetrics = [
    { label: "Martindale Dayanım", value: "100,000+", unit: "devir" },
    { label: "UV Dayanım", value: "Level 8", unit: "max" },
    { label: "Leke Direnci", value: "99.9%", unit: "" },
    { label: "Antibakteriyel Etki", value: "99.99%", unit: "" },
    { label: "Ses Emilimi", value: "NRC 0.85", unit: "" },
    { label: "Yangın Direnci", value: "Class 1", unit: "" }
  ];

  const certifications = [
    { name: "OEKO-TEX Standard 100", category: "Tekstil Güvenliği" },
    { name: "GREENGUARD Gold", category: "İç Mekan Hava Kalitesi" },
    { name: "Cradle to Cradle", category: "Sürdürülebilirlik" },
    { name: "ISO 22196", category: "Antibakteriyel Test" },
    { name: "EN 1021-1/2", category: "Yangın Güvenliği" },
    { name: "REACH Compliance", category: "Kimyasal Güvenlik" }
  ];

  const services = [
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Uzman Proje Danışmanlığı",
      description: "25+ yıl deneyimli uzmanlarımızla ücretsiz proje danışmanlığı",
      details: ["Teknik özellik analizi", "Maliyet optimizasyonu", "Estetik uyumluluk", "Sürdürülebilirlik değerlendirmesi", "Risk analizi"]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Teknik Dokümantasyon",
      description: "İhale ve proje süreçleriniz için kapsamlı teknik destek",
      details: ["Test raporları ve sertifikalar", "3D görselleştirme", "CAD çizim desteği", "Şartname hazırlama", "Numune koleksiyonu"]
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Akıllı Metraj & Bütçeleme",
      description: "Dijital araçlarla hassas hesaplama ve şeffaf fiyatlandırma",
      details: ["AI destekli metraj hesabı", "Dinamik fiyatlandırma", "Toplu proje indirimleri", "Ödeme planları", "ROI analizi"]
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="luxury-gradient-1 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-gray-200/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-light text-gray-700">2025 Teknoloji Lideri</span>
            </motion.div>
            
            <h1 className="text-4xl lg:text-7xl font-light tracking-wide mb-8">
              Profesyonel Çözümler
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              İleri teknoloji, üstün performans ve estetik mükemmelliği bir araya getiren 
              sektör lideri kumaş çözümleri.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>100+ Teknik Özellik</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Uluslararası Sertifikalar</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>25+ Sektör Deneyimi</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                  {metric.value}
                  {metric.unit && <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>}
                </div>
                <div className="text-xs text-gray-600 font-light">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Technologies */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              İleri Teknoloji Sistemi
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
              Patentli teknolojiler ve Ar-Ge çalışmalarımızın sonucu olan yenilikçi kumaş çözümleri
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedTechnologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                className="luxury-card p-8 group hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-500 mr-4">
                    <div className="text-gray-600 group-hover:text-white transition-colors duration-500">
                      {tech.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {tech.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                      {tech.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 font-light text-sm mb-6 leading-relaxed">
                  {tech.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-900">Performans</span>
                    <span className="text-xs font-light text-green-600">{tech.performance}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {tech.features.map((feature, idx) => (
                      <div key={idx} className="text-xs text-gray-500 font-light flex items-center">
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-gray-900 mb-2">Uygulama Alanları:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tech.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-50 text-xs text-gray-600 font-light rounded-sm"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="luxury-gradient-2 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              Sektörel Uzmanlık
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
              Her sektörün kendine özgü ihtiyaçları için tasarlanmış, test edilmiş ve onaylanmış çözümler
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                className="luxury-card p-6 group hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-500 mr-3">
                    <div className="text-gray-600 group-hover:text-white transition-colors duration-500">
                      {solution.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-light text-gray-900">
                    {solution.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 font-light text-sm mb-4 leading-relaxed">
                  {solution.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {solution.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-xs text-gray-700 font-light rounded-sm border border-gray-200/50"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-500 font-light text-xs mb-4 leading-relaxed">
                  {solution.details}
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="text-xs font-medium text-gray-900 mb-1">Uygulamalar</h4>
                      <div className="space-y-1">
                        {solution.applications.slice(0, 2).map((app, idx) => (
                          <div key={idx} className="text-xs text-gray-500 font-light">• {app}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-900 mb-1">Teknik Özellik</h4>
                      <div className="text-xs text-gray-500 font-light leading-relaxed">
                        {solution.techSpecs}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-light mb-4">
              Uluslararası Sertifikalar & Standartlar
            </h2>
            <p className="text-gray-600 font-light">
              Dünya standartlarında kalite ve güvenlik sertifikaları
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:from-green-50 group-hover:to-green-100 transition-all duration-300">
                  <Award className="w-8 h-8 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                </div>
                <div className="text-xs font-medium text-gray-900 mb-1">{cert.name}</div>
                <div className="text-xs text-gray-500 font-light">{cert.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services */}
      <section className="luxury-gradient-1 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-6">
              360° Profesyonel Hizmet
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
              Proje fikrinden uygulamaya kadar her aşamada yanınızdayız
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="luxury-card p-8 group hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-500 mb-4">
                    <div className="text-gray-600 group-hover:text-white transition-colors duration-500">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-light mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 font-light text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-gray-500 font-light flex items-start">
                      <Zap className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="luxury-card p-12 lg:p-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Microscope className="w-4 h-4 text-green-600" />
              <span className="text-sm font-light text-green-700">Ücretsiz Proje Analizi</span>
            </motion.div>

            <h2 className="text-3xl lg:text-4xl font-light mb-6">
              Projenizi Gerçeğe Dönüştürün
            </h2>
            <p className="text-gray-600 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              25+ yıllık deneyimimiz ve ileri teknoloji altyapımızla, 
              hayalinizdeki projeyi mükemmel şekilde hayata geçiriyoruz.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <button className="border border-black text-black px-8 py-4 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-500 font-light flex items-center justify-center space-x-2">
                <span>WhatsApp Destek</span>
                <span className="text-xs">0540 349 6888</span>
              </button>
              <button className="bg-black text-white px-8 py-4 text-sm tracking-wide hover:bg-gray-800 transition-all duration-500 font-light flex items-center justify-center space-x-2">
                <span>Hemen Ara</span>
                <span className="text-xs">0312 349 6888</span>
              </button>
              <button className="border border-black text-black px-8 py-4 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-500 font-light">
                Numune Koleksiyonu İsteyin
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>24 saat içinde dönüş</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>Ücretsiz numune</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>Uzman danışmanlık</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
