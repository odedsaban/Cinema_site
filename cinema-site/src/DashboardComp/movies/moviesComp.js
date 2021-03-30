import React,{Component} from 'react'
import '/Users/IMOE001/Documents/Full Stack/Cinema_Site/cinema-site/src/Components/Dashboard.css'
import { Route, Switch } from 'react-router-dom';
import AddMovie from './AddMovie'
import Movies from './Movies'
import EditMovie from './EditMovie'

export default class moviesComp extends Component{


    constructor(props){
        super(props);
    }
    
    render(){

        return(
            <div>
               <h4>Movies</h4>
               <input type="button" className="Button" value="All Movies" onClick={()=>{this.props.history.push("/Dashboard/movies/AllMovies")}}/>
               <input type="button" className="Button" value="Add Movie" onClick={()=>{this.props.history.push("/Dashboard/movies/AddMovie")}}/><br/>
               
               <Switch>
                   <Route path="/Dashboard/movies/AllMovies" component={Movies}/>
                   <Route path="/Dashboard/movies/AddMovie" component={AddMovie}/>
                   <Route path="/Dashboard/movies/EditMovie" component={EditMovie}/>
               </Switch>
                
            </div>
        )
    }



}