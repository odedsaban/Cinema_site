import axios from 'axios';
import React,{useEffect,useState} from 'react'

export default function AddMovie(props){

    const [name,setName] = useState();
    const [genres,setGenres] = useState();
    const [imageURL,setImageURL] = useState();
    const [premiered,setPremiered] = useState();


    const addMovie = async () =>{
        let movie ={
            name : name,
            genres:genres.split(','),
            image:imageURL,
            premiered: premiered
        }
        await axios.post('http://localhost:8000/movies',movie);
        props.history.push("/Dashboard/movies/AllMovies");
    }



    return(
        <div>
            Name: <input type="text" onChange={(e)=>{setName(e.target.value)}} /><br/>
            Genres: <input type="text" onChange={(e)=>{setGenres(e.target.value)}}/><br/>
            Image URL:<input type="text" onChange={(e)=>{setImageURL(e.target.value)}}/><br/>
            Premiered:<input type = "date" onChange={(e)=>{setPremiered(e.target.value)}}/><br/>
            <input type="button" value="Save" onClick={addMovie}/>
            <input type="button" value="Cancel" onClick={()=>{props.history.push("/Dashboard/movies/AllMovies")}}/> 

        </div>
    )



}