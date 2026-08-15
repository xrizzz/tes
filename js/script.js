// 1. Ambil Nama Tamu dari URL Parameter (?to=Nama+Tamu)
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('to');
if (guestParam) {
  const guestEl = document.getElementById('guestName');
  if (guestEl) {
    guestEl.innerText = guestParam;
  }
}

// 2. Fungsi Buka Undangan & Scroll Otomatis ke Bawah
function openAndScroll() {
  // Buka kunci scroll pada body
  document.body.classList.remove('lock-scroll');

  // Scroll otomatis dan mulus ke bagian main-content
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.scrollIntoView({ behavior: 'smooth' });
  }

  // Putar musik latar jika ada
  const music = document.getElementById('bgMusic');
  if (music) {
    music.play().catch(function(error) {
      console.log('Autoplay audio ditahan oleh kebijakan browser:', error);
    });
  }
}
