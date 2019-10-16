import React, {Component} from 'react';
export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {members: [],test :"1"};
  }
  
  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/115/senate/members.json',{headers: {'X-API-Key':'xt1aCaYtZjkGpJyZRi6DOiEYHCFmqIZlKb4zVAKO'}})
      .then(data => data.json())
      .then((data) => { this.setState({ members: data.results[0].members,originalMembers : data.results[0].members}) }); 
  }

  search = (event) => {
    console.log(event.target.value);
    //console.log(this.state.members);
    this.setState({members: this.state.originalMembers.filter(function(item) {
      
      return  item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.last_name.toLowerCase().includes(event.target.value.toLowerCase())  ||  
              item.gender.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.party.toLowerCase().includes(event.target.value.toLowerCase()) ||
              item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })});
  }
  render() {
    return (
      <div className = "home">
        <form className="search-input">
          <p>Search:</p>
          <input
            type="text"
            onChange={this.search}
          />
        </form>
        <h1>List of Members</h1>
        
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
                              <u>{m.first_name} {m.last_name} </u>
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
