# 1.聚合函数的使用
# 1.1求所有学生年龄总和
select sum(age) totalAge from `students`;

#1.2 求所有学生平均年龄
select avg(age) from `students`;

#1.3 求所有学生年龄最大和最小
select max(age) from `students`;
select min(age) from `students`;

# 1.4求一共多少学生
select count(*) from `students`;
select count(classId) from `students`;
select count(distinct classId) from `students`;

# 2.GROUP BY的使用
select age ,name , sex from `students` group by sex;

# 3.HAVING的使用
select avg(age) avgAge , sex from `students` group by sex having avgAge > 17;
