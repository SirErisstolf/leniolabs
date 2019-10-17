import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container,Row,Col } from 'react-bootstrap';

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
        <Container>
          <Row>
            <Col>Name</Col>
            <Col>Gender</Col>
            <Col>Party</Col>
            <Col>Title</Col>
          </Row>
          
          {
            this.state.members.map(function(m,j){
              return (
                      <Row>
                          <Col>
                            <Link to={{
                              pathname: `/view/${m.id}`, 
                            }}>
                            <u>{m.first_name} {m.last_name} </u>
                            </Link>
                          </Col>
                          <Col >
                            {m.gender} 
                          </Col>
                          <Col >
                            {m.party} 
                          </Col>
                          <Col >
                            {m.title} 
                          </Col>
                          </Row>
                )
              })
            }
        </Container>        
      </div>
    );
  }
}
;
