const router = require('express').Router();
const {
    getAllUsers,
    findSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require ('../../controllers/user-controller');

// /api/user/
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(findSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;