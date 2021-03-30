require('../configs/database');
const User = require('./usersSchema');
var jsonFile = require('jsonfile');

const getAllUsers = async () =>{
    return new Promise(async(resolve)=>{
        User.find({},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                resolve(data);
            }
        })
    })
}

const getUser = async (UserId) =>{
    return new Promise(async(resolve,reject)=>{
        User.findById(UserId,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

const addUser = async (newUser) =>{

    return new Promise(async(resolve,reject)=>{

        let user = new User({
            username: newUser.username,
            password: newUser.password,
        })
        console.log(user);
        user.save((err)=>{
            if(err){
                reject("Failed to add new User :(");
            }else{
                resolve(user);
            }
        })
    

    })

}

const updateUser = async (userId,Udata) =>{
    return new Promise((resolve,reject)=>{
        User.findByIdAndUpdate(userId,{
            username: Udata.username,
            password: Udata.password,
        },(err)=>{
            if(err){
                reject(err);
            }else{
                resolve("User updated succesfully :)");
            }
        })
    })
}

const deleteUser = async (id) =>{
    return new Promise((resolve,reject)=>{
        User.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err);
            }else{
                resolve("The user deleted succefully :)")
            }
        })
    })
}



module.exports = {getAllUsers, getUser, addUser, updateUser, deleteUser}