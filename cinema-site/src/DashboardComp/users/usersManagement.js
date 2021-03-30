import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import AddUser from './AddUser'
import Users from './Users'
import EditUser from './EditUser'

export default class UsersManagementComp extends Component{


    MoveToAdd = () =>{
        this.props.history.push('/Dashboard/UsersManagement/AddUser');
    }
    MoveToUsers = () =>{
        this.props.history.push('/Dashboard/UsersManagement/AllUsers');
    }

    render(){
        
        return(
            <div>
               <h4>Users</h4>
               <input type="button" className="Button" value="All Users" onClick={this.MoveToUsers}/>
               <input type="button" value="Add User" onClick={this.MoveToAdd}/><br/>
               
               <Switch>
                    <Route path="/Dashboard/UsersManagement/AllUsers" component={Users}/>
                    <Route path="/Dashboard/UsersManagement/AddUser" component={AddUser}/>
                    <Route path="/Dashboard/UsersManagement/EditUser" component={EditUser}/>
                 </Switch>
            </div>
        )
    }



}