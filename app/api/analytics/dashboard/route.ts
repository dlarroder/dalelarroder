import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token de autorización requerido' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (!decoded.userId) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    // Obtener métricas básicas
    const [
      totalUsers,
      totalSessions,
      totalPageViews,
      avgSessionDuration,
      bounceRate,
      topPages,
      userSegments,
      conversionEvents,
      recentActivity,
    ] = await Promise.all([
      // Total de usuarios
      prisma.user.count(),

      // Total de sesiones
      prisma.session.count(),

      // Total de páginas vistas
      prisma.pageAnalytics.count(),

      // Duración promedio de sesión
      prisma.session.aggregate({
        _avg: {
          sessionDuration: true,
        },
      }),

      // Tasa de rebote
      prisma.pageAnalytics.aggregate({
        _avg: {
          bounce: true,
        },
      }),

      // Páginas más visitadas
      prisma.pageAnalytics.groupBy({
        by: ['pagePath'],
        _count: {
          pagePath: true,
        },
        orderBy: {
          _count: {
            pagePath: 'desc',
          },
        },
        take: 10,
      }),

      // Segmentos de usuarios
      prisma.user.groupBy({
        by: ['userSegment'],
        _count: {
          userSegment: true,
        },
        where: {
          userSegment: {
            not: null,
          },
        },
      }),

      // Eventos de conversión
      prisma.conversionEvent.groupBy({
        by: ['eventType'],
        _count: {
          eventType: true,
        },
        orderBy: {
          _count: {
            eventType: 'desc',
          },
        },
        take: 10,
      }),

      // Actividad reciente
      prisma.conversionEvent.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          eventType: true,
          createdAt: true,
          pagePath: true,
        },
      }),
    ]);

    // Formatear datos para el dashboard
    const analyticsData = {
      totalUsers,
      totalSessions,
      totalPageViews,
      avgSessionDuration: Math.round(avgSessionDuration._avg.sessionDuration || 0),
      bounceRate: Math.round((bounceRate._avg.bounce || 0) * 100),
      topPages: topPages.map((page) => ({
        pagePath: page.pagePath,
        views: page._count.pagePath,
      })),
      userSegments: userSegments.map((segment) => ({
        segment: segment.userSegment || 'unknown',
        count: segment._count.userSegment,
      })),
      conversionEvents: conversionEvents.map((event) => ({
        eventType: event.eventType,
        count: event._count.eventType,
      })),
      recentActivity: recentActivity.map((activity) => ({
        id: activity.id,
        type: activity.eventType,
        description: `${activity.eventType.replace('_', ' ')} en ${activity.pagePath}`,
        timestamp: activity.createdAt.toISOString(),
      })),
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics dashboard:', error);
    return NextResponse.json({ error: 'Error al obtener datos de analítica' }, { status: 500 });
  }
}
