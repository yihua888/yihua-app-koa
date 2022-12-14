const connection = require("../app/database");
class UserService {
  async create(user) {
    const { username, password } = user;
    const statement = `insert into tb_user (user_name,password) values (?,?);`;
    const rst = await connection.execute(statement, [username, password]);
    return rst;
  }

  async getUserByName(name) {
    const statement = `select * from tb_user where user_name=?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE tb_user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }

  async getUsers(username, limit, offset) {
    const argumentsList = [];
    let condition = "";
    username &&
      (condition += ` and u.user_name like concat('%', ?, '%')`) &&
      argumentsList.push(username);
    // 获取总数
    const statement =
      `SELECT  
    u.user_name username, u.id id,
    r.role_name role
    FROM tb_user u
    LEFT JOIN tb_role r ON r.id = u.role_id where 1=1` +
      condition +
      ` LIMIT ? , ?;`;
    const statement1 =
      `select count(*) total from tb_user u where 1=1` + condition;
    const [rst] = await connection.execute(statement1, [...argumentsList]);
    const [data] = await connection.execute(statement, [
      ...argumentsList,
      offset,
      limit,
    ]);
    return {
      data,
      total: rst[0]?.total ?? 0,
    };
  }

  async getUserById(id) {
    const statement = `
    select 
    u.id id, u.user_name username, r.id roleId, a.id avatarId,
		IF(COUNT(a.id),JSON_ARRAYAGG(
      JSON_OBJECT('filename',a.filename , 'url' , a.url )
    ), NULL) avatar
    from tb_user u 
    left join tb_role r on r.id = u.role_id
    left join tb_avatar a on a.id = u.avatar_id
    where u.id=?`;
    const [result] = await connection.execute(statement, [id]);
    !result[0].avatar && (result[0].avatar = []);
    return result[0];
  }

  async upDateAvatar(avatarUrl, avatarId, filename) {
    const statement = `UPDATE tb_avatar SET url=? , filename=? WHERE id = ?;`;
    const rst = connection.execute(statement, [avatarUrl, filename, avatarId]);
    return rst;
  }

  async createAvatar(avatarUrl, avatarId, filename) {
    const statement = ` insert into tb_avatar (url, filename , id ) values(?,?,?);`;
    const rst = connection.execute(statement, [avatarUrl, filename, avatarId]);
    return rst;
  }

  async updateUser(username, userId, roleId, avatarId) {
    const statement = ` UPDATE tb_user set user_name=?,role_id=?,avatar_id=?  where id =?;`;
    const rst = connection.execute(statement, [username, roleId, avatarId , userId]);
    return rst;
  }
}

module.exports = new UserService();
