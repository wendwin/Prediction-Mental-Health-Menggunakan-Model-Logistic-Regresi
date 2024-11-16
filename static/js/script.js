// // Pilih semua elemen radio button
// const radioButtons = document.querySelectorAll(".form-check-input");

// radioButtons.forEach((radio) => {
//   radio.addEventListener("change", () => {
//     // Ketika radio button dipilih, atur semua radio ke abu-abu
//     radioButtons.forEach((rb) => {
//       rb.style.backgroundColor = "#cccccc"; // Abu-abu untuk yang tidak dipilih
//       rb.style.border = "1px solid #aaaaaa";
//     });

//     // Atur radio yang dipilih ke biru
//     radio.style.backgroundColor = "#0037ff"; // Biru untuk yang dipilih
//     radio.style.border = "2px solid #007958";
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("modalShown")) {
    setTimeout(function () {
      $("#exampleModal").modal("show");
      localStorage.setItem("modalShown", "true");
    }, 1000);
  }
});

document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");

  if (window.scrollY > 0) {
    // Tambahkan kelas border-bottom hanya saat scroll
    navbar.classList.add("border-bottom");
  } else {
    // Hapus kelas border-bottom saat scroll kembali ke atas
    navbar.classList.remove("border-bottom");
  }
});
