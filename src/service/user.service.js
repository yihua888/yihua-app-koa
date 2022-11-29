const connection = require('../app/database');

class UserService {
  async create(user){
    const { username , password } = user
    const statement = `insert into tb_user (user_name,password) values (?,?);`
    const rst = await connection.execute(statement,[username,password])
    return rst
  }

  async getUserByName(name) {
    const statement = `select * from tb_user where user_name=?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
  
}

module.exports = new UserService()