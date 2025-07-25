'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Palette, Scissors, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CustomDesignSection() {
  const features = [
    {
      icon: Palette,
      title: "Renk Seçimi",
      description: "Geniş renk paletimizden istediğiniz tonu seçin"
    },
    {
      icon: Scissors,
      title: "Özel Kesim",
      description: "İhtiyacınıza göre özel ölçülerde hazırlama"
    },
    {
      icon: Sparkles,
      title: "Kişiselleştirme",
      description: "Desenler ve dokular ile unique tasarımlar"
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 tracking-wide">
              Design your touch!
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Hayalinizdeki kumaşı bizimle birlikte tasarlayın. Renk, doku ve desenlerden 
              oluşan geniş seçeneklerimizle tamamen size özel kumaşlar üretiyoruz.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start space-x-4"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
              Özel Tasarım Başlat
            </Button>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="relative"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80"
              alt="Custom fabric design workspace"
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Palette className="w-8 h-8 text-gray-700" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 bg-black rounded-full shadow-lg flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
