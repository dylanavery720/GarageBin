import React, { Component } from 'react';
import './Shelves.css';
import Item from '../Item/Item'


class Shelves extends Component {
  constructor(){
    super()
    this.state = {
      sparkling: 0,
      dusty: 0,
      rancid: 0,
      fulldisplay: true
    }
  }

  loadTop(){
    return this.props.items.map(item => {
      if(item.cleanliness === 'sparkling') {
        return <p className="item-names" onClick={this.fullDisplay.bind(this)} id={item.cleanliness}>{item.name}</p>
    }
  })
}

  loadMiddle(){
    return this.props.items.map(item => {
      if(item.cleanliness === 'dusty') {
        return <p className="item-names" onClick={this.fullDisplay.bind(this)} id={item.cleanliness} name={item.reason}>{item.name}</p>
    }
  })
}

  loadBottom() {
    return this.props.items.map(item => {
      if(item.cleanliness === 'rancid') {
        return <p className="item-names" onClick={this.fullDisplay.bind(this)} id={item} value={item.reason}>{item.name}</p>
    }
  })
}

fullDisplay(e) {
  console.log('Name', e.target.innerText, 'Reason:', e.target.id.reason, 'Cleanliness:', e.target.id.cleanliness)
}

  sorty(e){
    e.target.children.sort()
  }

  render() {
    return (
      <div className="shelves">
        <div className="top-shelf" onClick={this.sorty.bind(this)}>{this.loadTop()}# {(e) => e.target.children.length}</div>
        <div className="middle-shelf" onClick={this.sorty.bind(this)}>{this.loadMiddle()}# {(e) => e.target.children.length}</div>
        <div className="bottom-shelf" onClick={this.sorty.bind(this)}>{this.loadBottom()} # {(e) => e.target.children.length}</div>
      </div>
    );
  }
}

export default Shelves;
