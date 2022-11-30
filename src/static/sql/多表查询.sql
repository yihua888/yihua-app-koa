# 1. 查询所有有选课的学生，选择了哪些课程
SELECT stu.id id, stu.age sAge,stu.name sName, cou.id cId, cou.name cName, cou.price price
from students stu
join `students_select_courses` ssc on ssc.student_id = stu.id
join `courses` cou on cou.id = ssc.course_id;

# 2. 查询所有的学生的选课情况
select  stu.id id, stu.age sAge, stu.name sName, cs.id cId, cs.name cName, cs.price price
from `students` stu
left join `students_select_courses` ssc on ssc.student_id = stu.id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id;

# 3. 哪些学生是没有选课
select  stu.id id, stu.age sAge, stu.name sName,cs.id cId, cs.name cName, cs.price price
from `students` stu
left join `students_select_courses` ssc on ssc.student_id = stu.id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
where cs.id is null;

# 4. 查询哪些课程是没有被选择的
select  stu.id id, stu.age sAge, stu.name sName, cs.id cId, cs.name cName, cs.price price
from `students` stu
right join `students_select_courses` ssc on ssc.student_id = stu.id
right join `courses` cs on ssc.course_id = cs.id
where stu.id is null;

# 5. 某一个学生选了哪些课程(毅华)
select  stu.id id, stu.age sAge, stu.name sName, cs.id cId, cs.name cName, cs.price price
from `students` stu
left join `students_select_courses` ssc on ssc.student_id = stu.id
left join `courses` cs ON ssc.course_id = cs.id
where stu.id = 1;

# 6.左连接
# 6.1 查询所有学生及对应的班级
select * from `students` stu left outer join `classTable` ct on stu.classId = ct.id;
# 6.2. 查询没有对应班级的学生
select * from `students` stu left outer join `classTable` ct on stu.classId = ct.id
where ct.id is null;

# 7.右连接
# 7.1 查询所有班级及其对应的学生
select * from `students` stu right outer join `classTable` ct on stu.classId = ct.id;
# 7.1 查询没有学生的班级
select * from `students` stu right outer join `classTable` ct on stu.classId = ct.id
where stu.id is null;

# 8.内连接
select * from `students` stu join `classTable` ct on stu.classId = ct.id;

# 9.全连接
(select * from `students` stu left outer join `classTable` ct on stu.classId = ct.id)
union 
(select * from `students` stu right outer join `classTable` ct on stu.classId = ct.id);

(select * from `students` stu left outer join `classTable` ct on stu.classId = ct.id
where ct.id is null)
union 
(select * from `students` stu right outer join `classTable` ct on stu.classId = ct.id
where stu.id is null);

# 10.查询学生所在班级，并将班级返回为对象形式。 将联合查询到的数据转成对象（一对多）
select stu.id id, stu.age sAge, stu.name sName,
json_object('className', ct.name, 'classAttr' , ct.attr) classInfo
from `students` stu
left join `classTable` ct on stu.classId = ct.id
where ct.id is not null;

# 11. 查询学生选的课程，并以数组形式返回课程信息。将查询到的多条数据，组织成对象，放入到一个数组中(多对多)
select  stu.id id, stu.age sAge, stu.name sName, 
json_arrayagg(json_object('cId' , cs.id, 'cName',cs.name, 'price',cs.price)) courseInfo
from `students` stu
left join `students_select_courses` ssc on ssc.student_id = stu.id
left join `courses` cs on ssc.course_id = cs.id;