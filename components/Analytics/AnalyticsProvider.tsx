'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsContextType {
  trackEvent: (eventType: string, eventData?: any) => Promise<void>;
  trackConversion: (eventType: string, value?: number, eventData?: any) => Promise<void>;
  sessionId: string | null;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
  options?: {
    trackPageViews?: boolean;
    trackScrollDepth?: boolean;
    trackTimeOnPage?: boolean;
    trackBounce?: boolean;
    trackExitPage?: boolean;
    debug?: boolean;
  };
}

export function AnalyticsProvider({ children, options = {} }: AnalyticsProviderProps) {
  const analytics = useAnalytics(options);

  // Auto-track page views
  useEffect(() => {
    if (options.trackPageViews !== false) {
      analytics.trackEvent('page_view');
    }
  }, [analytics, options.trackPageViews]);

  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
}

// Hook específico para tracking de conversiones
export function useConversionTracking() {
  const { trackConversion } = useAnalyticsContext();

  const trackSignup = (method: string = 'email') => {
    trackConversion('signup', undefined, { method });
  };

  const trackLogin = (method: string = 'email') => {
    trackConversion('login', undefined, { method });
  };

  const trackPurchase = (value: number, orderId?: string) => {
    trackConversion('purchase', value, { orderId });
  };

  const trackNewsletterSignup = () => {
    trackConversion('newsletter_signup');
  };

  const trackContactForm = () => {
    trackConversion('contact_form');
  };

  const trackDownload = (fileName: string) => {
    trackConversion('download', undefined, { fileName });
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackConversion('button_click', undefined, { buttonName, location });
  };

  const trackFormSubmit = (formName: string, success: boolean = true) => {
    trackConversion('form_submit', undefined, { formName, success });
  };

  return {
    trackSignup,
    trackLogin,
    trackPurchase,
    trackNewsletterSignup,
    trackContactForm,
    trackDownload,
    trackButtonClick,
    trackFormSubmit,
  };
}
