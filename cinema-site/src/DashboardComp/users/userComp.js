import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Components.css'

export default function UserComp(props){

    const [user,setUser] = useState({});


    useEffect(()=>{
        const getData = async () =>{
        const currentUser = await axios.get(`http://localhost:8001/users/`+props.data.id);
        setUser(currentUser.data);

        }
        getData();

    },[props.data.id])

    let permissions = user.permissions;
    let permissionsData = null;
    if(permissions){
        permissionsData = permissions.map((per)=>{
            return( per+", ");
        })
    }
    const moveToEditPage = () =>{
        sessionStorage.setItem("edituser",JSON.stringify(user));
        props.moveToedit()
    }
    const deleteUser = async () =>{
        await axios.delete(`http://localhost:8001/users/${user.id}`);
        props.movetoAllUsers();
    }
    
    return(
        <div className="component">
            Name:{user.firstname+" "+user.lastname}<br/>
            User Name:{user.username}<br/>
            Session time out(Minutes):{user.sessionTimeOut}<br/>
            Created Date: {user.createdate}<br/>
            Permissions:{permissionsData}<br/>
            <input type="button" className="Button" value="Edit" onClick={moveToEditPage}/>
            <input type="button" value="Delete" onClick={deleteUser}/>
        </div>
    )


}