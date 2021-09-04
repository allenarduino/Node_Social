-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 01, 2021 at 06:25 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Teklife`
--

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `n_token` text NOT NULL,
  `active` text NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `user_id`, `n_token`, `active`, `created_at`) VALUES
(3, 8, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[JIBnXOPjWYaGv4ae9mwXvJ]\"}', '', '0000-00-00 00:00:00'),
(4, 11, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[80SJktDQRkL2I4Pwgaw83s]\"}', '', '0000-00-00 00:00:00'),
(5, 16, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[0X_dOaFB4e1QhVUKjk5s2V]\"}', '', '0000-00-00 00:00:00'),
(6, 30, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[wKPpAmJydjW5bc07kNxRr0]\"}', '', '0000-00-00 00:00:00'),
(7, 31, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[B2uZRRP8hKfNKbdBAPWkhx]\"}', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receipient_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `message_file` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receipient_id`, `message`, `message_file`, `created_at`) VALUES
(9, 58, 60, 'Hi bro.', '', '2021-08-31 16:59:17'),
(10, 58, 59, 'Hello ', '', '2021-08-31 17:29:21'),
(11, 58, 59, 'Heyyyyy', '', '2021-08-31 17:30:37'),
(12, 59, 58, 'Hello\n', '', '2021-08-31 17:31:25'),
(14, 58, 60, 'Heyyyy', '', '2021-09-01 03:24:34'),
(15, 58, 59, 'Hi bro.', '', '2021-09-01 08:45:03'),
(16, 58, 60, 'Yo', '', '2021-09-01 08:45:32'),
(17, 58, 59, 'Hello bro.', '', '2021-09-01 08:49:57'),
(18, 58, 59, 'What\'s up', '', '2021-09-01 08:50:03'),
(19, 58, 59, 'How\'s life', '', '2021-09-01 08:50:08'),
(20, 58, 59, 'Hi bro.', '', '2021-09-01 10:59:25'),
(21, 58, 59, 'Hi', '', '2021-09-01 11:01:18'),
(22, 59, 58, 'Hello ', '', '2021-09-01 15:28:15');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `p_id` int(11) NOT NULL,
  `post_caption` text CHARACTER SET utf8mb4,
  `post_media` text,
  `is_video` varchar(60) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`p_id`, `post_caption`, `post_media`, `is_video`, `owner_id`, `created_at`) VALUES
(87, 'Hello everyone 👋🏻,how\'s life?', NULL, NULL, 58, '2021-08-30 20:13:40'),
(88, '', 'uploads/IMAGE-1630420982148.jpg', 'false', 60, '2021-08-31 14:43:03'),
(90, 'Hello everyone, 👋🏻 How\'s everything?😊', NULL, NULL, 58, '2021-08-31 15:58:24'),
(91, '', 'uploads/IMAGE-1630428814357.png', 'false', 58, '2021-08-31 16:53:35'),
(92, 'Hello everyone I’m new to this ', NULL, NULL, 59, '2021-08-31 17:27:59');

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `id` int(11) NOT NULL,
  `text` text CHARACTER SET utf8mb4 NOT NULL,
  `comment_media` text NOT NULL,
  `C_post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_comments`
--

INSERT INTO `post_comments` (`id`, `text`, `comment_media`, `C_post_id`, `user_id`, `created_at`) VALUES
(1, 'Hello Bro.', '', 87, 60, '2021-08-31 14:42:25'),
(3, 'Hello', '', 88, 59, '2021-08-31 14:46:13'),
(4, 'Hello bro.', '', 88, 58, '2021-08-31 15:57:04'),
(5, ' Nice 🙂', '', 84, 58, '2021-08-31 15:57:39'),
(6, 'Heyyy', '', 84, 58, '2021-08-31 15:57:52'),
(8, 'Commenting', '', 92, 59, '2021-08-31 17:41:56');

-- --------------------------------------------------------

--
-- Table structure for table `post_comment_likes`
--

