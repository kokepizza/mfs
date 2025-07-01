import { gsap } from "gsap";

class SubtitleAndSvgAnimation {
  constructor() {
    this.subtitleVisible = false;
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', () => this.setup())
      : this.setup();
  }

  setup() {
    this.projectTitleWrapper = document.querySelector('.project-title-wrapper');
    this.subtitle = document.querySelector('[data-project-subtitle]');
    this.svg = this.projectTitleWrapper?.querySelector('svg');

    if (!this.subtitle || !this.svg) return;

    this.firstRect = this.svg.querySelector('rect[x="3"]');
    if (!this.firstRect) return;

    gsap.set(this.subtitle, { y: 20, opacity: 0 });

    this.svgTimeline = gsap.timeline({ paused: true, reversed: true });
    this.svgTimeline.to(this.svg, { rotation: 360, transformOrigin: "50% 50%", duration: 1, ease: "power2.inOut" }, 0);
    this.svgTimeline.to(this.firstRect, { opacity: 0, duration: 1, ease: "power2.inOut" }, 0);

    this.svg.style.cursor = 'pointer';

    this.svg.addEventListener('click', () => {
      if (!this.subtitleVisible) {
        gsap.to(this.subtitle, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
        this.svgTimeline.play();
      } else {
        gsap.to(this.subtitle, { y: 20, opacity: 0, duration: 0.5, ease: "power2.in" });
        this.svgTimeline.reverse();
      }
      this.subtitleVisible = !this.subtitleVisible;
    });
  }
}

new SubtitleAndSvgAnimation();