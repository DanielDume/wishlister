import { AsyncStorage } from 'react-native';

export default class StorageHelper {
    constructor() {

    };

    async genericAdd(key, item){
        AsyncStorage.setItem(key, item);
    }

    async genericGet(key){
        var item = await AsyncStorage.getItem(key);
        parsedItem = await JSON.parse(item);
        return parsedItem;
    }

    async initArray(){
        var id_array;
        try{
            id_array = await AsyncStorage.getItem('ITEM_ID_LIST');
            if(id_array === null){
                return;
            }
            var elem;
            id_array = JSON.parse(id_array);
            //console.error(id_array);
            for(var i = 0; i < id_array.length; ++i){
                elem = await AsyncStorage.getItem(JSON.stringify(id_array[i]));
                if(elem === null){
                    console.error("CANT RETRIEVE ALL ITEMS");
                }
                global.dataArray.push(JSON.parse(elem));
            }
        }
        catch (error){
            console.error(error);
        }
    }

    getIds(){
        var id_array=[];
        global.dataArray.forEach((elem)=>{
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

    async getAllOld() {
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

    async getByIdOld(id) {
        var fetchedItem;
        await AsyncStorage.getItem(id, (err, item) => {
            fetchedItem = item
        });
        return fetchedItem;
    }


    async addItem(item){
        try{
            await AsyncStorage.setItem(JSON.stringify(item.id), JSON.stringify(item));
            await AsyncStorage.setItem("ITEM_ID_LIST", JSON.stringify(this.getIds()));
        }
        catch (err){
            console.error(err);
        }
    }

    async deleteItem(id){
        try{
            await AsyncStorage.removeItem(JSON.stringify(id));
            await AsyncStorage.setItem('ITEM_ID_LIST', JSON.stringify(this.getIds()));
        } catch (error) {
            console.log("Error:",error);
        }
    }

    async addOld(item) {
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
    async deleteOld(id) {
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