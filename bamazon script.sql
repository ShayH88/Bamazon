DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INTEGER(10),
    product_sales DECIMAL(10,2) NOT NULL DEFAULT '0.00'
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Lettuce','Vegetable', 3, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Tomatos','Vegetable', 3.87, 36);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Cucambers','Vegetable', 1.60, 49);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Banana','Fruit', 1.50, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Onion','Vegetable', 2.75, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Salt','Spices', 6.50, 65);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Banana','Fruit', 0.90, 43);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Paprika','Spices', 3.50, 24);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Ginger','Vegetable', 4, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('Apple','Fruit', 1, 56);

SELECT * FROM products;
