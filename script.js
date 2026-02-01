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
  const nextWrapper = document.getElementById("nextWrapper");

  let currentIndex = 0;

  // 🔐 Unlock
  unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === PASSWORD) {
      lockScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    } else {
      errorText.classList.remove("hidden");
    }
  });

  // ▶️ Start Surprise
  startBtn.addEventListener("click", () => {
    currentIndex = 1;
    sections[currentIndex].classList.remove("hidden");

    startBtn.style.display = "none";
    nextWrapper.classList.remove("hidden");

    sections[currentIndex].after(nextWrapper);
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });
  });

  // ▶️ Next Surprise
  nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < sections.length) {
      sections[currentIndex].classList.remove("hidden");

      sections[currentIndex].after(nextWrapper);
      sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    } else {
      nextWrapper.style.display = "none";
    }
  });

});
