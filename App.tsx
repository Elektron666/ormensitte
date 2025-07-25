'use client';

import { useState, useEffect, Suspense } from 'react';
import { AdminProvider } from './contexts/AdminContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SafetyWrapper } from './components/SafetyWrapper';
import { Loading, PageLoading } from './components/Loading';
import { SEOHead } from './components/SEOHead';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BoucleInspirationsSection } from './components/BoucleInspirationsSection';
import { VelvetEleganceSection } from './components/VelvetEleganceSection';
import { DesignYourTouchSection } from './components/DesignYourTouchSection';
import { CommercialSolutionsSection } from './components/CommercialSolutionsSection';
// REMOVED: BlogSection import - "Kumaş Dünyasından Haberler" kaldırıldı
import { AboutPage } from './components/AboutPage';
import { FabricTypesPage } from './components/FabricTypesPage';
import { ContactPage } from './components/ContactPage';
import { ProfessionalSolutionsPage } from './components/ProfessionalSolutionsPage';
import { ArticlesPage } from './components/ArticlesPage';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { Toaster } from './components/ui/sonner';

// Enhanced security and session management
const SECURITY_CONFIG = {
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutes
  // FIXED: Added missing admin routes
  ADMIN_ROUTES: [
    'admin', 
    'admingiris', 
    'adminpanel', 
    'admin-panel',
    'admin.php', 
    'admingiris.php',
    'adminpanel.php'
  ],
  // Admin login routes that should show login page
  LOGIN_ROUTES: [
    'admingiris',
    'admingiris.php',
    'admin-login',
    'login'
  ],
  // Admin panel routes that should show admin panel
  PANEL_ROUTES: [
    'admin',
    'adminpanel', 
    'admin-panel',
    'admin.php',
    'adminpanel.php'
  ],
  VALID_CREDENTIALS: {
    username: 'fatihbabaormen',
    password: 'fatihbaba3496888@@$$0312'
  }
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [appError, setAppError] = useState<string | null>(null);

  // Enhanced debug function
  const debugLog = (message: string, data?: any) => {
    console.log(`🔐 [App Debug] ${message}`, data || '');
  };

  // Error handling function
  const handleError = (error: Error, context: string) => {
    console.error(`❌ [${context}] Error:`, error);
    setAppError(`${context}: ${error.message}`);
  };

  // Enhanced URL parsing and normalization
  const parseUrl = (hash: string) => {
    // Remove # and normalize
    let cleanHash = hash.replace(/^#+/, '').toLowerCase().trim();
    
    // Handle common variations
    const urlMappings: { [key: string]: string } = {
      'admingiris': 'admingiris',
      'admin-giris': 'admingiris',
      'admin_giris': 'admingiris',
      'login': 'admingiris',
      'admin-login': 'admingiris',
      'admin_login': 'admingiris',
      'admin': 'admin',
      'adminpanel': 'admin',
      'admin-panel': 'admin',
      'admin_panel': 'admin',
      'panel': 'admin',
      'dashboard': 'admin'
    };

    return urlMappings[cleanHash] || cleanHash;
  };

  // Initialize app
  useEffect(() => {
    debugLog('🚀 App initializing...');
    
    try {
      // Add manifest and meta tags
      const setupMeta = () => {
        // Manifest
        if (!document.querySelector('link[rel="manifest"]')) {
          const manifestLink = document.createElement('link');
          manifestLink.rel = 'manifest';
          manifestLink.href = '/manifest.json';
          document.head.appendChild(manifestLink);
        }

        // Favicon
        if (!document.querySelector('link[rel="icon"]')) {
          const faviconLink = document.createElement('link');
          faviconLink.rel = 'icon';
          faviconLink.type = 'image/x-icon';
          faviconLink.href = '/favicon.ico';
          document.head.appendChild(faviconLink);
        }

        // Apple touch icon
        if (!document.querySelector('link[rel="apple-touch-icon"]')) {
          const appleIconLink = document.createElement('link');
          appleIconLink.rel = 'apple-touch-icon';
          appleIconLink.href = '/icons/icon-192x192.png';
          document.head.appendChild(appleIconLink);
        }

        // Theme color
        if (!document.querySelector('meta[name="theme-color"]')) {
          const themeColorMeta = document.createElement('meta');
          themeColorMeta.name = 'theme-color';
          themeColorMeta.content = '#d4af37';
          document.head.appendChild(themeColorMeta);
        }
      };

      setupMeta();

      // Initialize loading state
      const initTimer = setTimeout(() => {
        setIsLoading(false);
        debugLog('✅ App initialization complete');
      }, 500);

      return () => clearTimeout(initTimer);
    } catch (error) {
      handleError(error as Error, 'App Initialization');
    }
  }, []);

  // Enhanced URL management with better routing
  useEffect(() => {
    try {
      debugLog('🔗 Setting up URL management...');
      
      const updateUrl = () => {
        try {
          const rawHash = window.location.hash;
          const normalizedHash = parseUrl(rawHash);
          const currentPath = window.location.pathname;
          
          debugLog('🔗 URL update', { 
            rawHash, 
            normalizedHash, 
            currentPath,
            fullUrl: window.location.href 
          });
          
          setCurrentUrl(normalizedHash);
          
          // Check if it's an admin route
          const isAdminRoute = SECURITY_CONFIG.ADMIN_ROUTES.some(route => {
            const normalizedRoute = parseUrl(route);
            return normalizedHash === normalizedRoute || 
                   normalizedHash.startsWith(normalizedRoute + '/') ||
                   normalizedHash.includes(normalizedRoute);
          });
          
          const isLoginRoute = SECURITY_CONFIG.LOGIN_ROUTES.some(route => {
            const normalizedRoute = parseUrl(route);
            return normalizedHash === normalizedRoute;
          });
          
          const isPanelRoute = SECURITY_CONFIG.PANEL_ROUTES.some(route => {
            const normalizedRoute = parseUrl(route);
            return normalizedHash === normalizedRoute;
          });
          
          debugLog('🔗 Route classification', { 
            normalizedHash,
            isAdminRoute, 
            isLoginRoute,
            isPanelRoute
          });
          
          if (isAdminRoute) {
            setIsAdminMode(true);
            
            if (isLoginRoute) {
              setCurrentPage('admingiris');
              debugLog('📋 Set page to admin login');
            } else if (isPanelRoute || normalizedHash === 'admin') {
              setCurrentPage('admin');
              debugLog('🏠 Set page to admin panel');
            } else {
              // Default admin behavior
              setCurrentPage('admingiris');
              debugLog('🔄 Default to admin login');
            }
          } else {
            setIsAdminMode(false);
            setCurrentPage(normalizedHash || 'home');
            debugLog('🌐 Set regular page', { page: normalizedHash || 'home' });
          }
        } catch (error) {
          console.error('URL update error:', error);
          handleError(error as Error, 'URL Update');
        }
      };

      // Initial URL check
      updateUrl();
      
      // Listen for hash changes
      const handleHashChange = () => {
        debugLog('🔗 Hash change detected');
        updateUrl();
      };
      
      window.addEventListener('hashchange', handleHashChange);
      
      // Also listen for popstate for better browser back/forward support
      const handlePopState = () => {
        debugLog('🔗 Popstate detected');
        updateUrl();
      };
      
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('popstate', handlePopState);
      };
    } catch (error) {
      handleError(error as Error, 'URL Management Setup');
    }
  }, []);

  // Enhanced session management
  useEffect(() => {
    try {
      const checkAdminSession = () => {
        try {
          const adminSession = localStorage.getItem('ormen-admin-session');
          debugLog('🔐 Checking session', { 
            hasSession: !!adminSession,
            timestamp: new Date().toISOString()
          });
          
          if (adminSession) {
            const session = JSON.parse(adminSession);
            const now = Date.now();
            
            const isValidSession = session.authenticated && 
                                 session.timestamp && 
                                 session.expiresAt && 
                                 now < session.expiresAt &&
                                 (now - session.timestamp) < SECURITY_CONFIG.SESSION_DURATION;
            
            debugLog('🔐 Session validation', {
              authenticated: session.authenticated,
              timestamp: session.timestamp,
              expiresAt: session.expiresAt,
              timeLeft: session.expiresAt - now,
              isValid: isValidSession
            });
            
            if (isValidSession) {
              debugLog('✅ Session valid - user authenticated');
              setIsAdminAuthenticated(true);
            } else {
              debugLog('❌ Session expired - removing');
              localStorage.removeItem('ormen-admin-session');
              setIsAdminAuthenticated(false);
              
              // Redirect to login if on admin panel
              if (isAdminMode && currentPage === 'admin') {
                debugLog('🔄 Redirecting expired session to login');
                window.location.hash = 'admingiris';
              }
            }
          } else {
            debugLog('🔐 No session found');
            setIsAdminAuthenticated(false);
          }
        } catch (error) {
          console.error('Session check error:', error);
          debugLog('❌ Session check error', error);
          localStorage.removeItem('ormen-admin-session');
          setIsAdminAuthenticated(false);
        }
      };

      // Initial check
      checkAdminSession();

      // Periodic session validation
      const sessionInterval = setInterval(checkAdminSession, SECURITY_CONFIG.SESSION_CHECK_INTERVAL);
      return () => clearInterval(sessionInterval);
    } catch (error) {
      handleError(error as Error, 'Session Management');
    }
  }, [isAdminMode, currentPage]);

  // Online/offline status monitoring
  useEffect(() => {
    try {
      const handleOnline = () => {
        setIsOnline(true);
        debugLog('🌐 Back online');
      };
      
      const handleOffline = () => {
        setIsOnline(false);
        debugLog('📴 Gone offline');
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    } catch (error) {
      handleError(error as Error, 'Online Status');
    }
  }, []);

  // Enhanced security event listeners
  useEffect(() => {
    try {
      // Prevent right-click in production admin mode
      const handleContextMenu = (e: MouseEvent) => {
        if (isAdminMode && process.env.NODE_ENV === 'production') {
          e.preventDefault();
          debugLog('🛡️ Right-click blocked in admin mode');
        }
      };

      // Basic dev tools detection
      const detectDevTools = () => {
        if (isAdminMode && process.env.NODE_ENV === 'production') {
          const threshold = 160;
          if (
            window.outerHeight - window.innerHeight > threshold ||
            window.outerWidth - window.innerWidth > threshold
          ) {
            console.clear();
            console.warn('🛡️ Developer tools detected in admin mode');
          }
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      const devToolsInterval = setInterval(detectDevTools, 1000);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        clearInterval(devToolsInterval);
      };
    } catch (error) {
      handleError(error as Error, 'Security Events');
    }
  }, [isAdminMode]);

  // Enhanced page change handler with better routing
  const handlePageChange = (page: string) => {
    try {
      const sanitizedPage = page.toLowerCase().replace(/[^a-z0-9-]/g, '');
      debugLog('🔗 Page change requested', { from: currentPage, to: sanitizedPage });
      
      const validPages = ['home', 'about', 'fabrics', 'professional', 'contact', 'articles'];
      if (validPages.includes(sanitizedPage) || sanitizedPage === '') {
        const newPage = sanitizedPage || 'home';
        setCurrentPage(newPage);
        
        // Set hash properly
        if (newPage === 'home') {
          window.history.pushState(null, '', window.location.pathname);
        } else {
          window.location.hash = newPage;
        }
        
        debugLog('✅ Page changed successfully', { newPage });
      } else {
        debugLog('❌ Invalid page requested', sanitizedPage);
      }
    } catch (error) {
      handleError(error as Error, 'Page Change');
    }
  };

  // Enhanced admin login handler
  const handleAdminLogin = (success: boolean) => {
    try {
      debugLog('🔐 Admin login attempt', { 
        success, 
        timestamp: new Date().toISOString(),
        currentUrl: window.location.hash
      });
      
      if (success) {
        debugLog('✅ Login successful - setting up session');
        setIsAdminAuthenticated(true);
        
        // Create session
        const sessionData = {
          authenticated: true,
          timestamp: Date.now(),
          expiresAt: Date.now() + SECURITY_CONFIG.SESSION_DURATION,
          userAgent: navigator.userAgent,
          loginTime: new Date().toISOString(),
          version: '3.0'
        };

        try {
          localStorage.setItem('ormen-admin-session', JSON.stringify(sessionData));
          debugLog('✅ Session stored successfully');
          
          // Redirect to admin panel
          setTimeout(() => {
            window.location.hash = 'admin';
            debugLog('🔄 Redirected to admin panel');
          }, 500);
          
        } catch (error) {
          console.error('Session storage error:', error);
          debugLog('❌ Session storage error', error);
        }
      } else {
        debugLog('❌ Login failed');
      }
    } catch (error) {
      handleError(error as Error, 'Admin Login');
    }
  };

  // Enhanced admin logout handler
  const handleAdminLogout = () => {
    try {
      debugLog('🔐 Admin logout initiated');
      setIsAdminAuthenticated(false);
      
      try {
        localStorage.removeItem('ormen-admin-session');
        localStorage.removeItem('ormen-admin-lockout');
        debugLog('✅ Session data cleared');
      } catch (error) {
        console.error('Logout error:', error);
        debugLog('❌ Logout error', error);
      }
      
      window.location.hash = 'home';
      debugLog('🔄 Redirected to home');
    } catch (error) {
      handleError(error as Error, 'Admin Logout');
    }
  };

  // Debug current state
  useEffect(() => {
    debugLog('📊 Current state', {
      currentPage,
      isAdminMode,
      isAdminAuthenticated,
      currentUrl,
      hash: window.location.hash,
      pathname: window.location.pathname,
      href: window.location.href,
      error: appError
    });
  }, [currentPage, isAdminMode, isAdminAuthenticated, currentUrl, appError]);

  // Show error if there's an app-level error
  if (appError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Uygulama Hatası</h2>
          <p className="text-gray-600 text-sm mb-4">{appError}</p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setAppError(null);
                window.location.reload();
              }}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sayfayı Yenile
            </button>
            <button
              onClick={() => {
                setAppError(null);
                window.location.hash = 'admingiris';
              }}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Admin Girişine Git
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading screen
  if (isLoading) {
    return <PageLoading />;
  }

  // Offline notification
  if (!isOnline) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">İnternet Bağlantısı Yok</h2>
          <p className="text-gray-600">Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.</p>
        </div>
      </div>
    );
  }

  // Admin login page
  if (isAdminMode && currentPage === 'admingiris') {
    debugLog('📋 Rendering admin login page');
    
    return (
      <ErrorBoundary>
        <SafetyWrapper name="Admin Login Page">
          <SEOHead page="home" language={language} />
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
            {/* Enhanced Development Debug Panel */}
            {process.env.NODE_ENV === 'development' && (
              <div className="fixed top-4 right-4 bg-blue-900 text-white p-3 text-xs z-50 max-w-sm rounded shadow-lg">
                <div className="font-bold mb-2">🔐 LOGIN DEBUG</div>
                <div>Current Page: <span className="text-yellow-300">{currentPage}</span></div>
                <div>Admin Mode: <span className="text-yellow-300">{isAdminMode.toString()}</span></div>
                <div>Authenticated: <span className="text-yellow-300">{isAdminAuthenticated.toString()}</span></div>
                <div>Hash: <span className="text-yellow-300">{window.location.hash}</span></div>
                <div>URL: <span className="text-yellow-300">{currentUrl}</span></div>
                <div>Error: <span className="text-red-300">{appError || 'None'}</span></div>
                <div className="mt-2 text-green-300 text-xs">
                  <div>Valid URLs:</div>
                  <div>• /#admingiris</div>
                  <div>• /#admin-login</div>
                  <div>• /#login</div>
                </div>
                <div className="mt-2">
                  <button 
                    onClick={() => window.location.hash = 'admin'}
                    className="bg-green-600 px-2 py-1 rounded text-xs mr-1"
                  >
                    Force Admin
                  </button>
                </div>
              </div>
            )}
            
            <AdminLogin 
              onLogin={handleAdminLogin}
              onCancel={() => {
                debugLog('🔄 Login cancelled');
                window.location.hash = 'home';
              }}
            />
            <Toaster />
          </div>
        </SafetyWrapper>
      </ErrorBoundary>
    );
  }

  // Admin panel page
  if (isAdminMode && currentPage === 'admin') {
    debugLog('🏠 Admin panel page requested', { 
      authenticated: isAdminAuthenticated,
      currentPage,
      isAdminMode 
    });
    
    // Redirect to login if not authenticated
    if (!isAdminAuthenticated) {
      debugLog('❌ Not authenticated - redirecting to login');
      setTimeout(() => {
        window.location.hash = 'admingiris';
      }, 100);
      return <PageLoading />;
    }

    debugLog('✅ Rendering authenticated admin panel');
    
    return (
      <ErrorBoundary>
        <SafetyWrapper name="Admin Panel">
          <SEOHead page="home" language={language} />
          <div className="min-h-screen bg-gray-50">
            {/* Enhanced Development Debug Panel */}
            {process.env.NODE_ENV === 'development' && (
              <div className="fixed top-4 right-4 bg-green-900 text-white p-3 text-xs z-[60] max-w-sm rounded shadow-lg">
                <div className="font-bold mb-2">✅ ADMIN PANEL DEBUG</div>
                <div>Current Page: <span className="text-green-300">{currentPage}</span></div>
                <div>Admin Mode: <span className="text-green-300">{isAdminMode.toString()}</span></div>
                <div>Authenticated: <span className="text-green-300">{isAdminAuthenticated.toString()}</span></div>
                <div>Hash: <span className="text-green-300">{window.location.hash}</span></div>
                <div>URL: <span className="text-green-300">{currentUrl}</span></div>
                <div>Error: <span className="text-red-300">{appError || 'None'}</span></div>
                <div className="mt-2 text-green-300 text-xs">
                  <div>Valid URLs:</div>
                  <div>• /#admin</div>
                  <div>• /#adminpanel</div>
                  <div>• /#admin-panel</div>
                </div>
                <button 
                  onClick={handleAdminLogout}
                  className="mt-2 bg-red-600 px-2 py-1 rounded text-xs"
                >
                  Debug Logout
                </button>
              </div>
            )}
            
            <AdminPanel isFullScreen={true} onLogout={handleAdminLogout} />
            <Toaster />
          </div>
        </SafetyWrapper>
      </ErrorBoundary>
    );
  }

  // Enhanced page rendering with error boundaries
  const renderPage = () => {
    const pageProps = { language };
    
    try {
      switch (currentPage) {
        case 'about':
          return (
            <SafetyWrapper name="About Page">
              <Suspense fallback={<Loading fullScreen text="Hakkımızda sayfası yükleniyor..." />}>
                <AboutPage {...pageProps} />
              </Suspense>
            </SafetyWrapper>
          );
        case 'fabrics':
          return (
            <SafetyWrapper name="Fabrics Page">
              <Suspense fallback={<Loading fullScreen text="Kumaş çeşitleri yükleniyor..." />}>
                <FabricTypesPage {...pageProps} />
              </Suspense>
            </SafetyWrapper>
          );
        case 'contact':
          return (
            <SafetyWrapper name="Contact Page">
              <Suspense fallback={<Loading fullScreen text="İletişim sayfası yükleniyor..." />}>
                <ContactPage {...pageProps} />
              </Suspense>
            </SafetyWrapper>
          );
        case 'professional':
          return (
            <SafetyWrapper name="Professional Page">
              <Suspense fallback={<Loading fullScreen text="Profesyonel çözümler yükleniyor..." />}>
                <ProfessionalSolutionsPage {...pageProps} />
              </Suspense>
            </SafetyWrapper>
          );
        case 'articles':
          return (
            <SafetyWrapper name="Articles Page">
              <Suspense fallback={<Loading fullScreen text="Makaleler yükleniyor..." />}>
                <ArticlesPage {...pageProps} />
              </Suspense>
            </SafetyWrapper>
          );
        case 'home':
        default:
          return (
            <SafetyWrapper name="Home Page">
              <Suspense fallback={<Loading fullScreen text="Ana sayfa yükleniyor..." />}>
                <main>
                  <SafetyWrapper name="Hero Section">
                    <HeroSection language={language} />
                  </SafetyWrapper>
                  <SafetyWrapper name="Boucle Section">
                    <BoucleInspirationsSection language={language} />
                  </SafetyWrapper>
                  <SafetyWrapper name="Velvet Section">
                    <VelvetEleganceSection language={language} />
                  </SafetyWrapper>
                  <SafetyWrapper name="Design Section">
                    <DesignYourTouchSection language={language} />
                  </SafetyWrapper>
                  <SafetyWrapper name="Commercial Section">
                    <CommercialSolutionsSection language={language} />
                  </SafetyWrapper>
                  {/* REMOVED: BlogSection - "Kumaş Dünyasından Haberler" kaldırıldı */}
                </main>
              </Suspense>
            </SafetyWrapper>
          );
      }
    } catch (error) {
      handleError(error as Error, 'Page Rendering');
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sayfa Yüklenemiyor</h2>
            <p className="text-gray-600 mb-4">Bu sayfa yüklenirken bir hata oluştu.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }
  };

  // Main site rendering
  debugLog('🌐 Rendering main website');
  return (
    <ErrorBoundary>
      <SafetyWrapper name="Main App">
        <SEOHead page={currentPage as any} language={language} />
        <div className="min-h-screen bg-white">
          {/* Enhanced Development Debug Panel for Main Site */}
          {process.env.NODE_ENV === 'development' && !isAdminMode && (
            <div className="fixed top-4 left-4 bg-purple-900 text-white p-3 text-xs z-50 max-w-sm rounded shadow-lg">
              <div className="font-bold mb-2">🏠 MAIN SITE DEBUG</div>
              <div>Current Page: <span className="text-purple-300">{currentPage}</span></div>
              <div>Admin Mode: <span className="text-purple-300">{isAdminMode.toString()}</span></div>
              <div>URL: <span className="text-purple-300">{currentUrl}</span></div>
              <div>Hash: <span className="text-purple-300">{window.location.hash}</span></div>
              <div>Error: <span className="text-red-300">{appError || 'None'}</span></div>
              <div className="mt-2">
                <button 
                  onClick={() => window.location.hash = 'admingiris'}
                  className="bg-blue-600 px-2 py-1 rounded text-xs mr-1"
                >
                  Admin Login
                </button>
                <button 
                  onClick={() => window.location.hash = 'adminpanel'}
                  className="bg-green-600 px-2 py-1 rounded text-xs mr-1"
                >
                  Admin Panel
                </button>
              </div>
              <div className="mt-1">
                <button 
                  onClick={() => window.location.hash = 'articles'}
                  className="bg-orange-600 px-2 py-1 rounded text-xs"
                >
                  Articles
                </button>
              </div>
            </div>
          )}
          
          <SafetyWrapper name="Header">
            <Header 
              currentPage={currentPage} 
              onPageChange={handlePageChange}
              language={language}
              onLanguageChange={setLanguage}
            />
          </SafetyWrapper>
          
          {renderPage()}
          
          <SafetyWrapper name="Footer">
            <Footer language={language} />
          </SafetyWrapper>
          
          <Toaster />
        </div>
      </SafetyWrapper>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </ErrorBoundary>
  );
}
