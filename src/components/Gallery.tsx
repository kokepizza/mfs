import { useState, useEffect, useRef } from "react";
import type { Project } from "../data/projects";

type Props = {
  projects: Project[];
};

export default function ProjectGallery({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.querySelector('[data-thumbs]') as HTMLElement;
    if (!container) return;

    const handleScroll = () => {
      const images = container.querySelectorAll("[data-thumb]");
      const center = window.innerWidth / 2;

      images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        if (rect.left < center && rect.right > center) {
          setActiveIndex(index);
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const project = projects[activeIndex];

  return (
    <div className="project-gallery">
      <h2>{project.name}</h2>
      <img
        src={project.images[0].src}
        alt={project.name}
        className="main-image"
      />
    </div>
  );
}