'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="luxury-gradient-1 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-4xl lg:text-6xl font-light tracking-wide mb-8">
              İletişim
            </h1>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Size en iyi hizmeti sunabilmek için buradayız. Sorularınız için bizimle iletişime geçin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-light mb-12">İletişim Bilgileri</h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Adres</h3>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                      Önder Mahallesi<br />
                      Karpuzlu 1. Cadde No: 89/A<br />
                      Altındağ / Ankara
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Telefon</h3>
                    <div className="space-y-1 text-gray-600 font-light text-sm">
                      <p>T: 0312 349 6888</p>
                      <p>F: 0312 349 6889</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">WhatsApp Sipariş Hattı</h3>
                    <p className="text-gray-600 font-light text-sm">0540 349 6888</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">E-posta</h3>
                    <p className="text-gray-600 font-light text-sm">info@ormentekstil.com.tr</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Çalışma Saatleri</h3>
                    <div className="space-y-1 text-gray-600 font-light text-sm">
                      <p>Pazartesi - Cuma: 08:00 - 18:00</p>
                      <p>Cumartesi: 09:00 - 16:00</p>
                      <p>Pazar: Kapalı</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="luxury-card p-8"
            >
              <h2 className="text-3xl font-light mb-8">Bize Yazın</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      className="w-full border-0 border-b border-gray-300 bg-transparent py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-light"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full border-0 border-b border-gray-300 bg-transparent py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-light"
                      placeholder="Telefon numaranız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full border-0 border-b border-gray-300 bg-transparent py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="E-posta adresiniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    className="w-full border-0 border-b border-gray-300 bg-transparent py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">
                    Mesaj
                  </label>
                  <textarea
                    rows={6}
                    className="w-full border border-gray-300 bg-transparent p-4 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-light resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full border border-black text-black px-8 py-4 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-500 font-light"
                >
                  Mesajı Gönder
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="luxury-gradient-2 py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light mb-4">Konumumuz</h2>
            <p className="text-gray-600 font-light">
              Ankara Altındağ'da merkezi konumumuzda sizi bekliyoruz.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-200 h-96 rounded-sm flex items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <p className="font-light">
                Harita burada görüntülenecek<br />
                Önder Mahallesi, Karpuzlu 1. Cadde No: 89/A<br />
                Altındağ / Ankara
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
