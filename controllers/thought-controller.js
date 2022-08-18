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
createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => {
        res.json(thought);
        })
        .catch((err) => {
         console.log(err);
        res.status(500).json(err);
        });
    },

//update a thought
    //Thought.findOneAndUpdate
updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    

//delete a thought - also need to do a findOneAndUpdate on the user to remove the thoughtfrom the user's thoughts array
    //Thought.findOneandRemove
    //also need User.findOneAndUpdate - use $pull to pull the thought from the user's thought's array

deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No such thought exists' })
            : User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
        )
        .then((user) =>
        !user
            ? res.status(404).json({
                message: 'Thought deleted, but no user found',
            })
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },

//add a reaction to athought
    //Thought.findOneandUpdate
    //$addToSet
addReaction(req, res) {
    console.log('You are adding a reaction!');
    console.log(req.body);
     Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },


//remove reaction from a thought
    //thought.findOneAndUpdate
    //use$pull to pull reaction from thoughtsreaction array

removeReaction(req, res) {
    Thought.findOneAndUpdate(
        {thoughts: req.params.thoughtId},
        { $pull:{ reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true },
    )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No such reaction exists' })
            : res.json(thought)
            )
        .catch((err) => res.status(500).json(err));
    },

};
//export thoughtController
module.exports = thoughtController