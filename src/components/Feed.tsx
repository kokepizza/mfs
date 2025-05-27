import { useEffect, useRef } from 'react';
import { type Project } from '../data/projects';
import './Feed.css';

type FeedProps = {
  projects: Project[];
};

export default function Feed({ projects }: FeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const extendedProjects = [...projects, ...projects, ...projects];
  const middleIndex = projects.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardHeight = container.scrollHeight / extendedProjects.length;
    container.scrollTop = cardHeight * middleIndex;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const threshold = cardHeight;

      if (scrollTop < threshold) {
        container.scrollTop = scrollTop + cardHeight * projects.length;
      } else if (scrollTop > maxScroll - threshold) {
        container.scrollTop = scrollTop - cardHeight * projects.length;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [projects, extendedProjects]);

  return (
    <div className="feed-container" ref={containerRef}>
      {extendedProjects.map((project, index) => (
        <a href={`/work/${project.slug}`} className="project-card" key={`${project.slug}-${index}`}>
          <img
            src={project.images[0]}
            alt={project.name}
            loading="lazy"
            className="project-image"
          />
          <h2 className="project-title">{project.name}</h2>
        </a>
      ))}
    </div>
  );
}