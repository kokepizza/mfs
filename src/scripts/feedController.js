// feedController.js
import { gsap } from 'gsap';

class FeedController {
  constructor() {
    this.currentIndex = 0;
    this.projects = [];
    
    this.init();
  }

  init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.thumbWrapper = document.querySelector('[data-thumbs]');
    this.thumbs = document.querySelectorAll('[data-thumb]');
    this.thumbMark = document.querySelector('.thumb-mark');
    this.projectTitle = document.querySelector('[data-project-title]');
    this.projectImages = document.querySelectorAll('[data-project-index]');
    
    // Obtener datos de los proyectos desde los elementos DOM
    this.projects = Array.from(this.thumbs).map((thumb, index) => ({
      name: thumb.alt,
      index: index
    }));

    this.bindEvents();
    this.updateActiveProject(0); // Sin parámetro de animación
  }

  bindEvents() {
    // Scroll en los thumbs
    this.thumbWrapper.addEventListener('scroll', 
      this.throttle(() => this.handleThumbScroll(), 16)
    );

    // Click en thumbs
    this.thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.scrollToThumb(index);
        this.updateActiveProject(index);
      });
    });
  }

  handleThumbScroll() {
    const markRect = this.thumbMark.getBoundingClientRect();
    const markCenter = markRect.left + markRect.width / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;

    this.thumbs.forEach((thumb, index) => {
      const thumbRect = thumb.getBoundingClientRect();
      const thumbCenter = thumbRect.left + thumbRect.width / 2;
      const distance = Math.abs(thumbCenter - markCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== this.currentIndex) {
      this.updateActiveProject(closestIndex);
    }
  }

  updateActiveProject(newIndex, animate = true) {
    if (newIndex === this.currentIndex) return;
    
    this.currentIndex = newIndex;

    // Actualizar clases activas en thumbs
    this.thumbs.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === newIndex);
    });

    // Actualizar título directamente
    if (this.projectTitle && this.projects[newIndex]) {
      this.projectTitle.textContent = this.projects[newIndex].name;
    }

    // Actualizar imagen principal directamente
    this.setActiveImage(newIndex);
  }

  setActiveImage(index) {
    this.projectImages.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  scrollToThumb(index) {
    const targetThumb = this.thumbs[index];
    if (!targetThumb) return;

    const thumbRect = targetThumb.getBoundingClientRect();
    const containerRect = this.thumbWrapper.getBoundingClientRect();
    const currentScroll = this.thumbWrapper.scrollLeft;
    
    const targetScroll = currentScroll + thumbRect.left - containerRect.left - 
                        (containerRect.width / 2) + (thumbRect.width / 2);

    gsap.to(this.thumbWrapper, {
      scrollLeft: targetScroll,
      duration: 0.5,
      ease: "power2.out"
    });
  }

  // Utility function para throttle
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Inicializar cuando se carga el script
new FeedController();