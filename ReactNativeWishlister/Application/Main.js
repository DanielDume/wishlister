import React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  Button,
  ListView,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

export default class MainWindow extends React.Component{
    constructor(props){
        super(props);
  
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1.Id != r2.Id});
  
        this.state = {
            dataSource: dataSource.cloneWithRows(global.wishItemList)
        }
    }
    edit(item){
        this.props.navigation.navigate("Item", item);
    }
    renderRow(item){
        return(
            <TouchableOpacity onPress={() => this.edit(item)}>
            <View>
                <Text>{item.name}</Text>
            </View>
            </TouchableOpacity>
        );
    }
  
    

    add(){
        this.props.navigation.navigate("Item",{});
    }

    render(){
        return(
            <View>
                <Text>Items</Text>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
                <Button title="Add" onPress={()=>this.add()}/>  
            </View>
        );
    }
  
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

