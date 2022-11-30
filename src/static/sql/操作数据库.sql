# 查询所有数据库
SHOW DATABASES;

# 选择某一个数据库
-- use 数据库名称
use coderhub

# 查看当前正在使用的数据库
SELECT DATABASE();

# 创建一个新的数据库
-- CREATE DATABASES 数据库名称;
-- CREATE DATABASES IF NOT EXISTS 数据库名称;
CREATE DATABASE IF NOT EXISTS 数据库名称
			 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

# 删除数据库
DROP DATABASE 数据库名称;
DROP DATABASE IF EXIT 数据库名称;

# 修改数据库的字符集和排序规则
ALTER DATABASE 数据库名称 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
