'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import CountryDropdown from './CountryDropdown';
import { useConversionTracking } from '@/components/Analytics/AnalyticsProvider';

interface RegisterFormProps {
  onSuccess: (token: string, user: any) => void;
  onError: (message: string) => void;
}

export default function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { trackSignup, trackFormSubmit } = useConversionTracking();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const countryValue = watch('country');

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Track successful signup
        trackSignup('email');
        trackFormSubmit('register', true);

        // Guardar token en localStorage
        localStorage.setItem('authToken', result.token);
        onSuccess(result.token, result.user);
      } else {
        // Track failed signup
        trackFormSubmit('register', false);
        onError(result.message);
      }
    } catch (error) {
      onError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nombre *
          </label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Tu nombre"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Apellido *
          </label>
          <input
            {...register('lastName')}
            type="text"
            id="lastName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Tu apellido"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="tu@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contraseña *
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirmar Contraseña *
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Repite tu contraseña"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* Información opcional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Teléfono (opcional)
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="+1 234 567 8900"
          />
        </div>

        <div>
          <label
            htmlFor="walletAddress"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Wallet EVM (opcional)
          </label>
          <input
            {...register('walletAddress')}
            type="text"
            id="walletAddress"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="0x..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Ciudad (opcional)
          </label>
          <input
            {...register('city')}
            type="text"
            id="city"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Tu ciudad"
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            País (opcional)
          </label>
          <CountryDropdown
            value={countryValue || ''}
            onChange={(value) => setValue('country', value)}
            error={errors.country?.message}
          />
        </div>
      </div>

      {/* Consentimientos GDPR */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Términos y Condiciones
        </h3>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              {...register('termsAndPrivacyAccepted')}
              type="checkbox"
              id="termsAndPrivacyAccepted"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="termsAndPrivacyAccepted"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Acepto los{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-500 underline">
                términos y condiciones
              </a>{' '}
              y la{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                política de privacidad
              </a>{' '}
              *
            </label>
          </div>
          {errors.termsAndPrivacyAccepted && (
            <p className="text-sm text-red-600">{errors.termsAndPrivacyAccepted.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Preferencias de Marketing (opcional)
          </h4>

          <div className="flex items-start">
            <input
              {...register('marketingEmail')}
              type="checkbox"
              id="marketingEmail"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="marketingEmail"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Recibir ofertas por email
            </label>
          </div>

          <div className="flex items-start">
            <input
              {...register('marketingPush')}
              type="checkbox"
              id="marketingPush"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="marketingPush"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Recibir notificaciones push
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>
    </form>
  );
}
