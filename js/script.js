// Mengambil Parameter Nama Tamu (?to=Nama+Tamu)
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('to');
if (guestParam) {
  const guestEl = document.getElementById('guestName');
  if (guestEl) {
    guestEl.innerText = guestParam;
  }
}

// Fungsi Buka Undangan & Scroll Otomatis
function openAndScroll() {
  document.body.classList.remove('lock-scroll');

  const mainSection = document.getElementById('main-content');
  if (mainSection) {
    mainSection.scrollIntoView({ behavior: 'smooth' });
  }
}
