document.addEventListener("DOMContentLoaded", () => {
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
    "screening",
    "pencet",
    "sklining",
    "sining",
    "skining",
    "skening",
    "periksa screening",
    "kembali", 
    "sebelumnya", 
    "home",
    "kirim", 
    "submit", 
    "selesai" 
  ]);

  let isProcessing = false;

  // Fungsi untuk memulai pencocokan perintah suara
  function processCommand(command) {
    if (isProcessing) return;
    isProcessing = true;

    // Pencocokan perintah
    const commandLower = command.toLowerCase();
    for (let validCommand of validCommands) {
      if (commandLower.includes(validCommand)) {
        if (
          validCommand === "kembali" ||
          validCommand === "sebelumnya" ||
          validCommand === "home"
        ) {
          // console.log(
          //   "Perintah 'kembali' atau 'sebelumnya' diterima, kembali ke halaman sebelumnya..."
          // );
          window.history.back(); 
          isProcessing = false;
          return;
        }

        // Jika perintah adalah salah satu yang terkait dengan screening
        if (
          commandLower.includes("screening") ||
          commandLower.includes("pencet") ||
          commandLower.includes("periksa") ||
          commandLower.includes("sklining") ||
          commandLower.includes("sining") ||
          commandLower.includes("skining") ||
          commandLower.includes("klik")
        ) {
          // console.log("Perintah valid diterima, menuju halaman screening...");
          window.location.href = "/screening";
          isProcessing = false;
          return;
        }

        // Jika perintah untuk mengirim form
        if (
          commandLower.includes("kirim") ||
          commandLower.includes("submit") ||
          commandLower.includes("selesai")
        ) {
          const form = document.querySelector("form");
          // console.log("Perintah 'kirim' diterima, mengirim form...");
          form.submit(); 
          isProcessing = false;
          return;
        }
      }
    }
   
    // console.log("Perintah tidak dikenali atau kurang tepat.");
    // isProcessing = false;
  }

  // Ketika ada hasil dari speech recognition
  recognition.onresult = function (event) {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const command = event.results[i][0].transcript;
        // console.log("Perintah suara: ", command);
        processCommand(command);
      } else {
        // console.log("Mendengarkan: ", event.results[i][0].transcript);
      }
    }
  };

  // // recognition.onerror = function (event) {
  // //   console.log("Error saat mendeteksi suara:", event.error);
  // };

  recognition.onend = function () {
    recognition.start();
  };

  recognition.start();
});
