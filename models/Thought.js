const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate')
// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now(),
      get: (timeStamp) => formatDate(timeStamp)
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
