import type { ImageMetadata } from "astro";

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';

export type Project = {
  name: string;
  slug: string;
  description: string;
  images: ImageMetadata[];
};

export const projects: Project[] = [
  {
    name: 'Proyecto 1',
    slug: 'proyecto-1',
    description: 'Exploración de la arquitectura brutalista en espacios urbanos.',
    images: [img1, img2, img3, img4],
  },
  {
    name: 'Proyecto 2',
    slug: 'proyecto-2',
    description: 'Estudio en blanco y negro de rostros cotidianos.',
    images: [img2, img3, img4, img5],
  },
  {
    name: 'Proyecto 3',
    slug: 'proyecto-3',
    description: 'Paisajes naturales y texturas en la montaña.',
    images: [img3, img4, img5, img6],
  },
  {
    name: 'Proyecto 4',
    slug: 'proyecto-4',
    description: 'Jugando con el reflejo y la refracción de la luz.',
    images: [img4, img5, img6, img7],
  },
  {
    name: 'Proyecto 5',
    slug: 'proyecto-5',
    description: 'Sombras y simetrías en la ciudad.',
    images: [img5, img6, img7, img8],
  },
  {
    name: 'Proyecto 6',
    slug: 'proyecto-6',
    description: 'Narrativa visual sobre la soledad urbana.',
    images: [img6, img7, img8, img9],
  },
  {
    name: 'Proyecto 7',
    slug: 'proyecto-7',
    description: 'Colores vibrantes y formas en el espacio público.',
    images: [img7, img8, img9, img10],
  },
  {
    name: 'Proyecto 8',
    slug: 'proyecto-8',
    description: 'Un diario visual de calles en Barcelona.',
    images: [img8, img9, img10, img11],
  },
  {
    name: 'Proyecto 9',
    slug: 'proyecto-9',
    description: 'Instantes capturados en la periferia industrial.',
    images: [img9, img10, img11, img12],
  },
  {
    name: 'Proyecto 10',
    slug: 'proyecto-10',
    description: 'Ensayo visual sobre el paso del tiempo.',
    images: [img10, img11, img12, img1],
  },
  {
    name: 'Proyecto 11',
    slug: 'proyecto-11',
    description: 'Composición minimalista en espacios vacíos.',
    images: [img11, img12, img1, img2],
  },
  {
    name: 'Proyecto 12',
    slug: 'proyecto-12',
    description: 'Texturas, materia y degradación en muros y suelos.',
    images: [img12, img1, img2, img3],
  },
];