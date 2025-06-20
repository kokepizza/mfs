import { useEffect } from "react";

const GalleryWrapper = () => {
  useEffect(() => {
    const wrapper = document.querySelector(".projects-wrapper");
    const cards = document.querySelectorAll(".project-card");
    const gallery = document.getElementById("gallery") as HTMLElement;
    const titleLink = document.getElementById("project-link") as HTMLAnchorElement;
    const markX = window.innerWidth / 2;

    const updateCard = () => {
      let found = false;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const left = rect.left;
        const right = rect.right;

        const isOver = markX >= left && markX <= right;

        if (isOver && !found && gallery && titleLink) {
          card.classList.add("active");

          const imageURL = card.getAttribute("data-image");
          const name = card.getAttribute("data-name");
          const slug = card.getAttribute("data-slug");

          if (imageURL) gallery.style.backgroundImage = `url('${imageURL}')`;
          if (name && slug) {
            titleLink.href = slug;
            titleLink.innerHTML = `<h2>${name} ↗</h2>`;
          }

          found = true;
        } else {
          card.classList.remove("active");
        }
      });
    };

    const scrollToEnd = () => {
      if (wrapper) {
        wrapper.scrollTo({
          left: wrapper.scrollWidth,
          behavior: "auto",
        });
      }
    };

    setTimeout(() => {
      scrollToEnd();
      updateCard();
    }, 100);

    wrapper?.addEventListener("scroll", () => {
      requestAnimationFrame(updateCard);
    });

    window.addEventListener("load", updateCard);

    return () => {
      wrapper?.removeEventListener("scroll", updateCard);
      window.removeEventListener("load", updateCard);
    };
  }, []);

  return null;
};

export default GalleryWrapper;