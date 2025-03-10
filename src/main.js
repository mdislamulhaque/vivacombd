const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mainMenu = document.getElementById("mainMenu");
const logo = document.getElementById("logo");
const btn = document.getElementById("btn");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

mainMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// document.getElementById("btn").addEventListener("click", (event) => {
//   event.preventDefault("active"); // Prevent default behavior
//   console.log("Button clicked, no reload.");
// });

// location.reload();
// window.location.href = window.location.href;

// links2.addEventListener("click", () => {
//   mobileMenu.classList.toggle("hidden");
// });

// slide============================

// const slider = document.getElementById("slider");
// const slides = document.querySelectorAll("#slider > div");
// const prevButton = document.getElementById("prev");
// const nextButton = document.getElementById("next");

// let currentIndex = 0;

// function updateSliderPosition() {
//   const offset = -currentIndex * 100; // Translate the slider to show the current image
//   slider.style.transform = `translateX(${offset}%)`;
// }

// prevButton.addEventListener("click", () => {
//   currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
//   updateSliderPosition();
// });

// nextButton.addEventListener("click", () => {
//   currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
//   updateSliderPosition();
// });

// // Automatically slide every 3 seconds
// setInterval(updateSliderPosition, 3000);

// ==================================
// ================automatic slider=============================================

const slider = document.getElementById("slider");
const slides = slider.children;
const totalSlides = slides.length;
let currentSlide = 0;

function showSlide(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

function autoSlide(index) {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Automatically slide every 3 seconds
setInterval(autoSlide, 3000);
