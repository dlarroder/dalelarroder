export type WorkTile = {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
};

export const workTiles: WorkTile[] = [
  {
    description: `RealEstate`,
    title: `HourlySpaces`,
    image: {
      src: '/static/images/HourlySpaces.webp',
      width: 600,
      height: 770,
    },
  },
  {
    description: 'HotelBooking',
    title: 'BookingNest',
    image: {
      src: '/static/images/BookingNest.webp',
      width: 600,
      height: 770,
    },
  },
  {
    description: `Portfolio`,
    title: 'CaptureMoment',
    image: {
      src: '/static/images/CaptureMoment.webp',
      width: 600,
      height: 770,
    },
  },
  // {
  //   description: `I built`,
  //   title: 'Aphex Publication',
  //   image: {
  //     src: '/static/images/publication-app.webp',
  //     width: 600,
  //     height: 717,
  //   },
  // },
];
