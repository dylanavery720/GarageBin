import React, { Component } from 'react';
// import './App.css';
import Item from '../Item/Item'


class Shelves extends Component {
  constructor(){
    super()
    this.state = {
      sparkling: [],
      dusty: [],
      rancid: []
    }
  }

  componentDidMount(){
    // this.countClean()
  }

  // countClean(){
  //   const { items } = this.props
  //   items.forEach(item => {
  //     this.setState({[item.cleanliness]: [...this.state.item, item]})
  //   })
  // }

  // loadTop(){
  //   return this.state.sparkling.map(item => {
  //       return <p>{item.name}</p>
  //   })
  // }

  // loadMiddle(){
  //   return this.props.items.map(item => {
  //     return <Item name={item.name}/>
  //   })
  // }

  render() {
    return (
      <div className="shelves">
        {/* <div className="top-shelf">{this.loadTop()}</div> */}
        {/* <div className="middle-shelf">{this.loadMiddle()}</div> */}
        {/* <div className="bottom-shelf">{this.loadBottom().bind(this)}</div> */}
      </div>
    );
  }
}

export default Shelves;
