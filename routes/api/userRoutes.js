const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

//localhost:3001/api/users


// /
router.route('/')
    .get(getUsers)
    .post(newUser);

// /:userId
router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);


// /:userId/friends/
router.route('/:userId/friends')
    .post(addFriend);

// /:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .delete(removeFriend);


module.exports = router;

