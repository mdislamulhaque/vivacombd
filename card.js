// document.getElementById("toggleButton").addEventListener("click", function () {
//   const text = document.getElementById("text");
//   if (text.classList.contains("line-clamp-6")) {
//     text.classList.remove("line-clamp-6");
//     this.textContent = "Show Less";
//   } else {
//     text.classList.add("line-clamp-6");
//     this.textContent = "Show More";
//   }
// });

document.querySelectorAll(".toggleButton").forEach((button) => {
  button.addEventListener("click", function () {
    const text = this.previousElementSibling;
    if (text.classList.contains("line-clamp-6")) {
      text.classList.remove("line-clamp-6");
      this.textContent = "Show Less";
    } else {
      text.classList.add("line-clamp-6");
      this.textContent = "Show More";
    }
  });
});
