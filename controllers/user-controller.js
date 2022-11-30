const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
          const userObj = {
            users,
            log: await log(),
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        }); 
    },

    getSingleUser(req, res) {
        
    },

    createUser(req, res) {

    },

    updateUser(req, res) {

    },

    deleteUser(req, res) {

    },

    addFriend(req, res) {

    },

    removeFriend(req, res) {

    }
};

module.exports =userController;