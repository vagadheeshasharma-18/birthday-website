document.addEventListener("DOMContentLoaded",()=>{

const PASSWORD="13022006";

const lockScreen=document.getElementById("lockScreen");
const mainContent=document.getElementById("mainContent");
const unlockBtn=document.getElementById("unlockBtn");
const passwordInput=document.getElementById("passwordInput");
const errorText=document.getElementById("errorText");

const sections=document.querySelectorAll("section");
const startBtn=document.getElementById("startBtn");
const nextBtn=document.getElementById("nextBtn");
const nextWrapper=document.getElementById("nextWrapper");

const music=document.getElementById("bgMusic");
const openFinalBtn=document.getElementById("openFinalBtn");
const finalEnd=document.getElementById("finalEnd");
const dimOverlay=document.getElementById("dimOverlay");

const floatingContainer=document.getElementById("floating-container");

const cutBtn=document.getElementById("cutCakeBtn");
const cakeLeft=document.querySelector(".cake-left");
const cakeRight=document.querySelector(".cake-right");
const cakeName=document.getElementById("cakeName");
const smokes=document.querySelectorAll(".smoke");

const fakeBug=document.getElementById("fakeBug");
const dontClickBtn=document.getElementById("dontClickBtn");
const dontClickMsg=document.getElementById("dontClickMsg");

const loveMessageSection=document.getElementById("loveMessageSection");
const toGrandmaBtn=document.getElementById("toGrandmaBtn");
const grandmaSection=document.getElementById("grandmaSection");

let index=0;
let cakeFireworksActive=false;

/* 🔐 Unlock */
unlockBtn.onclick=()=>{
  if(passwordInput.value===PASSWORD){
    lockScreen.style.display="none";
    mainContent.classList.remove("hidden");
  }else{
    errorText.classList.remove("hidden");
  }
};

/* ▶ Start */
startBtn.onclick=()=>{
  index=1;
  sections[index].classList.remove("hidden");
  startBtn.style.display="none";
  nextWrapper.classList.remove("hidden");
  sections[index].after(nextWrapper);
  sections[index].scrollIntoView({behavior:"smooth"});
  music.play();

  // ✍️ Letter reveal
  initReveal("letterCard");
};

/* ➡ Next */
nextBtn.onclick=()=>{
  index++;
  if(index<sections.length){
    sections[index].classList.remove("hidden");
    sections[index].after(nextWrapper);
    sections[index].scrollIntoView({behavior:"smooth"});

    if(sections[index].id==="imagesSection"){
      document.querySelectorAll(".gallery img").forEach((img,i)=>{
        setTimeout(()=>img.classList.add("show"),i*2000);
      });
    }
  }else{
    nextWrapper.style.display="none";
  }
};

/* 🎂 Cut Cake */
cutBtn.onclick=()=>{
  cakeLeft.classList.add("cut-left");
  cakeRight.classList.add("cut-right");
  cakeName.classList.add("glow");

  smokes.forEach((s,i)=>{
    setTimeout(()=>s.classList.add("show"),i*200);
  });

  cakeFireworksActive=true;
  const end=Date.now()+3500;

  (function blast(){
    if(!cakeFireworksActive) return;
    confetti({
      particleCount:120,
      spread:180,
      startVelocity:70,
      origin:{y:0.6}
    });
    if(Date.now()<end) requestAnimationFrame(blast);
  })();

  fakeBug.classList.remove("hidden");
  setTimeout(()=>fakeBug.classList.add("hidden"),2600);

  setTimeout(()=>dontClickBtn.classList.remove("hidden"),2800);

  setTimeout(()=>{
    loveMessageSection.classList.remove("hidden");
    loveMessageSection.classList.add("show");
  },4200);
};

/* 😈 Don't click */
dontClickBtn.onclick=()=>{
  dontClickBtn.classList.add("hidden");
  dontClickMsg.classList.remove("hidden");
};

/* 💌 Go to Grandma */
toGrandmaBtn.onclick=()=>{
  cakeFireworksActive=false;
  grandmaSection.classList.remove("hidden");
  grandmaSection.scrollIntoView({behavior:"smooth"});

  // ✅ FIX: trigger grandma reveal HERE
  initReveal("grandmaCard");
};

/* 🌟 Final message */
openFinalBtn.onclick=()=>{
  document.body.style.overflow="hidden";
  dimOverlay.classList.add("active");
  finalEnd.classList.remove("hidden");
  finalEnd.scrollIntoView({behavior:"smooth"});

  const end=Date.now()+3500;
  (function blast(){
    confetti({
      particleCount:90,
      spread:180,
      startVelocity:65,
      origin:{y:0.6}
    });
    if(Date.now()<end) requestAnimationFrame(blast);
  })();

  setTimeout(()=>{
    finalEnd.classList.add("showFinal");
    dimOverlay.classList.remove("active");
    document.body.style.overflow="auto";
  },3000);
};

/* ✍️ Line-by-line reveal with caret */
function initReveal(cardId){
  const card=document.getElementById(cardId);
  if(!card || card.dataset.revealed) return;

  card.dataset.revealed="true";

  const caret=card.querySelector(".caret");
  const content=card.querySelector(".text-content");

  const blocks=content.innerHTML.split("<br><br>");
  content.innerHTML="";

  setTimeout(()=>caret && caret.remove(),2000);

  blocks.forEach((block,i)=>{
    const line=document.createElement("div");
    line.className="reveal-line";
    line.innerHTML=block;
    content.appendChild(line);

    setTimeout(()=>line.classList.add("show"),2200+i*700);
  });
}

/* ✨ Floating particles */
const particles=["💖","🎈","✨","💜","🎉"];
setInterval(()=>{
  const p=document.createElement("span");
  p.textContent=particles[Math.floor(Math.random()*particles.length)];
  p.style.left=Math.random()*100+"vw";
  p.style.fontSize=(Math.random()*22+16)+"px";
  p.style.animationDuration=(Math.random()*10+12)+"s";
  floatingContainer.appendChild(p);
  setTimeout(()=>p.remove(),20000);
},900);

});
// ADD THIS BELOW YOUR EXISTING CODE (inside DOMContentLoaded)

const voicePlayer=document.getElementById("voicePlayer");
const playBtns=document.querySelectorAll(".playBtn");

playBtns.forEach(btn=>{
  btn.onclick=()=>{
    const src=btn.dataset.audio;

    // stop bg music
    music.pause();

    // reset styles
    document.querySelectorAll(".voice-card").forEach(v=>v.classList.remove("playing"));
    btn.parentElement.classList.add("playing");

    voicePlayer.src=src;
    voicePlayer.play();
  };
});

voicePlayer.onended=()=>{
  document.querySelectorAll(".voice-card").forEach(v=>v.classList.remove("playing"));
  music.play();
};
