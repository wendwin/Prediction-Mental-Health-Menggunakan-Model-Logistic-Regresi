// document.addEventListener("DOMContentLoaded", () => {
//   // Speech Synthesis Setup
//   const speech = new SpeechSynthesisUtterance();
//   speech.lang = "id-ID";
//   speech.rate = 1.2;
//   speech.pitch = 1.0;

//   function setVoice() {
//     const voices = window.speechSynthesis.getVoices();
//     const voice = voices.find(
//       (voice) => voice.lang === "id-ID" && voice.name.includes("Google")
//     );
//     if (voice) speech.voice = voice;
//   }

//   // Pastikan suara tersedia sebelum pembacaan
//   if (window.speechSynthesis.onvoiceschanged !== undefined) {
//     window.speechSynthesis.onvoiceschanged = setVoice;
//   } else {
//     setVoice(); // Untuk beberapa browser
//   }

//   function bacaTeks(teks) {
//     if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel();
//     }
//     speech.text = teks;
//     window.speechSynthesis.speak(speech);
//   }

//   // Handle Modal Events
//   const modal = document.getElementById("exampleModal");

//   modal.addEventListener("show.bs.modal", () => {
//     // Ambil semua teks di dalam modal
//     const modalBody = modal.querySelector(".modal-body");
//     if (modalBody) {
//       const modalText = modalBody.innerText;
//       bacaTeks(modalText); // Bacakan teks saat modal muncul
//     }
//   });

//   modal.addEventListener("hide.bs.modal", () => {
//     // Hentikan pembacaan saat modal ditutup
//     window.speechSynthesis.cancel();
//   });
// });
