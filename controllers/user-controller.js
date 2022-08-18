//bring in models
const { User , Thought } = require('../models');

//set up controllers
const userController = {
//get all users
getAllUsers (req, res) {
    User.find()
    .select('-__v')
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {res.status(500).json(err)});    
},

//find single user by id
//what works  dbUserDta or user????
findSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


//create a new user
    //User.create
createUser(req, res) {
    User.create(req.body)
        .then((dbUserData) => {
        res.json(dbUserData);
        })
        .catch((err) => {
         console.log(err);
         res.status(500).json(err);
        });
      },

//update a user
    //User.findOneAndDelete
    //$set - set the req.body
updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //should there be a DeteleUser here? is it a bonus
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //add friend to friend list
    //User.findOneAndUpdate
    //$addToSet - add the new frind to user's friend list
addFriend(req, res) {
    console.log('You are adding an friend');
    console.log(req.body);
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
    )
        .then((user) =>
        !user
            ? res
                .status(404)
                .json({ message: 'No friend found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},




//remove friend from friend list
    //user.findOneAndDelete
    //LOOK AT THE ONE AGAIN
removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { userId: req.params.userId } } },
        { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

};
//export userController
module.exports = userController