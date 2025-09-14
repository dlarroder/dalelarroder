import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface AnalyticsPayload {
  eventType: string;
  sessionId: string;
  userId?: string;
  pagePath: string;
  pageTitle?: string;
  pageCategory?: string;
  timeOnPage: number;
  scrollDepth: number;
  bounce: boolean;
  exitPage: boolean;
  userAgent?: string;
  referrerUrl?: string;
  conversionEvent?: string;
  conversionValue?: number;
  timestamp: string;
  url: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: AnalyticsPayload = await request.json();

    // Extraer IP del request
    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Determinar tipo de dispositivo y navegador
    const userAgent = payload.userAgent || '';
    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    // Buscar o crear sesión
    let session = await prisma.session.findUnique({
      where: { token: payload.sessionId },
    });

    if (!session) {
      // Crear nueva sesión
      session = await prisma.session.create({
        data: {
          token: payload.sessionId,
          userId: payload.userId || null,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
          ipAddress,
          userAgent,
          deviceType,
          browser,
          os,
          country: 'unknown', // Se puede mejorar con geolocalización
          city: 'unknown',
        },
      });
    } else {
      // Actualizar sesión existente
      await prisma.session.update({
        where: { id: session.id },
        data: {
          lastActivityAt: new Date(),
          pageViews: session.pageViews + 1,
          sessionDuration: Math.floor((Date.now() - session.createdAt.getTime()) / 1000),
        },
      });
    }

    // Guardar analítica de página
    await prisma.pageAnalytics.create({
      data: {
        userId: payload.userId || null,
        sessionId: session.id,
        pagePath: payload.pagePath,
        pageTitle: payload.pageTitle,
        pageCategory: payload.pageCategory,
        timeOnPage: payload.timeOnPage,
        scrollDepth: payload.scrollDepth,
        bounce: payload.bounce,
        exitPage: payload.exitPage,
        ipAddress,
        userAgent,
        referrerUrl: payload.referrerUrl,
        conversionEvent: payload.conversionEvent,
        conversionValue: payload.conversionValue,
      },
    });

    // Si es un evento de conversión, guardarlo también en conversion_events
    if (payload.conversionEvent) {
      await prisma.conversionEvent.create({
        data: {
          userId: payload.userId || null,
          sessionId: session.id,
          eventType: payload.conversionEvent,
          eventCategory: getEventCategory(payload.conversionEvent),
          eventValue: payload.conversionValue,
          eventData: {
            pagePath: payload.pagePath,
            pageTitle: payload.pageTitle,
            utmSource: payload.utmSource,
            utmMedium: payload.utmMedium,
            utmCampaign: payload.utmCampaign,
            utmTerm: payload.utmTerm,
            utmContent: payload.utmContent,
          },
          ipAddress,
          userAgent,
          pagePath: payload.pagePath,
        },
      });
    }

    // Actualizar métricas del usuario si está autenticado
    if (payload.userId) {
      await updateUserMetrics(payload.userId, payload);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}

function getDeviceType(userAgent: string): string {
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    if (/iPad/.test(userAgent)) return 'tablet';
    return 'mobile';
  }
  return 'desktop';
}

function getBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
}

function getOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Other';
}

function getEventCategory(eventType: string): string {
  const conversionEvents = ['signup', 'login', 'purchase', 'newsletter_signup'];
  const engagementEvents = ['page_view', 'scroll', 'click', 'download'];
  const retentionEvents = ['return_visit', 'repeat_purchase'];

  if (conversionEvents.includes(eventType)) return 'conversion';
  if (engagementEvents.includes(eventType)) return 'engagement';
  if (retentionEvents.includes(eventType)) return 'retention';

  return 'other';
}

async function updateUserMetrics(userId: string, payload: AnalyticsPayload) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    // Actualizar métricas básicas
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastActivityAt: new Date(),
        totalPageViews: user.totalPageViews + 1,
        // Actualizar segmento si es necesario
        userSegment: calculateUserSegment(user),
      },
    });

    // Si es un evento de conversión importante, actualizar lifetime value
    if (payload.conversionEvent === 'purchase' && payload.conversionValue) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          lifetimeValue: user.lifetimeValue + payload.conversionValue,
        },
      });
    }
  } catch (error) {
    console.error('Error updating user metrics:', error);
  }
}

function calculateUserSegment(user: any): string {
  const now = new Date();
  const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt) : null;
  const daysSinceLastLogin = lastLogin
    ? Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Lógica de segmentación
  if (daysSinceLastLogin === null || daysSinceLastLogin <= 7) {
    return 'active';
  } else if (daysSinceLastLogin <= 30) {
    return 'engaged';
  } else if (daysSinceLastLogin <= 90) {
    return 'at_risk';
  } else {
    return 'churned';
  }
}
