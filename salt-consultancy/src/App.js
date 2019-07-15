import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
    };
  }

  componentDidMount() {
    fetch('/api/getList')
      .then(response => response.json())
      .then(data => this.setState({ hits: data }));
  }
  render() {
  const { hits } = this.state;
  return (
     <div className="App">
      <header className="App-header">
        <h1>
          Salt Consultancy - By Brigadeiro
        </h1>
      </header>
   <ul>
        {hits.map(user =>
        <div key={user.id}>
          <li>{user.id}</li>
          <li>{user.username}</li>
          <li>{user.password}</li>
        </div>
        )}
      </ul>
    </div>
  );
  }
}

export default App;
