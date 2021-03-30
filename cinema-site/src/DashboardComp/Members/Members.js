import React,{useEffect,useState} from 'react'
import axios from 'axios'
import MemberComp from './MemberComp'

export default function Members(props){

    const [members,setMembers] = useState([]);

    const getData = async () =>{
        const currentMembers = await axios.get('http://localhost:8000/members');
        setMembers(currentMembers.data);
    }
    useEffect(async()=>{
        getData()
    },[])
    useEffect(async()=>{
        getData()
    },[members])


    const MoveToEdit = () =>{
        props.history.push("/Dashboard/subscriptions/EditMember");
    }
    const moveToAllMmebers = async () =>{
        let data = await axios.get('http://localhost:8000/members');
        data = data.data;
        setMembers(data);
    }
    let membersData = null;
    if(members){
        membersData = members.map((member,index)=>{
            return <MemberComp MoveToEdit={MoveToEdit} moveToAllMmebers={moveToAllMmebers} key={index} data={member}/>
        })
    }

    

    return(membersData)

}