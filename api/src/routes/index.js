const { Router } = require('express');
const user=require('./user')
const pets=require('./pets')

const router = Router();
router.use('/auth',user)
router.use('/pets',pets)

module.exports = router;
