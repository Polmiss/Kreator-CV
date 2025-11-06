const slidesContainer = document.querySelector(".slides");
let slides = Array.from(document.querySelectorAll(".sliderElement"));
const dots = Array.from(document.querySelectorAll(".dot"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const slideWidth = 340;
const slideGap = 30;
const totalSlides = slides.length;

let currentIndex = Math.floor(totalSlides / 2);
let isAnimating = false;

// 🔹 Pozycjonowanie slajdów
function positionSlides(animate = true) {
  const middle = Math.floor(totalSlides / 2);
  const totalWidth = slideWidth + slideGap;

  slides.forEach((slide, index) => {
    const offset = (index - middle) * totalWidth;
    slide.style.transition = animate
      ? "transform 0.4s ease, box-shadow 0.4s ease"
      : "none";
    slide.style.transform = `translateX(${offset}px) scale(${
      index === middle ? 1.08 : 1
    })`;
    slide.style.zIndex = index === middle ? 5 : 1;
    slide.style.boxShadow =
      index === middle ? "0 4px 12px rgba(0,0,0,0.15)" : "none";
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// 🔹 Przesunięcie w prawo
function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;

  const movingSlide = slides[0];

  // Ukryj element podczas przelotu
  movingSlide.style.transition = "opacity 0.15s ease";
  movingSlide.style.opacity = "0";

  // Przesuń wizualnie resztę
  const first = slides.shift();
  slides.push(first);
  positionSlides(true);

  setTimeout(() => {
    // Przenieś w DOM po animacji
    slidesContainer.appendChild(movingSlide);

    // Przywróć widoczność po przelocie
    movingSlide.style.transition = "opacity 0.15s ease";
    movingSlide.style.opacity = "1";

    currentIndex = (currentIndex + 1) % totalSlides;
    isAnimating = false;
  }, 400);
}

// 🔹 Przesunięcie w lewo
function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;

  const movingSlide = slides[slides.length - 1];

  movingSlide.style.transition = "opacity 0.15s ease";
  movingSlide.style.opacity = "0";

  const last = slides.pop();
  slides.unshift(last);
  positionSlides(true);

  setTimeout(() => {
    slidesContainer.prepend(movingSlide);

    movingSlide.style.transition = "opacity 0.15s ease";
    movingSlide.style.opacity = "1";

    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    isAnimating = false;
  }, 400);
}

// 🔹 Eventy
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// 🔹 Start
positionSlides(false);
