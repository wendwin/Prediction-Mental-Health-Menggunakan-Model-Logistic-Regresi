document.addEventListener("DOMContentLoaded", () => {
  const speechText =
    "Selamat datang di Mensafe (Mental Safe), platform digital untuk mendukung kesehatan mental Anda dengan pendekatan ramah disabilitas. Jika Anda membutuhkan fitur text to speech, tolong ucapkan 'Mensafe'.";

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = true;
  recognition.interimResults = true;

  let isSpeechActive = sessionStorage.getItem("isSpeechActive") === "true"; // Cek status dari sessionStorage

  function readText(text) {
    if (text && text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = "id-ID";
      utterance.onend = () => console.log("Pembacaan teks selesai.");
      utterance.onerror = (e) => console.error("Error pada TTS:", e);
      window.speechSynthesis.speak(utterance);
    }
  }

  function toggleSound(enable) {
    if (enable) {
      if (recognition.state !== "running" && !isSpeechActive) {
        try {
          recognition.start();
          console.log("Fitur suara diaktifkan.");
          isSpeechActive = true; // Menandai TTS dan SR aktif
          sessionStorage.setItem("isSpeechActive", "true"); // Simpan status di sessionStorage
        } catch (error) {
          console.error("Error memulai SpeechRecognition:", error);
        }
      }
    } else {
      stopSpeechRecognitionAndSynthesis();
      console.log("Fitur suara dimatikan.");
      isSpeechActive = false; // Menandai TTS dan SR tidak aktif
      sessionStorage.setItem("isSpeechActive", "false"); // Simpan status di sessionStorage
    }
  }

  function stopSpeechRecognitionAndSynthesis() {
    if (recognition.state === "running") {
      recognition.stop();
      console.log("Speech Recognition dihentikan.");
    }
    window.speechSynthesis.cancel();
    console.log("TTS dihentikan.");
  }

  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const command = event.results[i][0].transcript.toLowerCase();
        console.log("Perintah suara:", command);

        if (
          command.includes("screening") ||
          command.includes("cek sekarang") ||
          command.includes("mulai")
        ) {
          window.location.href = "/screening";
        }

        if (command.includes("kembali") || command.includes("back")) {
          window.history.back();
        }

        if (command.includes("lanjutkan") || command.includes("teruskan")) {
          $("#exampleModal").modal("hide");
          toggleSound(true); // Tetap aktifkan Speech Recognition setelah modal ditutup
        }
      }
    }
  };

  recognition.onerror = (e) => {
    console.error("Error pada Speech Recognition:", e);
  };

  recognition.onend = () => {
    console.log("Speech Recognition ended");
    if (isSpeechActive) {
      toggleSound(true); // Restart Speech Recognition jika masih aktif
    }
  };

  const modalShownKey = "modalShown";

  if (!localStorage.getItem(modalShownKey)) {
    $("#exampleModal").modal("show");
    localStorage.setItem(modalShownKey, "true");
    toggleSound(true); // Aktifkan Speech Recognition ketika modal muncul pertama kali
  }

  $("#exampleModal").on("hidden.bs.modal", () => {
    console.log("Modal ditutup");
    toggleSound(false); // Hentikan Speech Recognition dan Synthesis saat modal ditutup
  });

  document.querySelectorAll('[data-dismiss="modal"]').forEach((button) => {
    if (button) {
      button.addEventListener("click", () => {
        console.log("Tombol Close atau X ditekan");
        $("#exampleModal").modal("hide");
        toggleSound(false); // Hentikan Speech Recognition dan Synthesis saat tombol close ditekan
      });
    }
  });

  window.addEventListener("load", () => {
    console.log("Page loaded");
    toggleSound(false); // Reset SR dan TTS ketika halaman dimuat
  });

  $("#exampleModal").on("shown.bs.modal", () => {
    readText(speechText); // Membaca teks penyambutan saat modal muncul
  });

  // Detect mouse position and trigger TTS if mouse is near center of the screen
  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

    if (distance < 150 && !isSpeechActive) { // Trigger when mouse is near the center
      console.log("Cursor berada di tengah layar, memulai pembacaan otomatis");
      readText(speechText); // Auto-read text
    }
  });
});
