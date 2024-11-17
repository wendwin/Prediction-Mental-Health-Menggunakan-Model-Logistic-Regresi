document.addEventListener("DOMContentLoaded", () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = true;
  recognition.interimResults = true;

  let isVoiceActive = sessionStorage.getItem("voiceActive") === "true";
  let isModalClosed = false;

  const readText = (text) => {
    if (text && text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = "id-ID";
      utterance.onend = () => console.log("Pembacaan teks selesai.");
      utterance.onerror = (e) => console.error("Error pada TTS:", e);
      window.speechSynthesis.speak(utterance);
    }
  };

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

  const stopSpeechRecognitionAndSynthesis = () => {
    if (recognition.state === "running") {
      recognition.stop();
      console.log("Speech Recognition dihentikan.");
    }
    window.speechSynthesis.cancel();
  };

  const navigateToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const command = event.results[i][0].transcript.toLowerCase();
        console.log("Perintah suara:", command);

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
          sessionStorage.setItem("modalShown", "true");
        } else if (command.includes("kirim")) {
          const form = document.querySelector("form");
          if (form) {
            console.log("Formulir dikirim melalui perintah suara.");
            form.submit();
          }
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

  $("#welcomeModal").on("shown.bs.modal", () => {
    const modalText = document.querySelector(
      "#welcomeModal .modal-body"
    ).innerText;
    readText(modalText);
    toggleSound(true);
  });

  $("#welcomeModal").on("hidden.bs.modal", () => {
    console.log("Modal welcome ditutup.");
    isModalClosed = true;
    if (!sessionStorage.getItem("keepVoiceActive")) {
      toggleSound(false);
    }
  });

  $("#successModal").on("shown.bs.modal", () => {
    const modalText = document.querySelector(
      "#successModal .modal-body"
    ).innerText;
    readText(modalText);
  });

  $("#successModal").on("hidden.bs.modal", () => {
    console.log("Modal success ditutup. Suara tetap aktif.");
  });

  document.querySelectorAll('[data-dismiss="modal"]').forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      $(modal).modal("hide");

      if (modal.id === "welcomeModal") {
        toggleSound(false);
        isModalClosed = true;
      }
    });
  });

  window.addEventListener("load", () => {
    if (!sessionStorage.getItem("modalShown")) {
      $("#welcomeModal").modal("show");
      sessionStorage.setItem("modalShown", "true");
    } else if (isVoiceActive) {
      toggleSound(true);
    }
  });

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
