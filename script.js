document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll("section");
  const galleryGrid = document.getElementById("galleryGrid");

  const fakeYT = document.getElementById("fakeYT");
  const fakePlay = document.getElementById("fakePlay");
  const lockScreen = document.getElementById("lockScreen");
  const unlockBtn = document.getElementById("unlockBtn");
  const passwordInput = document.getElementById("passwordInput");
  const errorText = document.getElementById("errorText");

  const mainContent = document.getElementById("mainContent");
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");

  const musicBtn = document.getElementById("musicBtn");
  const music = document.getElementById("bgMusic");

  const revealBtn = document.getElementById("revealBtn");
  const secretText = document.getElementById("secretText");
  const timer = document.getElementById("timer");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");

  let index = 0;
  let playing = false;
  const CORRECT_PASSWORD = "13022006";

  /* AUTO LOAD IMAGES (1 to 20 supported) */
  for (let i = 1; i <= 20; i++) {
    const img = document.createElement("img");
    img.src = `images/photo${i}.jpg`;
    img.onerror = () => img.remove();
    img.onclick = () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
    };
    galleryGrid.appendChild(img);
  }

  closeLightbox.onclick = () => {
    lightbox.classList.add("hidden");
  };

  fakePlay.onclick = () => {
    fakeYT.style.display = "none";
    lockScreen.classList.remove("hidden");
  };

  unlockBtn.onclick = () => {
    if (passwordInput.value === CORRECT_PASSWORD) {
      lockScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    } else {
      errorText.classList.remove("hidden");
      passwordInput.value = "";
    }
  };

  musicBtn.onclick = () => {
    playing ? music.pause() : music.play();
    playing = !playing;
  };

  startBtn.onclick = () => {
    index = 1;
    sections[index].classList.remove("hidden");
    sections[index].after(nextBtn);
    nextBtn.classList.remove("hidden");
    startBtn.style.display = "none";
    sections[index].scrollIntoView({ behavior: "smooth" });
  };

  nextBtn.onclick = () => {
    index++;
    if (index < sections.length) {
      sections[index].classList.remove("hidden");
      sections[index].after(nextBtn);
      sections[index].scrollIntoView({ behavior: "smooth" });
    } else {
      nextBtn.style.display = "none";
    }
  };

  revealBtn.onclick = () => {
    secretText.classList.remove("hidden");
    revealBtn.style.display = "none";
  };

  const target = new Date("Feb 13, 2026 00:00:00").getTime();
  setInterval(() => {
    const diff = target - Date.now();
    timer.textContent =
      diff <= 0
        ? "🎉 HAPPY BIRTHDAY 🎉"
        : Math.floor(diff / 86400000) + " Days";
  }, 1000);
});
