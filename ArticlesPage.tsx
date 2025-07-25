'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Search, 
  Tag, 
  Filter,
  TrendingUp,
  BookOpen,
  Hash,
  ArrowRight,
  Share2,
  ExternalLink,
  Target,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticlesPageProps {
  language: 'tr' | 'en';
}

export function ArticlesPage({ language }: ArticlesPageProps) {
  const { siteContent } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showFullArticle, setShowFullArticle] = useState(false);

  // SEO optimized articles from admin content or fallback to demo content
  const articles = siteContent?.articles?.posts || [];

  // Filter articles
  const filteredArticles = articles.filter((article: any) => {
    const matchesSearch = !searchTerm || 
      article.title[language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt[language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags[language]?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory && article.published;
  });

  // Get unique categories
  const categories = ['all', ...new Set(articles.map((article: any) => article.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-luxury-gradient-1 pt-20">
      {/* SEO Header */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-amber-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-light">
                {language === 'tr' ? 'SEO Makaleleri' : 'SEO Articles'}
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              {language === 'tr' 
                ? 'Ankara kumaş dünyasından uzman yazıları, trend analizleri ve rehberler'
                : 'Expert articles, trend analysis and guides from Ankara fabric world'
              }
            </p>

            {/* SEO Keywords Display */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Ankara Kumaş', 'Döşemelik Kumaş', 'Boucle Kumaş', 'Kadife Kumaş', 'İç Mimarlık'].map((keyword) => (
                <Badge key={keyword} className="bg-amber-100 text-amber-800 px-3 py-1">
                  <Hash className="w-3 h-3 mr-1" />
                  {keyword}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={language === 'tr' ? 'Makale ara...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  {category === 'all' ? (language === 'tr' ? 'Tümü' : 'All') : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {filteredArticles.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article: any) => (
                <motion.div key={`public-article-${article.id}`} variants={itemVariants}>
                  <Card className="luxury-card h-full overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer"
                        onClick={() => {
                          setSelectedArticle(article);
                          setShowFullArticle(true);
                        }}>
                    
                    {/* Article Image */}
                    {article.image && (
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title[language]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-amber-500 text-white">
                            {article.category}
                          </Badge>
                          {article.featured && (
                            <Badge className="bg-red-500 text-white">
                              <Target className="w-3 h-3 mr-1" />
                              {language === 'tr' ? 'Öne Çıkan' : 'Featured'}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-white bg-black/50 px-2 py-1 rounded">
                          <Eye className="w-3 h-3" />
                          <span className="text-xs">{article.views || 0}</span>
                        </div>
                      </div>
                    )}

                    {/* Article Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.publishDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} dk</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-medium mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {article.title[language]}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.excerpt[language]}
                      </p>

                      {/* SEO Keywords */}
                      {article.keywords && article.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.keywords.slice(0, 3).map((keyword: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Hash className="w-2 h-2 mr-1" />
                              {keyword}
                            </Badge>
                          ))}
                          {article.keywords.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{article.keywords.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Author & Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 text-sm font-medium"
                        >
                          <span>
                            {language === 'tr' ? 'Devamını Oku' : 'Read More'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {language === 'tr' ? 'Makale Bulunamadı' : 'No Articles Found'}
              </h3>
              <p className="text-gray-600">
                {language === 'tr' 
                  ? 'Arama kriterlerinize uygun makale bulunamadı.'
                  : 'No articles found matching your search criteria.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Full Article Modal */}
      {showFullArticle && selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-500 text-white">
                  {selectedArticle.category}
                </Badge>
                {selectedArticle.featured && (
                  <Badge className="bg-red-500 text-white">
                    <Target className="w-3 h-3 mr-1" />
                    Öne Çıkan
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowFullArticle(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Article Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-light mb-4">{selectedArticle.title[language]}</h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedArticle.publishDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedArticle.readTime} dakika okuma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{selectedArticle.views || 0} görüntülenme</span>
                  </div>
                </div>

                {selectedArticle.image && (
                  <div className="mb-6">
                    <ImageWithFallback
                      src={selectedArticle.image}
                      alt={selectedArticle.title[language]}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {selectedArticle.content[language]}
                </div>
              </div>

              {/* Keywords */}
              {selectedArticle.keywords && selectedArticle.keywords.length > 0 && (
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Anahtar Kelimeler
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.keywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SEO Footer */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-white mt-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-light mb-4">
            {language === 'tr' 
              ? 'Ankara Kumaş Dünyasında Uzman İçerikler'
              : 'Expert Content in Ankara Fabric World'
            }
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'tr'
              ? 'Ormen Tekstil uzmanları tarafından hazırlanan SEO optimizasyonlu makaleler ile kumaş dünyasındaki en güncel gelişmeleri takip edin.'
              : 'Follow the latest developments in the fabric world with SEO-optimized articles prepared by Ormen Tekstil experts.'
            }
          </p>
        </div>
      </section>
    </div>
  );
}
