import { AsyncStorage } from 'react-native';

export default class StorageHelper {
    constructor() {

    };

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

    async getAll() {
        var items = [];
        var fetchedItems = await AsyncStorage.getItem('ITEM_ID_LIST');
        fetchedItems = JSON.parse(fetchedItems);
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
            if(idList != null){                
                var tempList = JSON.parse(idList);
                if (item.id === 0) {
                    item.id = (parseInt(tempList[tempList.length - 1]) + 1).toString();
                    tempList.push(item.id);
                    AsyncStorage.setItem('ITEM_ID_LIST', JSON.stringify(tempList));
                }
                //console.error(tempList);
                AsyncStorage.setItem(item.id, JSON.stringify(item));
            }
            else{
                tempList = [];
                if (item.id === 0) {
                    item.id = '1';                    
                }
                tempList.push(item.id);
                //console.error(tempList);
                AsyncStorage.setItem('ITEM_ID_LIST', JSON.stringify(tempList));
                AsyncStorage.setItem(item.id, JSON.stringify(item));
            }
            
        })
    };
    async delete(id) {
        AsyncStorage.getItem('ITEM_ID_LIST', (err, idList) => {
            var tempList = JSON.parse(idList);
            const index = tempList.indexOf(id);
            if (index !== -1) {
                tempList.splice(index, 1);
            }
            AsyncStorage.setItem('ITEM_ID_LIST', JSON.stringify(tempList));
            AsyncStorage.removeItem(id);
        })
    }
}