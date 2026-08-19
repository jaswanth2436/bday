/**
 * A Special Birthday Present for Poojitha from Jaswanth ✨
 * Handcrafted, joyful, and personal interactive experience.
 */

// 1. SOUND ENGINE (Warm Web Audio Music Box & Chimes)
class JoyfulSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.loopTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, duration = 0.5, type = "sine", volume = 0.12) {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChimeHarp() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.7, "sine", 0.15);
      }, idx * 70);
    });
  }

  playPop() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(360, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  startMusicBox() {
    this.init();
    this.isPlaying = true;
    updateMusicCharm(true);

    const melody = [
      { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 587.33, d: 0.7 }, { f: 523.25, d: 0.7 }, { f: 698.46, d: 0.7 }, { f: 659.25, d: 1.2 },
      { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 587.33, d: 0.7 }, { f: 523.25, d: 0.7 }, { f: 783.99, d: 0.7 }, { f: 698.46, d: 1.2 },
      { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 1046.5, d: 0.7 }, { f: 880.00, d: 0.7 }, { f: 698.46, d: 0.7 }, { f: 659.25, d: 0.7 }, { f: 587.33, d: 1.0 },
      { f: 932.33, d: 0.35 }, { f: 932.33, d: 0.35 }, { f: 880.00, d: 0.7 }, { f: 698.46, d: 0.7 }, { f: 783.99, d: 0.7 }, { f: 698.46, d: 1.4 }
    ];

    let index = 0;
    const tick = () => {
      if (!this.isPlaying) return;
      const n = melody[index];
      this.playNote(n.f, n.d * 1.2, "sine", 0.09);
      this.playNote(n.f / 2, n.d * 1.2, "triangle", 0.05);

      index = (index + 1) % melody.length;
      this.loopTimer = setTimeout(tick, n.d * 700);
    };

    tick();
  }

  stopMusicBox() {
    this.isPlaying = false;
    if (this.loopTimer) clearTimeout(this.loopTimer);
    updateMusicCharm(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stopMusicBox();
    } else {
      this.startMusicBox();
    }
  }
}

const sounds = new JoyfulSoundEngine();

function updateMusicCharm(active) {
  const charm = document.getElementById("musicCharm");
  const label = document.getElementById("musicLabel");
  if (active) {
    charm.classList.add("playing");
    label.textContent = "Playing 🎵";
  } else {
    charm.classList.remove("playing");
    label.textContent = "Music";
  }
}

// 2. CELEBRATION CONFETTI
function fireConfettiBurst(count = 70) {
  if (typeof confetti === "function") {
    confetti({
      particleCount: count,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff477e', '#ff758f', '#ffd166', '#ffb703', '#90dbf4', '#ffffff']
    });
  }
}

