const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Users account control *** CRUD
const userController = {
    // user account
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

    // user pulling/finding an account
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.UserId })
        // come back to check if it works
        .populate('friend')
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

    // creating a user account
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // user updating account 
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((video) =>
              !video
                ? res.status(404).json({ message: 'There was no user with that ID!' })
                : res.json(video)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },

    // user deleting an account
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No users exist' })
            : Account.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
              )
        )
        .then((account) =>
          !account
            ? res.status(404).json({
                message: 'The user is deleted, but no user is found',
              })
            : res.json({ message: 'User has been successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    // user adding a friend
    addFriend(req, res) {
        console.log('You just added a friend!');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friend: req.body } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'There is no user found with that ID!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },

    // user removing a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res
                    .status(404)
                    .json({ message: 'There is no user found with that ID!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports =userController;