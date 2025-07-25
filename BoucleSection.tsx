'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BoucleSection() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8 }
  };

  return (
    <section id="collections" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl mb-6 tracking-wide">
              Boucle Inspirations
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Boucle dokusunun benzersiz karakteri, her dokunuşta hissedilen lüks ve konforu bir araya getiriyor. 
              Geleneksel tekniklerle modern tasarımın buluştuğu bu koleksiyon, evinize zarafet katacak.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Her bir kumaş, özenle seçilmiş ipliklerden dokunarak, dayanıklılık ve estetik güzelliği 
              bir arada sunar. Boucle serimiz, klasik ve çağdaş tasarımları harmanlayarak 
              yaşam alanlarınıza karakter katar.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
              Boucle Koleksiyonunu Görüntüle
            </Button>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80"
                  alt="Boucle texture close-up"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&q=80"
                  alt="Boucle fabric detail"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
                  alt="Textured fabric"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80"
                  alt="Woven texture"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
