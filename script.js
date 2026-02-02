document.addEventListener("DOMContentLoaded", () => {

const PASSWORD = "13022006";

/* 🔐 Lock screen */
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const errorText = document.getElementById("errorText");

/* 🎶 Background music */
const bgMusic = document.getElementById("bgMusic");

/* Sections */
const sections = [...document.querySelectorAll("section")];
let currentIndex = 0;

/* 🎵 Special song */
const specialSong = document.getElementById("specialSong");
const songToggleBtn = document.getElementById("songToggleBtn");

/* 🎧 Voice */
const voicePlayer = document.getElementById("voicePlayer");
const playBtns = document.querySelectorAll(".playBtn");

/* Final */
const openFinalBtn = document.getElementById("openFinalBtn");
const finalEnd = document.getElementById("finalEnd");
const dimOverlay = document.getElementById("dimOverlay");

/* Cake */
const cutBtn = document.getElementById("cutCakeBtn");
const cakeLeft = document.querySelector(".cake-left");
const cakeRight = document.querySelector(".cake-right");
const cakeName = document.getElementById("cakeName");
const smokes = document.querySelectorAll(".smoke");

/* Grandma */
const loveMessageSection = document.getElementById("loveMessageSection");
const toGrandmaBtn = document.getElementById("toGrandmaBtn");
const grandmaSection = document.getElementById("grandmaSection");

/* Floating particles */
const floatingContainer = document.getElementById("floating-container");

/* ---------------- UNLOCK ---------------- */
unlockBtn.onclick = () => {
  if (passwordInput.value === PASSWORD) {
    errorText.classList.add("hidden");

    bgMusic.volume = 0.35;
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});

    lockScreen.classList.add("lock-exit");

    setTimeout(() => {
      lockScreen.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.classList.add("main-show");
    }, 900);
  } else {
    errorText.classList.remove("hidden");
    lockScreen.classList.remove("shake");
    void lockScreen.offsetWidth;
    lockScreen.classList.add("shake");
  }
};

/* ---------------- INITIAL STATE ---------------- */
sections.forEach((sec, i) => {
  if (i !== 0) sec.classList.add("hidden");
});

/* ---------------- START BUTTON ---------------- */
document.getElementById("startBtn").onclick = () => {
  goToSection(1);
  initReveal("letterCard");
};

/* ---------------- SWIPE HANDLING ---------------- */
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", e => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", e => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const delta = touchStartY - touchEndY;
  const currentSection = sections[currentIndex];

  const scrollable = currentSection.scrollHeight > currentSection.clientHeight;

  const atTop =
    currentSection.scrollTop <= 2;

  const atBottom =
    !scrollable ||
    currentSection.scrollTop + currentSection.clientHeight >=
    currentSection.scrollHeight - 2;

  // Swipe UP → next section
  if (delta > 60 && atBottom) {
    swipeNext();
  }

  // Swipe DOWN → previous section
  if (delta < -60 && atTop) {
    swipePrev();
  }
}


/* ---------------- NAVIGATION ---------------- */
function goToSection(index) {
  if (index < 0 || index >= sections.length) return;

  sections[currentIndex].classList.add("hidden");
  currentIndex = index;
  sections[currentIndex].classList.remove("hidden");
  sections[currentIndex].scrollTop = 0;

  // Images animation
  if (sections[currentIndex].id === "imagesSection") {
    const imgs = document.querySelectorAll(".gallery img");
    imgs.forEach(img => img.classList.remove("show"));

    imgs.forEach((img, i) => {
      setTimeout(() => {
        img.classList.add("show");

        if (i === imgs.length - 1) {
          setTimeout(() => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
          }, 2000);
        }
      }, i * 2000);
    });
  }
}

function swipeNext() {
  // Stop swipe-based navigation after voice section
  if (sections[currentIndex].id === "voiceSection") return;
  if (sections[currentIndex].id === "cakeSection") return;
  if (sections[currentIndex].id === "grandmaSection") return;
  if (sections[currentIndex].id === "finalEnd") return;

  goToSection(currentIndex + 1);
}

