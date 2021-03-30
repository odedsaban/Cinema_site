import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {username:"",password:""}
    }

    login = async () =>{
        let data = await axios.get('http://localhost:8001/users');
        data = data.data;
        let user  = data.find(value => {
            if(value.username === this.state.username && value.password===this.state.password){
                return value;
            }
        });
        if(user!== undefined && user.password!==""){


            sessionStorage.setItem('username',user.username);
            sessionStorage.setItem('password',user.password);
            let data = await axios.get(`http://localhost:8001/users/${user.id}`);
            data= data.data;
            sessionStorage.setItem('user',JSON.stringify(data))
            this.props.history.push('/Dashboard')

        }else{
            if(user.password===""){
                alert("Go to create account and choose a password :)")
            }else{
                alert("Username or Password wrong")
            }
        }
        
    }

    render(){


        return(
            <div>
                <h4>Log in Page</h4>
                User name:<input type="text" onChange={(e)=>{this.setState({username: e.target.value})}} /><br/>
                Password: <input type="password" onChange={(e)=>{this.setState({password:e.target.value})}}/><br/>
                <input type="button" value="Login" onClick={this.login}/><br/>
                New User ?: <Link to="/register"><a>Create Account</a></Link>
            </div>
        )

    }


}