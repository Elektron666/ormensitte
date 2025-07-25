'use client';

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface SafetyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name?: string;
}

export function SafetyWrapper({ children, fallback, name = 'Component' }: SafetyWrapperProps) {
  const defaultFallback = (
    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
      <div className="text-red-800 font-medium">Hata: {name}</div>
      <div className="text-red-600 text-sm mt-1">
        Bu bölüm yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={fallback || defaultFallback}>
      {children}
    </ErrorBoundary>
  );
}
