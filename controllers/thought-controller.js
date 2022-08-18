//bring in models
const { User , Thought } = require('../models');

//set up controllers
const thoughtController = {

//get all thoughts
    //Thought.find
getThoughts (req, res) {
    Thought.find()
    .select('-__v')
    .then((thought) => res.json(thought))
    .catch((err) => {res.status(500).json(err)});    
},

//get a single thought by id
    //Thought.findOne
getSingleThought(req, res) {
     Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
         !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
      },

//create a thought
    //Thought.create

//update a thought
    //Thought.findOneAndUpdate

//delete a thought - also need to do a findOneAndUpdate on the user to remove the thoughtfrom the user's thoughts array
    //Thought.findOneandRemove
    //also need User.findOneAndUpdate - use $pull to pull the thought from the user's thought's array

//add a reaction to athought
    //Thought.findOneandUpdate
    //$addToSet


//remove reaction from a thought
    //thought.findOneAndUpdate
    //use$pull to pull reaction from thoughtsreaction array

};
//export thoughtController
module.exports = thoughtController