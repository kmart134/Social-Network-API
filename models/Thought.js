const { Schema } = require('mongoose');

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
        //getter method to format timestamp
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        //array of nested documents created with reactionSchema
        // {
        //   type: Schema.Types.ObjectId,
        //   ref: 'Student',
        // },
      ], 
    },
    {
        //Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
        // toJSON: {
        //   virtuals: true,
        // },
        // id: false,
      }
);

module.exports = thoughtSchema;