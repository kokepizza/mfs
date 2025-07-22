import gsap from "gsap";

class FeedController {
  constructor() {
    this.currentIndex = 0;
    this.projects = [];

    this.touchStartX = 0;
    this.touchEndX = 0;

    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', () => this.setup())
      : this.setup();
  }

  setup() {
    this.thumbWrapper = document.querySelector('.thumb-wrapper');
    this.thumbSlider = document.querySelector('.thumb-slider');
    this.thumbs = document.querySelectorAll('[data-thumb]');
    this.projectTitle = document.querySelector('[data-project-title]');
    this.projectSubtitle = document.querySelector('[data-project-subtitle]');
    this.projectImages = document.querySelectorAll('[data-project-index]');

    this.projects = Array.from(this.thumbs).map((t, i) => ({
      name: t.alt,
      description: t.dataset.description,
      slug: t.dataset.slug,
      index: i,
    }));

    this.bindEvents();
    this.updateActiveProject(0);
  }

  bindEvents() {
    this.thumbWrapper.addEventListener(
      'scroll',
      this.throttle(() => this.handleThumbScroll(), 16)
    );

    this.thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => this.updateActiveProject(i));
    });

    window.addEventListener(
      'resize',
      this.throttle(() => this.handleThumbScroll(), 100)
    );

    this.bindSwipeEvents();
  }

  bindSwipeEvents() {
    const display = document.querySelector('[data-project-display]');
    if (!display) return;

    display.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.project-image.active')) return;
      this.touchStartX = e.changedTouches[0].screenX;
    });

    display.addEventListener('touchend', (e) => {
      if (!e.target.closest('.project-image.active')) return;
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const threshold = 50;

    if (this.touchEndX < this.touchStartX - threshold && this.currentIndex < this.projects.length - 1) {
      this.updateActiveProject(this.currentIndex + 1);
    }

    if (this.touchEndX > this.touchStartX + threshold && this.currentIndex > 0) {
      this.updateActiveProject(this.currentIndex - 1);
    }
  }

  handleThumbScroll() {
    const wrapperRect = this.thumbWrapper.getBoundingClientRect();
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;

    let closest = 0;
    let minDist = Infinity;

    this.thumbs.forEach((thumb, i) => {
      const thumbRect = thumb.getBoundingClientRect();
      const center = thumbRect.left + thumbRect.width / 2;
      const dist = Math.abs(center - wrapperCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    if (closest !== this.currentIndex) {
      this.currentIndex = closest;
      this.setActiveVisuals(closest);
    }
  }

  updateActiveProject(i) {
    if (i === this.currentIndex) return;
    this.currentIndex = i;
    this.setActiveVisuals(i);
    this.centerActiveThumb(i);
  }

  setActiveVisuals(i) {
    this.thumbs.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === i);
    });

    this.projectImages.forEach((img, idx) => {
      img.classList.toggle('active', idx === i);
    });

    if (this.projectTitle) {
      this.projectTitle.textContent = this.projects[i]?.name;
    }

    if (this.projectSubtitle) {
      this.projectSubtitle.textContent = this.projects[i]?.description || '';
    }
  }

  centerActiveThumb(i) {
    const thumb = this.thumbs[i];
    const wrapperWidth = this.thumbWrapper.offsetWidth;
    const scrollTarget =
      thumb.offsetLeft - wrapperWidth / 2 + thumb.offsetWidth / 2;

    // Desplazamos usando GSAP scrollLeft
    gsap.to(this.thumbWrapper, {
      scrollLeft: scrollTarget,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  throttle(fn, limit) {
    let wait = false;
    return (...args) => {
      if (!wait) {
        fn.apply(this, args);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    };
  }
}

new FeedController();