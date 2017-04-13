import React, { Component } from 'react';
import './Garage.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      door: false,
    }
  }

  openGarage(){
    if(this.state.door) {
      this.setState({door: false})
    } else {
      this.setState({door: true})
    }
  }

  render() {
    const {door} = this.state
    return (
      <div className="garage">
        {door &&
        <div className="garage-door">
          <p>Open Sesame</p>
          <button onClick={this.openGarage.bind(this)}>Close</button>
        </div>}

        {!door && <div className="garage-door-opener">
          <button onClick={this.openGarage.bind(this)}>Open</button>
        </div>}
      </div>
    );
  }
}

export default App;
