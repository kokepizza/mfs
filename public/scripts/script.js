console.log("pàgina carregada");

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ANIMACIÓ BLUR TITOL
window.addEventListener("wheel", () => {
    const MARC = document.querySelector(".title-name");
    if(MARC) {
        MARC.style.filter = "blur(0px)";
    }
});