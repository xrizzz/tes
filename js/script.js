// 1. Ambil Nama Tamu
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('to');
if (guestParam) {
  const guestEl = document.getElementById('guestName');
  if (guestEl) guestEl.innerText = guestParam;
}

// 2. Fungsi Tombol Buka Undangan
function openInvitation() {
  const cover = document.getElementById('cover');
  if (cover) {
    cover.classList.add('open');
  }

  const music = document.getElementById('bgMusic');
  if (music) {
    music.play().catch(function(error) {
      console.log("Autoplay dicegah browser:", error);
    });
  }
}

// 3. Salin Rekening
function copyText(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    navigator.clipboard.writeText(el.innerText).then(() => {
      alert('Nomor rekening berhasil disalin!');
    });
  }
}

// 4. Hitung Mundur (Pastikan format tanggal valid)
const targetDate = new Date("2026-12-28T08:00:00").getTime();

setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

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
