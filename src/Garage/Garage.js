import React, { Component } from 'react';
import './Garage.css';
import Shelves from '../Shelves/Shelves'

class Garage extends Component {
  constructor(){
    super()
    this.state = {
      door: false,
      items: [],
      itemCount: 0
    }
  }

  componentDidMount(){
    this.getItems()
  }

  openGarage(){
    if(this.state.door) {
      this.setState({door: false})
    } else {
      this.setState({door: true})
    }
  }

  setItemCount(){
    this.setState({itemCount: this.state.items.length}, () => this.cleanliness())
  }

  cleanliness(){
    for(let i=0;i<=this.state.itemCount;i++){
      let currentItem = this.state.items[i]
      switch(currentItem.cleanliness) {
        case 'sparkling':
        this.setState({sparkling: currentItem})
        break;
        case 'dusty':
        this.setState({dusty: currentItem})
        break;
        case 'rancid':
        this.setState({rancid: currentItem})
        break;
        default:
        break;
      }
    }
  }

  getItems(){
    fetch('api/v1/items')
    .then(response => response.json())
    .then(data => this.setState({items: data}))
    .then(() => this.setItemCount())
  }

  addItem(name, reason, cleanliness){
    fetch('api/v1/items', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, reason: reason, cleanliness: cleanliness})
    } )
    .then(response => response.json())
    .then(data => this.setState({items: data}))
    .then(() => this.setItemCount())
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {name, reason, cleanliness} = this.state
    this.addItem(name, reason, cleanliness)
  }

  render() {
    const {door, items, rancid, dusty, sparkling} = this.state
    return (
      <div className="garage">
        {door &&
        <div className="garage-door">
          <p>Items: {this.state.itemCount}</p>
          <Shelves items={items} rancid={rancid} sparkling={sparkling} dusty={dusty} />
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
            <label>
              Cleanliness:
            <select value={this.state.draftMessage} name="cleanliness" onChange={this.handleChange.bind(this)}>
              <option disabled selected value> -- select an option -- </option>
              <option value="sparkling">Sparkling</option>
              <option value="dusty">Dusty</option>
              <option value="rancid">Rancid</option>
            </select>
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
