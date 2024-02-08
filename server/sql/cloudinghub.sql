-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2023 a las 10:38:10
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cloudinghub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domain`
--

CREATE TABLE `domain` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `domain`
--

INSERT INTO `domain` (`id`, `idUser`, `type`, `url`, `created_at`, `updated_at`) VALUES
(89, 1, 'own', 'jointscounter.com', '2023-11-02 20:35:05', '2023-11-02 20:35:05'),
(90, 1, 'own', 'cloudinghub.com', '2023-11-02 20:35:25', '2023-11-02 20:35:25'),
(91, 1, 'free', 'cloud.cloudinghub.com', '2023-11-02 20:35:35', '2023-11-02 20:35:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `folder`
--

CREATE TABLE `folder` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idFTP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `folder`
--

INSERT INTO `folder` (`id`, `name`, `idUser`, `idFTP`) VALUES
(1, '$2b$10$s', NULL, NULL),
(2, '$2b$10$8', NULL, NULL),
(3, '$2b$10$i', NULL, NULL),
(4, '$2b$10$W', NULL, NULL),
(5, '$2b$10$n', NULL, NULL),
(6, '$2b$10$u', NULL, NULL),
(7, '$2b$10$4', NULL, NULL),
(8, '$2b$10$r', NULL, NULL),
(9, '$2b$10$M', NULL, NULL),
(10, '$2b$10$2', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ftp`
--

CREATE TABLE `ftp` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ftp`
--

INSERT INTO `ftp` (`id`, `username`, `password`, `path`) VALUES
(1, 'root', 'Contraseña', 'C:/xampp/htdocs');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `price`
--

CREATE TABLE `price` (
  `id` varchar(255) NOT NULL,
  `idStripe` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `mensuality` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `price`
--

INSERT INTO `price` (`id`, `idStripe`, `price`, `type`, `mensuality`, `created_at`, `updated_at`) VALUES
('price_1NfORBBfMzihRfkF9zP46cg3', 'prod_OSJ35OJsNnxjCy', '12', 'webclient', 'mensual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOV2BfMzihRfkF4OLUulnC', 'prod_OSJ35OJsNnxjCy', '18', 'webclient', 'trimestral', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOV2BfMzihRfkFNNgZGrsw', 'prod_OSJ35OJsNnxjCy', '48', 'webclient', 'anual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOW3BfMzihRfkF7MzpeGqr', 'prod_OSJ8Of7HPIBXz7', '15', 'api', 'trimestral', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOW3BfMzihRfkFGVBORtgq', 'prod_OSJ8Of7HPIBXz7', '42', 'api', 'anual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOW3BfMzihRfkFYmUPbwSJ', 'prod_OSJ8Of7HPIBXz7', '7,5', 'api', 'mensual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOWrBfMzihRfkFjCSFJ9ew', 'prod_OSJ96Q6aDchdSh', '20', 'database', 'mensual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOWrBfMzihRfkFNeEiRpew', 'prod_OSJ96Q6aDchdSh', '37,5', 'database', 'trimestral', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOWrBfMzihRfkFWs41Ugx3', 'prod_OSJ96Q6aDchdSh', '90', 'database', 'anual', '2023-08-16 20:13:03', '2023-08-16 20:13:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `idStripe` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`id`, `idStripe`, `name`, `created_at`, `updated_at`) VALUES
(1, 'prod_OSJ35OJsNnxjCy', 'Cliente web', '2023-08-16 15:54:23', '2023-08-16 15:54:23'),
(2, 'prod_OSJ8Of7HPIBXz7', 'API REST', '2023-08-16 15:54:23', '2023-08-16 15:54:23'),
(3, 'prod_OSJ96Q6aDchdSh', 'Base de datos', '2023-08-16 15:54:23', '2023-08-16 15:54:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stripelinks`
--

CREATE TABLE `stripelinks` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idPrice` varchar(255) NOT NULL,
  `paymentLink` text DEFAULT NULL,
  `paymentId` text DEFAULT NULL,
  `plink` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stripelinks`
--

