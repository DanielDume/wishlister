import { AsyncStorage } from 'react-native';

export default class StorageHelper {
    constructor() {

    };

    async getTypes(){
        var response = await fetch('http://10.10.10.10:3000/types');
        var typesJson = await response.json();
        return typesJson;
    }

    async getAll() {
        var items = [];
        var fetchedItems = await AsyncStorage.getItem('ITEM_ID_LIST');
        fetchedItems = JSON.parse(fetchedItems);
        //console.error(fetchedItems);
        for (var index = 0; index < fetchedItems.length; index++) {
            var element = fetchedItems[index];
            var tempItem = await AsyncStorage.getItem(element);
            items.push(JSON.parse(tempItem));
        }
        return items;
    };

    async getById(id) {
        var fetchedItem;
        await AsyncStorage.getItem(id, (err, item) => {
            fetchedItem = item
        });
        return fetchedItem;
    }

    async add(item) {
        AsyncStorage.getItem('ITEM_ID_LIST', (err, idList) => {
            var tempList = JSON.parse(idList);
            if (item.id === -1) {
                item.id = (parseInt(tempList[tempList.length - 1]) + 1).toString();
            }
            tempList.push(item.id);
            //console.error(tempList);
            AsyncStorage.setItem('ITEM_ID_LIST', JSON.stringify(tempList));
            AsyncStorage.setItem(item.id, JSON.stringify(item));
        })
    };
    async delete(id){        
        AsyncStorage.getItem('ITEM_ID_LIST', (err, idList) => {
            var tempList = JSON.parse(idList);
            const index = tempList.indexOf(id);
            if (index !== -1) {
                array.splice(index, 1);
            }
            //console.error(tempList);
            AsyncStorage.setItem('ITEM_ID_LIST', JSON.stringify(tempList));
            AsyncStorage.removeItem(item.id);
        })
    }
}