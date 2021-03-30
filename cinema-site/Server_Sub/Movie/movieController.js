const express = require ('express');
const { stderr } = require("process");

const router = express.Router();
const MoviesBL = require ('./moviesBL');

router.route('/').get(async(req,resp)=>{
    let data = await MoviesBL.getAllMovies();
    return resp.json(data);
})

router.route('/:id').get(async(req,resp)=>{
    let data = await MoviesBL.getMovie(req.params.id);
    return resp.json(data);
})

router.route('/').post(async(req,resp)=>{
    let data = req.body;
    MoviesBL.addMovie(data);
    console.log(data);
    return resp.json(data);
})

router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let updatedata = req.body;
    let data = await MoviesBL.updateMovie(id,updatedata);
    return resp.json(data);
})

router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    let answer = await MoviesBL.deleteMovie(id);
    return resp.json(answer);
})

module.exports = router;