INSERT INTO `stripelinks` (`id`, `idUser`, `idPrice`, `paymentLink`, `paymentId`, `plink`) VALUES
(4, 1, 'price_1NfOV2BfMzihRfkF4OLUulnC', 'https://buy.stripe.com/test_eVaeWVgg8cGP9wY7ue', 'pi_3OAY1aBfMzihRfkF11uGwZZs', 'plink_1OAY0rBfMzihRfkFTnAjNJ8J');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `email`, `hash`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'root', 'root', 'root', 'info.cloudinghub@gmail.com', '$2b$13$rk10ztaewVgU5KeqlHtpde', NULL, '2023-08-15 21:26:16', '2023-08-31 19:35:52'),
(2, 'paquito', 'alfa', 'alfa', 'alfa2@gmail.com', '63e2e6d48a416', NULL, '2023-08-31 19:36:57', '2023-08-31 19:36:57'),
(6, 'Primera prueba', 'beta', 'beta', 'jointscounter@gmail.com', '63e2e6d48a411', NULL, '2023-09-03 16:21:14', '2023-09-03 16:22:04'),
(7, 'javs', 'javs', 'javs', 'jvier7@gmail.com', '5d3ghgk86c', NULL, '2023-09-05 01:03:56', '2023-09-05 01:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_price`
--

CREATE TABLE `user_price` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idPrice` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user_price`
--

INSERT INTO `user_price` (`id`, `idUser`, `idPrice`, `active`, `created_at`, `updated_at`) VALUES
(2, 1, 'price_1NfOV2BfMzihRfkFNNgZGrsw', 1, '2023-08-16 20:19:58', '2023-08-16 20:19:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `webpage`
--

CREATE TABLE `webpage` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idDomain` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `webpage`
--

INSERT INTO `webpage` (`id`, `idUser`, `idDomain`, `path`, `name`, `url`, `status`, `created_at`, `updated_at`) VALUES
(77, 1, 90, 'C:/xampp/htdocs/cloudinghub', 'Cloudinghub', 'cloudinghub.com', 1, '2023-11-02 20:37:49', '2023-11-02 20:37:49'),
(78, 1, 91, 'C:/xampp/htdocs/cloud', 'Private Cloud', 'cloud.cloudinghub.com', 1, '2023-11-02 20:38:18', '2023-11-02 20:38:18'),
(82, 1, 89, 'C:/xampp/htdocs/jointscounter', 'JointsCounter', 'jointscounter.com', 1, '2023-11-09 13:16:05', '2023-11-09 13:16:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `domain`
--
ALTER TABLE `domain`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `folder`
--
ALTER TABLE `folder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `fk_folder_ftp` (`idFTP`);

--
-- Indices de la tabla `ftp`
--
ALTER TABLE `ftp`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idStripe` (`idStripe`);

--
-- Indices de la tabla `stripelinks`
--
ALTER TABLE `stripelinks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_stripeLinks` (`idUser`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_price`
--
ALTER TABLE `user_price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idPrice` (`idPrice`);

--
-- Indices de la tabla `webpage`
--
ALTER TABLE `webpage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `domain`
--
ALTER TABLE `domain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de la tabla `folder`
--
ALTER TABLE `folder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ftp`
--
ALTER TABLE `ftp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `stripelinks`
--
ALTER TABLE `stripelinks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `user_price`
--
ALTER TABLE `user_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `webpage`
--
ALTER TABLE `webpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `domain`
--
ALTER TABLE `domain`
  ADD CONSTRAINT `domain_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `folder`
--
ALTER TABLE `folder`
  ADD CONSTRAINT `fk_folder_ftp` FOREIGN KEY (`idFTP`) REFERENCES `ftp` (`id`),
  ADD CONSTRAINT `folder_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `stripelinks`
--
ALTER TABLE `stripelinks`
  ADD CONSTRAINT `fk_user_stripeLinks` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_price`
--
ALTER TABLE `user_price`
  ADD CONSTRAINT `user_price_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_price_ibfk_2` FOREIGN KEY (`idPrice`) REFERENCES `price` (`id`);

--
-- Filtros para la tabla `webpage`
--
ALTER TABLE `webpage`
  ADD CONSTRAINT `webpage_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
