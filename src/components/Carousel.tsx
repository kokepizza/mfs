import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import './carousel.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLElement>(null);
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  const repetitions = 5;
  const repeatedProjects = Array.from({ length: repetitions }).flatMap(() => projects);
  const middleIndex = Math.floor(repeatedProjects.length / 2);

  const handleClick = (index: number) => {
    const realIndex = index % projects.length;
    setActiveIndex(realIndex);
    const bg = projects[realIndex].images[0];
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = `url(${bg})`;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    if (isTouchDevice) {
      // 🌐 Móviles: scroll horizontal infinito en ambas direcciones
      const sectionWidth = carousel.scrollWidth / repetitions;
      carousel.scrollLeft = sectionWidth * Math.floor(repetitions / 2);

      const loopScroll = () => {
        const scrollLeft = carousel.scrollLeft;
        if (scrollLeft <= sectionWidth * 0.5) {
          carousel.scrollLeft += sectionWidth * (repetitions - 2);
        } else if (scrollLeft >= sectionWidth * (repetitions - 0.5)) {
          carousel.scrollLeft -= sectionWidth * (repetitions - 2);
        }
      };

      carousel.addEventListener('scroll', loopScroll);
      return () => carousel.removeEventListener('scroll', loopScroll);
    } else {
      // 🖥️ Escritorio: scroll vertical -> translateX infinito con GSAP
      const sectionWidth = carousel.scrollWidth / repetitions;
      document.body.style.height = `${sectionWidth}px`;

      const tween = gsap.to(carousel, {
        x: () => `-${sectionWidth * (repetitions - 1) / 2}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: () => `+=${sectionWidth}`,
          scrub: true,
          onUpdate: (self) => {
            if (self.progress <= 0.05) {
              self.scroll(self.end - sectionWidth * 0.1);
            } else if (self.progress >= 0.95) {
              self.scroll(self.start + sectionWidth * 0.1);
            }
          },
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        document.body.style.height = '';
      };
    }
  }, []);

  return (
    <>
      <section
        id="bg"
        className="image-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${projects[0].images[0]})` }}
      ></section>

      <section className="carousel-wrapper">
        <div className="carousel" id="carousel" ref={carouselRef}>
          {repeatedProjects.map((project, index) => (
            <article
              key={`${index}-${project.name}`}
              className={`thumb${index % projects.length === activeIndex ? ' active' : ''}`}
              data-bg={project.images[0]}
              aria-label="View work"
              onClick={() => handleClick(index)}
            >
              <img src={project.images[0]} alt={project.name} title={project.name} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Carousel;