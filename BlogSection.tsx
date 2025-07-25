'use client';

import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, User, ArrowRight, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogSectionProps {
  language: 'tr' | 'en';
}

export function BlogSection({ language }: BlogSectionProps) {
  const { siteContent } = useAdmin();

  // SEO-optimized blog posts about fabric industry
  const seoOptimizedPosts = [
    {
      id: 'ankara-dosemelık-kumas-rehberi',
      title: {
        tr: 'Ankara\'da Döşemelik Kumaş Seçimi: Uzman Rehberi 2024',
        en: 'Upholstery Fabric Selection in Ankara: Expert Guide 2024'
      },
      excerpt: {
        tr: 'Ankara\'da en kaliteli döşemelik kumaş nasıl seçilir? Uzmanlarımızdan kumaş seçimi ipuçları, fiyat karşılaştırması ve kalite kriterleri.',
        en: 'How to choose the highest quality upholstery fabric in Ankara? Tips from our experts on fabric selection, price comparison and quality criteria.'
      },
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: {
        tr: ['Döşemelik Kumaş', 'Ankara Kumaş', 'Kumaş Seçimi', 'Dekorasyon İpuçları'],
        en: ['Upholstery Fabric', 'Ankara Fabric', 'Fabric Selection', 'Decoration Tips']
      },
      publishDate: '2024-01-15',
      author: 'Ormen Tekstil Uzmanları',
      readTime: '5 dk',
      category: 'Rehber',
      views: 1240
    },
    {
      id: 'kadife-kumas-bakim-rehberi',
      title: {
        tr: 'Kadife Kumaş Bakımı ve Temizliği: Profesyonel İpuçları',
        en: 'Velvet Fabric Care and Cleaning: Professional Tips'
      },
      excerpt: {
        tr: 'Kadife kumaş nasıl temizlenir? Lüks kadife döşemelerinizi uzun yıllar korumak için profesyonel bakım önerileri ve püf noktaları.',
        en: 'How to clean velvet fabric? Professional maintenance recommendations and tips to preserve your luxury velvet upholstery for many years.'
      },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: {
        tr: ['Kadife Kumaş', 'Kumaş Bakımı', 'Temizlik İpuçları', 'Lüks Döşeme'],
        en: ['Velvet Fabric', 'Fabric Care', 'Cleaning Tips', 'Luxury Upholstery']
      },
      publishDate: '2024-01-10',
      author: 'Ormen Tekstil',
      readTime: '4 dk',
      category: 'Bakım',
      views: 890
    },
    {
      id: 'boucle-kumas-trend-2024',
      title: {
        tr: '2024 Boucle Kumaş Trendleri: Modern Döşeme Tasarımları',
        en: '2024 Boucle Fabric Trends: Modern Upholstery Designs'
      },
      excerpt: {
        tr: '2024 yılının en trend boucle kumaş desenleri ve renkleri. Modern ev dekorasyonunda boucle kumaş kullanımı ve tasarım önerileri.',
        en: 'The most trendy boucle fabric patterns and colors of 2024. Use of boucle fabric in modern home decoration and design suggestions.'
      },
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: {
        tr: ['Boucle Kumaş', '2024 Trendleri', 'Modern Tasarım', 'İç Mimarlık'],
        en: ['Boucle Fabric', '2024 Trends', 'Modern Design', 'Interior Design']
      },
      publishDate: '2024-01-05',
      author: 'Tasarım Ekibi',
      readTime: '6 dk',
      category: 'Trend',
      views: 1567
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="py-20 luxury-gradient-1" id="blog">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">
            {language === 'tr' 
              ? 'Kumaş Dünyasından Haberler' 
              : 'News from the Fabric World'
            }
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {language === 'tr'
              ? 'Ankara kumaş sektöründeki son gelişmeler, uzman tavsiyeleri ve trend analizleri ile kumaş dünyasını keşfedin.'
              : 'Discover the fabric world with the latest developments in Ankara fabric industry, expert advice and trend analysis.'
            }
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {seoOptimizedPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="luxury-card h-full overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-500 text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-white bg-black/50 px-2 py-1 rounded">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs">{post.views}</span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title[language]}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.excerpt[language]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags[language].slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      <span>
                        {language === 'tr' ? 'Devamını Oku' : 'Read More'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            <span>
              {language === 'tr' 
                ? 'Tüm Blog Yazılarını Görüntüle' 
                : 'View All Blog Posts'
              }
            </span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* SEO Content Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-8 border border-amber-200">
            <h3 className="text-xl font-medium mb-4 text-amber-800">
              {language === 'tr' 
                ? 'Ankara Kumaş Sektöründe Güvenilir Kaynak' 
                : 'Reliable Source in Ankara Fabric Industry'
              }
            </h3>
            <p className="text-amber-700 leading-relaxed">
              {language === 'tr'
                ? 'Ormen Tekstil olarak, Ankara\'da 25 yıldır kumaş sektörünün nabzını tutuyoruz. Döşemelik kumaş, kadife kumaş ve boucle kumaş konularında uzman kadromuzla hazırladığımız içeriklerle, sektördeki en güncel bilgileri sizlerle paylaşıyoruz. Ankara kumaş piyasasındaki gelişmeleri takip edin ve uzman tavsiyeleriyle doğru kumaş seçimi yapın.'
                : 'As Ormen Tekstil, we have been keeping our finger on the pulse of the fabric industry in Ankara for 25 years. With the content we prepare with our expert staff on upholstery fabric, velvet fabric and boucle fabric, we share the most up-to-date information in the industry with you. Follow the developments in Ankara fabric market and make the right fabric choice with expert advice.'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
