import { useState } from 'react';
import { projects } from '../data/projects';
import './carousel.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  return (
    <>
      <div id="bg" className="image-bg">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.slug}
            className={`bg-image${index === activeIndex ? ' active' : ''}`}
            style={{ backgroundImage: `url(${project.images[0]})` }}
          ></a>
        ))}
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