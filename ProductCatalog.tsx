'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Search, Filter, Grid, List } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  colors: string[];
  material: string;
  width: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Boucle Premium Serisi",
    category: "Boucle",
    price: "₺450/metre",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
    colors: ["Bej", "Gri", "Lacivert"],
    material: "100% Yün",
    width: "140cm"
  },
  {
    id: 2,
    name: "Velvet Lux Koleksiyonu",
    category: "Velvet",
    price: "₺380/metre",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80",
    colors: ["Bordo", "Yeşil", "Mavi"],
    material: "Kadife",
    width: "140cm"
  },
  {
    id: 3,
    name: "Tekstür Çizgili Serisi",
    category: "Textured",
    price: "₺320/metre",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    colors: ["Krem", "Kahve", "Antrasit"],
    material: "Karışım",
    width: "140cm"
  },
  {
    id: 4,
    name: "Modern Geometrik",
    category: "Contemporary",
    price: "₺520/metre",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80",
    colors: ["Siyah", "Beyaz", "Gri"],
    material: "100% Pamuk",
    width: "150cm"
  },
  {
    id: 5,
    name: "Klasik Damask",
    category: "Classic",
    price: "₺420/metre",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=400&q=80",
    colors: ["Altın", "Bordo", "Yeşil"],
    material: "İpek Karışım",
    width: "140cm"
  },
  {
    id: 6,
    name: "Çiçek Desenli Vintage",
    category: "Vintage",
    price: "₺360/metre",
    image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&q=80",
    colors: ["Pudra", "Mint", "Lavanta"],
    material: "Pamuk",
    width: "140cm"
  }
];

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = ['all', 'Boucle', 'Velvet', 'Textured', 'Contemporary', 'Classic', 'Vintage'];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (search: string, category: string) => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.material.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-wide">Ürün Kataloğu</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium kalitedeki kumaş koleksiyonumuzu keşfedin ve projeleriniz için mükemmel olanı bulun.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Kategori seç" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Tüm Kategoriler' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                  }`}>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-xl mb-2">{product.name}</h3>
                    <p className="text-2xl mb-4 text-primary">{product.price}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-sm text-gray-600">Malzeme: </span>
                        <span className="text-sm">{product.material}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">En: </span>
                        <span className="text-sm">{product.width}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 block mb-2">Mevcut Renkler:</span>
                        <div className="flex gap-2">
                          {product.colors.map(color => (
                            <Badge key={color} variant="outline" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1">Detayları Gör</Button>
                      <Button variant="outline">Fiyat Al</Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Aradığınız kriterlere uygun ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
}
