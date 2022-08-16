const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
        //date
        //current timestamp
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
})