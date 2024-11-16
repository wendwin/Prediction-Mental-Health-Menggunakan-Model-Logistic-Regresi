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
  let dropdownClicked = false; 

  // Event untuk membaca teks pada elemen
  document.body.addEventListener("mousemove", (event) => {
    const elemen = event.target.closest(
      "h1, h2, h3, h4, h5, h6, span, li, a, label, select, option, p, button, input"
    );

    if (elemen) {
      let teks = elemen.innerText || elemen.textContent;
      if (elemen.tagName.toLowerCase() === "h1") {
        bacaTeks(teks);
      }

      // Jika elemen adalah select (dropdown)
      if (elemen.tagName.toLowerCase() === "select") {
        if (!dropdownClicked) {
          teks = "Tombol dropdown. Klik untuk memilih.";
          bacaTeks(teks);
        } else {
          const optionsText = readDropdownOptions(elemen);
          bacaTeks(optionsText);
        }
      }

      // Jika elemen adalah option dalam dropdown
      if (elemen.tagName.toLowerCase() === "option" && dropdownClicked) {
        const dropdown = elemen.parentElement;
        const selectedValue = dropdown.options[dropdown.selectedIndex].text;
        bacaTeks(`Opsi yang Anda pilih adalah ${selectedValue}`);
      }

      // Jika elemen adalah input, bacakan skala
      if (
        elemen.tagName.toLowerCase() === "input" &&
        elemen.type === "number"
      ) {
        const skala =
          elemen.getAttribute("min") + "-" + elemen.getAttribute("max");
        bacaTeks(`Ketik di sini dengan skala ${skala}`);
      }
      if (teks !== lastText) {
        lastText = teks;
        bacaTeks(teks);
      }
    }
  });

  // Menghentikan pembacaan saat kursor keluar dari elemen
  document.body.addEventListener("mouseout", (event) => {
    if (
      event.target.matches(
        "h1, h2, h3, h4, h5, h6, span, li, a, label, select, option, p, button, input"
      )
    ) {
      window.speechSynthesis.cancel();
    }
  });

  // Menambahkan event listener pada dropdown untuk menangani klik
  const dropdowns = document.querySelectorAll("select");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      dropdownClicked = true; 
    });
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
  if (linkScreening) {
    linkScreening.addEventListener("mouseover", () => {
      let teks = "TOMBOL. GRATIS! CEK SEKARANG YUK!";
      bacaTeks(teks);
    });
  }

  const linkInformasi = document.querySelector("a.nav-link:not(.active)");
  if (linkInformasi) {
    linkInformasi.addEventListener("mouseover", () => {
      let teks = "TOMBOL INFORMASI";
      bacaTeks(teks);
    });
  }

  // Menambahkan event listener pada tombol kirim
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("mouseover", () => {
    bacaTeks("Silakan kirim");
  });

  window.speechSynthesis.onvoiceschanged = setVoice;

  // Fungsi untuk menonaktifkan fitur suara dan teks ketika modal ditutup
  const closeModalButton = document.querySelector('[data-dismiss="modal"]');
  closeModalButton.addEventListener("click", () => {
    console.log("Modal ditutup, menonaktifkan fitur suara...");
    window.speechSynthesis.cancel(); // Membatalkan suara yang sedang berjalan
    isModalActive = false; // Menonaktifkan pengenalan suara lebih lanjut
  });
});
