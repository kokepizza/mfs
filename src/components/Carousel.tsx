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

  const handleClick = (index: number) => {
    setActiveIndex(index);
    const bg = projects[index].images[0];
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = `url(${bg})`;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    if (!isTouchDevice) {
      // 🖥️ Escritorio: scroll vertical -> scroll horizontal con GSAP
      const sectionWidth = carousel.scrollWidth;
      document.body.style.height = `${sectionWidth}px`;

      const tween = gsap.to(carousel, {
        x: () => `-${sectionWidth - window.innerWidth}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: () => `+=${sectionWidth - window.innerWidth}`,
          scrub: true,
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
          {projects.map((project, index) => (
            <article
              key={index}
              className={`thumb${index === activeIndex ? ' active' : ''}`}
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