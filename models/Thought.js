const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
        //getter method to format timestamp
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], 
    },
    {
        //Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
 });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;