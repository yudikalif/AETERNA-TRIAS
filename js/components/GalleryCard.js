export function createGalleryCard(item) {
  const card = document.createElement("div");

  card.className = "galleryCard";

  card.innerHTML = `
    <img
      src="${item.image}"
      alt="Gallery image ${item.id}"
      draggable="false"
    />
  `;

  const image = card.querySelector("img");

  image.addEventListener("click", () => {
    openImage(item.image);
  });

  return card;
}

function openImage(imageSrc) {
  const overlay = document.createElement("div");

  overlay.className = "imageViewer";

  overlay.innerHTML = `
    <button class="imageViewerClose">&times;</button>

    <img
      src="${imageSrc}"
      alt="Full size gallery image"
    />
  `;

  document.body.appendChild(overlay);

  const closeButton = overlay.querySelector(".imageViewerClose");

  closeButton.addEventListener("click", () => {
    overlay.remove();
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.remove();
    }
  });
}
