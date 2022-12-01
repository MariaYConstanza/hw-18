const { ObjectId } = require('mongoose').Types;
const { Thought, User} = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {
          const thoughtObj = {
            thoughts,
            log: await log(),
          };
          return res.json(thoughtObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });   
    },

    getSingleThoughts(req, res) {
        Thought.findOne({ _id: req.params.ThoughtId })
        // come back to check if it works
        .populate('')
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No thoughts were found with that ID' })
            : res.json({
                thought,
                reaction: await reaction(req.params.thoughtId),
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    createThoughts(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((thought) => res.status(500).json(err));
    },

    updateThoughts(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((video) =>
              !video
                ? res.status(404).json({ message: 'There was no thoughts with this ID!' })
                : res.json(video)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },

    deleteThoughts(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thoughts exist' })
            : Reaction.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { users: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((reaction) =>
          !reaction
            ? res.status(404).json({
                message: 'The thought is deleted, but no thoughts is found',
              })
            : res.json({ message: 'Your thought has been successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    addReaction(req, res) {
        console.log('You just put a reaction!');
        console.log(req.body);
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
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

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          )
            .then((thought) =>
              !thought
                ? res
                    .status(404)
                    .json({ message: 'There is no user found with that ID!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
} 

module.export = thoughtController;