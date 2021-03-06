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
import StorageHelper from './Storage/StorageHelper';
import ApiHelper from './Storage/ApiHelper';
import { AsyncStorage } from 'react-native';
var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => {return r1.id !== r2.id;}});
export default class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.storageHelper = new StorageHelper();
        this.apiHelper = new ApiHelper();
        //AsyncStorage.removeItem("ITEM_ID_LIST");

        this.apiHelper.initArray().then(
            ()=>{this.refresh();},
            ()=>{}
        );
        //fetch('http://10.10.10.10:3000/items/').then((response) => console.error(JSON.parse(response._bodyInit)[0].name));
        this.state={
            dataSource: dataSource.cloneWithRows(global.dataArray)
        }
    }

    refresh(){
        //console.error(global.dataArray);
        this.setState(prevState => { return Object.assign({}, prevState, { dataSource: dataSource.cloneWithRows(global.dataArray)})});
    }

    backRefresh(item) {
        //console.error(item);
        if (item.id < 0) {
            var tempList = [];
            alert("item id in main window: " + item.id);
            for (var index = 0; index < this.itemList.length; index++) {
                var element = this.itemList[index];
                if (element.name === item.name) {
                    alert(element.name);                    
                }
                else{
                    tempList.push(element);
                }
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tempList)
            });
        }
        else {
            if (item.id === 0) {
                alert("ENTERED ADD ITEM REFRESH");
                item.id = "-1";
                this.itemList.push(item);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.itemList)
                });
                this.refreshItems();
            }
            else {
                for (var index = 0; index < this.itemList.length; index++) {
                    var element = this.itemList[index];
                    if (element.id === item.id) {
                        alert(item.name);
                        alert("QWERT");
                        this.itemList[index].id = item.id;
                        this.itemList[index].name = item.name;
                        this.itemList[index].price = item.price;
                        this.itemList[index].shop = item.shop;
                        this.itemList[index].type = item.type;
                        break;
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.itemList)
                })
                this.refreshItems();
            }
        }
        
    }
    async refreshItems() {
        //AsyncStorage.removeItem("ITEM_ID_LIST");
        this.itemList.length = 0;
        this.itemList = await this.storageHelper.getAll();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.itemList)
        })
    }
    async getpriceRangesFromApi() {
        try {
            let response = await fetch(
                "http://10.10.10.10:3000/priceRanges"
            );
            let responseJson = await response.json();
            console.error(responseJson);
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    edit(item) {
        this.props.navigation.navigate("Item", { item: item, refreshFunction: this.refresh.bind(this) });
    }

    renderRow(item) {
        return (
            <TouchableOpacity onPress={() => this.edit(item)}>
                <View>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    testFunc() {
        console.error("gud tu si");
    }
    add() {
        this.props.navigation.navigate("Item", { refreshFunction: this.refresh.bind(this) });
    }

    logout(){
        AsyncStorage.removeItem("JWToken");
        AsyncStorage.removeItem("username");
        AsyncStorage.removeItem("role");
        global.role = undefined;
        global.username = undefined;
        global.token = undefined;
        global.dataArray = [];
        this.props.navigation.navigate("Login", {});
    }

    render() {
        return (
            <View>
                <Text>Items</Text>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
                <Button title="Add" onPress={() => this.add()} />
                <Button title="Logout" onPress={() => this.logout()} />
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

