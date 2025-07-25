'use client';

import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

const sections = [
  {
    id: 'about',
    title: 'CRAFTSMANSHIP',
    subtitle: 'HERITAGE & EXCELLENCE',
    description: 'Since 1998, Palazzo has been dedicated to creating the finest luxury fabrics for discerning clientele. Our commitment to traditional craftsmanship combined with contemporary design sensibilities sets us apart in the world of high-end textiles.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=90',
    imagePosition: 'left'
  },
  {
    id: 'fabrics',
    title: 'COLLECTIONS',
    subtitle: 'CURATED SELECTIONS',
    description: 'From sumptuous velvets to textured bouclés, our collections represent the pinnacle of fabric artistry. Each piece is carefully selected and crafted to meet the exacting standards of luxury interior design.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=90',
    imagePosition: 'right'
  },
  {
    id: 'collections',
    title: 'BESPOKE',
    subtitle: 'TAILORED TO PERFECTION',
    description: 'Our bespoke service offers unlimited possibilities for customization. Work with our design team to create unique fabrics that perfectly complement your vision and space requirements.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=90',
    imagePosition: 'left'
  }
];

export function ContentSections() {
  return (
    <div className="bg-background">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="min-h-screen flex items-center py-24 lg:py-32"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
              section.imagePosition === 'right' ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Image */}
              <motion.div
                className={`relative overflow-hidden ${
                  section.imagePosition === 'right' ? 'lg:col-start-2' : ''
                }`}
                initial={{ opacity: 0, x: section.imagePosition === 'left' ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="aspect-[3/2] lg:aspect-[4/3]">
                  <ImageWithFallback
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover image-hover"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className={`space-y-8 ${
                  section.imagePosition === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}
                initial={{ opacity: 0, x: section.imagePosition === 'left' ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div>
                  <motion.span
                    className="text-sm tracking-widest text-muted-foreground block mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {section.subtitle}
                  </motion.span>
                  <motion.h2
                    className="text-4xl lg:text-6xl tracking-widest mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {section.title}
                  </motion.h2>
                </div>

                <motion.div
                  className="w-16 h-px bg-foreground"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 64, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                ></motion.div>

                <motion.p
                  className="text-lg leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {section.description}
                </motion.p>

                <motion.button
                  className="group relative overflow-hidden border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <span className="relative z-10 text-sm tracking-widest">LEARN MORE</span>
                  <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
