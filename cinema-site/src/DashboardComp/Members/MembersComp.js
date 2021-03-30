import React,{Component} from 'react'
import { Route, Switch } from 'react-router-dom';
import Subscriptions from './Members'
import AddMember from './AddMember'
import EditMember from './EditMember'
import Members from './Members';

export default class MembersComp extends Component{


    constructor(props){
        super(props);
    }

    render(){

        return(
            <div>
               <h4>Subsciptions</h4>
               <input type="button" className="Button" value="All Members" onClick={()=>{this.props.history.push("/Dashboard/subscriptions/AllMembers")}}/>
               <input type="button" className="Button" value="Add Member" onClick={()=>{this.props.history.push("/Dashboard/subscriptions/AddMember")}}/><br/>
               
               <Switch>
                   <Route path="/Dashboard/subscriptions/AllMembers" component={Members}/>
                   <Route path="/Dashboard/subscriptions/AddMember" component={AddMember}/>
                   <Route path="/Dashboard/subscriptions/EditMember" component={EditMember}/>
               </Switch>

            </div>
        )
    }



}