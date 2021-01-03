USE management;
SELECT VERSION();



CREATE TABLE CUSTOMER(
	id INT PRIMARY KEY AUTO_INCREMENT,
	image VARCHAR(1024),
	name nvarchar(64),
	birthday VARCHAR(64),
	gender VARCHAR(64),
	job VARCHAR(64)
	

) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;

s

INSERT INTO CUSTOMER VALUES(1, 'https://placeimg.com/64/64/1','심수련','770508','여자','가구회사대표');
INSERT INTO CUSTOMER VALUES(2, 'https://placeimg.com/64/64/1','주단태','740708','남자','부동산사업');
INSERT INTO CUSTOMER VALUES(3, 'https://placeimg.com/64/64/1','오윤희','800808','여자','사원');


SELECT * FROM CUSTOMER


INSERT INTO CUSTOMER VALUES(4, 'https://placeimg.com/64/64/4','천서진','840808','여자','예비 이사장');

