import axios from 'axios'
import React,{useEffect,useState} from 'react'

export default function AddMember(props){


    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');

    const addMember = async()=>{
        let member = {
            name : name,
            email : email,
            city : city
        }
        await axios.post('http://localhost:8000/members',member);
        props.history.push("/Dashboard/subscriptions/AllMembers");
    }



    return(
        <div>
            <h4>Add new Member</h4>
            Name: <input type="text" onChange={(e)=>{setName(e.target.value)}} /><br/>
            Email:<input type="text" onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            City:<input type="text" onChange={(e)=>{setCity(e.target.value)}}/><br/>
            <input type="button" value="Save" onClick={addMember}/>
            <input type="button" value="Cancel" onClick={()=>{props.history.push("/Dashboard/subscriptions/AllMembers")}}/>
        </div>
    )



}