import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import './carousel.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  const cursorRef = useRef<HTMLDivElement>(null);

  const positionX = useRef({ target: 0, current: 0 });
  const positionY = useRef({ target: 0, current: 0 });

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    const EASE = 0.16;
    const cursor = cursorRef.current;
    const bg = document.getElementById('bg');
    if (!cursor || !bg) return;

    const handleMouseMove = (e: MouseEvent) => {
      positionX.current.target = e.clientX;
      positionY.current.target = e.clientY;
    };

    const showCursor = () => {
      cursor.style.opacity = '1';
    };

    const hideCursor = () => {
      cursor.style.opacity = '0';
    };

    const update = () => {
      positionX.current.current = lerp(positionX.current.current, positionX.current.target, EASE);
      positionY.current.current = lerp(positionY.current.current, positionY.current.target, EASE);
      if (cursor) {
        cursor.style.transform = `translate3d(${positionX.current.current}px, ${positionY.current.current}px, 0)`;
      }
      requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    bg.addEventListener('mouseenter', showCursor);
    bg.addEventListener('mouseleave', hideCursor);

    // Ocultar al inicio
    cursor.style.opacity = '0';
    update();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      bg.removeEventListener('mouseenter', showCursor);
      bg.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  return (
    <>
      <div id="bg" className="image-bg">
        {projects.map((project, index) => (
        <a
          key={index}
          href={project.slug}
          className={`bg-image${index === activeIndex ? ' active' : ''}`}
        >
          <img src={project.images[0]} alt={project.name} />
        </a>
        ))}
      </div>

      <div className="text-cursor-wrapper" ref={cursorRef}>
        <div className="text-cursor">
          <p>View project ↗</p>
        </div>
      </div>

      <section className="carousel-wrapper">
        <div className="carousel">
          {projects.map((project, index) => (
            <article
              key={index}
              className={`thumb${index === activeIndex ? ' active' : ''}`}
              onClick={() => handleClick(index)}
            >
              <img
                src={project.images[0]}
                alt={project.name}
                title={project.name}
              />
              <span className="thumb-title">{project.name}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Carousel;