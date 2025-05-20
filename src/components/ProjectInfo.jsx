import { useRef, useState } from "react";
import gsap from "gsap";

export default function ProjectInfo({ name, description }) {
  const [open, setOpen] = useState(false);
  const descRef = useRef(null);
  const arrowRef = useRef(null);

  const toggle = () => {
    if (!descRef.current) return;

    const next = !open;

    if (next) {
      const fullHeight = descRef.current.scrollHeight;

      gsap.set(descRef.current, { visibility: "visible" });
      const tl = gsap.timeline();
      tl.to(descRef.current, {
        maxHeight: fullHeight,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
      tl.to(descRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power1.out",
      }, "-=0.25"); // empieza a la mitad del maxHeight

      arrowRef.current.textContent = "←";
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (descRef.current) descRef.current.style.visibility = "hidden";
        },
      });
      tl.to(descRef.current, {
        maxHeight: 0,
        duration: 0.5,
        ease: "back.in(1.7)",
      });
      tl.to(
        descRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power1.in",
        },
        "-=0.25"
      );
      arrowRef.current.textContent = "→";
    }

    setOpen(next);
  };

  return (
    <footer className="project-info">
      <h1 onClick={toggle}>
        {name} <span className="arrow" ref={arrowRef}>→</span>
      </h1>
      <p ref={descRef}>{description}</p>
    </footer>
  );
}