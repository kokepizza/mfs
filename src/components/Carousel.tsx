import { useState } from 'react';
import { projects } from '../data/projects';
import './carousel.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
      <section id="bg" className="image-bg" style={{ backgroundImage: `url(${projects[0].images[0]})` }}></section>

      <section className="carousel-wrapper">
        <div className="carousel" id="carousel">
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