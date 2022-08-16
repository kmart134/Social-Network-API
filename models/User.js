const { Schema, model } = require('mongoose');

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
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
        },
      ],
    friends: [
      //is this correct?
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ], 
  },
  {
    // toJSON: {
    //   virtuals: true,
    // },
    // id: false,
  }
  );

  //initialize User Model
  const User = model('user', userSchema);

  module.exports = userSchema;