import { AsyncStorage } from 'react-native';
import SyncHelper from './SyncHelper';
export default class ApiHelper {
    constructor() {
        this.syncHelper = null;
        this.syncHelper = SyncHelper.getInstance();
        //this.syncHelper.new_web_socket();
    };

    async synchronizeChanges() {

        global.modifiedOffline.forEach((item) => {
            if (item.status == 'added') {

                data = {
                    'username': global.username,
                    'name': item.item.name,
                    'type': item.item.type,
                    'shop': item.item.shop,
                    'price': item.item.price,
                };
                const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
                let response = fetch(
                    'http://10.10.10.10:3000/items'
                    , {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'JWT ' + global.token,
                        },
                        body: formBody,
                    });

            }
            if (item.status == 'updated') {

                data = {
                    '_id': item.item._id,
                    'name': item.item.name,
                    'type': item.item.type,
                    'shop': item.item.shop,
                    'price': item.item.price,
                };
                const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
                let response = fetch(
                    'http://10.10.10.10:3000/items'
                    , {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'JWT ' + global.token,
                        },
                        body: formBody,
                    });

            }
            if (item.status == 'deleted') {

                data = {
                    'username': global.username,
                    '_id': item._id,
                };
                const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
                let response = fetch(
                    'http://10.10.10.10:3000/items'
                    , {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'JWT ' + global.token,
                        },
                        body: formBody,
                    });
            }
        });
        global.modifiedOffline = [];

    }

    async initArray() {
        var id_array;
        try {
            let response = await fetch(
                'http://10.10.10.10:3000/items?username=' + global.username
                , {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + global.token,
                    },
                });
            let responseJson = await response.json();
            let items = responseJson.items;
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                global.dataArray.push(element);
            }

            // id_array = await AsyncStorage.getItem('ITEM_ID_LIST');
            // if (id_array === null) {
            //     return;
            // }
            // var elem;
            // id_array = JSON.parse(id_array);
            // //console.error(id_array);
            // for (var i = 0; i < id_array.length; ++i) {
            //     elem = await AsyncStorage.getItem(JSON.stringify(id_array[i]));
            //     if (elem === null) {
            //         console.error("CANT RETRIEVE ALL ITEMS");
            //     }
            //     global.dataArray.push(JSON.parse(elem));
            // }
        }
        catch (error) {
            console.error(error);
        }
    }

    getIds() {
        var id_array = [];
        global.dataArray.forEach((elem) => {
            id_array.push(elem.id);
        });
        return id_array;
    }

    async getTypes() {
        var types = [];
        var response = await fetch('http://10.10.10.10:3000/types');
        var typesJson = await response.json();
        for (var index = 0; index < typesJson.length; index++) {
            var element = typesJson[index];
            types.push(JSON.parse(element));
        }
        return types;
    }

    async addItem(item) {
        console.log("entered addItem apiHelper");
        data = {
            'username': global.username,
            'name': item.name,
            'type': item.type,
            'shop': item.shop,
            'price': item.price,
        };
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        let response = await fetch(
            'http://10.10.10.10:3000/items'
            , {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'JWT ' + global.token,
                },
                body: formBody,
            });
        let responseJson = await response.json();
        if (responseJson.item) {
            global.dataArray.push(item);
        }
        
        // this.syncHelper.checkConnection().then(async (res)=>{
        //     if (res) {
        //         data = {
        //             'username': global.username,
        //             'name': item.name,
        //             'type': item.type,
        //             'shop': item.shop,
        //             'price': item.price,
        //         };
        //         const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        //         let response = await fetch(
        //             'http://10.10.10.10:3000/items'
        //             , {
        //                 method: 'POST',
        //                 headers: {
        //                     Accept: 'application/json',
        //                     'Content-Type': 'application/x-www-form-urlencoded',
        //                     'Authorization': 'JWT ' + global.token,
        //                 },
        //                 body: formBody,
        //             });
        //         let responseJson = await response.json();
        //         if (responseJson.item) {
        //             global.dataArray.push(item);
        //         }
        //     }
        //     else{
        //         global.modifiedOffline.push({status: 'added', item: item});
        //         global.dataArray.push(item);
        //     }
        // });
        //console.error(responseJson);
    }

    async updateItem(item) {
        console.log("entered editItem apiHelper");
        //console.error("HERE");
        data = {
            '_id': item._id,
            'name': item.name,
            'type': item.type,
            'shop': item.shop,
            'price': item.price,
        };
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        let response = await fetch(
            'http://10.10.10.10:3000/items'
            , {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'JWT ' + global.token,
                },
                body: formBody,
            });
        let responseJson = await response.json();
        if (responseJson.item) {
            for (var i = 0; i < global.dataArray.length; i++) {
                if (global.dataArray[i]._id == item._id) {
                    global.dataArray[i] = item;
                }
            }
        }

    }

    async deleteItem(id) {
        data = {
            'username': global.username,
            '_id': id,
        };
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        let response = await fetch(
            'http://10.10.10.10:3000/items'
            , {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'JWT ' + global.token,
                },
                body: formBody,
            });
            // for (var index = 0; index < global.dataArray.length; index++) {
            //     var element = global.dataArray[index];
            //     if (element._id == id) {
            //         global.dataArray.splice(index, 1);
            //         break;
            //     }
            // }
        let responseJson = await response.json();
        if (responseJson.message) {
            for (var index = 0; index < global.dataArray.length; index++) {
                var element = global.dataArray[index];
                if (element._id == id) {
                    //global.dataArray.splice(index, 1);
                    break;
                }
            }
        }
    }
}