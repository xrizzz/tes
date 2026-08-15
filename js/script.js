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
  document.body.classList.remove("lock-scroll");

  const mainSection = document.getElementById("main-content");
  if (mainSection) {
    mainSection.scrollIntoView({ behavior: "smooth" });
  }

  if (music) {
    music.play().then(() => {
      if (musicIcon) musicIcon.classList.add("fa-spin");
    }).catch((err) => {
      console.log("Autoplay audio dicegah oleh browser:", err);
    });
  }

  // Refresh animasi AOS setelah kunci scroll dibuka
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 500);
}

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play();
    musicIcon.classList.add("fa-spin");
  } else {
    music.pause();
    musicIcon.classList.remove("fa-spin");
  }
}

// 3. Salin Nomor Rekening
function copyText(elementId) {
  const targetEl = document.getElementById(elementId);
  if (targetEl) {
    navigator.clipboard.writeText(targetEl.innerText).then(() => {
      alert("Nomor rekening berhasil disalin: " + targetEl.innerText);
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

// 5. Form Kirim Ucapan (RSVP Live)
function submitWish(event) {
  event.preventDefault();

  const name = document.getElementById("senderName").value;
  const status = document.getElementById("attendance").value;
  const msg = document.getElementById("senderMsg").value;

  const badgeClass = status === "Hadir" ? "badge-hadir" : "badge-tidak";

  const newWish = `
    <div class="wish-item" data-aos="fade-up">
      <div class="wish-header">
        <strong>${name}</strong>
        <span class="${badgeClass}">${status}</span>
      </div>
      <p class="wish-text">${msg}</p>
      <small class="wish-time">Baru saja</small>
    </div>
  `;

  const container = document.getElementById("wishesContainer");
  container.insertAdjacentHTML("afterbegin", newWish);

  // Reset input form
  document.getElementById("senderName").value = "";
  document.getElementById("senderMsg").value = "";
  alert("Terima kasih banyak atas ucapan dan doa restunya!");
}
