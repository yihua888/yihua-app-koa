# 1.新增
insert into `students` (name, age,sex) values('刘九', 17 , '男' );
insert into `students` (name, age , sex ) values('陈十', 18 , '男');

# 需求：createTime和updateTime可以自动设置值
alter table `students` add `createTime` timestamp;
alter table `students` add `updateTime` timestamp;
alter table `students` modify `createTime` timestamp default current_timestamp;
alter table `students` modify `updateTime` timestamp default current_timestamp on update current_timestamp;

# 2.删除数据
# 2.1删除所有的数据
delete from `students`
delete from `students` where id = 9;

# 3.修改数据
update `students` set name = '测试' where id = 8;

# 4.查找数据
# 4.1 查找所有数据
select * from `students`;
# 4.2 查询指定的字段
select name , age  from `students`;
# 4.3 对字段结果起一个别名
select sName , sAge  from `students`;

# 4.4.where条件
# 4.4.1 条件判断语句
# 查找年龄小于18的
select * from `students` where age < 18;

# 4.4.2 逻辑运算语句
select * from `students` where age < 18 && age > 16;
select * from `students` where age < 18 || age = 19;
select * from `students` where className is null;

# 4.4.3 模糊查询
select * from `students` where name like '%八%';
select * from `students` where name like '__';

# 4.5 排序
select * from `students`  order by age asc ,classId desc;

# 4.6 分页查询
select * from `students` limit 3 offset 0;
select * from `students` limit 3,3;