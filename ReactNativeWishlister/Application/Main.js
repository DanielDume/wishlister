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
import { AsyncStorage } from 'react-native';
export default class MainWindow extends React.Component {
    constructor(props) {
        super(props);

        this.storageHelper = new StorageHelper();
        this.itemList = [];
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });

        this.refreshItems(0);

        this.state = {
            dataSource: dataSource.cloneWithRows(this.itemList)
        }
    }
    backRefresh(item) {
        //console.error(item);
        if (item.id === -2) {
            for (var index = 0; index < this.itemList.length; index++) {
                var element = this.itemList[index];
                if (element.name === item.name) {
                    this.itemList.splice(index, 1);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.itemList)
                    })
                    break;
                }
            }
        }
        else {
            if (item.id === -1) {
                alert("ENTERED ADD ITEM REFRESH");
                this.itemList.push(JSON.parse(item));
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
        this.props.navigation.navigate("Item", { item: item, refreshFunction: this.backRefresh.bind(this) });
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
        global.wishItemList.forEach(function (element) {

        }, this);
        this.props.navigation.navigate("Item", { refreshFunction: this.backRefresh.bind(this) });
    }

    render() {
        return (
            <View>
                <Text>Items</Text>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
                <Button title="Add" onPress={() => this.add()} />
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

