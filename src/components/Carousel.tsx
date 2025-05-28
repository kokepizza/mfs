import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import './carousel.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouchDevice) {
      const totalScroll = carousel.scrollWidth - window.innerWidth;

      gsap.to(carousel, {
        x: () => `-${totalScroll}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    } else {
      // En móvil: reset transform por si GSAP dejó algo
      gsap.set(carousel, { x: 0 });
    }
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    const bg = projects[index].images[0];
    const bgSection = document.getElementById('bg');
    if (bgSection) {
      bgSection.style.backgroundImage = `url(${bg})`;
    }
  };

  return (
    <>
      <section
        id="bg"
        className="image-bg"
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
              <img
                src={project.images[0]}
                alt={project.name}
                title={project.name}
              />
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Carousel;