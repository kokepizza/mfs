export type Project = {
  name: string;
  slug: string;
  description: string;
  images: string[]; // En este caso, solo una imagen por proyecto
};

export const projects: Project[] = [
  {
    name: 'Proyecto 1',
    slug: 'proyecto-1',
    description: 'Exploración de la arquitectura brutalista en espacios urbanos.',
    images: [
        '/assets/1.jpg',
        '/assets/2.jpg',
        '/assets/3.jpg',
        '/assets/4.jpg',
    ],
  },
  {
    name: 'Proyecto 2',
    slug: 'proyecto-2',
    description: 'Estudio en blanco y negro de rostros cotidianos.',
    images: [
        '/assets/2.jpg',
        '/assets/3.jpg',
        '/assets/4.jpg',
        '/assets/5.jpg',
    ],
  },
  {
    name: 'Proyecto 3',
    slug: 'proyecto-3',
    description: 'Paisajes naturales y texturas en la montaña.',
    images: [
        '/assets/3.jpg',
        '/assets/4.jpg',
        '/assets/5.jpg',
        '/assets/6.jpg',
    ],
  },
  {
    name: 'Proyecto 4',
    slug: 'proyecto-4',
    description: 'Jugando con el reflejo y la refracción de la luz.',
    images: [
        '/assets/4.jpg',
        '/assets/5.jpg',
        '/assets/6.jpg',
        '/assets/7.jpg',
    ],
  },
  {
    name: 'Proyecto 5',
    slug: 'proyecto-5',
    description: 'Sombras y simetrías en la ciudad.',
    images: [
        '/assets/5.jpg',
        '/assets/6.jpg',
        '/assets/7.jpg',
        '/assets/8.jpg',
    ],
  },
  {
    name: 'Proyecto 6',
    slug: 'proyecto-6',
    description: 'Narrativa visual sobre la soledad urbana.',
    images: [
        '/assets/6.jpg',
        '/assets/7.jpg',
        '/assets/8.jpg',
        '/assets/9.jpg',
    ],
  },
  {
    name: 'Proyecto 7',
    slug: 'proyecto-7',
    description: 'Colores vibrantes y formas en el espacio público.',
    images: [
        '/assets/7.jpg',
        '/assets/8.jpg',
        '/assets/9.jpg',
        '/assets/10.jpg',
    ],
  },
  {
    name: 'Proyecto 8',
    slug: 'proyecto-8',
    description: 'Un diario visual de calles en Barcelona.',
    images: [
        '/assets/8.jpg',
        '/assets/9.jpg',
        '/assets/10.jpg',
        '/assets/11.jpg',
    ],
  },
  {
    name: 'Proyecto 9',
    slug: 'proyecto-9',
    description: 'Instantes capturados en la periferia industrial.',
    images: [
        '/assets/9.jpg',
        '/assets/10.jpg',
        '/assets/11.jpg',
        '/assets/12.jpg',
    ],
  },
  {
    name: 'Proyecto 10',
    slug: 'proyecto-10',
    description: 'Ensayo visual sobre el paso del tiempo.',
    images: [
        '/assets/10.jpg',
        '/assets/11.jpg',
        '/assets/12.jpg',
        '/assets/1.jpg',
    ],
  },
  {
    name: 'Proyecto 11',
    slug: 'proyecto-11',
    description: 'Composición minimalista en espacios vacíos.',
    images: [
        '/assets/11.jpg',
        '/assets/12.jpg',
        '/assets/1.jpg',
        '/assets/2.jpg',
    ],
  },
  {
    name: 'Proyecto 12',
    slug: 'proyecto-12',
    description: 'Texturas, materia y degradación en muros y suelos.',
    images: [
        '/assets/12.jpg',
        '/assets/1.jpg',
        '/assets/2.jpg',
        '/assets/3.jpg',
    ],
  },
];