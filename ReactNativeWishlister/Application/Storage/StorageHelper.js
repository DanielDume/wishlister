import { AsyncStorage } from 'react-native';

export default class StorageHelper {
    constructor() {

    };
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
        AsyncStorage.setItem(JSON.stringify(item.id), JSON.stringify(item));
        AsyncStorage.getItem('ITEM_ID_LIST', (err, idList) => {
            var tempList = JSON.parse(idList);
            tempList.push(item.id);
            AsyncStorage.setItem('ITEM_ID_LIST', tempList);
        })
    };
}