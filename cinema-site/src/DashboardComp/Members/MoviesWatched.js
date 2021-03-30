import axios from 'axios';
import React,{useEffect,useState} from 'react'

export default function MoviesWatched(props){

    const [movies,Setmovies] = useState([]);
    const [MoviesArray,SetMoviesArray] = useState(<></>);
    const [addMovie,SetAddMovie] = useState(false)
    const [selectData,SetSelectData] = useState(<></>)
    const [newMovieName,SetNewMovieName] = useState("")
    const [newMovieDate,SetNewMovieDate] = useState(Date.now()) 

    const getData = async () =>{
        let data = await axios.get(`http://localhost:8000/subscriptions/${props.data._id}`);
        let newdata=data.data;
        Setmovies(newdata.movies);
    }
    useEffect(()=>{
        
         getData();
    },[])

    useEffect(()=>{
        
        getData();
   },[addMovie])

    useEffect(async()=>{

        const getMoviesArray =  async () =>{
            
            let moviesData = movies.map( async (movie,index)=>{
                let data = await axios.get(`http://localhost:8000/movies/${movie.movieid}`);
                let newData = data.data;
                let dateWatched = movies.find((movie)=>{if(movie.movieid == newData._id){return(movie)}})
                return(
                    <li key={index}>
                        
                            {newData.name}
                        
                        {" "+dateWatched.date.slice(0,10)}
                    
                    </li>
                )
            }) 
           let ans = await Promise.all(moviesData);
           SetMoviesArray(ans)
        }
         getMoviesArray()
    },[movies])

    useEffect(async()=>{
        const getData = async () =>{
            let data = await axios.get("http://localhost:8000/movies");
            data =data.data;
            let selects = data.map((movie)=>{
                return <option value={movie.name}>{movie.name}</option>
            })
            SetSelectData(selects)
        }
        getData();
    },[])
    

    const addSubscription = async ()=>{
        let data = await axios.get(`http://localhost:8000/subscriptions/${props.data._id}`);
        let movieId = await axios.get('http://localhost:8000/movies');
        movieId = movieId.data.find((movie)=>{if(movie.name==newMovieName){return movie}});
        let subscriptionId = data.data._id;
        let movieArr = data.data.movies;
        let newMovie = {
            movieid:movieId._id,
            date:newMovieDate
        }
        movieArr.push(newMovie);
        
        let Udata = {
            memberid: data.data.memberid,
            movies:movieArr
        }
        await axios.put(`http://localhost:8000/subscriptions/${subscriptionId}`,Udata);
        SetAddMovie(!addMovie);
        props.RefreshData();

        
    }

    let addMovieComp = null;
    if(addMovie==true){
        addMovieComp = <div>
                            <form>
                                <h5>Add a new movie</h5>
                                <label>Choose a movie:</label>
                                <select name="movie" id="movie" onChange={(e)=>{SetNewMovieName(e.target.value)}}>
                                    <option value="Choose a Movie" selected>Choose a Movie</option>
                                        {selectData}

                                </select>
                                <input type="date" onChange={(e)=>{SetNewMovieDate(e.target.value)}} /><br/>
                                <input type="button" value="Subscribe" onClick={addSubscription}/>
                            </form>
                       </div>
    }


    
    

    return(
        <div>
            <h5>Movies Watched</h5>
            <input type="button" value="Subscribe to new movie" onClick={()=>{SetAddMovie(!addMovie)}}/><br/>
            {addMovieComp}
            <ul>
            {MoviesArray} 
            </ul>
        </div>
    )

}