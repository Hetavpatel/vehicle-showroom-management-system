import { prisma } from '../../database/prisma.js';

export async function getAttendanceSummary(tenantId: string, start: Date, end: Date) {
  const records = await prisma.bookingAttendance.findMany({
    where: {
      booking: {
        tenantId,
        startAt: {
          gte: start,
          lte: end
        }
      }
    },
    include: {
      booking: true
    }
  });

  const stats = records.reduce(
    (acc, record) => {
      acc.total += 1;
      acc.byStatus[record.status] = (acc.byStatus[record.status] ?? 0) + 1;
      return acc;
    },
    { total: 0, byStatus: {} as Record<string, number> }
  );

  return stats;
}

export async function getNoShowRate(tenantId: string) {
  const total = await prisma.booking.count({
    where: { tenantId }
  });
  const noShows = await prisma.booking.count({
    where: { tenantId, status: 'NO_SHOW' }
  });
  return {
    total,
    noShows,
    rate: total === 0 ? 0 : noShows / total
  };
}

export async function getPredictiveSuggestions(tenantId: string, memberId: string) {
  const history = await prisma.booking.findMany({
    where: { tenantId, memberId },
    orderBy: { startAt: 'desc' },
    take: 10
  });

  return history.map((booking) => ({
    suggestedServiceId: booking.serviceId,
    suggestedStartAt: booking.startAt,
    confidence: 0.6
  }));
}
