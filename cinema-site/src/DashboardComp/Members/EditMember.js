import axios from 'axios'
import React,{useEffect,useState} from 'react'

export default function EditMember(props){

    let memberEdit = JSON.parse(sessionStorage.memberEdit);

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');

    useEffect(async()=>{
        const getData = async () =>{
            setName(memberEdit.name);
            setEmail(memberEdit.email);
            setCity(memberEdit.city);
        }
        getData();
    },[])


    const editMember = async()=>{
        let member = {
            name : name,
            email : email,
            city : city
        }
        await axios.put(`http://localhost:8000/members/${memberEdit._id}`,member);
        props.history.push("/Dashboard/subscriptions/AllMembers");
    }



    return(
        <div>
            <h4>Edit Member</h4>
            Name: <input type="text" defaultValue={memberEdit.name} onChange={(e)=>{setName(e.target.value)}} /><br/>
            Email:<input type="text" defaultValue={memberEdit.email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            City:<input type="text" defaultValue={memberEdit.city} onChange={(e)=>{setCity(e.target.value)}}/><br/>
            <input type="button" value="Save" onClick={editMember}/>
            <input type="button" value="Cancel" onClick={()=>{props.history.push("/Dashboard/subscriptions/AllMembers")}}/>
        </div>
    )



}