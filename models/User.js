const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique:true,
      required: true,
      trimmed:true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
        //must match a valid email address
    },
    thoughts: [
        // {
        //   type: Schema.Types.ObjectId,
        //   ref: 'Student',
        // },
      ],
    friends: [
        // {
        //   type: Schema.Types.ObjectId,
        //   ref: 'Student',
        // },
      ], 
  },
  {
    // toJSON: {
    //   virtuals: true,
    // },
    // id: false,
  }
  );