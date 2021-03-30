import axios from 'axios';
import React, { useState, useEffect , useCallback } from 'react'
import MoviesWatched from './MoviesWatched'
import '../Components.css'

export default function MemberComp(props){

    let member = props.data;

    

    const moveToEdit = () =>{
        sessionStorage.setItem('memberEdit',JSON.stringify(member));
        props.MoveToEdit();
    }
    const DeleteMember = async () =>{
        await axios.delete(`http://localhost:8000/members/${member._id}`)
        props.moveToAllMmebers();
    }
    const RefreshData = async () =>{
        props.moveToAllMmebers();
    }
    

    return(
        <div className="component">
            <h4>{member.name}</h4>
            Email:{member.email}<br/>
            City:{member.city}<br/>
            <input type="button" value="Edit" onClick={moveToEdit}/>
            <input type="button" value="Delete" onClick={DeleteMember}/><br/>
            <MoviesWatched data={member} RefreshData={RefreshData}/>
        </div>
    )



}