document.addEventListener("DOMContentLoaded", () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = true;
  recognition.interimResults = true;

  let isVoiceActive = sessionStorage.getItem("voiceActive") === "true";
  let isModalClosed = false; // Menambahkan flag untuk cek apakah modal ditutup

  // Fungsi untuk membaca teks
  const readText = (text) => {
    if (text && text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = "id-ID";
      utterance.onend = () => console.log("Pembacaan teks selesai.");
      utterance.onerror = (e) => console.error("Error pada TTS:", e);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Fungsi untuk mengaktifkan/mematikan suara
  const toggleSound = (enable) => {
    isVoiceActive = enable;
    sessionStorage.setItem("voiceActive", enable);
    if (enable) {
      if (recognition.state !== "running") {
        try {
          recognition.start();
          console.log("Fitur suara diaktifkan.");
        } catch (error) {
          console.error("Error memulai SpeechRecognition:", error);
        }
      }
    } else {
      stopSpeechRecognitionAndSynthesis();
      console.log("Fitur suara dimatikan.");
    }
  };

  // Fungsi untuk menghentikan SpeechRecognition dan TTS
  const stopSpeechRecognitionAndSynthesis = () => {
    if (recognition.state === "running") {
      recognition.stop();
      console.log("Speech Recognition dihentikan.");
    }
    window.speechSynthesis.cancel();
  };

  // Fungsi untuk menavigasi ke bagian tertentu di halaman
  const navigateToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Menangani hasil dari SpeechRecognition
  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const command = event.results[i][0].transcript.toLowerCase();
        console.log("Perintah suara:", command);

        // Navigasi berdasarkan perintah suara
        if (command.includes("screening") || command.includes("cek sekarang")) {
          sessionStorage.setItem("keepVoiceActive", "true");
          window.location.href = "/screening";
        } else if (command.includes("kembali") || command.includes("back")) {
          window.history.back();
        } else if (command.includes("informasi") || command.includes("info")) {
          navigateToSection("#info");
        } else if (
          command.includes("layanan") ||
          command.includes("konsultasi")
        ) {
          navigateToSection("#konsultasi");
        } else if (
          command.includes("lanjutkan") ||
          command.includes("teruskan")
        ) {
          $("#welcomeModal").modal("hide");
          sessionStorage.setItem("modalShown", "true"); // Menyimpan status modal ditutup
          // Jangan matikan suara setelah perintah lanjutkan
        }
      }
    }
  };

  recognition.onerror = (e) =>
    console.error("Error pada Speech Recognition:", e);

  recognition.onend = () => {
    if (isVoiceActive && !isModalClosed) {
      toggleSound(true);
    }
  };

  // Event pada welcomeModal
  $("#welcomeModal").on("shown.bs.modal", () => {
    const modalText = document.querySelector(
      "#welcomeModal .modal-body"
    ).innerText;
    readText(modalText);
    toggleSound(true);
  });

  $("#welcomeModal").on("hidden.bs.modal", () => {
    console.log("Modal welcome ditutup.");
    isModalClosed = true; // Menandakan modal telah ditutup
    // Jangan matikan suara jika perintah lanjutkan atau teruskan telah dijalankan
    if (!sessionStorage.getItem("keepVoiceActive")) {
      toggleSound(false); // Memastikan TTS dan SR dimatikan jika modal ditutup secara normal
    }
  });

  // Event pada successModal
  $("#successModal").on("shown.bs.modal", () => {
    const modalText = document.querySelector(
      "#successModal .modal-body"
    ).innerText;
    readText(modalText);
  });

  $("#successModal").on("hidden.bs.modal", () => {
    console.log("Modal success ditutup. Suara tetap aktif.");
  });

  // Menangani tombol close pada semua modal
  document.querySelectorAll('[data-dismiss="modal"]').forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      $(modal).modal("hide");

      if (modal.id === "welcomeModal") {
        // Matikan suara hanya untuk modal welcome jika tombol close atau X ditekan
        toggleSound(false);
        isModalClosed = true; // Mark modal as closed
      }
    });
  });

  // Tampilkan welcomeModal saat pertama kali halaman dimuat
  window.addEventListener("load", () => {
    if (!sessionStorage.getItem("modalShown")) {
      // Menampilkan modal hanya sekali saat halaman pertama kali dimuat
      $("#welcomeModal").modal("show");
      sessionStorage.setItem("modalShown", "true"); // Menyimpan status bahwa modal sudah ditampilkan
    } else if (isVoiceActive) {
      toggleSound(true);
    }
  });

  // Pastikan fitur suara tetap aktif di halaman baru
  window.addEventListener("beforeunload", () => {
    if (isVoiceActive) {
      sessionStorage.setItem("keepVoiceActive", "true");
    }
  });

  window.addEventListener("load", () => {
    if (sessionStorage.getItem("keepVoiceActive") === "true") {
      toggleSound(true);
      sessionStorage.removeItem("keepVoiceActive");
    }
  });
});
