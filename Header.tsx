'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrmenLogoMinimal } from './OrmenLogo';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  language: 'tr' | 'en';
  onLanguageChange: (lang: 'tr' | 'en') => void;
}

export function Header({ currentPage, onPageChange, language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminAccess, setShowAdminAccess] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const navItems = language === 'tr' ? [
    { label: 'Ana Sayfa', key: 'home' },
    { label: 'Hakkımızda', key: 'about' },
    { label: 'Kumaş Çeşitleri', key: 'fabrics' },
    { label: 'Profesyonel Çözümler', key: 'professional' },
    { label: 'İletişim', key: 'contact' }
  ] : [
    { label: 'Home', key: 'home' },
    { label: 'About Us', key: 'about' },
    { label: 'Fabric Types', key: 'fabrics' },
    { label: 'Professional Solutions', key: 'professional' },
    { label: 'Contact', key: 'contact' }
  ];

  // Check if user is admin
  const checkAdminSession = () => {
    try {
      const adminSession = localStorage.getItem('ormen-admin-session');
      if (adminSession) {
        const session = JSON.parse(adminSession);
        const now = Date.now();
        return session.authenticated && 
               session.timestamp && 
               session.expiresAt && 
               now < session.expiresAt;
      }
    } catch (error) {
      console.error('Admin session check error:', error);
    }
    return false;
  };

  // Handle logo click for hidden admin access
  const handleLogoClick = () => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    
    // Reset if more than 3 seconds between clicks
    if (timeDiff > 3000) {
      setLogoClickCount(1);
    } else {
      setLogoClickCount(prev => prev + 1);
    }
    
    setLastClickTime(now);
    
    // Show admin access after 5 rapid clicks
    if (logoClickCount >= 4) {
      setShowAdminAccess(true);
      setLogoClickCount(0);
      
      // Hide after 10 seconds
      setTimeout(() => setShowAdminAccess(false), 10000);
    } else {
      // Regular navigation to home
      if (timeDiff > 500) { // Only navigate if not rapid clicking
        handleNavClick('home');
      }
    }
  };

  const handleNavClick = (pageKey: string) => {
    onPageChange(pageKey);
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (lang: 'tr' | 'en') => {
    onLanguageChange(lang);
  };

  // Handle admin access
  const handleAdminAccess = (type: 'login' | 'panel') => {
    setShowAdminAccess(false);
    if (type === 'login') {
      window.location.hash = 'admingiris';
    } else {
      window.location.hash = 'admin';
    }
  };

  // Auto-hide admin access timer
  useEffect(() => {
    if (logoClickCount > 0) {
      const timer = setTimeout(() => {
        setLogoClickCount(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [logoClickCount]);

  const isAdmin = checkAdminSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50 luxury-card">
      <div className="max-w-none px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer relative"
            onClick={handleLogoClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <OrmenLogoMinimal variant="dark" />
            
            {/* Logo click indicator */}
            {logoClickCount > 0 && logoClickCount < 5 && (
              <div className="absolute -top-1 -right-1 flex space-x-1">
                {Array.from({ length: logoClickCount }, (_, i) => (
                  <div 
                    key={i} 
                    className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-xs transition-colors duration-300 tracking-wide relative group ${
                  currentPage === item.key 
                    ? 'text-black font-medium' 
                    : 'text-gray-700 hover:text-black'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {item.label}
                
                {/* Active indicator */}
                {currentPage === item.key && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-black"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Hover effect */}
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </nav>

          {/* Right side - Language, Search, and Admin */}
          <div className="flex items-center space-x-4">
            {/* Admin Status Indicator (for logged-in admins) */}
            {isAdmin && (
              <motion.button
                onClick={() => window.location.hash = 'admin'}
                className="p-2 text-amber-600 hover:text-amber-700 transition-colors duration-300 hover:bg-amber-50 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                title="Admin Panel"
              >
                <Shield className="w-4 h-4" />
              </motion.button>
            )}

            {/* Language Toggle */}
            <motion.div
              className="hidden sm:flex items-center space-x-1 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button 
                onClick={() => handleLanguageChange('tr')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'tr' 
                    ? 'text-black font-medium bg-gray-100' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                TR
              </button>
              <button 
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'en' 
                    ? 'text-black font-medium bg-gray-100' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                EN
              </button>
            </motion.div>

            {/* Search */}
            <motion.button
              className="p-2 text-gray-700 hover:text-black transition-colors duration-300 hover:bg-gray-50 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Search className="w-4 h-4" />
            </motion.button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Admin Access Panel */}
      <AnimatePresence>
        {showAdminAccess && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[200px]">
              <div className="text-xs text-gray-500 mb-3 text-center">
                {language === 'tr' ? 'Admin Erişimi' : 'Admin Access'}
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleAdminAccess('login')}
                  className="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Shield className="w-3 h-3" />
                  <span>{language === 'tr' ? 'Admin Girişi' : 'Admin Login'}</span>
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleAdminAccess('panel')}
                    className="w-full px-3 py-2 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Shield className="w-3 h-3" />
                    <span>{language === 'tr' ? 'Admin Panel' : 'Admin Panel'}</span>
                  </button>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-3 text-center">
                {language === 'tr' ? 'Logo\'ya 5 kez tıklayın' : 'Click logo 5 times'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-16 bg-white z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Navigation Items */}
              <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`text-xl transition-colors duration-300 relative ${
                      currentPage === item.key 
                        ? 'text-black font-medium' 
                        : 'text-gray-700 hover:text-black'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                    
                    {currentPage === item.key && (
                      <div className="absolute -bottom-2 left-0 right-0 h-px bg-black" />
                    )}
                  </motion.button>
                ))}

                {/* Mobile Admin Access */}
                {(isAdmin || showAdminAccess) && (
                  <motion.div
                    className="border-t border-gray-100 pt-8 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex flex-col space-y-3 items-center">
                      <div className="text-sm text-gray-500 mb-2">
                        {language === 'tr' ? 'Admin İşlemleri' : 'Admin Operations'}
                      </div>
                      {!isAdmin && (
                        <button
                          onClick={() => handleAdminAccess('login')}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Shield className="w-4 h-4" />
                          <span>{language === 'tr' ? 'Admin Girişi' : 'Admin Login'}</span>
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          onClick={() => handleAdminAccess('panel')}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Shield className="w-4 h-4" />
                          <span>{language === 'tr' ? 'Admin Panel' : 'Admin Panel'}</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mobile Options */}
              <div className="border-t border-gray-100 p-6 space-y-4">
                {/* Language Toggle */}
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {language === 'tr' ? 'Dil Seçimi:' : 'Language:'}
                  </span>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handleLanguageChange('tr')}
                      className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                        language === 'tr' 
                          ? 'text-black font-medium bg-gray-100' 
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      TR
                    </button>
                    <button 
                      onClick={() => handleLanguageChange('en')}
                      className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                        language === 'en' 
                          ? 'text-black font-medium bg-gray-100' 
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Quick Admin Access Hint */}
                {!showAdminAccess && !isAdmin && (
                  <div className="text-xs text-gray-400 text-center border-t pt-4">
                    {language === 'tr' 
                      ? 'Gizli menü için logo\'ya 5 kez hızlıca tıklayın' 
                      : 'Tap logo 5 times quickly for hidden menu'
                    }
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
