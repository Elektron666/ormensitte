'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VelvetSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Images */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main large image */}
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80"
                alt="Velvet fabric drapes"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              
              {/* Smaller overlay image */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-48 h-32"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=300&q=80"
                  alt="Velvet texture detail"
                  className="w-full h-full object-cover rounded-lg shadow-xl border-4 border-white"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 tracking-wide">
              Velvet Elegance
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Kadife kumaşların büyüleyici parlaklığı ve yumuşaklığı ile yaşam alanlarınıza 
              kraliyet havası katın. Her dokunuş, lüksün ve zarafetin hissedildiği bir deneyim sunar.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Özenle seçilmiş premium kadife kumaşlarımız, dayanıklılık ve güzelliği bir araya getirerek 
              evinizin atmosferini dönüştürür. Gün ışığında ve yapay aydınlatmada farklı tonlar 
              yakalayan bu eşsiz koleksiyon, her açıdan büyüleyici.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
              Kadife Koleksiyonunu Keşfet
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
