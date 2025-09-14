'use client';

import { useEffect, useRef } from 'react';
import { useConversionTracking } from '@/components/Analytics/AnalyticsProvider';

interface FormAnalyticsProps {
  formName: string;
  children: React.ReactNode;
  onSuccess?: () => void;
  onError?: () => void;
}

export function FormAnalytics({ formName, children, onSuccess, onError }: FormAnalyticsProps) {
  const { trackFormSubmit, trackButtonClick } = useConversionTracking();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmit = (event: Event) => {
      const formData = new FormData(form as HTMLFormElement);
      const formValues = Object.fromEntries(formData.entries());

      // Track form submission
      trackFormSubmit(formName, true);

      // Track individual field interactions
      Object.keys(formValues).forEach((fieldName) => {
        if (formValues[fieldName]) {
          trackButtonClick(`${formName}_${fieldName}_filled`);
        }
      });
    };

    const handleButtonClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.type === 'submit') {
        trackButtonClick(`${formName}_submit_button`, formName);
      }
    };

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('click', handleButtonClick);

    return () => {
      form.removeEventListener('submit', handleSubmit);
      form.removeEventListener('click', handleButtonClick);
    };
  }, [formName, trackFormSubmit, trackButtonClick]);

  return <form ref={formRef}>{children}</form>;
}

// Hook para tracking de campos de formulario
export function useFormFieldTracking(formName: string) {
  const { trackButtonClick } = useConversionTracking();

  const trackFieldFocus = (fieldName: string) => {
    trackButtonClick(`${formName}_${fieldName}_focus`);
  };

  const trackFieldBlur = (fieldName: string, hasValue: boolean) => {
    trackButtonClick(`${formName}_${fieldName}_blur`, hasValue ? 'with_value' : 'empty');
  };

  const trackFieldChange = (fieldName: string, value: string) => {
    if (value.length > 0) {
      trackButtonClick(`${formName}_${fieldName}_change`, `length_${value.length}`);
    }
  };

  return {
    trackFieldFocus,
    trackFieldBlur,
    trackFieldChange,
  };
}
