'use client';

import { motion } from 'framer-motion';
import { Award, Users, Globe, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  const stats = [
    {
      icon: Clock,
      number: "25+",
      label: "Yıllık Deneyim"
    },
    {
      icon: Users,
      number: "1000+",
      label: "Mutlu Müşteri"
    },
    {
      icon: Globe,
      number: "15+",
      label: "Ülkeye İhracat"
    },
    {
      icon: Award,
      number: "50+",
      label: "Ödül & Sertifika"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 tracking-wide">
              Palazzo Hikayesi
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              1998 yılında kurulan Palazzo, döşemelik kumaş sektöründe kalite ve inovasyonun 
              öncüsü olarak faaliyetlerini sürdürmektedir. Çeyrek asrı aşkın deneyimimizle, 
              geleneksel el sanatlarını modern tekniklerle harmanlayarak eşsiz kumaşlar üretiyoruz.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Müşteri memnuniyetini ön planda tutan yaklaşımımız, kaliteli hammadde seçimi ve 
              deneyimli ekibimizle, her projede mükemmelliği hedefliyoruz. Boucle'den velvet'e, 
              klasikten moderne uzanan geniş ürün yelpazemizle her zevke hitap ediyoruz.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sürdürülebilir üretim anlayışımız ve çevre dostu yaklaşımımızla, gelecek nesillere 
              daha yaşanabilir bir dünya bırakma hedefiyle hareket ediyoruz.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
                  alt="Palazzo atölyesi"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80"
                  alt="Kumaş üretim süreci"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1574942103728-6ad7886e7b96?w=400&q=80"
                  alt="Kalite kontrol"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
                  alt="Palazzo ekibi"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-3xl mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
