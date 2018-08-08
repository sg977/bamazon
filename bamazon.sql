drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
		id integer(11) auto_increment not null, 
        product_name varchar(30) not null,
        department_name varchar(30),
        price dec(10,2),
        stock_quantity integer(10), 
        primary key (id)
);

insert into products (product_name, department_name, price, stock_quantity)
values("pencil", "office", 0.5, 3000);

insert into products (product_name, department_name, price, stock_quantity)
values("legging", "women clothing", 15, 100);

insert into products (product_name, department_name, price, stock_quantity)
values("tie", "men clothing", 20, 1500);

insert into products (product_name, department_name, price, stock_quantity)
values("paper", "office", 7, 2500);

insert into products (product_name, department_name, price, stock_quantity)
values("summer maxi dress", "women clohting", 25, 500);

insert into products (product_name, department_name, price, stock_quantity)
values("marker", "office", 1.2, 1000);

insert into products (product_name, department_name, price, stock_quantity)
values("skirt", "women clothing", 18, 500);

insert into products (product_name, department_name, price, stock_quantity)
values("dress pants", "men clothing", 30, 800);

insert into products (product_name, department_name, price, stock_quantity)
values("baby dragon", "toy", 5, 800);

insert into products (product_name, department_name, price, stock_quantity)
values("dress pants", "men clothing", 30, 800);

SELECT * FROM bamazon_db.products;