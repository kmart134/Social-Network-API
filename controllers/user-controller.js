//bring in models
const { User , Thought } = require('../models');

//set up controllers
const userController = {
//get all users
    //activity 13 in server.js- reference
getAllUsers (req, res) {
    User.find()
    .select('-__v')
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {res.status(500).json(err)});    
},

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
    //$addToSet - to add the new friend to the user's friend list
addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
    )
        .then((student) =>
        !student
            ? res
                .status(404)
                .json({ message: 'No student found with that ID :(' })
            : res.json(student)
        )
        .catch((err) => res.status(500).json(err));
},



//remove friend from friend list
    //user.findOneAndUpdate
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