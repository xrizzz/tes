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

// Variabel untuk mencatat apakah musik sempat berputar sebelum pindah tab
let wasPlayingBeforeLeave = false;

// Event saat pengguna berpindah tab, minimize browser, atau keluar sementara
document.addEventListener("visibilitychange", function () {
  if (!music) return;

  if (document.hidden) {
    // Jika tab disembunyikan/ditinggalkan
    if (!music.paused) {
      wasPlayingBeforeLeave = true;
      music.pause();
      if (musicIcon) musicIcon.classList.remove("fa-spin");
    }
  } else {
    // Jika pengguna kembali lagi membuka tab undangan
    if (wasPlayingBeforeLeave && !document.body.classList.contains("lock-scroll")) {
      music.play().then(() => {
        if (musicIcon) musicIcon.classList.add("fa-spin");
      }).catch((err) => {
        console.log("Gagal memutar audio otomatis saat kembali:", err);
      });
      wasPlayingBeforeLeave = false;
    }
  }
});

function copyText(elementId) {
  const targetEl = document.getElementById(elementId);
  if (targetEl) {
    // Hapus spasi agar nomor yang tersalin bersih (083133720739)
    const cleanNumber = targetEl.innerText.replace(/\s+/g, '');
    navigator.clipboard.writeText(cleanNumber).then(() => {
      alert("Nomor DANA berhasil disalin: " + cleanNumber);
    });
  }
}

// ========================================================
// FUNGSI BUKA UNDANGAN TERBARU (TARUH PALING BAWAH)
// ========================================================
function openInvitation() {
  document.body.classList.remove("lock-scroll");
  document.documentElement.classList.remove("lock-scroll");

  const mainSection = document.getElementById("main-content");
  if (mainSection) {
    mainSection.scrollIntoView({ behavior: "smooth" });
  }

  if (typeof music !== "undefined" && music) {
    music.play().then(() => {
      if (typeof musicIcon !== "undefined" && musicIcon) {
        musicIcon.classList.add("fa-spin");
      }
    }).catch((err) => {
      console.log("Autoplay dicegah:", err);
    });
  }

  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 500);
}

// ========================================================
// FUNGSI BUKA UNDANGAN (MENGHILANGKAN COVER SECARA MULUS)
// ========================================================
function openInvitation() {
  // 1. Lepas kunci scroll pada body & html
  document.body.classList.remove("lock-scroll");
  document.documentElement.classList.remove("lock-scroll");

  // 2. Beri efek geser/hilang pada cover
  const coverEl = document.getElementById("cover");
  if (coverEl) {
    coverEl.classList.add("cover-hidden");
  }

  // 3. Scroll ke bagian isi utama
  const mainSection = document.getElementById("main-content");
  if (mainSection) {
    mainSection.scrollIntoView({ behavior: "smooth" });
  }

  // 4. Putar musik latar
  if (typeof music !== "undefined" && music) {
    music.play().then(() => {
      if (typeof musicIcon !== "undefined" && musicIcon) {
        musicIcon.classList.add("fa-spin");
      }
    }).catch((err) => {
      console.log("Audio autoplay:", err);
    });
  }

  // 5. Refresh animasi AOS
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 400);
}

// ========================================================
// FUNGSI BUKA UNDANGAN KHUSUS ANDROID & SEMUA PERANGKAT
// ========================================================
function openInvitation() {
  // 1. Buka seluruh kunci scroll & touch
  document.body.classList.remove("lock-scroll");
  document.documentElement.classList.remove("lock-scroll");
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
  document.body.style.touchAction = "auto";

  // 2. Hilangkan cover secara instan & tuntas
  const coverEl = document.getElementById("cover");
  if (coverEl) {
    coverEl.classList.add("cover-hidden");
    
    // Paksa hilangkan elemen cover dari layer agar Android bisa di-scroll bebas
    setTimeout(() => {
      coverEl.style.display = "none";
    }, 600);
  }

  // 3. Gulir ke bagian isi undangan
  const mainSection = document.getElementById("main-content");
  if (mainSection) {
    mainSection.scrollIntoView({ behavior: "smooth" });
  }

  // 4. Putar musik
  if (typeof music !== "undefined" && music) {
    music.play().then(() => {
      if (typeof musicIcon !== "undefined" && musicIcon) {
        musicIcon.classList.add("fa-spin");
      }
    }).catch((err) => {
      console.log("Audio autoplay:", err);
    });
  }

  // 5. Refresh animasi AOS
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 400);
}

