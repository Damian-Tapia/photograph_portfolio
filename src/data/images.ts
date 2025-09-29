export interface ImageData {
  id: string;
  src: string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
}

export const portfolioImages: ImageData[] = [
  {
    id: '1',
    src: '/images/amor_1.jpeg',
    alt: 'Retrato en blanco y negro',
    category: 'Retratos',
    width: 800,
    height: 1200
  },
  {
    id: '2',
    src: '/images/auto_1.jpeg',
    alt: 'Paisaje urbano nocturno',
    category: 'Urbano',
    width: 1200,
    height: 800
  },
  {
    id: '3',
    src: '/images/auto_2.jpeg',
    alt: 'Fotografía de naturaleza',
    category: 'Naturaleza',
    width: 1000,
    height: 1000
  },
  {
    id: '4',
    src: '/images/bellas_artes_1.jpeg',
    alt: 'Sesión de moda',
    category: 'Moda',
    width: 800,
    height: 1200
  },
  {
    id: '5',
    src: '/images/latino_1.jpeg',
    alt: 'Arquitectura moderna',
    category: 'Arquitectura',
    width: 1200,
    height: 800
  },
  {
    id: '6',
    src: '/images/milo_1.jpeg',
    alt: 'Retrato artístico',
    category: 'Retratos',
    width: 900,
    height: 1200
  },
  {
    id: '7',
    src: '/images/persona_1.jpeg',
    alt: 'Retrato artístico',
    category: 'Retratos',
    width: 900,
    height: 1200
  },
  {
    id: '8',
    src: '/images/persona_2.jpeg',
    alt: 'Retrato artístico',
    category: 'Retratos',
    width: 900,
    height: 1200
  },
  {
    id: '9',
    src: '/images/pez_1.jpeg',
    alt: 'Retrato artístico',
    category: 'Retratos',
    width: 900,
    height: 1200
  },
  {
    id: '10',
    src: '/images/trajineras_1.jpeg',
    alt: 'Retrato artístico',
    category: 'Retratos',
    width: 900,
    height: 1200
  },
  {
    id: '11',
    src: '/images/trajineras_2.jpeg',
    alt: 'Retrato artístico',
    category: 'Retratos',
    width: 900,
    height: 1200
  }
];