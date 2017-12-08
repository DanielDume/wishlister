import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
 import MainWindow from './Application/Main.js';
import AddItemWindow from './Application/AddItem.js';
global.wishItemList = [];
global.count = 4;

const ModalStack = StackNavigator({
  Home:{
    screen: MainWindow,
  },
  Item: {
    path: 'addItem/:item',
    screen: AddItemWindow,
  }
});
export default ModalStack;