function swipePrev() {
  if (currentIndex === 0) return;
  goToSection(currentIndex - 1);
}

/* ---------------- SONG ---------------- */
songToggleBtn.onclick = () => {
  bgMusic.pause();
  voicePlayer.pause();
  resetVoiceButtons();

  if (specialSong.paused) {
    specialSong.volume = 0.7;
    specialSong.play();
    songToggleBtn.textContent = "Pause ⏸️";
  } else {
    specialSong.pause();
    songToggleBtn.textContent = "Play ▶️";
  }
};

specialSong.onended = () => {
  songToggleBtn.textContent = "Play ▶️";
};

/* ---------------- VOICE ---------------- */
playBtns.forEach(btn => {
  btn.onclick = () => {
    const src = btn.dataset.audio;

    bgMusic.pause();
    specialSong.pause();
    songToggleBtn.textContent = "Play ▶️";

    if (voicePlayer.src.includes(src) && !voicePlayer.paused) {
      voicePlayer.pause();
      resetVoiceButtons();
      return;
    }

    resetVoiceButtons();
    voicePlayer.src = src;
    voicePlayer.volume = 0.8;
    voicePlayer.play();

    btn.textContent = "Pause ⏸️";
    btn.parentElement.classList.add("playing");
  };
});

voicePlayer.onended = resetVoiceButtons;

function resetVoiceButtons() {
  playBtns.forEach(b => {
    b.textContent = "Play ▶️";
    b.parentElement.classList.remove("playing");
  });
}

/* ---------------- CAKE ---------------- */
cutBtn.onclick = () => {
  cakeLeft.classList.add("cut-left");
  cakeRight.classList.add("cut-right");
  cakeName.classList.add("glow");

  smokes.forEach((s, i) => setTimeout(() => s.classList.add("show"), i * 200));

  setTimeout(() => {
    loveMessageSection.classList.remove("hidden");
    loveMessageSection.classList.add("show");
  }, 4200);
};

/* ---------------- GRANDMA ---------------- */
toGrandmaBtn.onclick = () => {
  goToSection(sections.indexOf(grandmaSection));
  initReveal("grandmaCard");
};

/* ---------------- FINAL ---------------- */
openFinalBtn.onclick = () => {
  dimOverlay.classList.add("active");
  goToSection(sections.indexOf(finalEnd));

  const end = Date.now() + 3500;
  (function blast() {
    confetti({
      particleCount: 90,
      spread: 180,
      startVelocity: 65,
      origin: { y: 0.6 }
    });
    if (Date.now() < end) requestAnimationFrame(blast);
  })();

  setTimeout(() => {
    finalEnd.classList.add("showFinal");
    dimOverlay.classList.remove("active");
  }, 3000);
};

/* ---------------- TEXT REVEAL ---------------- */
function initReveal(cardId) {
  const card = document.getElementById(cardId);
  if (!card || card.dataset.revealed) return;

  card.dataset.revealed = "true";
  const caret = card.querySelector(".caret");
  const content = card.querySelector(".text-content");
  const blocks = content.innerHTML.split("<br><br>");
  content.innerHTML = "";

  setTimeout(() => caret && caret.remove(), 2000);

  blocks.forEach((block, i) => {
    const line = document.createElement("div");
    line.className = "reveal-line";
    line.innerHTML = block;
    content.appendChild(line);
    setTimeout(() => line.classList.add("show"), 2200 + i * 700);
  });
}

/* ---------------- FLOATING PARTICLES ---------------- */
const particles = ["💖", "🎈", "✨", "💜", "🎉"];
setInterval(() => {
  const p = document.createElement("span");
  p.textContent = particles[Math.floor(Math.random() * particles.length)];
  p.style.left = Math.random() * 100 + "vw";
  p.style.fontSize = Math.random() * 22 + 16 + "px";
  p.style.animationDuration = Math.random() * 10 + 12 + "s";
  floatingContainer.appendChild(p);
  setTimeout(() => p.remove(), 20000);
}, 900);

});
