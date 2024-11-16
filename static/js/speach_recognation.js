document.addEventListener("DOMContentLoaded", () => {
  // Memeriksa apakah modal harus ditampilkan berdasarkan sessionStorage
  const isModalClosed = sessionStorage.getItem("modalClosed") === "true";

  // Jika modal sudah ditutup, nonaktifkan fitur Text-to-Speech dan Speech Recognition
  if (isModalClosed) {
    stopSpeechRecognitionAndSynthesis(); // Menonaktifkan semua fitur terkait suara
  } else {
    // Menampilkan modal otomatis saat pertama kali diakses
    $("#exampleModal").modal("show");
  }

  // Pembaca otomatis (Text-to-Speech) saat modal ditampilkan
  const speechText = `Selamat datang di Mensafe (Mental Safe) platform digital untuk mendukung kesehatan mental Anda dengan pendekatan ramah disabilitas. Jika Anda membutuhkan fitur text to speech tolong ucapkan ?Mensafe?. 
                      Jika Anda menggunakan perangkat:
                      Dekstop: Arahkan kursor kemanapun
                      Mobile: Tekan dan tahan layar dimana saja
                      Lakukan hingga perangkat Anda mengeluarkan suara.`;

  // Fungsi untuk membaca teks
  function readText(text) {
    if (window.speechSynthesis.speaking) {
      console.log("Pembacaan teks dihentikan karena perintah suara.");
      window.speechSynthesis.cancel(); // Menghentikan pembacaan teks jika ada interupsi
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "id-ID"; // Menggunakan bahasa Indonesia
    speech.onstart = function () {
      console.log("Pembaca teks dimulai.");
    };
    speech.onerror = function (event) {
      console.error("Error dalam pembaca teks: ", event.error);
    };
    window.speechSynthesis.speak(speech); // Membaca teks
  }

  // Menunggu modal untuk benar-benar muncul, lalu membaca teks dengan pergerakan kursor
  $("#exampleModal").on("shown.bs.modal", function () {
    // Menunggu pergerakan kursor di dalam modal untuk mulai membaca teks
    $("#exampleModal").one("mousemove", function () {
      setTimeout(() => {
        readText(speechText); // Membaca teks otomatis setelah modal muncul
      }, 1000); // Delay 1000ms untuk memastikan modal sepenuhnya tampil
    });
  });

  // Inisialisasi Speech Recognition
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  // Kata kunci perintah yang valid
  const validCommands = new Set([
    "screening",
    "klik",
    "pencet",
    "periksa screening",
    "kembali",
    "sebelumnya",
    "home",
    "kirim",
    "submit",
    "selesai",
    "aktifkan", // Menambahkan perintah "mensafe"
  ]);

  let isProcessing = false;
  let isModalActive = true; // Menandakan apakah modal masih aktif atau tidak

  // Fungsi untuk memulai pencocokan perintah suara
  function processCommand(command) {
    if (isProcessing) return;
    isProcessing = true;

    // Pencocokan perintah
    const commandLower = command.toLowerCase();
    for (let validCommand of validCommands) {
      if (commandLower.includes(validCommand)) {
        // Jika perintah adalah "aktifkan" dan modal masih aktif
        if (validCommand === "aktifkan" && isModalActive) {
          console.log("Perintah 'aktifkan' diterima, menutup modal...");
          stopSpeechRecognitionAndSynthesis(); // Hentikan pembacaan suara sebelum menutup modal
          $("#exampleModal").modal("hide"); // Menutup modal
          isModalActive = false; // Nonaktifkan modal
          sessionStorage.setItem("modalClosed", "true"); // Menyimpan status modal ditutup
          isProcessing = false;
          return;
        }

        // Perintah lainnya tetap berjalan seperti biasa
        if (
          commandLower.includes("screening") ||
          commandLower.includes("pencet") ||
          commandLower.includes("periksa")
        ) {
          stopSpeechRecognitionAndSynthesis(); // Hentikan pembacaan suara sebelum navigasi
          window.location.href = "/screening"; // Arahkan ke halaman screening
          isProcessing = false;
          return;
        }

        if (
          commandLower.includes("kirim") ||
          commandLower.includes("submit") ||
          commandLower.includes("selesai")
        ) {
          stopSpeechRecognitionAndSynthesis(); // Hentikan pembacaan suara sebelum mengirim form
          const form = document.querySelector("form");
          form.submit(); // Mengirim form
          isProcessing = false;
          return;
        }

        // Perintah untuk kembali
        if (
          commandLower.includes("kembali") ||
          commandLower.includes("sebelumnya") ||
          commandLower.includes("home")
        ) {
          stopSpeechRecognitionAndSynthesis(); // Hentikan pembacaan suara sebelum kembali
          window.history.back(); // Kembali ke halaman sebelumnya
          isProcessing = false;
          return;
        }
      }
    }
    isProcessing = false; // Perintah tidak dikenali
  }

  // Ketika ada hasil dari speech recognition
  recognition.onresult = function (event) {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const command = event.results[i][0].transcript;
        console.log("Perintah suara: ", command);
        processCommand(command);
      } else {
        console.log("Mendengarkan: ", event.results[i][0].transcript);
      }
    }
  };

  recognition.onend = function () {
    if (isModalActive) {
      recognition.start(); // Melanjutkan pengenalan suara jika modal masih aktif
    }
  };

  // Fungsi untuk menonaktifkan fitur suara dan teks ketika modal ditutup
  const closeModalButton = document.querySelector('[data-dismiss="modal"]');
  closeModalButton.addEventListener("click", () => {
    console.log("Modal ditutup, menonaktifkan fitur suara...");
    stopSpeechRecognitionAndSynthesis();
    sessionStorage.setItem("modalClosed", "true"); // Menyimpan status modal ditutup
  });

  // Fungsi untuk menonaktifkan Speech Recognition dan Text-to-Speech secara global
  function stopSpeechRecognitionAndSynthesis() {
    recognition.stop(); // Menghentikan pengenalan suara
    window.speechSynthesis.cancel(); // Membatalkan pembacaan suara
    isModalActive = false; // Nonaktifkan modal dan fitur lainnya
  }

  recognition.start(); // Mulai pengenalan suara
});
