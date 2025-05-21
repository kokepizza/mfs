import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function ScrollSnapViewer({ images, name }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const slides = container.querySelectorAll('.image-slide');

    slides.forEach((slide, i) => {
      ScrollTrigger.create({
        trigger: slide,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
        scroller: container, 
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [images]);

  const scrollTo = (index) => {
    const container = containerRef.current;
    const target = container.querySelectorAll('.image-slide')[index];
    if (target) {
      gsap.to(container, {
        duration: 1,
        scrollTo: { y: target, offsetY: 0 },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <>
      <figure ref={containerRef} className="project-image">
        {images.map((image, i) => (
          <div className="image-slide" key={i}>
            <img src={image.src} alt={`${name} ${i + 1}`} />
          </div>
        ))}
      </figure>
      <aside className="image-index" aria-label="Índice de imágenes">
        <ol>
          {images.map((_, i) => (
            <li
              key={i}
              className={i === activeIndex ? 'active' : ''}
              onClick={() => scrollTo(i)}
              style={{ cursor: 'pointer' }}
            >
              {String(i + 1).padStart(2, '0')}
            </li>
          ))}
        </ol>
      </aside>
    </>
  );
}