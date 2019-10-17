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
    this.state = {  members: [],
                    showAdancedFilter :"false",
                    paginationSize : 7
                  };
  }
  
  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/115/senate/members.json',{headers: {'X-API-Key':'xt1aCaYtZjkGpJyZRi6DOiEYHCFmqIZlKb4zVAKO'}})
      .then(data => data.json())
      .then((data) => { this.setState({ members: data.results[0].members.slice(0,7),
                                        originalMembers : data.results[0].members,
                                        totalMembers : data.results[0].members.length,
                                        totalPages: Math.trunc(data.results[0].members.length/7),
                                        filtered:false,
                                        filterValue : ''
                                      }) }); 
  }
  toggleAdvancedSearch = (event) =>{
    
    this.setState({showAdancedFilter: this.state.showAdancedFilter=="false"?"true":"false"})
  }

  
  search = (event) => {
   var members = this.state.originalMembers.filter(function(item) {
       
      return  item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.last_name.toLowerCase().includes(event.target.value.toLowerCase())  ||  
              item.gender.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.party.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })
    

    this.setState({filterValue:event.target.value});
    this.setState({members: members.slice(0,7)});
    this.setState({totalPages: Math.trunc(members.length/7)});
    
  /*  this.setState({members: this.state.originalMembers.filter(function(item) {
       
      return  item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.last_name.toLowerCase().includes(event.target.value.toLowerCase())  ||  
              item.gender.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.party.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })});*/
  }

  searchByFirstName = (event) => {

    var members = this.state.originalMembers.filter(function(item) { 
      return  item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) 
    })

    this.setState({filterValue:event.target.value});
    this.setState({members: members.slice(0,7)});
    this.setState({totalPages: Math.trunc(members.length/7)});
    
  }
  searchByLastName = (event) => {
    var members = this.state.originalMembers.filter(function(item) { 
      return  item.last_name.toLowerCase().includes(event.target.value.toLowerCase()) 
    })

    this.setState({filterValue:event.target.value});
    this.setState({members: members.slice(0,7)});
    this.setState({totalPages: Math.trunc(members.length/7)});
  }
  searchByGender = (event) => {
    var members = this.state.originalMembers.filter(function(item) { 
      return  item.gender.toLowerCase().includes(event.target.value.toLowerCase()) 
    })

    this.setState({filterValue:event.target.value});
    this.setState({members: members.slice(0,7)});
    this.setState({totalPages: Math.trunc(members.length/7)});
  }
  searchByParty = (event) => {
    debugger;
    var members = this.state.originalMembers.filter(function(item) { 
      return  item.party.toLowerCase().includes(event.target.value.toLowerCase()) 
    })

    this.setState({filterValue:event.target.value});
    this.setState({members: members.slice(0,7)});
    this.setState({totalPages: Math.trunc(members.length/7)});
    this.setState({filtered: true});
    
  }
  searchByTitle = (event) => {
    var members = this.state.originalMembers.filter(function(item) { 
      return  item.title.toLowerCase().includes(event.target.value.toLowerCase()) 
    })

    this.setState({filterValue:event.target.value});
    this.setState({members: members.slice(0,7)});
    this.setState({totalPages: Math.trunc(members.length/7)});
  }

  handlePagination = (ev) => {

    var filter = this.state.filterValue;   
    var members = this.state.originalMembers.filter(function(item) {
    
      return  item.first_name.toLowerCase().includes(filter.toLowerCase()) ||
              item.last_name.toLowerCase().includes(filter.toLowerCase())  ||  
              item.gender.toLowerCase().includes(filter.toLowerCase()) ||
              item.party.toLowerCase().includes(filter.toLowerCase()) ||
              item.title.toLowerCase().includes(filter.toLowerCase())
    })
    let start = 7*ev;
    let end = 7+7*ev;
    
    this.setState({members:members.slice(start,end)})
  }
  render() {
    let pages=[];
    for (let i=0; i< this.state.totalPages; i++) {
      pages.push(<div className="paginator" key={i} onClick={() => this.handlePagination(i)}>{i+1}</div>  )
    }
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
                      <Row key={j-1}>
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
            <div className="pages">
              {pages}
            </div>
        </Container>   
             
      </div>
    );
  }
}
;
