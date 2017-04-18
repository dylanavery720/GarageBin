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
            <ul>
              {this.loadItems(sparkling)}
            </ul>
            <button className="sort-btn" onClick={(e) => this.props.sortItems(sparkling)}>Sort</button>
          </div>
          <div className="middle-shelf">
            <p className="number-clean">Number: {dusty.length}</p>
            <ul>
              {this.loadItems(dusty)}
            </ul>
            <button className="sort-btn" onClick={(e) => this.props.sortItems(dusty)}>Sort</button>
          </div>
          <div className="bottom-shelf">
            <p className="number-clean">Number: {sparkling.length}</p>
            <ul>
              {this.loadItems(rancid)}
            </ul>
            <button className="sort-btn" onClick={(e) => this.props.sortItems(rancid)}>Sort</button>
          </div>
      </div>
    );
  }
}

export default Shelves;
