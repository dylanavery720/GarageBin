import React, { Component } from 'react';
import './Item.css';


const Item = (props) => {
    return (
      <h3>{props.name}</h3>
    );
}

export default Item;
