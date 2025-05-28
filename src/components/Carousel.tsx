import { useRef, useState } from 'react';
import { projects } from '../data/projects';
import './carousel.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    if (index === activeIndex) return; // evitar doble clic innecesario
    setActiveIndex(index);

    const newBg = projects[index].images[0];

    if (bgRef.current) {
      bgRef.current.style.opacity = '0';
      setTimeout(() => {
        if (bgRef.current) {
          bgRef.current.style.backgroundImage = `url(${newBg})`;
          bgRef.current.style.opacity = '1';
        }
      }, 200);
    }
  };

  return (
    <>
      <div
        id="bg"
        className="image-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${projects[0].images[0]})` }}
      ></div>

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
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Carousel;