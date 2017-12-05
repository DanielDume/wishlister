import React from 'react';
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
    Linking
} from 'react-native';
import Communications from 'react-native-communications';
import StorageHelper from './Storage/StorageHelper';
import { AsyncStorage } from 'react-native';
export default class AddItemWindow extends React.Component {
    constructor(props) {
        super(props);
        this.storageHelper = new StorageHelper();
        this.state = {
            id: 0,
            name: "",
            type: "",
            shop: "",
            price: 0.0
        };

        if (this.props.navigation.state.params.id !== undefined) {
            var toEdit = this.props.navigation.state.params;
            this.state.id = toEdit.id;
            this.state.name = toEdit.name;
            this.state.type = toEdit.type;
            this.state.shop = toEdit.shop;
            this.state.price = toEdit.price;
        }

    }

    save() {
        if (this.state.id === 0) {
            var item = {
                id: -1,
                name: this.state.name,
                type: this.state.type,
                shop: this.state.shop,
                price: Number(this.state.price)
            };
            // global.count = global.count + 1;
            // global.wishItemList.push(item);            
        }
        else {
            var item = this.state;
            for (var i = 0; i < global.wishItemList.length; i++) {
                if (global.wishItemList[i].id === item.id) {
                    global.wishItemList[i] = item;
                }
            }
        }
        this.storageHelper.add(item);
        this.props.navigation.navigate("Home");
    }

    render() {
        return (
            <View>
                <TextInput onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                <TextInput keyboardType='numeric' onChangeText={(price) => this.setState({ price })} value={this.state.price.toString()} />
                <TextInput onChangeText={(type) => this.setState({ type })} value={this.state.type} />
                <TextInput onChangeText={(shop) => this.setState({ shop })} value={this.state.shop} />
                <Button title="save" onPress={() => this.save()} />
            </View>
        );
    }

}