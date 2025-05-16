const NUM_PROJECTS = 12;

document.addEventListener("DOMContentLoaded", initAnimations);

function initAnimations() {
    console.log("pàgina carregada");

    blurTitle();
    infiniteScroll();

    // ajusta l'scroll per que comenci al segon bloc
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

    // duplica el contigut al principi en ordre invers i al final normal
    projects.slice(0, NUM_PROJECTS).reverse().forEach(project => {
        const cloneStart = project.cloneNode(true);
        feed.insertBefore(cloneStart, feed.firstChild);
    });
    projects.slice(0, NUM_PROJECTS).forEach(project => {
        const cloneEnd = project.cloneNode(true);
        feed.appendChild(cloneEnd);
    });

    // calcula l'alçada de tots els projectes originals i ajustar l'scroll per que comenci al segon bloc de projectes originals
    const originalProjects = Array.from(feed.children).slice(NUM_PROJECTS, NUM_PROJECTS * 2);
    const blockHeight = originalProjects.reduce((acc, el) => acc + el.offsetHeight, 0);

    feed.scrollTop = blockHeight;

    feed.addEventListener('scroll', () => {
        if (feed.scrollTop <= 0) {
            feed.scrollTop = blockHeight;
        } else if (feed.scrollTop >= feed.scrollHeight - feed.clientHeight) {
            feed.scrollTop = blockHeight - feed.clientHeight;
        }
    });
}
