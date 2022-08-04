const slides = document.querySelector(".slides"),
  slide = document.querySelectorAll(".slides li"),
  slideCount = slide.length,
  slideWidth = 200,
  slideMargin = 30,
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next"),
  dotBtn = document.querySelectorAll(".dot");

let currentIdx = 0;
let isPaused = false;

makeClone();

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    const cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    const cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  slide.forEach((e, i) => {
    if (e.dataset.idx === "1") {
      e.classList.add("current_slide");
    }
  });
  const cloneSlides = document.querySelectorAll(".clone");
  cloneSlides.forEach((e, i) => {
    if (e.dataset.idx === "1") {
      e.classList.add("current_slide");
    }
  });
  dotBtn.forEach((e, i) => {
    if (e.dataset.idx === "1") {
      e.classList.add("current_slide_dot");
    }
  });
  updateWidth();
  setInitialPos();
  setTimeout(() => {
    slides.classList.add("animated");
  }, 100);
}

function updateWidth() {
  const currentSlides = document.querySelectorAll(".slides li");
  const newSlideCount = currentSlides.length;
  const newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}

function setInitialPos() {
  const initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  slides.style.transform = `translateX(${
    initialTranslateValue + slideWidth + slideMargin
  }px)`;
}

function nextClick() {
  clearInterval(interval);
  clearTimeout(timeout);
  moveSlide(currentIdx + 1);
}

function prevClick() {
  clearInterval(interval);
  clearTimeout(timeout);
  moveSlide(currentIdx - 1);
}

nextBtn.addEventListener("click", nextClick);
nextBtn.addEventListener(
  "mouseup",
  () =>
    (timer = setTimeout(() => {
      interval = setInterval(() => {
        moveSlide(currentIdx + 1);
      }, 3000);
    }, 2000))
);
prevBtn.addEventListener("click", prevClick);
prevBtn.addEventListener(
  "mouseup",
  () =>
    (timer = setTimeout(() => {
      interval = setInterval(() => {
        moveSlide(currentIdx + 1);
      }, 3000);
    }, 2000))
);
slides.addEventListener("mouseover", () => clearInterval(interval));
slides.addEventListener(
  "mouseleave",
  () =>
    (timer = setTimeout(() => {
      interval = setInterval(() => {
        moveSlide(currentIdx + 1);
      }, 3000);
    }, 2000))
);

function moveSlide(num) {
  slides.style.left = `${-num * (slideWidth + slideMargin)}px`;
  currentIdx = num;
  slide.forEach((e, i) => {
    if (+e.dataset.idx === currentIdx + 1) {
      e.classList.add("current_slide");
    } else {
      e.classList.remove("current_slide");
    }
  });
  const cloneSlides = document.querySelectorAll(".clone");
  cloneSlides.forEach((e, i) => {
    if (+e.dataset.idx === currentIdx + 1) {
      e.classList.add("current_slide");
    } else {
      e.classList.remove("current_slide");
    }
  });
  dotBtn.forEach((e) => {
    if (+e.dataset.idx === currentIdx + 1) {
      e.classList.add("current_slide_dot");
    } else {
      e.classList.remove("current_slide_dot");
    }
  });
  if (currentIdx === slideCount || currentIdx === -slideCount) {
    setTimeout(() => {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
      slide.forEach((e, i) => {
        if (e.dataset.idx === "1") {
          e.classList.add("current_slide");
        }
      });
      const cloneSlides = document.querySelectorAll(".clone");
      cloneSlides.forEach((e, i) => {
        if (e.dataset.idx === "1") {
          e.classList.add("current_slide");
        }
      });
      dotBtn.forEach((e) => {
        if (+e.dataset.idx === currentIdx + 1) {
          e.classList.add("current_slide_dot");
        }
      });
    }, 500);
    setTimeout(() => {
      slides.classList.add("animated");
    }, 600);
  }
}
let interval;
let timeout;
timeout = setTimeout(() => {
  interval = setInterval(() => {
    moveSlide(currentIdx + 1);
  }, 3000);
}, 5000);

function changeCurrentDot({
  target: {
    dataset: { idx },
  },
}) {
  clearInterval(interval);
  clearTimeout(timeout);
  moveSlide(+idx - 1);
}

dotBtn.forEach((e) => {
  e.addEventListener("click", changeCurrentDot);
  e.addEventListener("mouseup", () =>
    setTimeout(() => {
      interval = setInterval(() => {
        moveSlide(currentIdx + 1);
      }, 3000);
    }, 2000)
  );
});
