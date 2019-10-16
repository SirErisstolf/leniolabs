import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {members: [],showAdancedFilter :"false"};
  }
  
  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/115/senate/members.json',{headers: {'X-API-Key':'xt1aCaYtZjkGpJyZRi6DOiEYHCFmqIZlKb4zVAKO'}})
      .then(data => data.json())
      .then((data) => { this.setState({ members: data.results[0].members,originalMembers : data.results[0].members}) }); 
  }
  toggleAdvancedSearch = (event) =>{
    
    this.setState({showAdancedFilter: this.state.showAdancedFilter=="false"?"true":"false"})
  }

  
  search = (event) => {
    this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.last_name.toLowerCase().includes(event.target.value.toLowerCase())  ||  
              item.gender.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.party.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })});
  }

  search = (event) => {
    this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.last_name.toLowerCase().includes(event.target.value.toLowerCase())  ||  
              item.gender.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.party.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })});
  }
  searchByFirstName = (event) => {
    this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) 
    })});
  }
  searchByLastName = (event) => {
    this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.last_name.toLowerCase().includes(event.target.value.toLowerCase()) 
    })});
  }
  searchByGender = (event) => {
    this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.gender.toLowerCase().includes(event.target.value.toLowerCase())
    })});
  }
  searchByParty = (event) => {
    this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.party.toLowerCase().includes(event.target.value.toLowerCase())
    })});
  }
  searchByTitle = (event) => {
    this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })});
  }
  render() {
    let advancedFilter;
    if(this.state.showAdancedFilter != "false"){
      
      advancedFilter = <form className="search-input">
                          <div className = "advanced-search-input">
                            <p>First Name:</p>
                            <input
                              type="text"
                              onChange={this.searchByFirstName}
                            />
                          </div>
                          <div className = "advanced-search-input">
                            <p>LastName Name:</p>
                            <input
                              type="text"
                              onChange={this.searchByLastName}
                            />
                          </div>  
                          <div className = "advanced-search-input">
                            <p>Party:</p>
                            <input
                              type="text"
                              onChange={this.searchByParty}
                            />
                          </div>
                          <div className = "advanced-search-input">
                            <p>Gender:</p>
                            <input
                              type="text"
                              onChange={this.searchByGender}
                            />
                          </div>
                          <div className = "advanced-search-input">
                            <p>Title:</p>
                            <input
                              type="text"
                              onChange={this.searchByTitle}
                            />
                          </div>
                        </form>
    }else{
      advancedFilter = <div></div>
    }
    return (
      <div className = "home">
        <form className="search-input">
          <p>Search:</p>
          <input
            type="text"
            onChange={this.search}
          />

        </form>
        <a className = "pointer" onClick={this.toggleAdvancedSearch}> Advanced Search </a>
         {advancedFilter}
        
        <h1 className = "clear">List of Members</h1>
        
        <div className = "list">
        <table >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Party</th>
                  <th>Tittle</th>
                </tr>
              </thead>
               <tbody>
               {
              this.state.members.map(function(m,j){
                return (
                          <tr key = {j-1}>
                            <td className = "item-element" key = {j}>
                              
                            <Link to={{
                              pathname: `/view/${m.id}`, 
                            }}>
                             <u>{m.first_name} {m.last_name} </u>
                            </Link>
                            </td>
                            <td className = "item-element" key = {j+1}>
                              {m.gender} 
                            </td>
                            <td className = "item-element" key = {j+2}>
                              {m.party} 
                            </td>
                            <td className = "item-element" key = {j+3}>
                              {m.title} 
                            </td>
                            
                          </tr>
                )


              })
            }
               </tbody>
            </table>
            
          
        </div>
        
      </div>
    );
  }
}
;
