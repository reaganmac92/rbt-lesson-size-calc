import React, { Component } from 'react';
import './App.css';
import './materialize.css';

// import QueryLine from './containers/QueryLine/QueryLine';
import QueryForm from './containers/QueryForm/QueryForm';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <QueryForm />
      </div>
    );
  }
}

export default App;
