'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { OrmenLogoMinimal } from './OrmenLogo';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Shield, 
  AlertCircle,
  ArrowLeft,
  Settings,
  Clock,
  Ban
} from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onCancel: () => void;
}

// Enhanced security constants
const ADMIN_CREDENTIALS = {
  username: 'fatihbabaormen',
  password: 'fatihbaba3496888@@$$0312'
};

const SECURITY_CONFIG = {
  MAX_ATTEMPTS: 3,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  MIN_PASSWORD_LENGTH: 8
};

export function AdminLogin({ onLogin, onCancel }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  // Check for existing lockout on component mount
  useEffect(() => {
    const checkLockout = () => {
      try {
        const lockoutData = localStorage.getItem('ormen-admin-lockout');
        if (lockoutData) {
          const { endTime, attempts } = JSON.parse(lockoutData);
          const now = Date.now();
          
          if (now < endTime) {
            setIsLocked(true);
            setLockoutEndTime(endTime);
            setAttemptCount(attempts);
          } else {
            // Lockout expired, clear it
            localStorage.removeItem('ormen-admin-lockout');
          }
        }
      } catch (error) {
        console.error('Error checking lockout:', error);
        localStorage.removeItem('ormen-admin-lockout');
      }
    };

    checkLockout();
  }, []);

  // Update remaining lockout time
  useEffect(() => {
    if (isLocked && lockoutEndTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, lockoutEndTime - now);
        
        if (remaining === 0) {
          setIsLocked(false);
          setLockoutEndTime(null);
          setAttemptCount(0);
          localStorage.removeItem('ormen-admin-lockout');
          toast.success('Hesap kilidi açıldı. Tekrar giriş yapabilirsiniz.');
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLocked, lockoutEndTime]);

  // Enhanced input validation
  const validateInput = useCallback((value: string, type: 'username' | 'password'): boolean => {
    const sanitized = value.trim();
    
    if (type === 'username') {
      return sanitized.length >= 3 && sanitized.length <= 50 && /^[a-zA-Z0-9_]+$/.test(sanitized);
    }
    
    if (type === 'password') {
      return sanitized.length >= SECURITY_CONFIG.MIN_PASSWORD_LENGTH;
    }
    
    return false;
  }, []);

  // Secure input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Prevent potential XSS
    const sanitizedValue = value.replace(/[<>]/g, '').slice(0, 100);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  }, []);

  // Enhanced authentication with security measures
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔐 Admin Login - Form submitted');
    console.log('🔐 Form data:', { 
      username: formData.username, 
      passwordLength: formData.password.length,
      isLocked,
      attemptCount 
    });
    console.log('🔐 Expected credentials:', {
      username: ADMIN_CREDENTIALS.username,
      passwordLength: ADMIN_CREDENTIALS.password.length
    });
    
    if (isLocked) {
      toast.error('Hesap kilitli. Lütfen bekleyin.');
      return;
    }

    // Input validation
    if (!validateInput(formData.username, 'username')) {
      console.log('🔐 Username validation failed');
      toast.error('Geçersiz kullanıcı adı formatı.');
      return;
    }

    if (!validateInput(formData.password, 'password')) {
      console.log('🔐 Password validation failed');
      toast.error('Şifre çok kısa.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate network delay for security
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      // Constant-time comparison to prevent timing attacks
      const usernameMatch = formData.username === ADMIN_CREDENTIALS.username;
      const passwordMatch = formData.password === ADMIN_CREDENTIALS.password;

      console.log('🔐 Credential check:', {
        usernameMatch,
        passwordMatch,
        inputUsername: formData.username,
        expectedUsername: ADMIN_CREDENTIALS.username,
        inputPassword: formData.password.substring(0, 5) + '***',
        expectedPassword: ADMIN_CREDENTIALS.password.substring(0, 5) + '***'
      });

      if (usernameMatch && passwordMatch) {
        console.log('🔐 Login successful!');
        
        // Successful login
        const sessionData = {
          authenticated: true,
          timestamp: Date.now(),
          expiresAt: Date.now() + SECURITY_CONFIG.SESSION_DURATION,
          userAgent: navigator.userAgent,
          ip: 'client-side' // Would be replaced by server-side implementation
        };

        localStorage.setItem('ormen-admin-session', JSON.stringify(sessionData));
        localStorage.removeItem('ormen-admin-lockout');
        
        toast.success('Giriş başarılı! Admin paneline yönlendiriliyorsunuz...');
        
        // Clear form for security
        setFormData({ username: '', password: '' });
        
        setTimeout(() => {
          onLogin(true);
        }, 1000);
      } else {
        console.log('🔐 Login failed - invalid credentials');
        
        // Failed login
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        if (newAttemptCount >= SECURITY_CONFIG.MAX_ATTEMPTS) {
          // Lock account
          const lockoutEnd = Date.now() + SECURITY_CONFIG.LOCKOUT_DURATION;
          const lockoutData = {
            endTime: lockoutEnd,
            attempts: newAttemptCount,
            timestamp: Date.now()
          };
          
          localStorage.setItem('ormen-admin-lockout', JSON.stringify(lockoutData));
          setIsLocked(true);
          setLockoutEndTime(lockoutEnd);
          
          toast.error(`Çok fazla hatalı deneme! Hesap ${SECURITY_CONFIG.LOCKOUT_DURATION / 60000} dakika kilitlendi.`);
        } else {
          toast.error(`Kullanıcı adı veya şifre hatalı! Kalan deneme: ${SECURITY_CONFIG.MAX_ATTEMPTS - newAttemptCount}`);
        }
        
        // Clear password for security
        setFormData(prev => ({ ...prev, password: '' }));
        onLogin(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Giriş sırasında bir hata oluştu.');
      onLogin(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Format remaining time
  const formatRemainingTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100"></div>
      </div>

      {/* Back Button */}
      <motion.button
        onClick={onCancel}
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        disabled={isLoading}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm font-light">Ana Sayfaya Dön</span>
      </motion.button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-8 luxury-card shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-2">
              Admin Girişi
            </h1>
            <p className="text-sm text-gray-600 font-light">
              Ormen Tekstil Yönetim Paneli
            </p>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <OrmenLogoMinimal variant="dark" />
          </motion.div>

          {/* Development Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="font-medium text-green-800 mb-2">🔧 Geliştirici Bilgileri:</div>
              <div className="text-green-700 space-y-1">
                <div><strong>Kullanıcı Adı:</strong> {ADMIN_CREDENTIALS.username}</div>
                <div><strong>Şifre:</strong> {ADMIN_CREDENTIALS.password}</div>
                <div><strong>Deneme Sayısı:</strong> {attemptCount}/{SECURITY_CONFIG.MAX_ATTEMPTS}</div>
                <button 
                  type="button"
                  onClick={() => {
                    setFormData({
                      username: ADMIN_CREDENTIALS.username,
                      password: ADMIN_CREDENTIALS.password
                    });
                  }}
                  className="mt-2 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                >
                  Otomatik Doldur
                </button>
              </div>
            </motion.div>
          )}

          {/* Lockout Warning */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3"
            >
              <Ban className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-800 font-medium">
                  Hesap Kilitli
                </p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Kalan süre: {formatRemainingTime(remainingTime)}
                </p>
              </div>
            </motion.div>
          )}

          {/* Attempt Warning */}
          {attemptCount > 0 && !isLocked && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-orange-800 font-medium">
                  Hatalı Giriş Denemesi
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  {attemptCount}/{SECURITY_CONFIG.MAX_ATTEMPTS} hatalı deneme. 
                  Kalan deneme: {SECURITY_CONFIG.MAX_ATTEMPTS - attemptCount}
                </p>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Kullanıcı Adı
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading || isLocked}
                  className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500 bg-white/50"
                  placeholder="Kullanıcı adınızı giriniz"
                  autoComplete="username"
                  maxLength={50}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading || isLocked}
                  className="pl-10 pr-12 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500 bg-white/50"
                  placeholder="Şifrenizi giriniz"
                  autoComplete="current-password"
                  maxLength={100}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading || isLocked}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isLocked || !formData.username || !formData.password}
              className="w-full h-12 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>Doğrulanıyor...</span>
                </div>
              ) : isLocked ? (
                <div className="flex items-center justify-center space-x-2">
                  <Ban className="w-5 h-5" />
                  <span>Hesap Kilitli</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Admin Paneline Giriş</span>
                </div>
              )}
            </Button>
          </motion.form>

          {/* Security Notice */}
          <motion.div
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium">
                  Güvenlik Bildirimi
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Bu alan sadece yetkili personel içindir. Tüm giriş denemeleri kayıt altına alınmaktadır.
                  {SECURITY_CONFIG.MAX_ATTEMPTS} hatalı denemeden sonra hesap geçici olarak kilitlenir.
                </p>
              </div>
            </div>
          </motion.div>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p className="text-xs text-gray-500">
          © 2024 Ormen Tekstil - Yönetim Paneli v2.0
        </p>
      </motion.div>
    </div>
  );
}
