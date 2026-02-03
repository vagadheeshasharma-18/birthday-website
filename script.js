document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");

  // initial states
  line1.style.opacity = "0";
  line2.style.opacity = "0";

  line1.style.transition = "opacity 1s ease";
  line2.style.transition = "opacity 1s ease";

  // show first line
  setTimeout(() => {
    line1.style.opacity = "1";
  }, 1000);

  // show second line
  setTimeout(() => {
    line2.style.opacity = "1";
  }, 2500);
});
