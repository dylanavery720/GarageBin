import React, { Component } from 'react';
import './Garage.css';
import Shelves from '../Shelves/Shelves'

class Garage extends Component {
  constructor(){
    super()
    this.state = {
      door: false,
      items: []
    }
  }

  openGarage(){
    if(this.state.door) {
      this.setState({door: false})
    } else {
      this.setState({door: true})
    }
  }

  addItem(name, reason){
    console.log(name, reason)
    fetch('api/v1/items', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, reason: reason})
    } )
    .then(response => response.json())
    .then(data => this.setState({items: data}))
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {name, reason} = this.state
    this.addItem(name, reason)
  }

  render() {
    const {door} = this.state
    return (
      <div className="garage">
        {door &&
        <div className="garage-door">
          <p>Open Sesame</p>
          <Shelves items={this.state.items} />
          <button onClick={this.openGarage.bind(this)}>Close</button>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Name:
              <input name="name" type="text" value={this.state.draftMessage} onChange={this.handleChange.bind(this)} />
            </label>
            <label>
              Reason:
              <input name="reason" type="text" value={this.state.draftMessage} onChange={this.handleChange.bind(this)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>}

        {!door && <div className="garage-door-opener">
          <button onClick={this.openGarage.bind(this)}>Open</button>
        </div>}
      </div>
    );
  }
}

export default Garage;
