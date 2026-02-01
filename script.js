document.addEventListener("DOMContentLoaded", () => {

  const PASSWORD = "13022006";

  const lockScreen = document.getElementById("lockScreen");
  const mainContent = document.getElementById("mainContent");
  const unlockBtn = document.getElementById("unlockBtn");
  const passwordInput = document.getElementById("passwordInput");
  const errorText = document.getElementById("errorText");

  const sections = document.querySelectorAll("section");
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");

  let index = 0;

  // Unlock
  unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === PASSWORD) {
      lockScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    } else {
      errorText.classList.remove("hidden");
    }
  });

  // Start
  startBtn.addEventListener("click", () => {
    index = 1;
    sections[index].classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    startBtn.style.display = "none";
  });

  // Next Surprise
  nextBtn.addEventListener("click", () => {
    index++;
    if (index < sections.length) {
      sections[index].classList.remove("hidden");
    } else {
      nextBtn.style.display = "none";
    }
  });

});
