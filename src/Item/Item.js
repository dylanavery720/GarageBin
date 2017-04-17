import React, { Component } from 'react';
import './Item.css';


class Item extends Component {
  constructor(){
    super()
    this.state={
      expanded: false,
    }
  }

  expand(e){
    if(this.state.expanded){
      this.setState({expanded: false})
    } else {
      this.setState({expanded: true})
    }
  }

  render() {
    return (
      <div>
        {!this.state.expanded && <li className="item-names"  onClick={this.expand.bind(this)}>{this.props.name}</li>}
        {this.state.expanded && <li className="item-expanded"  onClick={this.expand.bind(this)}>Name: {this.props.name} Reason: {this.props.reason} Cleanliness: {this.props.cleanliness}</li>}
      </div>
      );
  }
}

export default Item;
