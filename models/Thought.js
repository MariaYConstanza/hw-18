const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query insert *** dateFormat
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
        lastAccessed: { type: Date, default: Date.now },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    },
);

reactionSchema
  .virtual('reactionCount')
  .get(function () {
    return this.meta.reactions;
  });

const Thought = model('Thought', thoughtSchema);

model.exports = Thought;