// ========================================================
// FUNGSI GULIR HALUS DARI COVER KE KONTEN UTAMA
// ========================================================
function openInvitation() {
  // 1. Buka kunci scroll pada body & html
  document.body.classList.remove("lock-scroll");
  document.documentElement.classList.remove("lock-scroll");
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
  document.body.style.touchAction = "auto";

  // 2. Putar musik latar
  if (typeof music !== "undefined" && music) {
    music.play().then(() => {
      if (typeof musicIcon !== "undefined" && musicIcon) {
        musicIcon.classList.add("fa-spin");
      }
    }).catch((err) => {
      console.log("Audio autoplay:", err);
    });
  }

  // 3. Gulir halus terukur ke section berikutnya (#main-content / #couple)
  const targetSection = document.getElementById("main-content") || document.getElementById("couple");
  if (targetSection) {
    setTimeout(() => {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50);
  }

  // 4. Refresh animasi AOS
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 600);
}

// ========================================================
// FUNGSI SCROLL SUPER MULUS (ANTI LOMPAT & COVER TETAP ADA)
// ========================================================
function openInvitation() {
  // 1. Lepas semua kunci layar
  document.body.classList.remove("lock-scroll");
  document.documentElement.classList.remove("lock-scroll");
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
  
  // 2. Paksa cover untuk TETAP TAMPIL (membatalkan perintah hilang sebelumnya)
  const coverEl = document.getElementById("cover");
  if (coverEl) {
    coverEl.classList.remove("cover-hidden");
    coverEl.style.display = "flex";
    coverEl.style.opacity = "1";
    coverEl.style.visibility = "visible";
  }

  // 3. Putar musik
  if (typeof music !== "undefined" && music) {
    music.play().then(() => {
      if (typeof musicIcon !== "undefined" && musicIcon) {
        musicIcon.classList.add("fa-spin");
      }
    }).catch(err => console.log(err));
  }

  // 4. Jeda 150ms agar Android mengatur layout, lalu meluncur mulus ke bawah
  setTimeout(() => {
    const targetSection = document.getElementById("main-content") || document.getElementById("couple");
    if (targetSection) {
      // Hitung posisi akurat agar scroll tidak melompat
      const targetPos = targetSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPos,
        behavior: "smooth"
      });
    }
  }, 150);

  // 5. Muat ulang animasi setelah selesai meluncur
  setTimeout(() => {
    if (typeof AOS !== "undefined") AOS.refresh();
  }, 800);
}

snapshot.forEach((doc) => {
      const data = doc.data();
      const nama = data.nama || "Tamu Undangan";
      const badgeColor = data.kehadiran === "Hadir" ? "#2f855a" : (data.kehadiran === "Tidak Hadir" ? "#c53030" : "#d69e2e");
      const badgeBg = data.kehadiran === "Hadir" ? "#f0fff4" : (data.kehadiran === "Tidak Hadir" ? "#fff5f5" : "#fffff0");

      const card = document.createElement("div");
      card.style.cssText = "background: #ffffff; border-radius: 14px; padding: 14px 18px; border: 1px solid #f0f2f5; box-shadow: 0 2px 8px rgba(0,0,0,0.03); margin-bottom: 8px;";
      
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <div style="font-weight: 600; font-size: 14px; color: #2d3748;">${nama}</div>
          <span style="font-size: 11px; font-weight: 600; color: ${badgeColor}; background: ${badgeBg}; padding: 2px 10px; border-radius: 20px; border: 1px solid ${badgeColor}33;">
            ${data.kehadiran || "Hadir"}
          </span>
        </div>
        <div style="font-size: 11px; color: #a0aec0; margin-bottom: 8px;">
          🕒 ${formatWaktu(data.timestamp)}
        </div>
        <p style="font-size: 13px; color: #4a5568; margin: 0; line-height: 1.5; word-break: break-word;">
          ${data.pesan || ""}
        </p>
      `;
      commentsList.appendChild(card);
    });

// --- Fungsi Buka Undangan & Buka Kunci Layar ---
document.addEventListener("DOMContentLoaded", () => {
  const btnBuka = document.getElementById("btn-open-invitation") || document.querySelector(".btn-buka-undangan");
  const audio = document.getElementById("myAudio") || document.querySelector("audio");
  const musicDisc = document.querySelector(".fa-compact-disc") || document.querySelector(".music-box");
  const coverSection = document.getElementById("cover") || document.querySelector(".hero") || document.querySelector(".cover-section");

  if (btnBuka) {
    btnBuka.addEventListener("click", function (e) {
      e.preventDefault();

      // 1. Putar Musik & Putar Icon Piringan
      if (audio) {
        audio.play().catch((err) => console.log("Audio play error:", err));
        if (musicDisc) musicDisc.classList.add("rotating");
      }

      // 2. Buka Kunci Scroll Seluruh Halaman
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.overflowY = "auto";
      document.body.classList.remove("overflow-hidden", "disable-scroll");

      // 3. Hilangkan Layar Cover (Fade Out)
      if (coverSection) {
        coverSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        coverSection.style.opacity = "0";
        coverSection.style.pointerEvents = "none";
        
        setTimeout(() => {
          coverSection.style.display = "none";
        }, 800);
      }

      // 4. Arahkan Layar ke Konten Utama
      const target = document.getElementById("home") || document.getElementById("mempelai") || document.querySelector("main");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
