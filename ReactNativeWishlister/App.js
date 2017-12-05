/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import MainWindow from './Application/Main.js';
import AddItemWindow from './Application/AddItem.js';
global.wishItemList = [{id: 1, name: "item", type:"type", shop:"shop", price:1.1},{id: 2, name: "item2", type:"type2", shop:"shop2", price:2.2},{id: 3, name: "item3", type:"type3", shop:"shop3", price:3.3}];
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
