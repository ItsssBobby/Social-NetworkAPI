const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/ThoughtController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/Thoughts/:ThoughtId/Reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/Thoughts/:ThoughtId/Reactions/:ReactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
