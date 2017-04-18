import React, { Component } from 'react';
import './Shelves.css';
import Item from '../Item/Item'


class Shelves extends Component {
  constructor(){
    super()
    this.state = {
      sparkling: [],
      dusty: [],
      rancid: [],
      expanded: false
    }
  }

  loadItems(array){
    return array.map(item => {
        return <Item name={item.name} reason={item.reason} cleanliness={item.cleanliness} />
  })
}


  render() {
    const { sparkling, dusty, rancid} = this.props
    return (
      <div className="shelves">
          <div className="top-shelf">
            <p className="number-clean">Number: {sparkling.length}</p>
            <button className="sort-btn" onClick={(e) => this.props.sortItems(sparkling)}>Sort</button>
            <ul>
              {this.loadItems(sparkling)}
            </ul>
          </div>
          <div className="middle-shelf">
            <p className="number-clean">Number: {dusty.length}</p>
            <button className="sort-btn" onClick={(e) => this.props.sortItems(dusty)}>Sort</button>
            <ul>
              {this.loadItems(dusty)}
            </ul>
          </div>
          <div className="bottom-shelf">
            <p className="number-clean">Number: {sparkling.length}</p>
            <button className="sort-btn" onClick={(e) => this.props.sortItems(rancid)}>Sort</button>
            <ul>
              {this.loadItems(rancid)}
            </ul>
          </div>
      </div>
    );
  }
}

export default Shelves;
