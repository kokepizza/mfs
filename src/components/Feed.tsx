import { type Project } from '../data/projects';
import './Feed.css';

type FeedProps = {
  projects: Project[];
};

export default function Feed({ projects }: FeedProps) {
  return (
    <div className="feed-container">
      {projects.map((project) => (
        <a href={`/work/${project.slug}`} className="project-card" key={project.slug}>
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