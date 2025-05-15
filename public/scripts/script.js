const NUM_PROJECTS = 12;

document.addEventListener("DOMContentLoaded", initAnimations);

function initAnimations() {
    console.log("pàgina carregada");

    blurTitle();
    infiniteScroll();

    // Ajusta el scroll al cargar la página para empezar en el segundo bloque
    const feed = document.querySelector('.feed');
    if (feed) {
        const firstBlock = Array.from(feed.querySelectorAll('.feed-grid')).slice(0, NUM_PROJECTS);
        const blockHeight = firstBlock.reduce((acc, el) => acc + el.offsetHeight, 0);
        feed.scrollTop = blockHeight;
    }
}

// Blur del títol
function blurTitle() {
    let blurTimeout;
    function handleBlur() {
        const MARC = document.querySelector(".title-name");
        if(MARC) {
            MARC.style.filter = "blur(0px)";
            clearTimeout(blurTimeout);
            blurTimeout = setTimeout(() => {
                MARC.style.filter = "";
            }, 300);
        }
    }

    window.addEventListener("wheel", handleBlur);
    window.addEventListener("scroll", handleBlur);
    window.addEventListener("touchmove", handleBlur);
}

// Scroll infinit
function infiniteScroll() {
    const feed = document.querySelector('.feed');
    if (!feed) return;

    const projects = Array.from(feed.children);
    const totalProjects = NUM_PROJECTS;

    // Duplicar contenido al inicio en orden inverso y al final en orden normal
    projects.slice(0, totalProjects).reverse().forEach(project => {
        const cloneStart = project.cloneNode(true);
        feed.insertBefore(cloneStart, feed.firstChild);
    });
    projects.slice(0, totalProjects).forEach(project => {
        const cloneEnd = project.cloneNode(true);
        feed.appendChild(cloneEnd);
    });

    // Calcular la altura de todos los proyectos originales
    const originalProjects = Array.from(feed.children).slice(totalProjects, totalProjects * 2);
    const blockHeight = originalProjects.reduce((acc, el) => acc + el.offsetHeight, 0);

    // Establecer scroll inicial al inicio del contenido original
    feed.scrollTop = blockHeight;

    // Escuchar el scroll para hacer el loop infinito
    feed.addEventListener('scroll', () => {
        if (feed.scrollTop <= 0) {
            feed.scrollTop = blockHeight;
        } else if (feed.scrollTop >= feed.scrollHeight - feed.clientHeight) {
            feed.scrollTop = blockHeight - feed.clientHeight;
        }
    });
}