const express = require('express');
const { stderr } = require("process");

const router = express.Router();
const SubscriptionsBL = require('./subscriptionsBL');

router.route('/').get(async(req,resp)=>{
    let data = await SubscriptionsBL.getAllSubscriptions();
    return resp.json(data);
})

router.route('/:id').get(async(req,resp)=>{
    let data = await SubscriptionsBL.getSubscription(req.params.id);
    return resp.json(data);
})

router.route('/').post(async(req,resp)=>{
    let data = req.body;
    SubscriptionsBL.addSubscription(data);
    console.log(data);
    return resp.json(data);
})

router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedData = req.body;
    let data = await SubscriptionsBL.updateSubscription(id,updatedData);
    return resp.json(data);
})

router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    console.log(id);
    let answer = await SubscriptionsBL.deleteSubscriptions(id);
    console.log(answer)
    return resp.json(answer);
})

module.exports = router;