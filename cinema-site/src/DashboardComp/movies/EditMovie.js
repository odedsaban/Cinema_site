import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'

export default function EditMovie(props){

    let movieData = JSON.parse(sessionStorage.movieEdit)

    const [name,setName] = useState();
    const [genres,setGenres] = useState();
    const [imageURL,setImageURL] = useState();
    const [premiered,setPremiered] = useState();

    useEffect(async()=>{
        const getData = async () =>{
            setName(movieData.name);
            setGenres(movieData.genres.toString());
            setImageURL(movieData.image);
            const arrayDate =  movieData.premiered.split('-')
            let year = arrayDate[0];//year
            let mounth = arrayDate[1];//month
            let day = arrayDate[2].slice(0,2);//day
           setPremiered(`${year}-${mounth}-${day}`)
            //console.log(tempVar);
        }
            getData()
        
    },[])

    const editMovie = async () =>{
        let movie ={
            name : name,
            genres:genres.split(','),
            image:imageURL,
            premiered: premiered
        }
        await axios.put(`http://localhost:8000/movies/${movieData._id}`,movie);
        props.history.push("/Dashboard/movies/AllMovies");
    }


    return(
        <div>
            Name: <input type="text" defaultValue={movieData.name}  onChange={(e)=>{setName(e.target.value)}} /><br/>
            Genres: <input type="text" defaultValue={movieData.genres} onChange={(e)=>{setGenres(e.target.value)}}/><br/>
            Image URL:<input type="text" defaultValue={movieData.image} onChange={(e)=>{setImageURL(e.target.value)}}/><br/>
            Premiered:<input type = "date" defaultValue={premiered} onChange={(e)=>{setPremiered(e.target.value)}}/><br/>
            <input type="button" value="Save" onClick={editMovie}/>
            <input type="button" value="Cancel" onClick={()=>{props.history.push("/Dashboard/movies/AllMovies")}}/> 

        </div>
    )




}