DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (item_id)
);

ALTER TABLE products AUTO_INCREMENT=1001;

SELECT * FROM products;