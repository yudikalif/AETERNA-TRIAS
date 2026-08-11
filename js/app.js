import gallery from "./data/gallery.js";
import { createGalleryCard } from "./components/GalleryCard.js";
import members from "./data/members.js";
import { createMemberCard } from "./components/MemberCard.js";
import VirtualCarousel from "./carousel/VirtualCarousel.js";

document.addEventListener("DOMContentLoaded", () => {
  new VirtualCarousel({
    container: "#membersCarousel",
    data: members,
    createElement: createMemberCard,
    prevButton: ".nextButtonLeft",
    nextButton: ".nextButtonRight",
    visibleItems: 3,
    animationDuration: 400,
  });
});
new VirtualCarousel({
  container: "#galleryCarousel",
  data: gallery,
  createElement: createGalleryCard,
  prevButton: ".galleryButtonLeft",
  nextButton: ".galleryButtonRight",
  visibleItems: 3,
  animationDuration: 400,
});
const menuButton = document.querySelector("#menuButton");
const mobileMenu = document.querySelector("#mobileMenu");

menuButton?.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  const icon = menuButton.querySelector("i");

  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});
