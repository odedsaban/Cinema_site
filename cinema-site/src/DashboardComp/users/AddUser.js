import axios from 'axios';
import React, { Component } from 'react'
import moment from 'moment'

export default class Adduser extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstname:"",
            lastname:"",
            username:"",
            sessionTimeOut:0,
            createdate:"",
            permissions:[],

            isviewsubscriptions:false,
            iscreatesubscriptions:false,
            isdeletesubscriptions:false,
            isupdatesubscriptions:false,
            isviewmovies:false,
            iscreatemovie:false,
            isdeletemovie:false,
            isupdatemovie:false,
        };
    }


    addUser = async () =>{
        let permissions = [];
        if(this.state.isviewsubscriptions===true){
            permissions.push("view subscriptions");
        }
        if(this.state.iscreatesubscriptions===true){
            permissions.push("create subscriptions");
        }
        if(this.state.isdeletesubscriptions===true){
            permissions.push("delete subscriptions");
        }
        if(this.state.isupdatesubscriptions===true){
            permissions.push("update subscriptions");
        }
        if(this.state.isviewmovies===true){
            permissions.push("view movies");
        }
        if(this.state.iscreatemovie===true){
            permissions.push("create movies");
        }
        if(this.state.isdeletemovie===true){
            permissions.push("delete movies");
        }
        if(this.state.isupdatemovie===true){
            permissions.push("update movies");
        }
        if(this.state.isviewsubscriptions===false){
            if(this.state.iscreatesubscriptions===true && this.state.isupdatesubscriptions===true&& this.state.isdeletesubscriptions===true){
                permissions.push("view subscriptions");
            };
        }
        if(this.state.isviewmovies===false){
            if(this.state.iscreatemovie===true && this.state.isupdatemovie===true&& this.state.isdeletemovie===true){
                permissions.push("view movies")
            }
        }

        var now = moment().format('DD/MM/YYYY');
        let userJson = {
            id:this.state.id,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            createdate: now,
            SessionTimeOut:this.state.sessionTimeOut
        };
        let permissionsJson = permissions
        
        let userData = {
            username: this.state.username,
            password:""
        }
        let data ={
            dbAdd : userData ,
            userJsonAdd : userJson,
            permissionsJsonAdd : permissionsJson
        }
        await axios.post(`http://localhost:8001/users`,data)
        this.props.history.push("/Dashboard/UsersManagement/AllUsers")
    }

    returnToUsers = () =>{
        this.props.history.push("/Dashboard/UsersManagement/AllUsers");
    }


    render(){
    return(
        <div className="component">
            First Name: <input type="text" onChange={(e)=>{this.setState({firstname:e.target.value})}}/><br/>
            Last Name: <input type="text"  onChange={(e)=>{this.setState({lastname:e.target.value})}}/><br/>
            UserName: <input type="text"  onChange={(e)=>{this.setState({username:e.target.value})}}/><br/>
            Session time out (Minutes) <input type="text" onChange={(e)=>{this.setState({sessionTimeOut:e.target.value})}}/><br/>
            Permissions:<br/>
            <input type="checkbox" name="view subscriptions"   onClick={()=>{this.setState({isviewsubscriptions:!this.state.isviewsubscriptions})}}  /> view Subscriptions <br/>
            <input type="checkbox" name="create subscriptions" onClick={()=>{this.setState({iscreatesubscriptions:!this.state.iscreatesubscriptions})}}  /> create Subscriptions <br/>
            <input type="checkbox" name="delete subscriptions" onClick={()=>{this.setState({isdeletesubscriptions:!this.state.isdeletesubscriptions})}} /> delete Subscriptions <br/>
            <input type="checkbox" name="update subscriptions" onClick={()=>{this.setState({isupdatesubscriptions:!this.state.isupdatesubscriptions})}} /> update Subscriptions <br/> 
            <input type="checkbox" name="view movies" onClick={()=>{this.setState({isviewmovies:!this.state.isviewmovies})}} /> view Movies <br/>
            <input type="checkbox" name="create movies" onClick={()=>{this.setState({iscreatemovie:!this.state.iscreatemovie})}} /> create Movies <br/>
            <input type="checkbox" name="delete movies" onClick={()=>{this.setState({isdeletemovie:!this.state.isdeletemovie})}} /> delete Movies <br/>
            <input type="checkbox" name="update movies" onClick={()=>{this.setState({isupdatemovie:!this.state.isupdatemovie})}} /> update Movies <br/>
            <input type="submit" value="Create User" onClick={this.addUser}/><br/>
            <input type="button" value="Cancel" onClick={this.returnToUsers} />
        </div>
    )
    }

}