import React, { Component } from 'react';
import './Shelves.css';
import Item from '../Item/Item'


class Shelves extends Component {
  constructor(){
    super()
    // this.state = {
    //   sparkling: [],
    //   dusty: [],
    //   rancid: []
    // }
  }

  componentDidMount(){
    console.log(this.props.sparkling, 'comp')
  }

  loadTop(){
    return this.props.sparkling.map(item => {
        return <p>{item.name}</p>
    })
  }

  loadMiddle(){
    return this.props.dusty.map(item => {
      return <Item name={item.name}/>
    })
  }

  loadBottom() {
    return this.props.rancid.map(item => {
      return <Item name={item.name}/>
    })
  }

  render() {
    const {sparkling, dusty, rancid} = this.props
    console.log(dusty)
    return (
      <div className="shelves">
        <div className="top-shelf">{sparkling.length > 0 ? this.loadTop() : null}</div>
        <div className="middle-shelf">{dusty.length > 0 ? this.loadMiddle() : null}</div>
        <div className="bottom-shelf">{rancid.length > 0 ? this.loadBottom() : null}</div>
      </div>
    );
  }
}

export default Shelves;
