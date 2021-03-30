const express = require('express');
const { stderr } = require("process");

const router = express.Router();
const UsersBL = require('./usersBL');
const userJsonBL = require('../usersJsonBL');
const permissionsBL = require('../PermissionsJsonBL');


router.route('/').get(async(req,resp)=>{
    let data = await UsersBL.getAllUsers();
    let usersJson = await userJsonBL.getAllUsersJSONdata();
    let persmissionJson = await permissionsBL.getAllPermissionsJSONdata();
    let users = data.map((user)=>{
        let userdata = usersJson.find((obj)=>{
            if(user._id==obj.id){
                return obj;
            }   
        });
        let userPermissiondata = persmissionJson.find((obj)=>{
            if(user._id==obj.id){
                return obj;
            }   
        });
        let userData = {
            id: user.id,
            firstname: userdata.firstname,
            lastname: userdata.lastname,
            username: user.username,
            password: user.password,
            sessionTimeOut: userdata.SessionTimeOut,
            createdate: userdata.createdate,
            permissions:userPermissiondata.permissions
        }
        return userData;
        
    })
    return resp.json(users);
})

router.route('/:id').get(async(req,resp)=>{
    let data = await UsersBL.getUser(req.params.id);
    let usersJson = await userJsonBL.getAllUsersJSONdata(req.params.id)
    let persmissionJson = await permissionsBL.getAllPermissionsJSONdata(req.params.id);
    let userdata = usersJson.find((obj)=>{
        if(req.params.id==obj.id){
            return obj;
        }   
    });
    let userPermissiondata = persmissionJson.find((obj)=>{
        if(req.params.id==obj.id){
            return obj;
        }   
    });
    let userData = {
        id: data._id,
        firstname: userdata.firstname,
        lastname:userdata.lastname,
        username: data.username,
        password:data.password,
        sessionTimeOut: userdata.SessionTimeOut,
        createdate: userdata.createdate,
        permissions:userPermissiondata.permissions
    }
    return resp.json(userData);  
    })



router.route('/').post(async(req,resp)=>{
    let dbAdd = req.body.dbAdd;
    let dbAddData = {
        username: dbAdd.username,
        password:dbAdd.password
    }
    
    let userJson = req.body.userJsonAdd;
    let userdata = await UsersBL.addUser(dbAddData);

    let permissionsJson = {
        id: userdata._id,
        permissions: req.body.permissionsJsonAdd
    }
    let userJsonData = {
        id : userdata._id,
        firstname : userJson.firstname,
        lastname : userJson.lastname,
        createdate : userJson.createdate,
        SessionTimeOut : userJson.sessionTimeOut
    };

    await userJsonBL.addUserJsonData(userJsonData);
    await permissionsBL.addPermissionJsonData(permissionsJson)

    return resp.json("Done :)")
})

router.route('/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let dbUpdate = req.body.dbUpdate;
    let dbData = await UsersBL.getUser(id);
    let dbUpdateData = {
        username:dbUpdate.username,
        password:dbData.password
    }
    let permissionsJsonUpdate = req.body.permissionsJsonUpdate;
    let userJsonUpdate = req.body.userJsonUpdate;
    await UsersBL.updateUser(id,dbUpdateData);
    await userJsonBL.updateUsersJson(id,userJsonUpdate);
    await permissionsBL.updatePermissionJson(id,permissionsJsonUpdate);
    return resp.json("Done :)");
})
router.route('/setpassword/:id').put(async(req,resp)=>{
    let id = req.params.id;
    let dbUpdate = req.body;
    await UsersBL.updateUser(id,dbUpdate);
})

router.route('/:id').delete(async(req,resp)=>{
    let id = req.params.id;
    await UsersBL.deleteUser(id);
    await permissionsBL.deletePermissionJsonData(id);
    await userJsonBL.deleteUserJsonData(id);
    return resp.json("Done :)");
})

module.exports = router;