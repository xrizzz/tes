// Inisialisasi Library Animasi AOS
document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
});

// 1. Ambil Nama Tamu dari Parameter URL (?to=Nama+Tamu)
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get("to");
if (guestParam) {
  const guestEl = document.getElementById("guestName");
  if (guestEl) {
    guestEl.innerText = guestParam;
  }
}

// 2. Kontrol Musik & Buka Undangan
const music = document.getElementById("bgMusic");
const musicIcon = document.getElementById("musicIcon");

function openInvitation() {
  // Buka Kunci Scroll pada Seluruh Layar
  document.body.classList.remove("lock-scroll");
  document.documentElement.classList.remove("lock-scroll");
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
  document.body.style.touchAction = "auto";

  // Putar Musik Latar
  if (music) {
    music.play().then(() => {
      if (musicIcon) musicIcon.classList.add("fa-spin");
    }).catch((err) => {
      console.log("Autoplay audio dicegah oleh browser:", err);
    });
  }

  // Gulir Halus Langsung ke Konten Utama
  const mainSection = document.getElementById("main-content");
  if (mainSection) {
    mainSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Refresh animasi AOS setelah layar terbuka
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 400);
}

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play();
    if (musicIcon) musicIcon.classList.add("fa-spin");
  } else {
    music.pause();
    if (musicIcon) musicIcon.classList.remove("fa-spin");
  }
}

// 3. Salin Nomor Rekening / DANA
function copyText(elementId) {
  const targetEl = document.getElementById(elementId);
  if (targetEl) {
    const cleanNumber = targetEl.innerText.replace(/\s+/g, '');
    navigator.clipboard.writeText(cleanNumber).then(() => {
      alert("Nomor berhasil disalin: " + cleanNumber);
    });
  }
}

// 4. Hitung Mundur Waktu Acara (Countdown)
const weddingTarget = new Date("2026-08-25T08:00:00").getTime();

setInterval(function () {
  const now = new Date().getTime();
  const distance = weddingTarget - now;

  if (distance > 0) {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (hoursEl) hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (minutesEl) minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (secondsEl) secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
  }
}, 1000);

// 5. Jaga Musik Saat Pengguna Pindah Tab
let wasPlayingBeforeLeave = false;
document.addEventListener("visibilitychange", function () {
  if (!music) return;

  if (document.hidden) {
    if (!music.paused) {
      wasPlayingBeforeLeave = true;
      music.pause();
      if (musicIcon) musicIcon.classList.remove("fa-spin");
    }
  } else {
    if (wasPlayingBeforeLeave && !document.body.classList.contains("lock-scroll")) {
      music.play().then(() => {
        if (musicIcon) musicIcon.classList.add("fa-spin");
      }).catch((err) => {
        console.log("Gagal memutar audio otomatis:", err);
      });
      wasPlayingBeforeLeave = false;
    }
  }
});
