-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 14 Nov 2024 pada 10.37
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
  `anxiety_level` float DEFAULT NULL,
  `self_esteem` float DEFAULT NULL,
  `mental_health_history` tinyint(1) DEFAULT NULL,
  `depression` float DEFAULT NULL,
  `headache` float DEFAULT NULL,
  `blood_pressure` float DEFAULT NULL,
  `sleep_quality` float DEFAULT NULL,
  `breathing_problem` float DEFAULT NULL,
  `noise_level` float DEFAULT NULL,
  `living_conditions` float DEFAULT NULL,
  `safety` float DEFAULT NULL,
  `basic_needs` float DEFAULT NULL,
  `academic_performance` float DEFAULT NULL,
  `study_load` float DEFAULT NULL,
  `teacher_student_relationship` float DEFAULT NULL,
  `future_career_concerns` float DEFAULT NULL,
  `social_support` float DEFAULT NULL,
  `peer_pressure` float DEFAULT NULL,
  `extracurricular_activities` float DEFAULT NULL,
  `bullying` float DEFAULT NULL,
  `stress_zone` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `screening_results`
--

INSERT INTO `screening_results` (`id`, `anxiety_level`, `self_esteem`, `mental_health_history`, `depression`, `headache`, `blood_pressure`, `sleep_quality`, `breathing_problem`, `noise_level`, `living_conditions`, `safety`, `basic_needs`, `academic_performance`, `study_load`, `teacher_student_relationship`, `future_career_concerns`, `social_support`, `peer_pressure`, `extracurricular_activities`, `bullying`, `stress_zone`, `created_at`) VALUES
(1, 10, 20, 1, 10, 0, 0, 3, 1, 3, 3, 3, 3, 0, 5, 3, 5, 3, 5, 4, 3, 1, '2024-11-14 09:19:12'),
(2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2024-11-14 10:03:55');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
