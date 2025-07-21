class FeedController {
  constructor() {
    this.currentIndex = 0;
    this.projects = [];
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', () => this.setup())
      : this.setup();
  }

  setup() {
    this.thumbWrapper = document.querySelector('[data-thumbs]');
    this.thumbs = document.querySelectorAll('[data-thumb]');
    this.projectTitle = document.querySelector('[data-project-title]');
    this.projectSubtitle = document.querySelector('[data-project-subtitle]');
    this.projectImages = document.querySelectorAll('[data-project-index]');
    this.projects = Array.from(this.thumbs).map((t, i) => ({ 
      name: t.alt, 
      description: t.dataset.description,
      slug: t.dataset.slug,
      index: i 
    }));
    this.bindEvents();
    this.updateActiveProject(0);
  }

  bindEvents() {
    // Siempre usamos thumbWrapper como target del scroll
    this.thumbWrapper.addEventListener('scroll', this.throttle(() => this.handleThumbScroll(), 16));

    this.thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => this.updateActiveProject(i));
    });

    window.addEventListener('resize', this.throttle(() => this.handleThumbScroll(), 100));
  }

  handleThumbScroll() {
    const wrapperRect = this.thumbWrapper.getBoundingClientRect();
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;

    let closest = 0, minDist = Infinity;

    this.thumbs.forEach((thumb, i) => {
      const thumbRect = thumb.getBoundingClientRect();
      const center = thumbRect.left + thumbRect.width / 2;

      const dist = Math.abs(center - wrapperCenter);
      if (dist < minDist) [minDist, closest] = [dist, i];
    });

    if (closest !== this.currentIndex) this.updateActiveProject(closest);
  }

  updateActiveProject(i) {
    if (i === this.currentIndex) return;
    this.currentIndex = i;
    this.thumbs.forEach((thumb, idx) => thumb.classList.toggle('active', idx === i));
    if (this.projectTitle) this.projectTitle.textContent = this.projects[i]?.name;
    if (this.projectSubtitle) this.projectSubtitle.textContent = this.projects[i]?.description || '';
    this.projectImages.forEach((img, idx) => img.classList.toggle('active', idx === i));
  }

  throttle(fn, limit) {
    let wait = false;
    return (...args) => {
      if (!wait) {
        fn.apply(this, args);
        wait = true;
        setTimeout(() => (wait = false), limit);
      }
    };
  }
}

new FeedController();