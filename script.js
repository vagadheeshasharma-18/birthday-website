document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SECTION 1 ELEMENTS
  =============================== */
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const password = document.getElementById("password");
  const hint = document.querySelector(".hint");
  const button = document.getElementById("unlockBtn");
  const volume = document.querySelector(".volume");
  const error = document.getElementById("error");
  const entry = document.getElementById("entry");

  /* ===============================
     SECTION 2 ELEMENTS
  =============================== */
  const letterSection = document.getElementById("letter-section");
  const envelope = document.getElementById("envelope");
  const letterPaper = document.getElementById("letter-paper");
  const letterContent = document.getElementById("letter-content");

  const CORRECT_PASSWORD = "13022006";
  let bgMusic;
  let envelopeOpened = false;

  /* ===============================
     SECTION 1 INITIAL STATE
  =============================== */
  [line1, line2, password, hint, button, volume, error].forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "opacity 1s ease";
  });

  /* ===============================
     SECTION 1 TIMELINE
  =============================== */
  setTimeout(() => line1.style.opacity = "1", 1000);
  setTimeout(() => line2.style.opacity = "1", 2500);

  setTimeout(() => {
    password.style.opacity = "1";
    hint.style.opacity = "1";
    button.style.opacity = "1";
    volume.style.opacity = "1";
  }, 4000);

  /* ===============================
     PASSWORD CHECK
  =============================== */
  button.addEventListener("click", () => {
    const entered = password.value.trim();
    error.style.opacity = "1";

    if (entered !== CORRECT_PASSWORD) {
      error.textContent = "Oops 👀";
      error.style.color = "#ffb3b3";
      password.classList.add("shake");
      setTimeout(() => password.classList.remove("shake"), 400);
      return;
    }

    error.textContent = "Unlocked 💖";
    error.style.color = "#b2ffda";
    button.textContent = "Unlocking…";

    bgMusic = new Audio("./bg-music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {});

    entry.style.transition = "opacity 1.2s ease";
    entry.style.opacity = "0";

    setTimeout(() => {
      entry.style.display = "none";
      letterSection.classList.remove("hidden");
      letterSection.classList.add("active");
    }, 1200);
  });

  /* ===============================
     LOAD LETTER.TXT
  =============================== */
  async function loadLetterText() {
  const response = await fetch("./letter.txt");
  const text = await response.text();
  console.log("LETTER LOADED:", text);
  return text;
}


  /* ===============================
     TYPEWRITER EFFECT
  =============================== */
  async function startTypewriter() {
    const text = await loadLetterText();
    letterContent.textContent = "";

    let index = 0;
    const speed = 35;

    function typeChar() {
      if (index < text.length) {
        letterContent.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, speed);
      }
    }

    typeChar();
  }

  /* ===============================
     ENVELOPE OPEN
  =============================== */
  envelope.addEventListener("click", () => {
    if (envelopeOpened) return;
    envelopeOpened = true;

    envelope.classList.add("open");

    const tapText = document.querySelector(".tap-text");
    if (tapText) tapText.style.opacity = "0";

    setTimeout(() => {
      letterPaper.classList.remove("hidden");
      letterPaper.classList.add("show");
      startTypewriter();
    }, 800);
  });

});
