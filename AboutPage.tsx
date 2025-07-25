'use client';

import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { 
  Shield, 
  Heart, 
  Lightbulb, 
  Users, 
  Award, 
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  language: 'tr' | 'en';
}

export function AboutPage({ language }: AboutPageProps) {
  const { getExistingPageContent } = useAdmin();
  const aboutContent = getExistingPageContent('about');

  // Fallback content in case admin data is not available
  const defaultContent = {
    hero: {
      title: { tr: 'Hakkımızda', en: 'About Us' },
      subtitle: { tr: '25 Yıllık Deneyim', en: '25 Years of Experience' },
      description: { tr: 'Ormen Tekstil olarak 1998 yılından bu yana Ankara\'da faaliyet göstermekteyiz.', en: 'As Ormen Tekstil, we have been operating in Ankara since 1998.' },
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop'
    },
    story: {
      title: { tr: 'Hikayemiz', en: 'Our Story' },
      content: { tr: '1998 yılında küçük bir atölye olarak başlayan yolculuğumuz, bugün Ankara\'nın en köklü kumaş firmalarından biri haline gelmiştir.', en: 'Our journey that started as a small workshop in 1998 has become one of Ankara\'s most established fabric companies today.' },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    },
    values: {
      title: { tr: 'Değerlerimiz', en: 'Our Values' },
      items: [
        {
          title: { tr: 'Kalite', en: 'Quality' },
          description: { tr: 'En yüksek kalite standartları', en: 'Highest quality standards' },
          icon: 'shield'
        },
        {
          title: { tr: 'Güven', en: 'Trust' },
          description: { tr: 'Müşteri memnuniyeti odaklı hizmet', en: 'Customer satisfaction focused service' },
          icon: 'heart'
        },
        {
          title: { tr: 'İnovasyon', en: 'Innovation' },
          description: { tr: 'Sürekli gelişim ve yenilik', en: 'Continuous development and innovation' },
          icon: 'lightbulb'
        }
      ]
    },
    team: {
      title: { tr: 'Ekibimiz', en: 'Our Team' },
      description: { tr: 'Uzman kadromuz ile size hizmet veriyoruz', en: 'We serve you with our expert staff' },
      members: [
        {
          name: 'Fatih Baba',
          position: { tr: 'Genel Müdür', en: 'General Manager' },
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          bio: { tr: '25 yıllık sektör deneyimi', en: '25 years of industry experience' }
        }
      ]
    }
  };

  // Use admin content if available, otherwise use default
  const content = aboutContent || defaultContent;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-8 h-8" />;
      case 'heart':
        return <Heart className="w-8 h-8" />;
      case 'lightbulb':
        return <Lightbulb className="w-8 h-8" />;
      default:
        return <Award className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-gradient-1">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={content.hero.backgroundImage}
            alt={content.hero.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light mb-4"
          >
            {content.hero.title[language]}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-6"
          >
            {content.hero.subtitle[language]}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg max-w-2xl mx-auto opacity-90"
          >
            {content.hero.description[language]}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                {content.story.title[language]}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600 mb-8">
                {content.story.content[language]}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 luxury-card">
                  <div className="text-3xl font-light text-amber-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}
                  </div>
                </div>
                
                <div className="text-center p-6 luxury-card">
                  <div className="text-3xl font-light text-amber-600 mb-2">1000+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'tr' ? 'Mutlu Müşteri' : 'Happy Customers'}
                  </div>
                </div>
                
                <div className="text-center p-6 luxury-card">
                  <div className="text-3xl font-light text-amber-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'tr' ? 'Kumaş Çeşidi' : 'Fabric Types'}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImageWithFallback
                src={content.story.image}
                alt={content.story.title[language]}
                className="w-full h-80 object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-luxury-gradient-2">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              {content.values.title[language]}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.values.items.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center luxury-card p-8"
              >
                <div className="text-amber-600 mb-6 flex justify-center">
                  {getIcon(value.icon)}
                </div>
                <h3 className="text-xl font-medium mb-4">{value.title[language]}</h3>
                <p className="text-gray-600">{value.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              {content.team.title[language]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.team.description[language]}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="luxury-card p-6 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                <p className="text-amber-600 mb-4">{member.position[language]}</p>
                <p className="text-gray-600 text-sm">{member.bio[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
