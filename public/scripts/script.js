console.log("pàgina carregada");

// ANIMACIÓ BLUR TITOL
let blurTimeout;
function handleBlur() {
    const MARC = document.querySelector(".title-name");
    if(MARC) {
        MARC.style.filter = "blur(0px)";
        MARC.style.overflow = "hidden";
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(() => {
            MARC.style.filter = "";
            MARC.style.overflow = "visible";
        }, 300);
    }
}
window.addEventListener("wheel", handleBlur);
window.addEventListener("scroll", handleBlur);
window.addEventListener("touchmove", handleBlur);