-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 10, 2023 at 02:22 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecole`
--

-- --------------------------------------------------------

--
-- Table structure for table `avis`
--

CREATE TABLE `avis` (
  `id` int(11) NOT NULL,
  `valeur` decimal(3,1) DEFAULT NULL,
  `id_eleve` int(11) NOT NULL,
  `id_cours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `avis`
--

INSERT INTO `avis` (`id`, `valeur`, `id_eleve`, `id_cours`) VALUES
(2, '5.0', 1, 1),
(3, '5.0', 2, 2),
(5, '4.3', 3, 1),
(6, '3.2', 4, 2),
(7, '4.2', 5, 1),
(8, '5.0', 6, 2),
(30, '3.3', 1, 2),
(33, '4.8', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `cours`
--

CREATE TABLE `cours` (
  `id` int(11) NOT NULL,
  `id_professeur` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cours`
--

INSERT INTO `cours` (`id`, `id_professeur`, `nom`) VALUES
(1, 1, 'Anglais'),
(2, 2, 'Base de données'),
(3, 3, 'Back-end'),
(5, 4, 'la gestion de projet informatique'),
(6, 5, 'Communication'),
(7, 1, 'Management SI'),
(8, 2, 'SEO'),
(9, 3, 'Front-End');

-- --------------------------------------------------------

--
-- Table structure for table `eleve`
--

CREATE TABLE `eleve` (
  `id` int(11) NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `eleve`
--

INSERT INTO `eleve` (`id`, `prenom`, `nom`) VALUES
(1, 'said', 'abar'),
(2, 'hamza', 'biner'),
(3, 'Jul', 'sada'),
(4, 'aimane', 'bilali'),
(5, 'Tom', 'jail'),
(6, 'Taha', 'sbai');

-- --------------------------------------------------------

--
-- Table structure for table `planning`
--

CREATE TABLE `planning` (
  `id` int(11) NOT NULL,
  `jour_planning` date DEFAULT NULL,
  `debut_planning` time DEFAULT NULL,
  `fin_planning` time DEFAULT NULL,
  `id_cours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `planning`
--

INSERT INTO `planning` (`id`, `jour_planning`, `debut_planning`, `fin_planning`, `id_cours`) VALUES
(5, '2023-03-20', '12:00:00', '14:00:00', 2),
(10, '2023-03-21', '11:00:00', '12:00:00', 3),
(11, '2023-03-26', '08:00:00', '10:00:00', 5),
(12, '2023-03-27', '10:00:00', '14:00:00', 6),
(16, '2023-03-25', '10:00:00', '12:00:00', 5);

-- --------------------------------------------------------

--
-- Table structure for table `professeur`
--

CREATE TABLE `professeur` (
  `id` int(11) NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `professeur`
--

INSERT INTO `professeur` (`id`, `prenom`, `nom`) VALUES
(1, 'Stephan', 'bourak'),
(2, 'Jul', 'zantat'),
(3, 'Ahmed', 'saitit'),
(4, 'Zaid', 'farkh'),
(5, 'Moustapha', 'bhar');

-- --------------------------------------------------------

--
-- Table structure for table `programme`
--

CREATE TABLE `programme` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apprentissage` tinyint(1) NOT NULL,
  `id_type_programme` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `programme`
--

INSERT INTO `programme` (`id`, `nom`, `apprentissage`, `id_type_programme`) VALUES
(3, 'Math', 1, 1),
(5, 'Info', 1, 1),
(6, 'Commerce', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `type_programme`
--

CREATE TABLE `type_programme` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `type_programme`
--

INSERT INTO `type_programme` (`id`, `nom`) VALUES
(1, 'license'),
(2, 'ingénieur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cours` (`id_cours`),
  ADD KEY `id_eleve` (`id_eleve`);

--
-- Indexes for table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_professeur` (`id_professeur`);

--
-- Indexes for table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planning`
--
ALTER TABLE `planning`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cours` (`id_cours`);

--
-- Indexes for table `professeur`
--
ALTER TABLE `professeur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programme`
--
ALTER TABLE `programme`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_type_programme` (`id_type_programme`);

--
-- Indexes for table `type_programme`
--
ALTER TABLE `type_programme`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `planning`
--
ALTER TABLE `planning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `professeur`
--
ALTER TABLE `professeur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `programme`
--
ALTER TABLE `programme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `type_programme`
--
ALTER TABLE `type_programme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_fk_1` FOREIGN KEY (`id_eleve`) REFERENCES `eleve` (`id`),
  ADD CONSTRAINT `avis_fk_2` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id`);

--
-- Constraints for table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `cours_fk_1` FOREIGN KEY (`id_professeur`) REFERENCES `professeur` (`id`);

--
-- Constraints for table `planning`
--
ALTER TABLE `planning`
  ADD CONSTRAINT `planning_fk_1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id`);

--
-- Constraints for table `programme`
--
ALTER TABLE `programme`
  ADD CONSTRAINT `programme_fk_1` FOREIGN KEY (`id_type_programme`) REFERENCES `type_programme` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
