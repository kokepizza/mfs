console.log("pàgina carregada");

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ANIMACIÓ BLUR TITOL
let blurTimeout;
function handleBlur() {
    const MARC = document.querySelector(".title-name");
    if(MARC) {
        MARC.style.filter = "blur(0px)";
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(() => {
            MARC.style.filter = "";
        }, 100);
    }
}
window.addEventListener("wheel", handleBlur);
window.addEventListener("scroll", handleBlur);
window.addEventListener("touchmove", handleBlur);