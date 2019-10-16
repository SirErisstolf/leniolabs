import React, {Component} from 'react';
export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {members: [],test :"1"};
  }
  
  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/115/senate/members.json',{headers: {'X-API-Key':'xt1aCaYtZjkGpJyZRi6DOiEYHCFmqIZlKb4zVAKO'}})
      .then(data => data.json())
      .then((data) => { this.setState({ members: data.results }) }); 
  }

  render() {
    return (
      <div>
        <h1>Home Screen</h1>
        
        <div>
        <ul>
          {
           this.state.members.map(function(item, i){
             return(
             item.members.map(function(m,j){
              return <div key = {j}>{m.first_name} {m.last_name} </div>

            })
            )
           })
         }
        </ul>
      </div>
        
      </div>
    );
  }
}
;
