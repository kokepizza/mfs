import { useEffect } from "react";

const GalleryWrapper = () => {
  useEffect(() => {
    const wrapper = document.querySelector(".projects-wrapper");
    const cards = document.querySelectorAll(".project-card");
    const gallery = document.querySelector(".gallery") as HTMLElement;
    const markX = window.innerWidth / 2;

    const updateCard = () => {
      let found = false;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const left = rect.left;
        const right = rect.right;

        const isOver = markX >= left && markX <= right;

        if (isOver && !found && gallery) {
        card.classList.add("active");
        const imageURL = card.getAttribute("data-image");
        if (imageURL) {
            gallery.style.backgroundImage = `url('${imageURL}')`;
        }
        found = true;
        } else {
          card.classList.remove("active");
        }
      });
    };

    wrapper?.addEventListener("scroll", () => {
      requestAnimationFrame(updateCard);
    });

    window.addEventListener("load", updateCard);
    updateCard();

    return () => {
      wrapper?.removeEventListener("scroll", updateCard);
      window.removeEventListener("load", updateCard);
    };
  }, []);

  return null;
};

export default GalleryWrapper;