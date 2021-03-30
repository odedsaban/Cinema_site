
require('../configs/database')
const Movie = require('./moviesSchema')

const getAllMovies = () =>{
    return new Promise((resolve)=>{
        Movie.find({},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                resolve(data);
            }
        })
    })
}


const getMovie = (Movieid) =>{
    return new Promise(async(resolve,reject)=>{
        Movie.findById(Movieid,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const addMovie = (newMovie) =>{
    
    let movie = new Movie({
        name: newMovie.name,
        genres: newMovie.genres,
        image: newMovie.image,
        premiered: newMovie.premiered
    })

    movie.save((err)=>{
        if(err){
            console.log(err);
        }
    })
}

const updateMovie = (movieId,Udata) =>{
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndUpdate(movieId,{
            name: Udata.name,
            genres: Udata.genres,
            image: Udata.image,
            premiered: Udata.premiered
        }, (err)=>{
            if(err){
                reject(err);
            }else{
                resolve("Movie Updated Succesfully :)")
            }
        })
    })
}

const deleteMovie = (id) =>{
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err);
            }else{
                resolve("The Movie Deleted Succesfully :)")
            }
        })
    })
}

module.exports = {deleteMovie, updateMovie, addMovie, getMovie, getAllMovies}