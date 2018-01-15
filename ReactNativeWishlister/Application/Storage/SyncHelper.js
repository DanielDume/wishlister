import {NetInfo, DeviceEventEmitter } from "react-native";
import Notification from 'react-native-system-notification';

var PushNotification = require('react-native-push-notification');
import ApiHelper from "./ApiHelper";
//import AsyncStorageHelper from "./StorageHelper";
export default class SyncHelper{    
    
    updateServerPath ='http://10.10.10.10:3001';
    static instance = null;
    lastTime = false;
    refresh = function(){};

    constructor(){
        //this.refresh = refresh;
        //this.storageHelper = new AsyncStorageHelper();
        this.new_web_socket();
    }

    static getInstance(){
        if (this.instance === null) {
            this.instance = new SyncHelper();
            //new_web_socket();
        }
        return this.instance;
    }

    // setRefresh(refresh){
    //     this.refresh = refresh;
    // }

    

    new_web_socket(){
        let ws = new WebSocket(this.updateServerPath);

        ws.onopen = () => {
            console.log("Connection Opened to server");
        };
        ws.onmessage = (e) => {
            let payload = JSON.parse(e.data);            
            
            PushNotification.localNotification({
                title: "Wishlister App", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
                message: payload.message, // (required)
                playSound: false, // (optional) default: true                
            });

            this.refresh();
        };
        this.ws = ws;
    }

    handleFirstConnectivityChange(isConnected) {
        console.log('Client changed:is now ' + (isConnected ? 'online' : 'offline'));
        if(this.lastTime != isConnected){
            this.lastTime = isConnected;
            if(isConnected){
                //this.new_web_socket();
                if (global.modifiedOffline.length > 0) {
                    ApiHelper.synchronizeChanges();    
                }                
                // OrderService.getInstance().mergeOrders().then(()=>{
                //     OrderService.getInstance().getAllOrders().then(()=>this.refresh()).catch();
                //     this.storageHelper.removeChangesList().then(()=>{}).catch();
                // }).catch(err=>{});

            }            
        }
    }

    checkConnection(){
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange.bind(this)
        );
        return NetInfo.isConnected
            .fetch()
            .then(isConnected => {
                console.log('Client  is ' + (isConnected ? 'online' : 'offline'));
                return isConnected;
                //return false;
            }).catch(err=>{console.log("Net Info error:"+err)});

    }
}