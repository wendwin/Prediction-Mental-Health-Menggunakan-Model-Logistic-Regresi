-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 16 Nov 2024 pada 06.27
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `berkah_abadidb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `screening_results`
--

CREATE TABLE `screening_results` (
  `id` int NOT NULL,
  `anxiety_level` float NOT NULL,
  `self_esteem` float NOT NULL,
  `mental_health_history` tinyint(1) NOT NULL,
  `depression` float NOT NULL,
  `headache` float NOT NULL,
  `blood_pressure` float NOT NULL,
  `sleep_quality` float NOT NULL,
  `quest8` float NOT NULL,
  `noise_level` float NOT NULL,
  `safety` float NOT NULL,
  `quest11` float NOT NULL,
  `quest12` float NOT NULL,
  `academic_performance` float NOT NULL,
  `study_load` float NOT NULL,
  `work_load` float NOT NULL,
  `relationship_with_supervisor` float NOT NULL,
  `quest17` float NOT NULL,
  `quest19` float NOT NULL,
  `extracurricular_activity` float NOT NULL,
  `quest21` float NOT NULL,
  `stress_zone` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `screening_results`
--

INSERT INTO `screening_results` (`id`, `anxiety_level`, `self_esteem`, `mental_health_history`, `depression`, `headache`, `blood_pressure`, `sleep_quality`, `quest8`, `noise_level`, `safety`, `quest11`, `quest12`, `academic_performance`, `study_load`, `work_load`, `relationship_with_supervisor`, `quest17`, `quest19`, `extracurricular_activity`, `quest21`, `stress_zone`) VALUES
(1, 3, 6, 1, 7, 2, 2, 3, 0, 3, 3, 2, 3, 5, 0, 0, 0, 2, 5, 0, 2, 2),
(2, 11, 29, 1, 14, 5, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 2),
(3, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 4, 0, 5, 0, 0, 1),
(4, 0, 30, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `screening_results`
--
ALTER TABLE `screening_results`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `screening_results`
--
ALTER TABLE `screening_results`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
