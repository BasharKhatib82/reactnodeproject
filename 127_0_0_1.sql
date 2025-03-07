-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2025 at 06:38 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inquiry_management_db`
--
CREATE DATABASE IF NOT EXISTS `inquiry_management_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `inquiry_management_db`;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` varchar(9) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `age` int(5) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_password_change` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `age`, `phone_number`, `email`, `role`, `username`, `password`, `last_password_change`) VALUES
('050765432', 'אליאס', 'חטיב', 20, '0503000011', 'admin@gmail.com', 'admin', 'shushu', '$2b$10$KS9.bMg0uX4Ne.9dKojHoOj1jlGGsmqWq0.Bc3Rzd4DGvTeuUJim.', NULL),
('066043160', 'נועה', 'לוי', 28, '0541234567', 'noa.levi@example.com', 'user', 'lowey', '$2b$10$MD.YllZmNTiRhSl1jcxxluXS9X9eYpJpr.9AyRUS9rpRbtFHejwna', NULL),
('066043167', 'בשאר', 'ח\'טיב', 40, '0503000093', 'ba.khatib.82@gmail.com', 'user', 'khatib', '$2b$10$/c6Cz/0xXSZGlh657j6V/.FbIdCWVyTeowe4OoKAlQW1ygfJJ5zw2', NULL),
('315483032', 'טארק', 'שלטף', 25, '0545710021', 'tareq.nm1@gmail.com', 'admin', 'shaltaf', '$2b$10$7bIfKtJx2yBdjdT73QF9OuWY1UkSP1yr8KECwwiOaR2aONO9Va36W', NULL),
('319000032', 'עומר', 'שרון', 66, '0544714891', 'omer.sharon@example.com', 'user', 'sharon', '$2b$10$EDJFuhD2bw.jgA5Z5rmareECoLOGM4KBXlXKzRzmTMIOq9HSj4BXq', NULL),
('319060032', 'שיר', 'בן דוד', 29, '0546710021', 'shir.bendavid@example.com', 'user', 'bendaved', '$2b$10$eL3x4zh6Q4YyScKenpGGZeccF14H3mgZq6WZKhUnBSU/VDayGbAje', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `lead_id` int(10) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `city` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`lead_id`, `first_name`, `last_name`, `phone_number`, `email`, `course_name`, `city`, `status`) VALUES
(1, 'דניאל', 'כהן', '0529876543', 'daniel.cohen@example.com', 'מדעי הנתונים', 'ירושלים', 'בטיפול'),
(2, 'עומר', 'פרץ', '0501122334', 'omer.peretz@example.com', 'הנדסת תוכנה', 'באר שבע', 'חדש'),
(3, 'שני', 'גל', '0587654321', 'gal.shani@example.com', 'למידת מכונה', 'ראשון לציון', 'חדש'),
(4, 'אלון', 'מזרחי', '0503000099', 'alon.mizrahi@example.com', 'Full Stack פיתוח ', 'נצרת', 'בטיפול'),
(5, 'רועי', 'גולדמן', '0503022093', 'roi.goldman@example.com', 'מנהל עסקים', 'נתניה', 'טופל');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(255) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
  `deadline` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `title`, `content`, `deadline`) VALUES
(1, 'תכנון פגישת התנעה לפרויקט Alpha', 'ארגון והכנת סדר יום לפגישת התנעה עבור פרויקט Alpha.', '2025-12-30'),
(3, 'אמל', 'איסוף נתוני מכירות והפקת דוח מסכם עבור חודש מרץ.', '2025-05-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`lead_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `lead_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `task_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
