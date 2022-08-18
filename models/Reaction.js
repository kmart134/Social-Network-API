const { Schema, Types } = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const dateFormat = require('../utils/dateFormat');
// ObjectId() method for converting studentId string into an ObjectId for querying database

const reactionSchema = new Schema(
  {
    reactionId: {
        //Use Mongoose's ObjectId data type
        //Default value is set to a new ObjectId
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;

//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
//schema ooonlyyyy*