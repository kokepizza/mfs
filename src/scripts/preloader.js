// src/scripts/preloader.js
import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("preloader-title");
  const preloader = document.querySelector(".preloader");

  if (!title || !preloader) return;

  if (preloader.classList.contains("preloader-a")) {
    gsap.set(title, {
      top: 0,
      left: "50%",
      xPercent: -50,
      fontSize: "clamp(.8rem, 4vw, 1.8rem)",
      filter: "blur(0.25rem)",
      position: "fixed"
    });

    gsap.to(title, {
      top: "50%",
      yPercent: -50,
      fontSize: "clamp(1.5rem, 6vw, 3rem)",
      filter: "blur(0.5rem)",
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => (preloader.style.display = "none")
    });
  }

  if (preloader.classList.contains("preloader-b")) {
    gsap.set(title, {
      scale: 2,
      opacity: 0,
      position: "fixed",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50
    });

    gsap.to(title, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => (preloader.style.display = "none")
    });
  }
});