import React,{useEffect,useState} from 'react'
import axios from 'axios'
import MovieComp from './movieComp'

export default function Movies(props){

    const [movies,setMovies] = useState();
    const [search,setSeacrh] = useState('')

    useEffect(async()=>{
        const getData = async () =>{
        const currentUser = await axios.get('http://localhost:8000/movies');
        setMovies(currentUser.data);
        }
        getData();
    },[])

    const MoveToEdit = () =>{
        props.history.push("/Dashboard/movies/EditMovie");
    }
    const movetoAllMovies = async () =>{
        let data = await axios.get('http://localhost:8000/movies');
        data = data.data;
        setMovies(data);
    }
    let moviesData = null;
    if(movies){
        if(search==''){
            moviesData = movies.map((movie,index)=>{
                return <MovieComp moveToedit={MoveToEdit} movetoAllMovies={movetoAllMovies} key={index} data={movie}/>
            })
        }else{
            let filterMovies = movies.filter((movie)=>{if(movie.name.toLowerCase().includes(search.toLowerCase())){return movie}})
            moviesData = filterMovies.map((movie,index)=>{
                return <MovieComp moveToedit={MoveToEdit} movetoAllMovies={movetoAllMovies} key={index} data={movie}/>
            })
        }
    }
    return(<div>
        <input type="text" placeholder="search.. " onChange={(e)=>{setSeacrh(e.target.value)}}/>
        {moviesData}
        </div>)

}