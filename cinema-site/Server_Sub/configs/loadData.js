
const axios = require('axios')
const MovieSchema =  require('../Movie/moviesSchema')
const membersSchema = require('../Members/membersSchema')
const SubscriptionsSchema = require('../Subscriptions/subsciptionSchema')
const moment = require('moment')


const getMovies = () =>{

    return new Promise(async(resolve,reject)=>{
        let movies = await axios.get('https://api.tvmaze.com/shows');
        let moviesdata = movies.data;
        moviesdata.forEach(movie => {
            let userdata = new MovieSchema({
                name: movie.name,
                genres: movie.genres,
                image: movie.image.medium,
                premiered: new Date(movie.premiered),
            })

            userdata.save((err)=>{
                if(err){
                    reject(err)
                }
            })
        });
        console.log("Movies added to the DB")
    })
    

}
const getMembers = () =>{
    return new Promise(async(req,resp)=>{
        let members = await axios.get('https://jsonplaceholder.typicode.com/users');
        let membersData = members.data;
        membersData.forEach(member=>{
            let memberdata = new membersSchema({
                name: member.name,
                email: member.email,
                city: member.address.city,
            });
            let id = null;
            memberdata.save((err)=>{
                if(err){
                    reject(err);
                }else{
                        let subscriptionsData = new SubscriptionsSchema({
                            memberid: memberdata._id,
                            movies: []
                        })
                        subscriptionsData.save((err)=>{
                            if(err){
                                reject(err);
                            }
                        })
                    }
                }
            );
        })
        console.log("Members added to the DB ")
    })
}
getMovies()
getMembers()



//put the movies inside the collection
//put the users inside the collection

