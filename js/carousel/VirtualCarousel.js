export default class VirtualCarousel {
  constructor({
    container,
    data,
    createElement,
    visibleItems = 3,
    prevButton,
    nextButton,
    animationDuration = 400,
    loop = true,
    startX,
    endX,
  }) {
    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    this.data = data;
    this.createElement = createElement;

    this.visibleItems = visibleItems;
    this.prevButton = document.querySelector(prevButton);
    this.nextButton = document.querySelector(nextButton);

    this.animationDuration = animationDuration;
    this.loop = loop;

    this.currentIndex = 0;
    this.isAnimating = false;

    this.track = null;
    this.startX = 0;
    this.endX = 0;
    this.queue = [];
    this.init();
  }
  processQueue() {
    if (this.isAnimating) return;

    const action = this.queue.shift();

    if (action) action();
  }
  addTouchEvents() {
    this.container.addEventListener(
      "touchstart",
      (e) => {
        this.startX = e.touches[0].clientX;
      },
      { passive: true },
    );

    this.container.addEventListener(
      "touchend",
      (e) => {
        this.endX = e.changedTouches[0].clientX;

        const distance = this.startX - this.endX;

        if (Math.abs(distance) < 50) return;

        if (distance > 0) {
          this.queue.push(() => this.next());

          this.processQueue();
        } else {
          this.previous();
        }
      },
      { passive: true },
    );
  }
  addKeyboardEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.queue.push(() => this.next());

        this.processQueue();
      }

      if (e.key === "ArrowLeft") {
        this.previous();
      }
    });
  }
  init() {
    this.addKeyboardEvents();
    this.addTouchEvents();
    this.track = document.createElement("div");
    this.track.className = "carousel-track";

    this.container.appendChild(this.track);

    this.renderInitial();

    this.prevButton?.addEventListener("click", () => this.previous());
    this.nextButton?.addEventListener("click", () => this.next());
  }
  renderInitial() {
    const fragment = document.createDocumentFragment();

    for (let i = -1; i <= 3; i++) {
      const index =
        (this.currentIndex + i + this.data.length) % this.data.length;

      fragment.appendChild(this.createElement(this.data[index]));
    }

    this.track.appendChild(fragment);

    this.positionTrack();
  }
  positionTrack() {
    const card = this.track.children[1];

    const gap = parseFloat(getComputedStyle(this.track).gap) || 0;

    const distance = card.offsetWidth + gap;

    this.track.style.transform = `translateX(-${distance}px)`;
  }
  appendNextBuffer() {
    const nextIndex = (this.currentIndex + 4) % this.data.length;

    const card = this.createElement(this.data[nextIndex]);

    this.track.appendChild(card);
  }
  prependPreviousBuffer() {
    const lastCard = this.track.lastElementChild;

    const prevIndex =
      (this.currentIndex - 2 + this.data.length) % this.data.length;

    this.updateCard(lastCard, this.data[prevIndex]);

    this.track.prepend(lastCard);
  }
  removeLastCard() {
    this.track.lastElementChild.remove();
  }
  slideLeft() {
    const card = this.track.children[1];

    const gap = parseFloat(getComputedStyle(this.track).gap) || 0;

    const distance = card.offsetWidth + gap;

    const currentOffset = -distance;
    const nextOffset = -(distance * 2);

    requestAnimationFrame(() => {
      this.track.style.transform = `translateX(${nextOffset}px)`;
    });
  }
  slideRight() {
    const card = this.track.children[1];

    const gap = parseFloat(getComputedStyle(this.track).gap) || 0;

    const distance = card.offsetWidth + gap;

    // Instantly move left one extra card because we prepended
    this.track.style.transition = "none";
    this.track.style.transform = `translateX(-${distance * 2}px)`;

    this.track.offsetHeight; // Force reflow

    // Restore animation
    this.track.style.transition = `transform ${this.animationDuration}ms ease`;

    requestAnimationFrame(() => {
      this.track.style.transform = `translateX(-${distance}px)`;
    });
  }
  resetTrack() {
    this.track.style.transition = "none";

    this.positionTrack();

    this.track.offsetHeight;

    this.track.style.transition = `transform ${this.animationDuration}ms ease`;
  }
  removeFirstCard() {
    this.track.firstElementChild.remove();
  }
  next() {
    console.log("Clicked");
    console.log("Before:", this.isAnimating);

    if (this.isAnimating) return;

    this.isAnimating = true;

    console.log("Animating started");

    this.appendNextBuffer();
    this.slideLeft();

    this.track.addEventListener(
      "transitionend",
      () => {
        console.log("Transition ended");

        this.removeFirstCard();

        this.currentIndex = (this.currentIndex + 1) % this.data.length;

        this.resetTrack();

        this.isAnimating = false;

        console.log("Animating finished");

        this.prevButton.disabled = false;
        this.nextButton.disabled = false;
      },
      { once: true },
    );
  }
  previous() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.prevButton.disabled = true;
    this.nextButton.disabled = true;
    // Update index first
    this.currentIndex =
      (this.currentIndex - 1 + this.data.length) % this.data.length;

    // Add the new hidden card
    this.prependPreviousBuffer();

    // Animate right
    this.slideRight();

    this.track.addEventListener(
      "transitionend",
      () => {
        // Remove the far-right buffer card
        this.prevButton.disabled = false;
        this.nextButton.disabled = false;
        this.isAnimating = false;
      },
      { once: true },
    );
  }
  updateCard(card, member) {
    const newCard = this.createElement(member);

    card.innerHTML = newCard.innerHTML;
  }
}
