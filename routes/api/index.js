//bring router from express
const router = require('express').Router();

//bring in routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');


//set up routes using route.use
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

//export
module.exports = router;