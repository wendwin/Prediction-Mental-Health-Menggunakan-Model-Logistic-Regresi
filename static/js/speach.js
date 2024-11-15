document.addEventListener("DOMContentLoaded", () => {
  // Menginisialisasi Speech Synthesis
  const speech = new SpeechSynthesisUtterance();
  speech.lang = "id-ID";
  speech.rate = 1.2; 
  speech.pitch = 1.0; 

  // Pilih suara perempuan Indonesia jika tersedia
  function setVoice() {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(
      (voice) => voice.lang === "id-ID" && voice.name.includes("Google Female")
    );
    if (voice) {
      speech.voice = voice;
    }
  }

  // Fungsi untuk membaca teks
  function bacaTeks(teks) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); 
    }
    speech.text = teks; 
    window.speechSynthesis.speak(speech);
  }

  setVoice();
  let lastText = "";

  // Event untuk membaca teks pada elemen selain tombol dan link tertentu
  document.body.addEventListener("mousemove", (event) => {
    const elemen = event.target.closest(
      "p, h1, h2, h3, h4, h5, h6, span, li, a"
    );
    if (elemen) {
      let teks = elemen.innerText || elemen.textContent;

      if (elemen.tagName.toLowerCase() === "a") {
        if (elemen.innerText === "Screening") {
          teks = "TOMBOL GRATIS! CEK SEKARANG YUK!"; 
        } else if (elemen.innerText === "Informasi") {
          teks = "TOMBOL INFORMASI";
        }
      }

      // Hanya baca jika teks belum dibaca
      if (teks !== lastText) {
        lastText = teks;
        bacaTeks(teks);
      }
    }
  });

  // Menghentikan pembacaan saat kursor keluar dari elemen
  document.body.addEventListener("mouseout", (event) => {
    if (event.target.matches("p, h1, h2, h3, h4, h5, h6, span, li, a")) {
      window.speechSynthesis.cancel();
    }
  });

  // Menambahkan event listener pada tombol dan link
  const tombol = document.querySelectorAll("button");
  tombol.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      let teks = "TOMBOL. GRATIS! CEK SEKARANG YUK!";
      bacaTeks(teks); 
    });
  });

  // Menambahkan event listener untuk link "Screening" dan "Informasi"
  const linkScreening = document.querySelector("a.nav-link.active");
  linkScreening.addEventListener("mouseover", () => {
    let teks = "TOMBOL. GRATIS! CEK SEKARANG YUK!";
    bacaTeks(teks); 
  });

  const linkInformasi = document.querySelector("a.nav-link:not(.active)");
  linkInformasi.addEventListener("mouseover", () => {
    let teks = "TOMBOL INFORMASI"; 
    bacaTeks(teks); 
  });

  window.speechSynthesis.onvoiceschanged = setVoice;
});
