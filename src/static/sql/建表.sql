# 1.基本数据的模拟
# 1.1 建表
create table if not exists students(
	id int primary key auto_increment,
	name varchar(20) not null,
	sex varchar(10) not null,
	age int,
	className varchar(10) not null
);

create table if not exists courses(
	id int primary key auto_increment,
	name varchar(20) not null,
	price double
);

create table if not exists classTable(
	id int primary key auto_increment,
	name varchar(20) not null,
	attr varchar(10) not null
)

# 1.2 插入数据
INSERT INTO `students` (name, age, className, sex) VALUES('毅华', 18 , '高三1班','男');
INSERT INTO `students` (name, age, className , sex) VALUES('张三', 19 , '高三2班','男');
INSERT INTO `students` (name, age, className, sex) VALUES('李四', 18 , '高三3班','男');
INSERT INTO `students` (name, age, className , sex) VALUES('王五', 18 , '高三1班','女');
INSERT INTO `students` (name, age, className, sex) VALUES('赵六', 18 , '高三2班','女');
INSERT INTO `students` (name, age, className) VALUES('钱七', 18 , '高三1班','女');
INSERT INTO `students` (name, age, sex) VALUES('朱八', 16,'男' );


INSERT INTO `courses` (name, price) VALUES ('英语', 100);
INSERT INTO `courses` (name, price) VALUES ('语文', 666);
INSERT INTO `courses` (name, price) VALUES ('数学', 888);
INSERT INTO `courses` (name, price) VALUES ('历史', 80);
INSERT INTO `courses` (name, price) VALUES ('物理', 888);
INSERT INTO `courses` (name, price) VALUES ('政治', 333);
INSERT INTO `courses` (name, price) VALUES ('地理', 111);
INSERT INTO `courses` (name, price) VALUES ('生物', 222);
INSERT INTO `courses` (name, price) VALUES ('化学', 555);

INSERT INTO `classTable` (name,attr) VALUES ('高三1班','文科');
INSERT INTO `classTable` (name,attr) VALUES ('高三2班','文科');
INSERT INTO `classTable` (name,attr) VALUES ('高三3班','理科');
INSERT INTO `classTable` (name,attr) VALUES ('高三4班','理科');
INSERT INTO `classTable` (name,attr) VALUES ('高三5班','理科');

# 2.建立关系表及外键
#2.1 建立关系表
CREATE TABLE IF NOT EXISTS `students_select_courses`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES students(id) ON UPDATE CASCADE,
	FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE
);
# 2.2 建立外键
alter table `students` add classId int;
alter table `students` add foreign key(classId) references classTable(id);

# 2.2.1 查看表设计
SHOW CREATE TABLE `students`;
-- CREATE TABLE `students` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(20) NOT NULL,
--   `age` int DEFAULT NULL,
--   `className` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
--   `classId` int DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `classId` (`classId`),
--   CONSTRAINT `students_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classtable` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
#  2.2.2根据名称将外键删除掉
ALTER TABLE `students` DROP FOREIGN KEY students_ibfk_1;

#  2.2.3重新添加外键约束
ALTER TABLE `students` ADD FOREIGN KEY (classId) REFERENCES classTable(id)																				
ON UPDATE CASCADE																									
ON DELETE RESTRICT;
UPDATE `classTable` SET `id` = 100 WHERE `id` = 1;

#2.3 为students添加班级id
update `students` set classId=1 where className="高三1班";
update `students` set classId=2 where className="高三2班";
update `students` set classId=3 where className="高三3班";
update `students` set classId=4 where className="高三4班";
update `students` set classId=5 where className="高三5班";

# 3.学生选课
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 1);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 3);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 4);


INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 2);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 4);


INSERT INTO `students_select_courses` (student_id, course_id) VALUES (5, 2);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (5, 3);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (5, 4);

