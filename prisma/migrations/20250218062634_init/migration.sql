-- CreateTable
CREATE TABLE `ShopifyOrder` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shopifyOrderId` BIGINT NOT NULL,
    `orderNumber` INTEGER NOT NULL,
    `contactEmail` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `cancelled_at` DATETIME(3) NULL,
    `financialStatus` VARCHAR(191) NOT NULL,
    `fulfillmentStatus` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `subtotal_price` DECIMAL(10, 2) NOT NULL,
    `total_discounts` DECIMAL(10, 2) NOT NULL,
    `total_tax` DECIMAL(10, 2) NOT NULL,
    `total_shipping_price` DECIMAL(10, 2) NOT NULL,
    `buyer_accepts_marketing` BOOLEAN NOT NULL,
    `test` BOOLEAN NOT NULL,
    `customerId` BIGINT NULL,
    `shippingAddressId` BIGINT NULL,
    `billingAddressId` BIGINT NULL,

    UNIQUE INDEX `ShopifyOrder_shopifyOrderId_key`(`shopifyOrderId`),
    UNIQUE INDEX `ShopifyOrder_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shopifyCustomerId` BIGINT NOT NULL,
    `email` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `verifiedEmail` BOOLEAN NOT NULL,
    `defaultAddressId` BIGINT NULL,

    UNIQUE INDEX `Customer_shopifyCustomerId_key`(`shopifyCustomerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LineItem` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shopifyLineItemId` BIGINT NOT NULL,
    `shopify_order_id` BIGINT NOT NULL,
    `productId` BIGINT NULL,
    `variantId` BIGINT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `requiresShipping` BOOLEAN NOT NULL,

    UNIQUE INDEX `LineItem_shopifyLineItemId_key`(`shopifyLineItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `address1` VARCHAR(191) NOT NULL,
    `address2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `province_code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopifyOrder` ADD CONSTRAINT `ShopifyOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopifyOrder` ADD CONSTRAINT `ShopifyOrder_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopifyOrder` ADD CONSTRAINT `ShopifyOrder_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_defaultAddressId_fkey` FOREIGN KEY (`defaultAddressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineItem` ADD CONSTRAINT `LineItem_shopify_order_id_fkey` FOREIGN KEY (`shopify_order_id`) REFERENCES `ShopifyOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
