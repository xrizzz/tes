// 1. Ambil Nama Tamu dari URL Parameter (?to=Nama+Tamu)
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('to');
if (guestParam) {
  document.getElementById('guestName').innerText = guestParam;
}

// 2. Fungsi Buka Undangan & Putar Musik
function openInvitation() {
  document.getElementById('cover').classList.add('open');
  
  const music = document.getElementById('bgMusic');
  if (music) {
    music.play().catch(() => {
      console.log('Audio autoplay diblokir browser, putar manual via kontrol');
    });
  }
}

// 3. Salin Nomor Rekening
function copyText(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Nomor rekening berhasil disalin: ' + text);
  });
}

// 4. Hitung Mundur (Countdown Timer)
const targetDate = new Date('Nov 28, 2026 08:00:00').getTime();

const interval = setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(interval);
    return;
  }

  document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);