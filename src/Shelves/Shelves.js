import React, { Component } from 'react';
// import './App.css';
import Garage from '../Garage/Garage'

class Shelves extends Component {
  constructor(){
    super()
    // this.state = {
    //   items: this.props.items,
    // }
  }

  componentDidMount(){
    //fetch items from DB
  }

  loadTop(){
    return this.props.items.map(item => {
      if(item.cleanliness === 'Sparkling') {
        return <p>{item.name} P</p>
      }
    })
  }

  render() {
    return (
      <div className="shelves">
        <div className="top-shelf">{this.loadTop.bind(this)}</div>
        {/* <div className="middle-shelf">{this.loadMiddle().bind(this)}</div>
        <div className="bottom-shelf">{this.loadBottom().bind(this)}</div> */}
      </div>
    );
  }
}

export default Shelves;
