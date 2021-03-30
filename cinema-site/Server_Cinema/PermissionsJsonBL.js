var jsonFile = require('jsonfile');

const getAllPermissionsJSONdata = async () => {

    return new Promise((resolve) => {
        jsonFile.readFile('./Permissions.json', (err, data) => {
            if (err) {
                //Do some things
            }
            else {
                resolve(data)
            }
        })
    })
}

const addPermissionJsonData =async (newData) =>{
    let data = await getAllPermissionsJSONdata();
    data.push(newData);
    jsonFile.writeFile('./Permissions.json',data,{ spaces: 2, EOL: '\r\n' }).then(res=>console.log('Write complete')).catch(err=>console.log(err))
}

const updatePermissionJson = async (id,data) =>{
    let arr = await getAllPermissionsJSONdata();
    let array = arr.filter((obj)=>{
        if(obj.id!=id){
            return obj
        }else{
        }
    });
    array.push(data);
    jsonFile.writeFile('./Permissions.json',array,{ spaces: 2, EOL: '\r\n' }).then(res=>console.log('Write complete')).catch(err=>console.log(err))
}

const deletePermissionJsonData = async (id) =>{
    let arr = await getAllPermissionsJSONdata();
    arr = arr.filter((obj)=>{if(obj.id!=id){
        return obj
    }})
    jsonFile.writeFile('./Permissions.json',arr,{ spaces: 2, EOL: '\r\n' }).then(res=>console.log('Write complete')).catch(err=>console.log(err))

}

module.exports = {getAllPermissionsJSONdata, addPermissionJsonData, updatePermissionJson, deletePermissionJsonData}