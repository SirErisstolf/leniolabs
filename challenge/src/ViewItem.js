import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from 'react-bootstrap';
export default class ViewItem extends Component{
  constructor(props) {
    super(props);
    this.state = {member: [],showAdancedFilter :"false"};
  }
  
  componentDidMount() {

    const id = this.props.match.params.id;
 
    fetch('https://api.propublica.org/congress/v1/members/'+id+'.json',{headers: {'X-API-Key':'xt1aCaYtZjkGpJyZRi6DOiEYHCFmqIZlKb4zVAKO'}})
      .then(data => data.json())
      .then((data) => { this.setState({ member: data.results[0]}) }); 
  }

  
  render() {
    let showRoles;
    if(typeof this.state.member.roles != "undefined"){
      showRoles = <ul>
          {
            this.state.member.roles.map(function(role,i){
              return <li key={i}> {role.title}, {role.start_date}, {role.state}</li>
            })
          }  
      </ul>
    }else{
      showRoles = <div></div>
    }
    return (
      <div className = "home">
        <Link to={{
          pathname: `/`, 
        }}>
          <Button type="button">
            Back
          </Button>
        </Link>
      <h1>{this.state.member.first_name} {this.state.member.last_name}</h1>
      <div>
        <span>Gender: </span><span>{this.state.member.gender}</span>
      </div>
      <div>
        <span>Party:</span><span>{this.state.member.current_party}</span>
      </div>
      <div>
        <span>Date of Birth: </span><span>{this.state.member.date_of_birth}</span>
      </div>
      <div>
        <span>Facebook Account: </span><span>{this.state.member.facebook_account}</span>
      </div>
      <div>
        <span>Most Recent Vote: </span><span>{this.state.member.most_recent_vote}</span>
      </div>
      <div>
        <span>Roles: </span>
        
      {showRoles}
    
        
        
      </div>
    
      </div>
    );
  }
}
;
