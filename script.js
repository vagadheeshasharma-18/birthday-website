document.addEventListener("DOMContentLoaded",()=>{

const PASSWORD="13022006";
const birthdayDate=new Date("February 13, 2026 00:00:00").getTime();

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
const countdownEl=document.getElementById("countdown");

let index=0;
let musicStarted=false;

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

  if(!musicStarted){
    music.play();
    musicStarted=true;
  }

  startBtn.style.display="none";
  nextWrapper.classList.remove("hidden");
  sections[index].after(nextWrapper);
  sections[index].scrollIntoView({behavior:"smooth"});
};

/* ➡ Next */
nextBtn.onclick=()=>{
  index++;
  if(index<sections.length){
    sections[index].classList.remove("hidden");
    sections[index].after(nextWrapper);
    sections[index].scrollIntoView({behavior:"smooth"});

    /* 🖼️ Slow image reveal (2.5s each) */
    if(sections[index].querySelector(".gallery")){
      const imgs=document.querySelectorAll(".gallery img");
      imgs.forEach((img,i)=>{
        setTimeout(()=>{
          img.classList.add("show");
        }, i * 2500); // ⭐ 2.5 seconds per image
      });
    }

  }else{
    nextWrapper.style.display="none";
  }
};

/* ⏳ Countdown */
setInterval(()=>{
  const diff=birthdayDate-Date.now();
  if(diff<=0){
    countdownEl.textContent="🎉 HAPPY BIRTHDAY 🎂💖";
    return;
  }
  const d=Math.floor(diff/(1000*60*60*24));
  const h=Math.floor((diff/(1000*60*60))%24);
  const m=Math.floor((diff/(1000*60))%60);
  countdownEl.textContent=`${d} Days ${h} Hours ${m} Minutes`;
},1000);

});
