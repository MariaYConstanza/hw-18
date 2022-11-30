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
        User.findOne({ _id: req.params.UserId })
        .select('-__v')
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user is found with that ID' })
            : res.json({
                user,
                account: await account(req.params.userId),
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
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