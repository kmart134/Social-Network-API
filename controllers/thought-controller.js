//bring in models

//set up controllers

//get all thoughts
    //Thought.find

//get a single thought by id
    //Thought.findOne

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