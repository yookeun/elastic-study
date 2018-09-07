create table ykkim_users 
(
	id int AUTO_INCREMENT,
	name varchar(10) not null,
	age int not null,
	regdate datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);

INSERT INTO ykkim_users(name, age) VALUES('ykkim1',10);
INSERT INTO ykkim_users(name, age) VALUES('ykkim2',11);
INSERT INTO ykkim_users(name, age) VALUES('ykkim3',12);
INSERT INTO ykkim_users(name, age) VALUES('ykkim4',13);
INSERT INTO ykkim_users(name, age) VALUES('ykkim5',14);
INSERT INTO ykkim_users(name, age) VALUES('ykkim6',15);
INSERT INTO ykkim_users(name, age) VALUES('ykkim7',16);
INSERT INTO ykkim_users(name, age) VALUES('ykkim8',17);
INSERT INTO ykkim_users(name, age) VALUES('ykkim9',18);
INSERT INTO ykkim_users(name, age) VALUES('ykkim10',19);