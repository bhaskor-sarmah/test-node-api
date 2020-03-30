const pool = require("../config/database");

module.exports = {
  createUser: (data, callback) => {
    pool.query(
      "insert into user_master(first_name, last_name, gender, email, password, number) values(?,?,?,?,?,?)",
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAllUsers: callback => {
    pool.query(
      "select id,first_name, last_name, gender, email, password, number from user_master",
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getUserById: (id, callback) => {
    pool.query(
      "select id,first_name, last_name, gender, email, password, number from user_master where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  updateUserById: (data, callback) => {
    pool.query(
      "update user_master set first_name=?, last_name=?, gender=?, email=?, password=?, number=? where id = ?",
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteUserById: (id, callback) => {
    pool.query(
      "delete from user_master where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getUserByEmail: (email, callback) => {
    pool.query(
      "select id,email, password from user_master where email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  }
};
