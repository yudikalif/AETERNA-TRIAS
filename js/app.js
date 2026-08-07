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