function fireHugCelebration() {
  sounds.playChimeHarp();
  const end = Date.now() + 3000;
  const colors = ['#ff477e', '#ffb5a7', '#ffd166', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 8,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 8,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// 3. STAGE 1: UNWRAP THE PRESENT BOX
function initGiftOpening() {
  const giftCover = document.getElementById("giftCover");
  const giftBox = document.getElementById("giftBox");
  const openBtn = document.getElementById("openGiftBtn");
  const celebrationMain = document.getElementById("celebrationMain");

  function unwrapPresent() {
    giftBox.classList.add("opening");
    sounds.playChimeHarp();
    fireConfettiBurst(100);

    setTimeout(() => {
      giftCover.style.opacity = "0";
      giftCover.style.transform = "scale(1.05)";
      
      setTimeout(() => {
        giftCover.classList.add("opened");
        celebrationMain.classList.add("show");
        sounds.startMusicBox();
        window.scrollTo({ top: 0, behavior: "smooth" });
        fireConfettiBurst(60);
      }, 500);
    }, 600);
  }

  giftBox.addEventListener("click", unwrapPresent);
  openBtn.addEventListener("click", unwrapPresent);
}

// 4. STAGE 2: BIRTHDAY CAKE & CANDLE
function initCakeCeremony() {
  const cake = document.getElementById("birthdayCake");
  const blowBtn = document.getElementById("blowCandleActionBtn");
  const relightBtn = document.getElementById("relightCandleActionBtn");
  const flame = document.getElementById("candleFlame");
  const smoke = document.getElementById("candleSmoke");
  const wishBox = document.getElementById("wishRevealBox");

  let isBlown = false;

  function blowCandle() {
    if (isBlown) return;
    isBlown = true;
    flame.classList.add("blown-out");
    smoke.classList.add("active");

    sounds.playChimeHarp();
    fireConfettiBurst(90);

    setTimeout(() => {
      wishBox.classList.add("show");
    }, 500);

    blowBtn.style.display = "none";
    relightBtn.style.display = "inline-block";
  }

  function relightCandle() {
    isBlown = false;
    flame.classList.remove("blown-out");
    smoke.classList.remove("active");
    blowBtn.style.display = "inline-block";
    relightBtn.style.display = "none";
    sounds.playNote(650, 0.2);
  }

  cake.addEventListener("click", blowCandle);
  blowBtn.addEventListener("click", blowCandle);
  relightBtn.addEventListener("click", relightCandle);
}

// 5. SISTER VIP BIRTHDAY COUPONS (ONLY 1 OUT OF 4 ALLOWED!)
const VIP_COUPONS = [
  {
    id: "coupon-1",
    badge: "100% OFF",
    title: "☕ Unlimited Treat from Jaswanth",
    desc: "Jaswanth pays for your favorite coffee, boba, or meal of your choice!"
  },
  {
    id: "coupon-2",
    badge: "VIP PASS",
    title: "😜 Annoy Jaswanth for 24 Hours",
    desc: "A full day of teasing, goofy jokes, and zero sibling complaints!"
  },
  {
    id: "coupon-3",
    badge: "FREE HELPER",
    title: "🧹 One Free Chore Waiver",
    desc: "Jaswanth will do one of your chores without asking any questions!"
  },
  {
    id: "coupon-4",
    badge: "SWEET RIDE",
    title: "🍦 Spontaneous Ice Cream Trip",
    desc: "Late-night ice cream run and long drive whenever you feel like it!"
  }
];

let claimedCouponId = null;

function initCoupons() {
  const grid = document.getElementById("couponsGrid");
  const resetWrap = document.getElementById("couponResetWrap");
  const changeBtn = document.getElementById("changeCouponBtn");

  function renderCoupons() {
    grid.innerHTML = "";

    VIP_COUPONS.forEach(coupon => {
      const card = document.createElement("div");
      card.className = "coupon-ticket";
      card.id = coupon.id;

      if (claimedCouponId === coupon.id) {
        card.classList.add("claimed");
      } else if (claimedCouponId !== null) {
        card.classList.add("locked");
      }

      card.innerHTML = `
        <div>
          <span class="coupon-badge">${coupon.badge}</span>
          <h4 class="coupon-title">${coupon.title}</h4>
          <p class="coupon-desc">${coupon.desc}</p>
        </div>
        <button class="coupon-claim-btn">${claimedCouponId ? "Locked 🔒" : "Redeem Coupon 🎟️"}</button>
        <div class="coupon-claimed-stamp">CLAIMED BY POOJITHA! 💖</div>
      `;

      const claimBtn = card.querySelector(".coupon-claim-btn");
      claimBtn.addEventListener("click", () => {
        if (claimedCouponId !== null) return;
        claimedCouponId = coupon.id;
        sounds.playChimeHarp();
        fireConfettiBurst(50);
        renderCoupons();
      });

      grid.appendChild(card);
    });

    if (claimedCouponId !== null) {
      resetWrap.style.display = "block";
    } else {
      resetWrap.style.display = "none";
    }
  }

  changeBtn.addEventListener("click", () => {
    claimedCouponId = null;
    sounds.playNote(500, 0.2);
    renderCoupons();
  });

  renderCoupons();
}

// 6. PHOTO SLIDER / CAROUSEL (EASY TO ADD ASSETS IN assets/)
const SLIDER_PHOTOS = [
  {
    src: "assets/photo1.jpeg",
    fallback: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    caption: "Pure elegance, pure Poojitha ✨👑"
  },
  {
    src: "assets/photo2.jpeg",
    fallback: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    caption: "Sweet moments that last forever 💝"
  },
  {
    src: "assets/photo3.jpeg",
    fallback: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    caption: "The Birthday Queen herself! 🎂👑"
  },
  {
    src: "assets/photo4.jpeg",
    fallback: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    caption: "Exploring the world with so much grace! 🌍"
  },
  {
    src: "assets/photo5.jpeg",
    fallback: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    caption: "Adventure mode ON — always the coolest! 🎩🌟"
  },
  {
    src: "assets/photo6.jpeg",
    fallback: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    caption: "Jaswanth & Poojitha — forever partners 💖"
  },
  {
    src: "assets/photo7.jpeg",
    fallback: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    caption: "Two siblings, one unbreakable bond 🌸✨"
  }
];

function initPhotoSlider() {
  const track = document.getElementById("sliderTrack");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevSlideBtn");
  const nextBtn = document.getElementById("nextSlideBtn");

  let currentSlide = 0;
  let autoTimer = null;

  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  SLIDER_PHOTOS.forEach((photo, idx) => {
    // Polaroid Slide Item
    const slide = document.createElement("div");
    slide.className = `slider-polaroid-item ${idx === 0 ? "active" : ""}`;
    slide.id = `photoSlide-${idx}`;

    slide.innerHTML = `
      <div class="slider-tape-top"></div>
      <div class="slider-img-box">
        <img
          src="${photo.src}"
          alt="${photo.caption}"
          loading="eager"
          decoding="async"
          onerror="this.onerror=null; this.style.display='none'; this.parentElement.style.background='#fdf6ee';"
        >
      </div>
      <div class="slider-caption-text">${photo.caption}</div>
    `;
    track.appendChild(slide);

    // Dot Indicator
    const dot = document.createElement("div");
    dot.className = `slider-dot ${idx === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(idx) {
    const slides = document.querySelectorAll(".slider-polaroid-item");
    const dots = document.querySelectorAll(".slider-dot");

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (idx + SLIDER_PHOTOS.length) % SLIDER_PHOTOS.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    sounds.playNote(600 + currentSlide * 60, 0.15, "sine", 0.08);
    resetAutoPlay();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function resetAutoPlay() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 4500);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Start autoplay
  resetAutoPlay();
}

// 7. SISTER LOVE METER & FLOATING HEARTS
function initLoveMeter() {
  const heartBtn = document.getElementById("loveHeartBtn");
  const counterVal = document.getElementById("loveCounterVal");

  let count = 1000;

  heartBtn.addEventListener("click", (e) => {
    count += 10;
    counterVal.textContent = count.toLocaleString();
    sounds.playNote(800 + Math.random() * 400, 0.2, "sine", 0.1);

    // Spawn floating heart
    const heart = document.createElement("div");
    heart.className = "floating-love-heart";
    heart.textContent = ["💖", "🌸", "✨", "🥰", "🎀"][Math.floor(Math.random() * 5)];
    
    heart.style.left = `${e.clientX || (window.innerWidth / 2)}px`;
    heart.style.top = `${e.clientY || (window.innerHeight / 2)}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1400);
  });
}

// 8. INITIALIZE ALL EVENTS
document.addEventListener("DOMContentLoaded", () => {
  initGiftOpening();
  initCakeCeremony();
  initCoupons();
  initPhotoSlider();
  initLoveMeter();

  // Music Charm
  document.getElementById("musicCharm").addEventListener("click", () => {
    sounds.toggle();
  });

  // Big Sister Hug Button
  document.getElementById("sendHugBtn").addEventListener("click", () => {
    fireHugCelebration();
  });

  // Back to top
  document.getElementById("giftBackToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
