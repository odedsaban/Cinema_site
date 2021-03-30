
var jsonFile = require('jsonfile');


const getAllUsersJSONdata = async () => {

    return new Promise((resolve) => {
        jsonFile.readFile('./Users.json', (err, data) => {
            if (err) {
                //Do some things
            }
            else {
                resolve(data)
            }
        })
    })
}

const addUserJsonData =async (newData) =>{
    let data = await getAllUsersJSONdata();
    data.push(newData);
    jsonFile.writeFile('./Users.json',data,{ spaces: 2, EOL: '\r\n' }).then(res=>console.log('Write complete')).catch(err=>console.log(err))
}

const updateUsersJson = async (id,data) =>{
    let arr = await getAllUsersJSONdata();
    let array = arr.filter((obj)=>{
        if(obj.id!=id){
            return obj
        }else{
        }
    });    
    array.push(data);
    jsonFile.writeFile('./Users.json',array,{ spaces: 2, EOL: '\r\n' }).then(res=>console.log('Write complete')).catch(err=>console.log(err))
}

const deleteUserJsonData = async (id) =>{
    let arr = await getAllUsersJSONdata();
    arr = arr.filter((obj)=>{if(obj.id!=id){
        return obj
    }})
    jsonFile.writeFile('./Users.json',arr,{ spaces: 2, EOL: '\r\n' }).then(res=>console.log('Write complete')).catch(err=>console.log(err))

}

module.exports = {getAllUsersJSONdata, addUserJsonData, updateUsersJson, deleteUserJsonData}