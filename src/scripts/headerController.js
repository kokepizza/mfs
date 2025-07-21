import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger-menu");
  const nav = document.querySelector(".navigation");
  const links = nav.querySelectorAll("a");
  const icon = document.querySelector(".burger-icon");
  const topLine = icon.querySelector(".line.top");
  const bottomLine = icon.querySelector(".line.bottom");

  let isOpen = false;

  // Timeline navegació
  const navTl = gsap.timeline({ paused: true });

  navTl.set(nav, { display: "flex" })
    .fromTo(
      nav,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3, ease: "power1.out" },
      0
    )
    .fromTo(
      links,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.inOut(4)",
        stagger: 0.3
      },
      0.1
    );

  // Timeline svg
  const burgerTl = gsap.timeline({ 
    paused: true,
    duration: 0.4,
    ease: "power2.inOut"
});

  // 1: rotar svg
  burgerTl.to(icon, {
    rotate: 180
  }, 0);

  // 2: X y giro
  burgerTl.to(topLine, {
    y: 4,
    rotate: 45,
    transformOrigin: "center center"
  }, 0); 

  burgerTl.to(bottomLine, {
    y: -4,
    rotate: -45,
    transformOrigin: "center center"
  }, 0); 

  burger.addEventListener("click", () => {
    if (!isOpen) {
      navTl.timeScale(1).play();
      burgerTl.timeScale(1).play();
    } else {
      navTl.timeScale(3).reverse();
      burgerTl.timeScale(3).reverse();
    }

    isOpen = !isOpen;
  });
});