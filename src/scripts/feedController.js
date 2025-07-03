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
      index: i 
    }));
    this.bindEvents();
    this.updateActiveProject(0);
  }

  bindEvents() {
    const scrollTarget = window.innerWidth >= 1024 ? window : this.thumbWrapper;

    scrollTarget.addEventListener('scroll', this.throttle(() => this.handleThumbScroll(), 16));

    this.thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => this.updateActiveProject(i));
    });

    window.addEventListener('resize', this.throttle(() => this.handleThumbScroll(), 100));

    if (window.innerWidth < 1024) {
      this.addTouchEvents();
    }
  }

  addTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    const threshold = 50;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipeGesture(touchStartX, touchEndX);
    }, { passive: true });
  }

  handleSwipeGesture(startX, endX) {
    const deltaX = endX - startX;

    if (Math.abs(deltaX) < 50) return;

    if (deltaX < 0 && this.currentIndex < this.projects.length - 1) {
      this.updateActiveProject(this.currentIndex + 1);
    } else if (deltaX > 0 && this.currentIndex > 0) {
      this.updateActiveProject(this.currentIndex - 1);
    }
  }

  handleThumbScroll() {
    const isDesktop = window.innerWidth >= 1024;
    const wrapperRect = this.thumbWrapper.getBoundingClientRect();

    const wrapperCenter = isDesktop
      ? window.innerHeight / 2
      : wrapperRect.left + wrapperRect.width / 2;

    let closest = 0, minDist = Infinity;

    this.thumbs.forEach((thumb, i) => {
      const thumbRect = thumb.getBoundingClientRect();
      const center = isDesktop
        ? thumbRect.top + thumbRect.height / 2
        : thumbRect.left + thumbRect.width / 2;

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

    const activeThumb = this.thumbs[i];
    if (activeThumb && this.thumbWrapper) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        inline: window.innerWidth < 1024 ? 'center' : 'nearest',
        block: window.innerWidth >= 1024 ? 'center' : 'nearest'
      });
    }
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