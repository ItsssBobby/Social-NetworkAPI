const { ObjectId } = require('mongoose').Types;
const { Thought, Course } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (Thoughts) => {
        const ThoughtObj = {
          Thoughts,
        };
        return res.json(ThoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              Thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    {
    $set: req.body,
    },
    {
    runValidators: true,
    new: true,
    }
    )
    .then((dbthoughtData) => {
    if (!dbthoughtData) {
    return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(dbthoughtData);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
    },

  // Delete a Thought and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : res.json(Thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an reaction to a Thought
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No Thought found with that ID :(' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a Thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No Thought found with that ID :(' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
