document.addEventListener("DOMContentLoaded", () => {
  const isSoundEnabled = localStorage.getItem("soundEnabled") === "true";
  console.log("isSoundEnabled:", isSoundEnabled); // Debugging

  const speechText = `Selamat datang di Mensafe (Mental Safe), platform digital untuk mendukung kesehatan mental Anda dengan pendekatan ramah disabilitas. Jika Anda membutuhkan fitur text to speech, tolong ucapkan "Mensafe".`;

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = true;
  recognition.interimResults = true;

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
      if (recognition.state !== "running") { 
        try {
          recognition.start();
          localStorage.setItem("soundEnabled", "true"); 
          console.log("Fitur suara diaktifkan.");
        } catch (error) {
          console.error("Error memulai SpeechRecognition:", error);
        }
      }
    } else {
      stopSpeechRecognitionAndSynthesis();
      localStorage.setItem("soundEnabled", "false"); 
      console.log("Fitur suara dimatikan.");
    }
  }

  function stopSpeechRecognitionAndSynthesis() {
    if (recognition.state === "running") {
      recognition.stop();
      console.log("Speech Recognition dihentikan.");
    }
    window.speechSynthesis.cancel();
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

        if (command.includes("lanjutkan")) {
          $("#exampleModal").modal("hide");
          toggleSound(true); 
        }
      }
    }
  };

  recognition.onerror = (e) => {
    console.error("Error pada Speech Recognition:", e);
  };

  recognition.onend = () => {
    console.log("Speech Recognition ended");
    if (localStorage.getItem("soundEnabled") === "true") {
      recognition.start(); 
    }
  };

  // Jika fitur suara diaktifkan, langsung jalankan speech recognition di halaman baru
  if (isSoundEnabled) {
    toggleSound(true); 
  }

  window.addEventListener('load', () => {
    console.log("Page loaded");
    // Pastikan fitur suara tetap aktif di halaman ini
    if (localStorage.getItem("soundEnabled") === "true") {
      toggleSound(true); 
    }
  });

});
