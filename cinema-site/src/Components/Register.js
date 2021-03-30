import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Register extends Component{

    constructor(props){
        super(props);
        this.state = {username:"",password:""}
    }


    CreateUser = async () => {
        let data = await axios.get('http://localhost:8001/users');
        data = data.data;
        let user  = data.find((value) => {
            if(value.username === this.state.username){
                return value;
            }
        });
        if(user!== undefined){
            console.log(user)
            if(this.state.password!==""){
                let newData={
                    username: user.username,
                    password: this.state.password
                }
                axios.put(`http://localhost:8001/users/setpassword/${user.id}`,newData)
                this.props.history.push('/');
            }else{
                alert("You Must Choose Password")
            }
            
        }else{
            alert("Inavalid Username :(")
        }

    }


    render(){

        return(
            <div>
                <h4>Create an Account</h4>
                User name:<input type="text" onChange={(e)=>{this.setState({username: e.target.value})}} /><br/>
                Password: <input type="password" onChange={(e)=>{this.setState({password:e.target.value})}}/><br/>
                <input type="button" value="Create" onClick={this.CreateUser}/>
                <Link to="/"><button>Return To Login Page</button></Link>
            </div>
        )


    }



}