CREATE TABLE `post_comment_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_comment_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `post_liker` int(11) NOT NULL,
  `L_post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id`, `post_liker`, `L_post_id`, `created_at`) VALUES
(840, 56, 65, '2021-08-27 20:51:04'),
(842, 56, 66, '2021-08-27 20:58:01'),
(843, 56, 67, '2021-08-27 20:58:49'),
(846, 56, 68, '2021-08-27 21:41:06'),
(847, 56, 69, '2021-08-27 21:49:24'),
(851, 56, 63, '2021-08-27 22:10:36'),
(853, 56, 62, '2021-08-28 00:00:50'),
(855, 56, 70, '2021-08-28 00:06:35'),
(856, 56, 72, '2021-08-28 00:09:04'),
(858, 57, 72, '2021-08-28 01:12:13'),
(859, 57, 70, '2021-08-28 01:15:13'),
(860, 57, 74, '2021-08-28 02:11:56'),
(864, 57, 75, '2021-08-28 16:17:43'),
(870, 57, 76, '2021-08-29 01:27:14'),
(872, 57, 73, '2021-08-29 03:32:33'),
(874, 56, 79, '2021-08-29 17:30:25'),
(877, 56, 71, '2021-08-29 21:39:53'),
(878, 56, 81, '2021-08-29 22:10:26'),
(879, 56, 82, '2021-08-30 00:31:51'),
(880, 56, 80, '2021-08-30 00:33:14'),
(881, 56, 78, '2021-08-30 00:35:41'),
(882, 58, 84, '2021-08-30 12:15:04'),
(883, 58, 85, '2021-08-30 12:26:02'),
(884, 58, 86, '2021-08-30 20:11:37'),
(888, 60, 84, '2021-08-31 14:38:32'),
(891, 58, 89, '2021-08-31 15:53:01'),
(893, 58, 90, '2021-08-31 15:58:29'),
(896, 58, 91, '2021-08-31 16:53:40'),
(899, 59, 92, '2021-08-31 17:41:42'),
(900, 59, 91, '2021-08-31 17:42:11'),
(901, 58, 92, '2021-08-31 17:43:48'),
(903, 58, 88, '2021-09-01 08:54:48'),
(904, 58, 87, '2021-09-01 08:55:26'),
(905, 67, 92, '2021-09-01 16:00:37');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float(10,2) NOT NULL,
  `product_img` text NOT NULL,
  `description` text CHARACTER SET utf8mb4,
  `phone_number` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `product_img`, `description`, `phone_number`, `user_id`, `created_at`) VALUES
(8, 'Black T-shirt', 30.00, 'uploads/IMAGE-1630326744616.jpg', '', '0543201893', 58, '2021-08-30 12:32:24'),
(9, 'Silver Jacket', 35.00, 'uploads/IMAGE-1630326807378.jpg', '', '0543201893', 58, '2021-08-30 12:33:27'),
(10, 'White Shoe ', 150.00, 'uploads/IMAGE-1630327029466.jpg', '', '0543201893', 58, '2021-08-30 12:37:09'),
(11, 'Wine Jacket', 45.00, 'uploads/IMAGE-1630327094920.jpg', '', '0543201893', 58, '2021-08-30 12:38:15'),
(12, 'Yellow Shoe', 180.00, 'uploads/IMAGE-1630327193735.jpg', '', '0543201893', 58, '2021-08-30 12:39:53'),
(13, 'Pink Sneakers', 150.00, 'uploads/IMAGE-1630327376292.jpg', 'This is new in town and very affordable ?', '0543201893', 58, '2021-08-30 12:42:57'),
(14, 'Family Necklace', 40.00, 'uploads/IMAGE-1630425793247.jpg', 'This necklace is available now at an affordable price. ?', '0543201893', 58, '2021-08-31 16:03:15'),
(16, 'Blue Black T-shirt', 50.00, 'uploads/IMAGE-1630426673952.jpg', 'Customized T-shirt, order at an affordable price 😉', '0543201893', 58, '2021-08-31 16:17:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `user_img` text NOT NULL,
  `coverphoto` text NOT NULL,
  `bio` text CHARACTER SET utf8mb4 NOT NULL,
  `website` text,
  `active` int(1) DEFAULT NULL,
  `hash` varchar(100) DEFAULT NULL,
  `date_joined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `username`, `email`, `password`, `user_img`, `coverphoto`, `bio`, `website`, `active`, `hash`, `date_joined`) VALUES
(58, 'Allen Jones', '', 'aljay3334@gmail.com', '$2a$12$Ko6HeinG7QaVF1x4X/DIguoKmH5qF7ZrVYWFMc44sfgVJgZysosYm', 'uploads/IMAGE-1630425841526.jpg', 'uploads/IMAGE-1630326259034.jpg', 'I love computer programming 😊💻', NULL, 0, '', '2021-08-31 16:04:03'),
(59, 'Kwame ASAP', '', 'asap@gmail.com', '$2a$12$5lfGyQw5NmYj/DD3Oq3kpONqE8Dwc/JfS2okealp2s2upPZTpCpHe', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', NULL, 0, '', '2021-08-31 12:12:29'),
(60, 'Moses Nimako', '', 'moses@gmail.com', '$2a$12$SzqI8zNM.nSRxUmU6j0.GeBFX0idbwzwUcS0bKFlkZ/fCVlVD8ZPy', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', NULL, 0, '', '2021-08-31 14:37:38'),
(61, 'Jay Allen ', '', 'aljay333@gmail.com', '$2a$12$9QQrj0Va551p8B/yGk2yfeJNW.uEFjsCBGvH53UAnUnXVY0EAUr.S', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', NULL, 0, '', '2021-08-31 15:51:16'),
(62, 'Allen Jones', '', 'aljay33@gmail.com', '$2a$12$LtvVKC4uVirFDcHal/Ez/uSlzmpfi9yXImemPO3zf0UR7aVtivgi2', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', NULL, 0, '', '2021-08-31 15:56:28'),
(63, 'Allen Jay', '', 'allen@gmail.com', '$2a$12$zRt6rTkr3x2QBxiT8JqKqOrLUb9UCkkRy57mh5SXePVsO81rcnSfa', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', NULL, 0, '', '2021-08-31 17:35:49'),
(64, 'Allen Jay', '', 'allenjay@gmail.com', '$2a$12$bBOgQhPlV79JX8wPDRx3S.RDmUtOHhypOTsTDYnnjwSlQZxsA0ovK', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', NULL, 0, '', '2021-08-31 17:40:30'),
(67, 'Bright', '', 'akowuah2000@yahoo.co.uk', '$2a$12$xh..ruBkOASNdc2vpMfZSusJyAJsQqLaKhyl7JvruG8fJ076meLj6', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', NULL, 0, '', '2021-09-01 15:39:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `posts_ibfk_1` (`owner_id`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_comments_ibfk_1` (`C_post_id`),
  ADD KEY `post_comments_ibfk_2` (`user_id`);

--
-- Indexes for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_comment_id` (`post_comment_id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_likes_ibfk_1` (`post_liker`),
  ADD KEY `post_likes_ibfk_2` (`L_post_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=906;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  ADD CONSTRAINT `post_comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `post_comment_likes_ibfk_2` FOREIGN KEY (`post_comment_id`) REFERENCES `post_comments` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
