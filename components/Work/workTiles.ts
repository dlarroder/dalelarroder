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
    description: `Intencional`,
    title: `Nada en Xoco es casual. Desde su menú compacto hasta la disposición del local`,
    image: {
      src: '/static/images/imgsCafe/cripto.jpg',
      width: 600,
      height: 770,
    },
  },
  {
    description: 'todo responde a una intención clara:',
    title: 'facilitar una experiencia rápida, funcional y estética para el usuario.',
    image: {
      src: '/static/images/imgsCafe/idiomas.png',
      width: 600,
      height: 554,
    },
  },
  {
    description: `Vanguardista`,
    title: 'Xoco rompe con el molde tradicional de las cafeterías.',
    image: {
      src: '/static/images/imgsCafe/portavoz.jpeg',
      width: 600,
      height: 717,
    },
  },
  {
    description: `Su propuesta minimalista y centrada en el “grab & go”`,
    title: 'nos posiciona a la vanguardia de los nuevos hábitos de consumo, conectando con generaciones digitales y prácticas.',
    image: {
      src: '/static/images/imgsCafe/arte.jpeg',
      width: 600,
      height: 717,
    },
  },
];
