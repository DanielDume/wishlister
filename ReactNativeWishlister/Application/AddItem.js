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
    Linking,
    Picker,
    Alert
} from 'react-native';
import Communications from 'react-native-communications';
import StorageHelper from './Storage/StorageHelper';
import { AsyncStorage } from 'react-native';
export default class AddItemWindow extends React.Component {
    constructor(props) {
        super(props);
        this.storageHelper = new StorageHelper();
        this.types = [];
        this.state = {
            id: 0,
            name: "",
            type: "",
            shop: "",
            price: 0.0,
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

    async save() {
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
        await this.storageHelper.add(item).then(()=>{this.props.navigation.state.params.refreshFunction().then(() => {this.props.navigation.goBack();})});
        // this.props.navigation.state.params.refreshFunction();
        // this.props.navigation.goBack();
        ;
    }

    deleteConfirm(){
        Alert.alert(
            'Are you sure you want to delete this item?',
            '',
            [
                {text: 'No', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => this.delete()},
            ],
            { cancelable: true }
        );
    }

    delete() {
        if (this.state.id === 0) {
            alert("bad shit");
        }
        else {
            this.storageHelper.delete(this.state.id.toString());
        }

    }

    async populatePicker() {
        //console.error(tempTypes);
        var tempTypes = await this.storageHelper.getTypes();
        console.error(tempTypes);
        tempTypes.forEach(element => {
            this.types.push(element.name);
        });
    }

    render() {
        //this.populatePicker();
        return (
            <View>
                <TextInput onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                <TextInput keyboardType='numeric' onChangeText={(price) => this.setState({ price })} value={this.state.price.toString()} />
                <TextInput onChangeText={(type) => this.setState({ type })} value={this.state.type} />
                <Picker
                    selectedValue={this.state.type}
                    onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
                    <Picker.Item label='type1' value='type1' key='type1' />
                    <Picker.Item label='type2' value='type2' key='type2' />
                    {this.types.map((t, i) => {return <Item label={t} value={t} key={t} />})}
                </Picker>
                <TextInput onChangeText={(shop) => this.setState({ shop })} value={this.state.shop} />
                <Button title="save" onPress={() => this.save()} />
                <Button title="delete" onPress={() => this.deleteConfirm()} />
            </View>
        );
    }

}