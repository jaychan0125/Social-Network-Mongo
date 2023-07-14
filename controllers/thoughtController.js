const { User, Thought } = require('../models');

// /api/thoughts

// get ALL thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    };
};

// get ONE thought 
const getOneThought = async (req, res) => {
    try {
        const oneThought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

        if (!oneThought) {
            return res.status(404).json({ message: 'No thought with that ID found.' });
        };

        res.status(200).json(oneThought);
    } catch (err) {
        res.status(500).json(err);
    };
};

// CREATE new thought 
const newThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);         //make the thought
        /*example data:
        {
          "thoughtText": "Here's a cool thought...",
          "username": "lernantino",
          "userId": "5edff358a0fcb779aa7b118b"
        }*/ 
        const user = await User.findOneAndUpdate(               //attach it to the user
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    };
};

// UPDATE thought
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with that ID found.'});
        }; 

        res.status(200).json({ message: 'Success! Updated the thought!', updatedThought });
    } catch (err) {
        res.status(500).json(err);
    };
};

// DELETE thought 
const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with that ID found.'});
        };

        res.status(200).json({ message: 'Success! Deleted the thought!', deletedThought});
    } catch (err) {
        res.status(500).json(err);
    };
};


// /:thoughtId/reactions
// ADD reaction
const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
            );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID found.' });
        };

        res.status(200).json({ message: 'Success! Updated the thought!', thought });
    } catch (err) {
        res.status(500).json(err);
    };
};

// /:thoughtId/reactions/:reactionId
// DELETE reaction
const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID found.' });
        }
  
        res.status(200).json({ message: 'Success! Deleted the reaction!', thought });
      } catch (err) {
        res.status(500).json(err);
      };
};


module.exports = {
    getThoughts,
    getOneThought,
    newThought,     
    updateThought,
    deleteThought,
    addReaction,       
    removeReaction     
};