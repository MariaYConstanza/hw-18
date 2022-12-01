const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            // mongoose validation insert
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: '',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'friend',
            },
        ],
    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
  .virtual('fullName')
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

const User = model('User', userSchema);

module.exports = User;