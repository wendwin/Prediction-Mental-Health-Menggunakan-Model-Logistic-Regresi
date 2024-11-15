// navigasi-suara.js
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Speech Recognition
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "id-ID"; 
  recognition.continuous = true; 
  recognition.interimResults = true; 
  recognition.maxAlternatives = 1; 

  // Kata kunci perintah yang valid
  const validCommands = new Set([
    "klik untuk screening",
    "screening",
    "sklining",
    "sining",
    "skining",
    "skening",
    "periksa screening",
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
        console.log("Perintah valid diterima, menuju halaman screening...");
        window.location.href = "/screening"; 
        isProcessing = false; 
        return;
      }
    }

    console.log("Perintah tidak dikenali atau kurang tepat.");
    isProcessing = false; 
  }

  // Ketika ada hasil dari speech recognition
  recognition.onresult = function (event) {
    const command = event.results[0][0].transcript; 
    console.log("Perintah suara: ", command);
    processCommand(command); 
  };

  // Menangani hasil sementara
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

  recognition.onerror = function (event) {
    console.log("Error saat mendeteksi suara:", event.error);
  };

  recognition.onend = function () {
    console.log("Speech recognition selesai, memulai kembali...");
    recognition.start(); 
  };

  recognition.start();
});