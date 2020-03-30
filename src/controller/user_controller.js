const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail
} = require("../service/user_service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    let body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User created Successfully"
      });
    });
  },

  getAllUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error fetching all users"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "All User fetch Successfully",
        data: results
      });
    });
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      // console.log(JSON.stringify(results));
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: "Error fetching user"
        });
      }
      if (results.length == 0) {
        return res.json({
          success: 0,
          message: "User not found with id - " + id
        });
      }
      return res.json({
        success: 1,
        message: "User fetch Successfully",
        data: results
      });
    });
  },

  updateUserById: (req, res) => {
    let body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUserById(body, (err, results) => {
      // console.log("Result" + JSON.stringify(results));
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: "Database connection error"
        });
      }
      if (results.affectedRows == 0) {
        return res.json({
          success: 0,
          message: "User not found with id - " + body.id
        });
      }
      return res.json({
        success: 1,
        message: "User updated Successfully"
      });
    });
  },

  deleteUserById: (req, res) => {
    const id = req.params.id;
    deleteUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: "Error deleting user"
        });
      }
      if (results.affectedRows == 0) {
        return res.json({
          success: 0,
          message: "User not found with id - " + id
        });
      }
      return res.json({
        success: 1,
        message: "User deleted Successfully"
      });
    });
  },

  loginUser: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      // console.log(JSON.stringify(results));
      if (err) {
        console.log(err);
        return res.status(200).json({
          success: 0,
          message: "Database connection error"
        });
      }
      if (results.length == 0) {
        return res.json({
          success: 0,
          message: "Invalid Username or password"
        });
      }

      const result = compareSync(body.password, results.password);

      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid Username or password"
        });
      }
    });
  }
};
