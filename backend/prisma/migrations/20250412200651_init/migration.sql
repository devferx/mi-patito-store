-- CreateTable
CREATE TABLE `Duck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` ENUM('Red', 'Green', 'Yellow', 'Blue') NOT NULL,
    `size` ENUM('XLarge', 'Large', 'Medium', 'Small', 'XSmall') NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
