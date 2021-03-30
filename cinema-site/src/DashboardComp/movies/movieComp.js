import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../Components.css'

export default function MovieComp(props){

    

    let movie = props.data;
    let year = movie.premiered.substr(0,4);
    let genres = movie.genres;
        let genresData = null;
        if(genres!= undefined){
            genresData= genres.map((genre,index)=>{
                return <span key={index} className="label">{genre}</span>
            })
        }
    
    let userData = JSON.parse(sessionStorage.user).permissions;
    
    const moveToEdit=()=>{
        sessionStorage.setItem('movieEdit',JSON.stringify(movie));
        props.moveToedit();
    }
    const DeleteMovie = async () =>{
        await axios.delete(`http://localhost:8000/movies/${movie._id}`);
        props.movetoAllMovies();

    }

    let editButton = null;
    if(userData.includes("update movies")){
        editButton = <input type="button" value="Edit" onClick={moveToEdit} />;
    }
    let deleteButton = null;
    if(userData.includes("delete movies")){
        deleteButton = <input type="button" value="Delete" onClick={DeleteMovie}/>;
    }

    let viewMovies = null;
    if(userData.includes("view movies")){
        viewMovies = (
            <div className="component">
                <h4>{movie.name+", "+ year}</h4>
                {genresData}<br/><br/>
                <img src={movie.image} width="70" height="90"/><br/>
                {editButton}
                {deleteButton}
            </div>)
    }



    return(<div>{viewMovies? viewMovies: <h4>You dont have premissions to see movies :(</h4>}</div>)

}