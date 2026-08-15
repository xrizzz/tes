const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('to');
if (guestParam) {
  const guestEl = document.getElementById('guestName');
  if (guestEl) {
    guestEl.innerText = guestParam;
  }
}

function openAndScroll() {
  document.body.classList.remove('lock-scroll');

  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.scrollIntoView({ behavior: 'smooth' });
  }

  const music = document.getElementById('bgMusic');
  if (music) {
    music.play().catch(function(error) {
      console.log('Autoplay audio ditahan browser:', error);
    });
  }
}
