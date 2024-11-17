document.addEventListener("DOMContentLoaded", () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = true;
  recognition.interimResults = true;

  let isVoiceActive = sessionStorage.getItem("voiceActive") === "true";

  // Fungsi untuk membaca teks
  function readText(text) {
    if (text && text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = "id-ID";
      utterance.onend = () => console.log("Pembacaan teks selesai.");
      utterance.onerror = (e) => console.error("Error pada TTS:", e);
      window.speechSynthesis.speak(utterance);
    }
  }

  // Fungsi untuk mengaktifkan/mematikan suara
  function toggleSound(enable) {
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
  }

  // Fungsi menghentikan RS dan TTS
  function stopSpeechRecognitionAndSynthesis() {
    if (recognition.state === "running") {
      recognition.stop();
      console.log("Speech Recognition dihentikan.");
    }
    window.speechSynthesis.cancel();
  }

  // Menangani hasil dari RS
  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const command = event.results[i][0].transcript.toLowerCase();
        console.log("Perintah suara:", command);

        //halaman testing models
        if (command.includes("screening") || command.includes("cek sekarang")) {
          window.location.href = "/screening";
        }

        if (command.includes("kembali") || command.includes("back")) {
          window.history.back();
        }

        // Perintah untuk "Informasi"
        if (command.includes("informasi") || command.includes("info")) {
          navigateToSection("#info");
        }

        // Perintah untuk "Layanan Konsultasi"
        if (command.includes("layanan") || command.includes("konsultasi")) {
          navigateToSection("#konsultasi");
        }

        if (command.includes("lanjutkan") || command.includes("teruskan")) {
          $("#exampleModal").modal("hide");
          toggleSound(true);
          sessionStorage.setItem("modalShown", "true");
        }
      }
    }
  };

  // Fungsi untuk menavigasi ke bagian tertentu di halaman
  function navigateToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  recognition.onerror = (e) =>
    console.error("Error pada Speech Recognition:", e);

  recognition.onend = () => {
    console.log("Speech Recognition ended");
    if (isVoiceActive) {
      toggleSound(true);
    }
  };

  // Membaca teks dalam modal saat ditampilkan
  $("#exampleModal").on("shown.bs.modal", () => {
    const modalText = document.querySelector(
      "#exampleModal .modal-body"
    ).innerText;
    readText(modalText);
    toggleSound(true);
  });

  // Menutup modal lewat tombol dan menonaktifkan suara
  $("#exampleModal").on("hidden.bs.modal", () => {
    if (!isVoiceActive) {
      toggleSound(false);
    }
  });

  // Menangani penutupan modal via tombol close
  document.querySelectorAll('[data-dismiss="modal"]').forEach((button) => {
    button.addEventListener("click", () => {
      $("#exampleModal").modal("hide");
      toggleSound(false);
      sessionStorage.setItem("modalShown", "true");
    });
  });

  // Tampilkan modal hanya saat pertama kali halaman dimuat dalam sesi
  window.addEventListener("load", () => {
    if (!sessionStorage.getItem("modalShown")) {
      $("#exampleModal").modal("show");
    } else {
      if (isVoiceActive) {
        toggleSound(true);
      }
    }
  });
});
