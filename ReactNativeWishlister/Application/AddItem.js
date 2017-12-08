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
import {Pie} from 'react-native-pathjs-charts';
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

        if (this.props.navigation.state.params.item !== undefined) {
            var toEdit = this.props.navigation.state.params.item;
            this.state.id = toEdit.id;
            this.state.name = toEdit.name;
            this.state.type = toEdit.type;
            this.state.shop = toEdit.shop;
            this.state.price = toEdit.price;
        }
        this.data = [];
        this.getChartData();
        this.options = {
            margin: {
                top: 10,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 300,
            height: 300,
            color: '#2980B9',
            r: 0,
            R: 90,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        }
    }

    getChartData(){
        this.data.push({ "name" : "Type1", "population" : 50});
        this.data.push({"name" : "Type2", "population" : 30});
        this.data.push({"name" : "Type3", "population" : 100});
    }

    async saveItem() {
        if (this.state.id === 0) {
            var item = {
                id: 0,
                name: this.state.name,
                type: this.state.type,
                shop: this.state.shop,
                price: Number(this.state.price)
            };
            var id = 1;
            if (global.dataArray.length > 0) {

                id = (parseInt(global.dataArray[global.dataArray.length - 1].id) + 1).toString();
            }
            item.id = id;
            global.dataArray.push(item);
        }
        else {
            var item = this.state;
            //item.id = item.id;                        
            for (var i = 0; i < global.dataArray.length; i++) {
                if (global.dataArray[i].id == item.id) {
                    global.dataArray[i] = item;
                }
            }
        }
        this.storageHelper.addItem(item).then(() => { }, () => { });
        this.props.navigation.state.params.refreshFunction();
        this.props.navigation.goBack();
    }

    async saveOld() {
        var item = {}
        if (this.state.id === 0) {
            var item = {
                id: 0,
                name: this.state.name,
                type: this.state.type,
                shop: this.state.shop,
                price: Number(this.state.price)
            };
            this.storageHelper.add(item);
            this.props.navigation.state.params.refreshFunction(item);
            this.props.navigation.goBack();
        }
        else {
            item = this.state;
            item.id = item.id.toString();
            this.storageHelper.add(item);
            this.props.navigation.navigate("Home");
            this.props.navigation.state.params.refreshFunction(item);
            this.props.navigation.goBack();
        }

        ;
    }

    deleteConfirm() {
        Alert.alert(
            'Are you sure you want to delete this item?',
            '',
            [
                { text: 'No', onPress: () => { }, style: 'cancel' },
                { text: 'Yes', onPress: () => this.delete() },
            ],
            { cancelable: true }
        );
    }
    delete() {
        for (var index = 0; index < global.dataArray.length; index++) {
            var element = global.dataArray[index];
            if (element.id == this.state.id) {
                global.dataArray.splice(index, 1);
                break;
            }
        }
        this.storageHelper.deleteItem(this.state.id).then(() => { }, () => { });
        this.props.navigation.state.params.refreshFunction();
        this.props.navigation.goBack();

    }
    deleteOld() {
        if (this.state.id === 0) {
            alert("Cannot delete an unexisting item!");
            return;
        }
        else {
            this.storageHelper.delete(this.state.id.toString()).then(() => {
                this.props.navigation.navigate("Home");
                alert("THEN");
            });
            //this.state.id = ((-1)* parseInt(this.state.id)).toString();
            alert("deleteIdInWindow: " + this.state.id);

            // this.props.navigation.state.params.refreshFunction(this.state);
            // this.props.navigation.goBack();
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
                    {this.types.map((t, i) => { return <Item label={t} value={t} key={t} /> })}
                </Picker>
                <TextInput onChangeText={(shop) => this.setState({ shop })} value={this.state.shop} />
                <Button title="save" onPress={() => this.saveItem()} />
                <Button title="delete" onPress={() => this.deleteConfirm()} />
                <Pie
                    data={this.data}
                    options={this.options}
                    accessorKey="population" />
            </View>
        );
    }

}

