import axios from 'axios';
import React, { Component } from 'react'

export default class EditUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(sessionStorage.edituser),
            id:"",
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



    componentDidMount(){
        this.setState({id:this.state.user.id, firstname:this.state.user.firstname, lastname:this.state.user.lastname, username:this.state.user.username, sessionTimeOut:this.state.user.sessionTimeOut,
                       createdate:this.state.user.createdate, permissions:this.state.user.permissions})
        this.createSubsPre()

    }


    updateuser = async () =>{
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
        let userJson = {
            id:this.state.id,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            createdate:this.state.createdate,
            SessionTimeOut:this.state.sessionTimeOut
        };
        let permissionsJson = {
            id: this.state.id,
            permissions:permissions
        }
        let user = await axios.get(`http://localhost:8001/users/${this.state.id}`);
        let userData = {
            username: this.state.username,
            password:user.password
        }
        let data ={
            dbUpdate : userData ,
            userJsonUpdate: userJson,
            permissionsJsonUpdate:permissionsJson
        }
        await axios.put(`http://localhost:8001/users/${this.state.id}`,data)

        this.props.history.push("/Dashboard/UsersManagement/AllUsers")
    }

    returnToUsers = () =>{
        this.props.history.push("/Dashboard/UsersManagement/AllUsers");
    }

    createSubsPre = ()=>{
        if(this.state.user.permissions.includes("view subscriptions")){
            this.setState({isviewsubscriptions:!this.state.isviewsubscriptions});
        };
        if(this.state.user.permissions.includes("create subscriptions")){
            this.setState({iscreatesubscriptions:!this.state.iscreatesubscriptions});
        };
        if(this.state.user.permissions.includes("delete subscriptions")){
            this.setState({isdeletesubscriptions:!this.state.isdeletesubscriptions});
        };
        if(this.state.user.permissions.includes("update subscriptions")){
            this.setState({isupdatesubscriptions:!this.state.isupdatesubscriptions});
        };
        if(this.state.user.permissions.includes("view movies")){
            this.setState({isviewmovies:!this.state.isviewmovies});
        };
        if(this.state.user.permissions.includes("create movies")){
            this.setState({iscreatemovie:!this.state.iscreatemovie});
        };
        if(this.state.user.permissions.includes("delete movies")){
            this.setState({isdeletemovie:!this.state.isdeletemovie});
        };
        if(this.state.user.permissions.includes("update movies")){
            this.setState({isupdatemovie:!this.state.isupdatemovie});
        };
        if(this.state.iscreatesubscriptions===true && this.state.isupdatesubscriptions===true&& this.state.isdeletesubscriptions===true){
            this.setState({isviewsubscriptions:true});
        };
        if(this.state.iscreatemovie===true && this.state.isupdatemovie===true&& this.state.isdeletemovie===true){
            this.setState({isviewmovies:true});
        }
    }

    render(){
    return(
        <div className="component">
            First Name: <input type="text" defaultValue={this.state.user.firstname} onChange={(e)=>{this.setState({firstname:e.target.value})}}/><br/>
            Last Name: <input type="text" defaultValue={this.state.user.lastname} onChange={(e)=>{this.setState({lastname:e.target.value})}}/><br/>
            UserName: <input type="text" defaultValue={this.state.user.username} onChange={(e)=>{this.setState({username:e.target.value})}}/><br/>
            Session time out (Minutes) <input type="text" defaultValue={this.state.user.sessionTimeOut} onChange={(e)=>{this.setState({sessionTimeOut:e.target.value})}}/><br/>
            Created date : {this.state.user.createdate}<br/>
            Permissions:<br/>
            <input type="checkbox" name="view subscriptions"   checked={this.state.isviewsubscriptions}  onClick={()=>{this.setState({isviewsubscriptions:!this.state.isviewsubscriptions})}}  /> view Subscriptions <br/>
            <input type="checkbox" name="create subscriptions" checked={this.state.iscreatesubscriptions}  onClick={()=>{this.setState({iscreatesubscriptions:!this.state.iscreatesubscriptions})}}  /> create Subscriptions <br/>
            <input type="checkbox" name="delete subscriptions" checked={this.state.isdeletesubscriptions} onClick={()=>{this.setState({isdeletesubscriptions:!this.state.isdeletesubscriptions})}} /> delete Subscriptions <br/>
            <input type="checkbox" name="update subscriptions" checked={this.state.isupdatesubscriptions} onClick={()=>{this.setState({isupdatesubscriptions:!this.state.isupdatesubscriptions})}} /> update Subscriptions <br/> 
            <input type="checkbox" name="view movies"   checked={this.state.isviewmovies} onClick={()=>{this.setState({isviewmovies:!this.state.isviewmovies})}} /> view Movies <br/>
            <input type="checkbox" name="create movies" checked={this.state.iscreatemovie} onClick={()=>{this.setState({iscreatemovie:!this.state.iscreatemovie})}} /> create Movies <br/>
            <input type="checkbox" name="delete movies" checked={this.state.isdeletemovie} onClick={()=>{this.setState({isdeletemovie:!this.state.isdeletemovie})}} /> delete Movies <br/>
            <input type="checkbox" name="update movies" checked={this.state.isupdatemovie} onClick={()=>{this.setState({isupdatemovie:!this.state.isupdatemovie})}} /> update Movies <br/>
            <input type="submit" value="Update" onClick={this.updateuser}/><br/>
            <input type="button" value="Cancel" onClick={this.returnToUsers} />
        </div>
    )
    }

}