const express = require('express')
const router = express.Router()
const {getgoals,setGoals, updateGoals, deleteGoals} = require("../controllers/goal.controller")
const {protect} =require('../middleware/authMiddleware')

router.route('/').post(protect,setGoals).get(protect,getgoals)
router.route('/:id').put(protect,updateGoals).delete(protect,deleteGoals)



module.exports = router