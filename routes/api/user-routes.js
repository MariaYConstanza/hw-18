const router = require('express').Router();

// users' controls
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = requrie('../../controllers/user-controller');

// users api routing for creation *** /api/users
router.route('/').get(getUsers).post(createUser);

// update and delete users' account *** /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// add and remove users' friend list *** /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;