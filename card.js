document.querySelectorAll(".toggleButton").forEach((button) => {
  const text = button.previousElementSibling;
  const paraHeight = text.offsetHeight;
  const lineHeight = parseInt(window.getComputedStyle(text).lineHeight, 10);

  // Calculate the number of lines by dividing height by line height
  const lineCount = paraHeight / lineHeight;

  console.log(lineCount); // For debugging, see the calculated line count

  // Hide the button if the paragraph has less than 6 lines
  if (lineCount < 5) {
    button.classList.add("hidden");
  } else {
    button.classList.remove("hidden");
  }
});

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
