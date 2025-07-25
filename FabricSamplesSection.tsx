'use client';

import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FabricSamplesSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[60vh]">
          {/* Left side - Fabric samples image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=90"
              alt="Fabric samples collection"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right side - Classical column detail */}
          <motion.div
            className="relative bg-black"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=90"
              alt="Classical column detail"
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
