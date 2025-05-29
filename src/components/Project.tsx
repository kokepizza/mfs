import React, { useEffect, useRef, useState } from 'react';
import './project.css';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollToPlugin, CustomEase);

CustomEase.create("EASE", "M0,0 C0.29,0 0.329,0.015 0.4,0.1 0.469,0.183 0.474,0.359 0.498,0.502 0.522,0.648 0.537,0.806 0.6,0.9 0.675,1.011 0.704,1 1,1 ");

interface ProjectProps {
  name: string;
  description: string;
  images: string[];
}

const SCROLL_THRESHOLD = 5;
const SWIPE_THRESHOLD = 50;

const Project: React.FC<ProjectProps> = ({ name, description, images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    if (
      index < 0 ||
      index >= images.length ||
      isAnimating ||
      !containerRef.current
    ) return;

    setIsAnimating(true);
    gsap.to(containerRef.current, {
      y: -index * window.innerHeight,
      duration: 1,
      ease: 'EASE',
      onComplete: () => setIsAnimating(false),
    });
    setCurrentIndex(index);
  };

    const toggleDescription = () => {
        if (!descriptionRef.current) return;

        const element = descriptionRef.current;
        const isOpen = showDescription;

        const targetHeight = isOpen ? 0 : element.scrollHeight;

        gsap.to(element, {
            height: targetHeight,
            duration: 0.8,
            ease: 'EASE',
            onComplete: () => {
            if (!isOpen) {
                // Fijar a 'auto' después de abrir para permitir contenido dinámico
                element.style.height = 'auto';
            }
            },
        });

        if (isOpen) {
            // Si se está cerrando, volver a un valor fijo
            element.style.height = `${element.scrollHeight}px`;
            requestAnimationFrame(() => {
            gsap.to(element, {
                height: 0,
                duration: 0.8,
                ease: 'EASE',
            });
            });
        }

        setShowDescription(!isOpen);
    };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      if (e.deltaY > SCROLL_THRESHOLD) goToSlide(currentIndex + 1);
      else if (e.deltaY < -SCROLL_THRESHOLD) goToSlide(currentIndex - 1);
    };

    const handleClick = (e: MouseEvent) => {
      const wrapper = document.querySelector('.project-images-wrapper');
      if (!wrapper) return;
      if (wrapper.contains(e.target as Node)) {
        goToSlide(currentIndex + 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (isAnimating) return;

      if (deltaY > SWIPE_THRESHOLD) goToSlide(currentIndex + 1);
      else if (deltaY < -SWIPE_THRESHOLD) goToSlide(currentIndex - 1);

      touchStartY.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, isAnimating]);

  return (
    <>
      <div className="project-bg" style={{ backgroundImage: `url('${images[0]}')` }}></div>

      <aside className="project-index">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={i === currentIndex ? 'active' : ''}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </aside>

      <div className="project-images-wrapper">
        <div className="project-images-container" ref={containerRef}>
          {images.map((img, i) => (
            <div className="project-image" key={i}>
              <img src={img} alt={`Image ${name} ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="project-info">
        <h1 onClick={toggleDescription} style={{ cursor: 'pointer' }}>{name}</h1>
        <div
          className="project-description"
          ref={descriptionRef}
          style={{ overflow: 'hidden', height: 0 }}
        >
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default Project;