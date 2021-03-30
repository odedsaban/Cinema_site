import React,{Component} from 'react'
import axios from 'axios'
import UserComp from './userComp'


export default class UsersComp extends Component{

    constructor(props){
        super(props);
        this.state={users:[]}
    }
    async componentDidMount(){
        let data = await axios.get('http://localhost:8001/users');
        data = data.data;
        this.setState({users:data});
    }
    MoveToEdit = () =>{
        this.props.history.push("/Dashboard/UsersManagement/EditUser");
    }
    movetoAllUsers = async () =>{
        let data = await axios.get('http://localhost:8001/users');
        data = data.data;
        this.setState({users:data});
    }

    render(){

        let users = this.state.users.map((user,index)=>{

            return <UserComp moveToedit={this.MoveToEdit} movetoAllUsers={this.movetoAllUsers} key={index} data={user}/>
        })

        return(users);
    }

}


