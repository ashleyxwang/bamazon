DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT = 543210,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Xyron 100012 Teresa Sticker Maker", "Art, Crafts, Sewing", 10.13, 47),
("Small Sand Timers Combo Pack(4)", "Electronics & Office", 4.46, 36),
("Stainless Steel Vacuum Water Bottle 25oz. Grey", "Sports, Fitness, Outdoors", 12.99, 27),
("Animal Costume Grey Sloth Adult Pajamas", "Clothing, Shoes, Accessories", 28.90, 48),
("Super Smash Bros Ultimate", "Toys & Video Games", 59.88, 32),
("CeraVe Daily Moisturizing Lotion 120z", "Pharmacy, Health & Beauty", 11.22, 46),
("WD 1 TB My Passport Ext. Hard Drive", "Electronics & Office", 51.14, 25),
("Brita Pitcher Replacement Filters(3)", "Food & Household", 14.98, 38),
("Crazy Rich Asians", "Movies, Music, Books", 9.60, 14),
("Dyson AM09 Fan Heater", " Home, Furniture, Appliances", 299.97, 18)
