import React,{Component} from 'react'
import './Dashboard.css'
import {Switch,Route} from 'react-router-dom'
import moviesComp from '../DashboardComp/movies/moviesComp'
import usersManagement from '../DashboardComp/users/usersManagement'
import MembersComp from '../DashboardComp/Members/MembersComp'




export default class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {username : sessionStorage.getItem('username'), password : sessionStorage.getItem('password'),user:JSON.parse(sessionStorage.user)};

    }
    Logout = () =>{
        sessionStorage.clear();
        this.props.history.push('/');
    }
    moviesRouter = () =>{
        this.props.history.push('/Dashboard/movies/AllMovies')
    }
    subscriptionsRouter = () =>{
        this.props.history.push('/Dashboard/subscriptions/AllMembers')
    }
    manageUsers = () =>{
        this.props.history.push('/Dashboard/UsersManagement/AllUsers')
    }


    render(){

        let usersmanage = null;
        if(this.state.username ==="Admin"){
            usersmanage = <input type="Button" className="Button" value="Users Management" onClick={this.manageUsers}/>
        }

        return(
            <div>
                <div>
                    <h4>{this.state.username} Dashboard</h4>
                    <input type="button" className="Button" value="Movies" onClick={this.moviesRouter}/>
                    <input type="button" className="Button" value="Subscriptions" onClick={this.subscriptionsRouter}/>
                    {usersmanage}
                    <input type="button" className="Button" value="Log Out" onClick={this.Logout}/>
                </div>
                <Switch>
                    <Route path="/Dashboard/movies" component={moviesComp}/>
                    <Route path="/Dashboard/subscriptions" component={MembersComp}/>
                    <Route path="/Dashboard/UsersManagement" component={usersManagement}/>
                 </Switch>
            </div>
        )

    }


}