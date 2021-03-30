require('../configs/database');
const Subscription = require('./subsciptionSchema');

const getAllSubscriptions = () =>{
    return new Promise((resolve)=>{
        Subscription.find({},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                resolve(data);
            }
        })
    })
}

const getSubscription = (SubscriptionId) =>{
    return new Promise(async(resolve,reject)=>{
        let data = Subscription.findOne({memberid: SubscriptionId },(err)=>{
            if(err){
                reject(err)
            }
        })
        resolve(data);
        
    })
}

const addSubscription = (newSubscription) =>{
    let subscription = new Subscription({
        memberid: newSubscription.memberid,
        movies: newSubscription.movies,
    })
    console.log(subscription);
    subscription.save((err)=>{
        if(err){
            console.log("Failed to add new subscription :(")
        }
    })
}

const updateSubscription = (subscriptionId,Udata) =>{
    return new Promise((resolve,reject)=>{
        Subscription.findByIdAndUpdate(subscriptionId,{
            memberid: Udata.memberid,
            movies: Udata.movies,
        }, (err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Member Subscriptions Updated Succesfully :)")
            }
        })
    })
}

const deleteSubscriptions = (id) =>{
    return new Promise((resolve,reject)=>{
        Subscription.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err);
            }else{
                resolve("Subscriptions deleted succesfully :)")
            }
        })
    })
}

module.exports = {getAllSubscriptions, getSubscription, addSubscription, updateSubscription, deleteSubscriptions}