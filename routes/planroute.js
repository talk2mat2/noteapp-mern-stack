
const express =require('express')
const plans = require('../controllers/plans')
const Router = express.Router();

Router.get('/getplans',plans.GetPlans)
Router.post('/setplans',plans.setPlans)
Router.post('/setplans',plans.setPlans)


module.exports =Router