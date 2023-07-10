const { User, Thought } = require('../models');

// /api/users

// get ALL users
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        // .populate('thoughts')
        // .populate('friends');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    };
};

// get ONE user
const getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID found.' })
        };

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    };
};

// CREATE new user
const newUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        /*example data:
        {
          "username": "lernantino",
          "email": "lernantino@gmail.com"
        }*/
        res.status(200).json({ message: 'Success! User created.', user });
    } catch (err) {
        res.status(500).json(err);
    };
};

// UPDATE a user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID found.' })
        };

        res.status(200).json({ message: 'Success! Updated the user!', updatedUser });
    } catch (err) {
        res.status(500).json(err);
    };
};

// DELETE a user and their associated thoughts
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'No user with that ID found.' })
        };

        await Thought.deleteMany({ _id: { $in: user.thoughts } });      //README.md line 164

        res.status(200).json({ message: 'Success! Deleted the user and their thoughts!', deletedUser });
    } catch (err) {
        res.status(500).json(err);
    };
};


// /:userId/friends
// ADD friends
const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friends } },
            { runValidators: true, new: true }
            )
            .populate('thoughts')
            .populate('friends')
            .select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID found.' });
        };

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    };
};


// /:userId/friends/:friendId
// DELETE friends
const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID found.' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      };
};

module.exports = {
    getUsers,
    getOneUser,
    newUser,
    updateUser,
    deleteUser, 
    addFriend,
    removeFriend
};