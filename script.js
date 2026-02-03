/* =====================================================
   GLOBAL SECTION CONTROL
===================================================== */
const sections = document.querySelectorAll(".section");
let currentIndex = 0;

function showSection(index) {
  sections.forEach(section => section.classList.remove("active"));
  sections[index].classList.add("active");
  window.scrollTo(0, 0);
}

/* =====================================================
   ENTRY / PASSWORD SECTION
===================================================== */
const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("password");
const errorText = document.getElementById("error");

const CORRECT_PASSWORD = "13022006";

let bgMusic = null;

unlockBtn.addEventListener("click", () => {
  const entered = passwordInput.value.trim();

  if (entered === CORRECT_PASSWORD) {
    errorText.innerText = "";

    bgMusic = new Audio("assets/audio/bg-music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.6;
    bgMusic.play();

    currentIndex = 1;
    showSection(currentIndex);
  } else {
    errorText.innerText = "Oops 👀";
    passwordInput.classList.add("shake");
    setTimeout(() => {
      passwordInput.classList.remove("shake");
    }, 400);
  }
});

/* =====================================================
   NEXT BUTTON NAVIGATION
===================================================== */
const nextButtons = document.querySelectorAll(".next");

nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentIndex++;
    showSection(currentIndex);
  });
});

/* =====================================================
   IMAGES SLIDESHOW (15 IMAGES, 2s EACH)
===================================================== */
const slideshow = document.getElementById("slideshow");
let imgIndex = 1;
const TOTAL_IMAGES = 15;

if (slideshow) {
  setInterval(() => {
    imgIndex++;
    if (imgIndex > TOTAL_IMAGES) imgIndex = 1;
    slideshow.src = `assets/images/img${imgIndex}.jpg`;
  }, 2000);
}

/* =====================================================
   VIDEO SECTION
   - Background music STOPS after Continue
===================================================== */
const videoContinueBtn = document.querySelector("#video .next");

if (videoContinueBtn) {
  videoContinueBtn.addEventListener("click", () => {
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic = null;
    }
  });
}

/* =====================================================
   SONG SECTION
   - Only song audio (handled by browser)
===================================================== */

/* =====================================================
   VOICE NOTES SECTION
   - Only voice audios (handled by browser)
===================================================== */

/* =====================================================
   CAKE CUTTING SECTION
===================================================== */
const cutCakeBtn = document.getElementById("cutCake");
const wishText = document.getElementById("wish");
const cakeNextBtn = document.querySelector("#cake .next");

if (cutCakeBtn) {
  cutCakeBtn.addEventListener("click", () => {
    wishText.innerText = "Make a wish 💖";

    const cheerSound = new Audio("assets/audio/cheer.mp3");
    cheerSound.volume = 0.9;
    cheerSound.play();

    cakeNextBtn.classList.remove("hidden");
  });
}

/* =====================================================
   FUN MINI GAME SECTION
===================================================== */
const funBtn = document.getElementById("funBtn");
const funText = document.getElementById("funText");
const funNextBtn = document.querySelector("#fun .next");

if (funBtn) {
  funBtn.addEventListener("click", () => {
    const lines = [
      "Okay okay… you’re officially too cute 😌",
      "No escape… you’re special 😏",
      "Yep. Confirmed. Best human ever 💖"
    ];

    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    funText.innerText = randomLine;

    funNextBtn.classList.remove("hidden");
  });
}

/* =====================================================
   GRANDMA SECTION
   - No JS logic (intentional silence & respect)
===================================================== */

/* =====================================================
   FINAL SECTION
   - No JS logic (quiet ending)
===================================================== */

/* =====================================================
   INITIAL LOAD
===================================================== */
showSection(0);
