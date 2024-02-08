Create table if not exists `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `hash` varchar(255) NOT NULL,
    `profile_picture` varchar(255),
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)

Create table if not exists `service` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `idStripe` varchar(255) NOT NULL UNIQUE,
    `name` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

INSERT INTO service (idStripe, name) VALUES ('prod_OSJ35OJsNnxjCy', 'Cliente web'), ('prod_OSJ8Of7HPIBXz7', 'API REST'), ('prod_OSJ96Q6aDchdSh', 'Base de datos');

Create table if not exists `price` (
    `id` VARCHAR(255) NOT NULL,
    `idStripe` varchar(255) NOT NULL,
    `price` varchar(255) NOT NULL,
    `type` varchar(255) NOT NULL,
    `mensuality` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

INSERT INTO price (idStripe, id, price, mensuality, type) VALUES ('prod_OSJ96Q6aDchdSh', 'price_1NfOWrBfMzihRfkFWs41Ugx3', '90', 'anual', 'database'), ('prod_OSJ96Q6aDchdSh', 'price_1NfOWrBfMzihRfkFNeEiRpew', '37,5', 'trimestral', 'database'), ('prod_OSJ96Q6aDchdSh', 'price_1NfOWrBfMzihRfkFjCSFJ9ew', '20', 'mensual', 'database'),
('prod_OSJ8Of7HPIBXz7', 'price_1NfOW3BfMzihRfkFGVBORtgq', '42', 'anual', 'api'), ('prod_OSJ8Of7HPIBXz7', 'price_1NfOW3BfMzihRfkF7MzpeGqr', '15', 'trimestral', 'api'), ('prod_OSJ8Of7HPIBXz7', 'price_1NfOW3BfMzihRfkFYmUPbwSJ', '7,5', 'mensual', 'api'),
('prod_OSJ35OJsNnxjCy', 'price_1NfOV2BfMzihRfkFNNgZGrsw', '48', 'anual', 'webclient'), ('prod_OSJ35OJsNnxjCy', 'price_1NfOV2BfMzihRfkF4OLUulnC', '18', 'trimestral', 'webclient'), ('prod_OSJ35OJsNnxjCy', 'price_1NfORBBfMzihRfkF9zP46cg3', '12', 'mensual', 'webclient');

Create table if not exists `user_price` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `idUser` int(11) NOT NULL,
    `idPrice` VARCHAR(255) NOT NULL,
    `active` tinyint(1) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idUser`) REFERENCES `user`(`id`),
    FOREIGN KEY (`idPrice`) REFERENCES `price`(`id`)
);

Create table if not exists `domain` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `idUser` int(11) NOT NULL,
    `type` varchar(255) NOT NULL,
    `url` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idUser`) REFERENCES `user`(`id`)
);

Create table if not exists `webpage` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `idUser` int(11) NOT NULL,
    `idDomain` int(11) NOT NULL,
    `path` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `url` varchar(255) NOT NULL,
    `status` tinyint(1) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idUser`) REFERENCES `user`(`id`)
);

Create table if not exists `folder` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL,
    `idUser` int(11),
    FOREIGN KEY (`idUser`) REFERENCES `user`(`id`)
)

Create table if not exists `screenshot` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idWebpage` int(11) NOT NULL,
    `fileName` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`idWebpage`) REFERENCES `webpage`(`id`)
)

Create table if not exists `log` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `query` varchar(255) NOT NULL,
    `idUser` int(11),
    `username` varchar(255),
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`idUser`) REFERENCES `user`(`id`)
);