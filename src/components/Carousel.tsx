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
    let animationId: number;
    let isMounted = false;

    const setupCursor = () => {
      const EASE = 0.3;
      const cursor = cursorRef.current;
      const bg = document.getElementById('bg');
      const canvas = document.getElementById('cursor-canvas') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');

      if (!cursor || !bg || !canvas || !ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const points: { x: number; y: number; alpha: number }[] = [];
      let isActive = false;
      const textElement = cursor.querySelector('p') as HTMLParagraphElement;
      let inactivityTimeout: number;

      const handleMouseMove = (e: MouseEvent) => {
        positionX.current.target = e.clientX;
        positionY.current.target = e.clientY;

        if (textElement) {
          textElement.style.display = 'none';
          clearTimeout(inactivityTimeout);
          inactivityTimeout = window.setTimeout(() => {
            textElement.style.display = 'block';
          }, 100);
        }

        if (isActive) {
          points.push({ x: e.clientX, y: e.clientY, alpha: 0.2 });
          if (points.length > 50) points.shift();
        }
      };

      const showCursor = () => {
        cursor.style.opacity = '1';
        isActive = true;
      };

      const hideCursor = () => {
        cursor.style.opacity = '0';
        isActive = false;
        if (textElement) {
          textElement.style.display = 'none';
          clearTimeout(inactivityTimeout);
        }
      };

      const update = () => {
        positionX.current.current = lerp(positionX.current.current, positionX.current.target, EASE);
        positionY.current.current = lerp(positionY.current.current, positionY.current.target, EASE);
        cursor.style.transform = `translate3d(${positionX.current.current}px, ${positionY.current.current}px, 0)`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isActive) {
          for (let i = 0; i < points.length; i++) {
            const p = points[i];
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = 'white';
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('View project ↗', p.x, p.y);
            ctx.restore();
            p.alpha -= 0.005;
          }

          for (let i = points.length - 1; i >= 0; i--) {
            if (points[i].alpha <= 0) points.splice(i, 1);
          }
        }

        animationId = requestAnimationFrame(update);
      };

      window.addEventListener('mousemove', handleMouseMove);
      bg.addEventListener('mouseenter', showCursor);
      bg.addEventListener('mouseleave', hideCursor);

      cursor.style.opacity = '0';
      if (textElement) textElement.style.display = 'none';
      update();

      isMounted = true;

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        bg.removeEventListener('mouseenter', showCursor);
        bg.removeEventListener('mouseleave', hideCursor);
        cancelAnimationFrame(animationId);
        clearTimeout(inactivityTimeout);
      };
    };

    let cleanup: (() => void) | undefined;

    const handleResize = () => {
      if (window.innerWidth >= 768 && !isMounted) {
        cleanup = setupCursor();
      } else if (window.innerWidth < 768 && isMounted) {
        cleanup?.();
        isMounted = false;
      }
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener('resize', handleResize);

    return () => {
      cleanup?.();
      window.removeEventListener('resize', handleResize);
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

      <canvas id="cursor-canvas" className="cursor-canvas"></canvas>
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