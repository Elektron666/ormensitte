'use client';

import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CustomFabricGallery() {
  // KENDİ KUMAŞ GÖRSELLERİNİZ
  const customFabrics = [
    {
      id: 1,
      title: 'Premium Bukle Koleksiyonu',
      image: '/images/fabrics/bukle-premium-1.jpg', // ← Kendi görseliniz
      category: 'Bukle',
      description: 'Özel dokuma bukle kumaş'
    },
    {
      id: 2,
      title: 'Velvet Luxury Serisi',
      image: '/images/fabrics/velvet-luxury-1.jpg', // ← Kendi görseliniz
      category: 'Kadife',
      description: 'Lüks kadife kumaş koleksiyonu'
    },
    {
      id: 3,
      title: 'Outdoor Dayanıklı Serisi',
      image: '/images/fabrics/outdoor-durable-1.jpg', // ← Kendi görseliniz
      category: 'Dış Mekan',
      description: 'Hava koşullarına dayanıklı kumaş'
    },
    {
      id: 4,
      title: 'Chester Deri Koleksiyonu',
      image: '/images/products/chester-leather-1.jpg', // ← Kendi görseliniz
      category: 'Deri',
      description: 'Premium deri chester koltuk'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-light mb-4">
            Kumaş Koleksiyonumuz
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kendi atölyemizde üretilen özel kumaş seçeneklerimizi keşfedin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {customFabrics.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              className="luxury-card overflow-hidden group hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={fabric.image} // ← Kendi görselleriniz
                  alt={fabric.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-gray-800">{fabric.category}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium mb-2 group-hover:text-amber-600 transition-colors duration-300">
                  {fabric.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {fabric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
