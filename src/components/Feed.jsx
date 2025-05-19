import { useEffect, useRef } from 'react';
import { projects } from '../assets/projects.js';

const NUM_PROJECTS = 12;

export default function Feed() {
  const feedRef = useRef(null);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    const initScroll = () => {
      infiniteScroll();

      const firstBlock = Array.from(feed.querySelectorAll('.feed-grid')).slice(0, NUM_PROJECTS);
      const blockHeight = firstBlock.reduce((acc, el) => acc + el.offsetHeight, 0);
      feed.scrollTop = blockHeight;
    };

    const infiniteScroll = () => {
      const projectsElems = Array.from(feed.children);

      projectsElems.slice(0, NUM_PROJECTS).reverse().forEach(project => {
        feed.insertBefore(project.cloneNode(true), feed.firstChild);
      });
      projectsElems.slice(0, NUM_PROJECTS).forEach(project => {
        feed.appendChild(project.cloneNode(true));
      });

      const originalProjects = Array.from(feed.children).slice(NUM_PROJECTS, NUM_PROJECTS * 2);
      const blockHeight = originalProjects.reduce((acc, el) => acc + el.offsetHeight, 0);

      feed.scrollTop = blockHeight;

      feed.addEventListener('scroll', () => {
        if (feed.scrollTop <= 0) {
          feed.scrollTop = blockHeight;
        } else if (feed.scrollTop >= feed.scrollHeight - feed.clientHeight) {
          feed.scrollTop = blockHeight - feed.clientHeight;
        }
      });
    };

    const blurTitle = () => {
      let blurTimeout;

      const handleBlur = () => {
        const title = document.querySelector('.title-name');
        if (title) {
          title.style.filter = 'blur(0px)';
          clearTimeout(blurTimeout);
          blurTimeout = setTimeout(() => {
            title.style.filter = '';
          }, 300);
        }
      };

      window.addEventListener('wheel', handleBlur);
      window.addEventListener('scroll', handleBlur);
      window.addEventListener('touchmove', handleBlur);

      return () => {
        window.removeEventListener('wheel', handleBlur);
        window.removeEventListener('scroll', handleBlur);
        window.removeEventListener('touchmove', handleBlur);
      };
    };

    initScroll();
    const cleanupBlur = blurTitle();

    return () => {
      cleanupBlur && cleanupBlur();
    };
  }, []);

  return (
    <section className="feed" ref={feedRef}>
      {projects.map((project, i) => (
        <article className="feed-grid" data-slide key={i}>
          <a href={project.url} data-preview={i + 1}>
            <div className="feed-project">
              <figure className="feed-project-fig">
                <img src={project.images[0].src} alt={project.name} title={project.name} />
              </figure>
              <h2 className="feed-project-title">{project.name}</h2>
            </div>
          </a>
        </article>
      ))}
    </section>
  );
}