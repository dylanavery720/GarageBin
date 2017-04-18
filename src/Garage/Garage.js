import React, { Component } from 'react';
import './Garage.css';
import Shelves from '../Shelves/Shelves'

class Garage extends Component {
  constructor(){
    super()
    this.state = {
      door: false,
      items: [],
      itemCount: 0,
      rancid: [],
      dusty: [],
      sparkling: [],
      sort: false
    }
  }

  toggleClass(){
  const node = document.querySelector('.grid')
  node.classList.add('hidden');
 }

  openGarage(){
    if(this.state.door) {
      this.setState({door: false})
    } else {
      this.toggleClass()
      this.setState({door: true}, () => this.getItems())
    }
  }

  setItemCount(){
    this.setState({itemCount: this.state.items.length})
  }

  getItems(){
    fetch('api/v1/items')
    .then(response => response.json())
    .then(data => this.setState({items: data}))
    .then(() => this.setItemCount())
    .then(() => this.splitArray())
  }

  splitArray(){
    let sparkling = []
    let rancid = []
    let dusty = []
    this.state.items.forEach(item => {
      item.cleanliness === 'dusty' ? dusty.push(item) : null
      item.cleanliness === 'rancid' ? rancid.push(item) : null
      item.cleanliness === 'sparkling' ? sparkling.push(item) : null
    })
    this.setState({sparkling: sparkling, rancid: rancid, dusty: dusty})
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
    .then(() => this.splitArray())
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {name, reason, cleanliness} = this.state
    this.addItem(name, reason, cleanliness)
  }

  sortItems(array){
    console.log(array)
    const { sort } = this.state
    let newArray = array.sort((a, b) => {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) {
     return sort ? -1 : 1
    }
    if (nameA > nameB) {
      return sort ? 1 : -1
    }
    return 0;
  });
    sort ? this.setState({sort: false}) : this.setState({sort: true})
    this.setState({[array[0].cleanliness]: newArray})
  }

  render() {
    const {door, items, rancid, dusty, sparkling} = this.state
    const itemForm = <select value={this.state.draftMessage} name="cleanliness" onChange={this.handleChange.bind(this)}>
      <option disabled selected value> -- select an option -- </option>
      <option value="sparkling">Sparkling</option>
      <option value="dusty">Dusty</option>
      <option value="rancid">Rancid</option>
    </select>
    return (
      <div className="garage">
        {door &&
        <div className="garage-door">
          <p className="item-count">Items: {this.state.itemCount}</p>
          <Shelves items={items} rancid={rancid} dusty={dusty} sparkling={sparkling} sortItems={this.sortItems.bind(this)} />
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
          <div className="grid">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"><button onClick={this.openGarage.bind(this)}>Open</button></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
        </div>}
      </div>
    );
  }
}

export default Garage;
