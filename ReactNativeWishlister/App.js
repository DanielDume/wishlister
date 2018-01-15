import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
 import MainWindow from './Application/Main.js';
import AddItemWindow from './Application/AddItem.js';
import LoginWindow from './Application/Login.js'
global.dataArray = [];
global.id = 1;
global.username = undefined;
global.token = undefined;
global.role = undefined;
global.modifiedOffline = [];

const ModalStack = StackNavigator({
  Login:{
    screen: LoginWindow,
  },
  Home:{
    screen: MainWindow,
  },
  Item: {
    path: 'addItem/:item',
    screen: AddItemWindow,
  }
});
export default ModalStack;
