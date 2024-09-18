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
    description: `Dinámicas para aprender de`,
    title: `Web 3 y Cripto sin estafas`,
    image: {
      src: '/static/images/imgsCafe/cripto.jpg',
      width: 600,
      height: 770,
    },
  },
  {
    description: 'Dinámicas para aprender',
    title: 'nuevos idiomas',
    image: {
      src: '/static/images/imgsCafe/idiomas.png',
      width: 600,
      height: 554,
    },
  },
  {
    description: `Dinámicas para mandar mensajes`,
    title: 'Anónimos a personas especiales',
    image: {
      src: '/static/images/imgsCafe/portavoz.jpeg',
      width: 600,
      height: 717,
    },
  },
  {
    description: `Dinámicas de arte`,
    title: 'para que vuelvas un niño de nuevo',
    image: {
      src: '/static/images/imgsCafe/arte.jpeg',
      width: 600,
      height: 717,
    },
  },
];
