import { useEffect, useRef, useState } from 'react';

export default function ScrollSnapViewer({ images, name }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const slides = container.querySelectorAll('.image-slide');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(slides).indexOf(entry.target);
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => {
      observer.disconnect();
    };
  }, [images]);

  const scrollTo = (index) => {
    const container = containerRef.current;
    const target = container.querySelectorAll('.image-slide')[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <figure className="project-image" ref={containerRef}>
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