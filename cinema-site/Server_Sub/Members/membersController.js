const express = require('express');
const { stderr } = require("process");

const router = express.Router();
const MembersBL = require('./membersBL');

router.route('/').get(async(req,resp)=>{
    let data = await MembersBL.getAllMembers();
    return resp.json(data);
})

router.route('/:id').get(async(req,resp)=>{
    let data = await MembersBL.getMember(req.params.id);
    return resp.json(data);
})

router.route('/').post(async(req,resp)=>{
    let data = req.body;
    MembersBL.addMember(data);
    console.log(data);
    return resp.json(data);
})

router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedate = req.body;
    let data = await MembersBL.updateMember(id,updatedate);
    return resp.json(data);
})

router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let answer = await MembersBL.deleteMember(id);
    return resp.json(answer);
})

module.exports = router;