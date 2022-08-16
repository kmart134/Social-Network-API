const router = require('express').Router();
const {
    getAllUsers,
    findSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require ('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(findSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:frienId').post(addFriend).delete(removeFriend);

module.exports = router;