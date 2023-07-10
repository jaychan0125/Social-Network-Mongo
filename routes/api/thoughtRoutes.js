const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    newThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

//localhost:3001/api/thoughts


// /
router.route('/')
    .get(getThoughts)
    .post(newThought);

// /:thoughtId
router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);


// /:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// /:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteThought);


module.exports = router;

