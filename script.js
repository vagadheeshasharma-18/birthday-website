document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll("section");
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const unlockBtn = document.getElementById("unlockBtn");
  const lockScreen = document.getElementById("lockScreen");
  const mainContent = document.getElementById("mainContent");
  const revealBtn = document.getElementById("revealBtn");
  const secretText = document.getElementById("secretText");
  const timer = document.getElementById("timer");
  const heartContainer = document.querySelector(".floating-hearts");

  let currentSection = 0;
  let isPlaying = false;

  // LOCK
  unlockBtn.onclick = () => {
    lockScreen.style.display = "none";
    mainContent.classList.remove("hidden");
  };

  // MUSIC
  musicBtn.onclick = () => {
    if (!isPlaying) {
      music.play();
      musicBtn.textContent = "⏸ Pause Music";
    } else {
      music.pause();
      musicBtn.textContent = "🎶 Play Music";
    }
    isPlaying = !isPlaying;
  };

  // START
  startBtn.onclick = () => {
    currentSection = 1;
    sections[currentSection].classList.remove("hidden");
    startBtn.style.display = "none";
    nextBtn.classList.remove("hidden");

    confetti({ particleCount: 200, spread: 120 });
  };

  // NEXT
  nextBtn.onclick = () => {
    currentSection++;
    if (currentSection < sections.length) {
      sections[currentSection].classList.remove("hidden");
    } else {
      nextBtn.style.display = "none";
    }
  };

  // SECRET
  revealBtn.onclick = () => {
    secretText.classList.remove("hidden");
    revealBtn.style.display = "none";
  };

  // COUNTDOWN
  const birthdayDate = new Date("February 13, 2026 12:00:00 AM").getTime();
  setInterval(() => {
    const diff = birthdayDate - Date.now();
    if (diff <= 0) {
      timer.textContent = "🎉 HAPPY BIRTHDAY MADIHA TABASSUM 🎂💖";
      confetti({ particleCount: 300, spread: 160 });
      return;
    }
    timer.textContent =
      `${Math.floor(diff/86400000)}d ` +
      `${Math.floor(diff/3600000)%24}h ` +
      `${Math.floor(diff/60000)%60}m`;
  }, 1000);

  // HEARTS
  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = Math.random() > 0.5 ? "💖" : "✨";
    heart.style.left = Math.random() * 100 + "vw";
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 600);
});
