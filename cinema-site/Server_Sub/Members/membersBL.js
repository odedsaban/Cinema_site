require('../configs/database')
const { Promise } = require('mongoose')
const Member = require('./membersSchema')
const SubscriptionsSchema = require('../Subscriptions/subsciptionSchema')

const getAllMembers = () =>{
    return new Promise((resolve)=>{
        Member.find({},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                resolve(data);
            }
        })
    })
}

const getMember = (memberId) =>{

    return new Promise(async(resolve,reject)=>{
        Member.findById(memberId,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })

}

const addMember = (newMember) =>{
    let member = new Member({
        name: newMember.name,
        email: newMember.email,
        city: newMember.city
    })
    member.save((err)=>{
        if(err){
            console.log(err);
        }else{
            let subscriptionsData = new SubscriptionsSchema({
                memberid: member._id,
                movies: []
            })
            subscriptionsData.save((err)=>{
                if(err){
                    reject(err);
                }
            })
        }
    })
}

const updateMember = (memberId,Udata) =>{
    return new Promise((resolve,reject)=>{
        Member.findByIdAndUpdate(memberId,{
            name: Udata.name,
            email: Udata.email,
            city:Udata.city
        }, (err)=>{
            if(err){
                reject(err);
            }else{
                resolve("Member Updated Succefully :)");
            }
        })
    })
}

const deleteMember = async (id) =>{
    return new Promise((resolve,reject)=>{
        Member.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err);
            }else{
                SubscriptionsSchema.findOneAndDelete({memberid: id },(err)=>{
                    if(err){
                        reject(err);
                    }else{
                        console.log("Deleted Successfuly :)");
                    }
                });
            
            }
        })
    })
}

module.exports = {deleteMember, updateMember, addMember, getMember, getAllMembers}