package com.wishlister.androidnativewishlister.Repository;

import android.arch.persistence.room.Room;

import com.wishlister.androidnativewishlister.Model.AppDatabase;
import com.wishlister.androidnativewishlister.Model.UserData;
import com.wishlister.androidnativewishlister.Model.UserDataDao;
import com.wishlister.androidnativewishlister.Model.WishItem;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import android.arch.persistence.room.Room;
import android.os.SystemClock;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.JsonReader;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.app.Activity;
import android.app.ListActivity;
import android.content.Intent;
import android.net.Uri;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;

import com.wishlister.androidnativewishlister.Adapters.WishItemAdapter;
import com.wishlister.androidnativewishlister.Model.AppDatabase;
import com.wishlister.androidnativewishlister.Model.WishItem;
import com.wishlister.androidnativewishlister.Model.WishItemDao;
import com.wishlister.androidnativewishlister.Repository.IWishItemRepository;
import com.wishlister.androidnativewishlister.Repository.WishItemRepository;

import java.util.ArrayList;
import android.content.Context;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.*;

import cz.msebera.android.httpclient.HttpEntity;
import cz.msebera.android.httpclient.HttpResponse;

/**
 * Created by Daniel on 11/6/2017.
 */

public class WishItemRepository implements IWishItemRepository, Serializable {

    private AppDatabase db;
    private UserDataDao userDataDao;
    private WishItemDao wishItemDao;

    public WishItemRepository() {
        db=AppDatabase.getAppDatabase(null);
        userDataDao = db.userDataDao();
        wishItemDao = db.wishItemDao();
    }

    @Override
    public ArrayList<WishItem> getAllItems() {
        ArrayList<WishItem> items = new ArrayList<>();
        try{
            UserData userData = userDataDao.getData();

            if (userData == null){
                return null;
            }


            URL itemEndpoint = new URL("http://10.10.10.10:3000/items?username=" + userData.getUsername());
            HttpURLConnection myConnection = (HttpURLConnection) itemEndpoint.openConnection();

            myConnection.setRequestProperty("Accept", "application/json");
            myConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            myConnection.setRequestProperty("Authorization", "JWT " + userData.getToken());

            if (myConnection.getResponseCode() == 200) {
                InputStream inputStream = null;
                String result = null;
                inputStream = myConnection.getInputStream();

                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"), 8);

                StringBuilder sb = new StringBuilder();

                String line = null;
                while ((line = reader.readLine()) != null)
                {
                    sb.append(line + "\n");
                }
                result = sb.toString();

                JSONObject jObject = new JSONObject(result);

                JSONArray array = jObject.getJSONArray("items");
                WishItem item;
                String id, name, type, shop;
                Double price;
                //items.add(new WishItem("n3","t","s",100.1,"id"));
                for (int i = 0; i < array.length(); ++i){
                    id = array.getJSONObject(i).getString("_id");
                    name = array.getJSONObject(i).getString("name");
                    type = array.getJSONObject(i).getString("type");
                    shop = array.getJSONObject(i).getString("shop");
                    price = array.getJSONObject(i).getDouble("price");
                    item = new WishItem(name,type,shop,price, id);
                    items.add(item);
                }

                myConnection.disconnect();

            } else {
            }

        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        //items.add(new WishItem("n","t","s",100.1,"id"));
        return items;
    }

    @Override
    public WishItem addItem(WishItem item) {

        try{
            UserData userData = userDataDao.getData();

            if (userData == null){
                return null;
            }


            URL itemEndpoint = new URL("http://10.10.10.10:3000/items");
            HttpURLConnection myConnection = (HttpURLConnection) itemEndpoint.openConnection();

            myConnection.setRequestProperty("Accept", "application/json");
            myConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            myConnection.setRequestProperty("Authorization", "JWT " + userData.getToken());

            myConnection.setRequestMethod("POST");

            String myData = "username=" + userData.getUsername() + "&name=" + item.getName() + "&type=" + item.getType() + "&shop=" + item.getShop() + "&price=" + item.getPrice();
            myConnection.setDoOutput(true);
            myConnection.getOutputStream().write(myData.getBytes());
            if (myConnection.getResponseCode() == 200) {
                InputStream inputStream = null;
                String result = null;
                inputStream = myConnection.getInputStream();

                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"), 8);

                StringBuilder sb = new StringBuilder();

                String line = null;
                while ((line = reader.readLine()) != null)
                {
                    sb.append(line + "\n");
                }
                result = sb.toString();

                JSONObject jObject = new JSONObject(result);

                myConnection.disconnect();

                WishItem added = new WishItem(jObject.getString("name"), jObject.getString("type"), jObject.getString("shop"), jObject.getDouble("price"), jObject.getString("_id"));

                wishItemDao.addItem(added);

                return added;

            } else {
            }

        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public WishItem updateItem(WishItem item) {

        try{
            UserData userData = userDataDao.getData();

            if (userData == null){
                return null;
            }


            URL itemEndpoint = new URL("http://10.10.10.10:3000/items");
            HttpURLConnection myConnection = (HttpURLConnection) itemEndpoint.openConnection();

            myConnection.setRequestProperty("Accept", "application/json");
            myConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            myConnection.setRequestProperty("Authorization", "JWT " + userData.getToken());

            myConnection.setRequestMethod("PUT");

            String myData = "username=" + userData.getUsername() + "&name=" + item.getName() + "&type=" + item.getType() + "&shop=" + item.getShop() + "&price=" + item.getPrice() + "&_id=" + item.getId();
            myConnection.setDoOutput(true);
            myConnection.getOutputStream().write(myData.getBytes());
            if (myConnection.getResponseCode() == 200) {
                InputStream inputStream = null;
                String result = null;
                inputStream = myConnection.getInputStream();

                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"), 8);

                StringBuilder sb = new StringBuilder();

                String line = null;
                while ((line = reader.readLine()) != null)
                {
                    sb.append(line + "\n");
                }
                result = sb.toString();

                JSONObject jObject = new JSONObject(result);

                myConnection.disconnect();

                WishItem updated = new WishItem(jObject.getString("name"), jObject.getString("type"), jObject.getString("shop"), jObject.getDouble("price"), jObject.getString("_id"));

                wishItemDao.updateItem(updated);

                return updated;

            } else {
            }

        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;

    }

    @Override
    public void deleteItem(String id) {
        try{
            UserData userData = userDataDao.getData();

            if (userData == null){
                return ;
            }


            URL itemEndpoint = new URL("http://10.10.10.10:3000/items");
            HttpURLConnection myConnection = (HttpURLConnection) itemEndpoint.openConnection();

            myConnection.setRequestProperty("Accept", "application/json");
            myConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            myConnection.setRequestProperty("Authorization", "JWT " + userData.getToken());

            myConnection.setRequestMethod("DELETE");

            String myData = "username=" + userData.getUsername() + "&_id=" + id;
            myConnection.setDoOutput(true);
            myConnection.getOutputStream().write(myData.getBytes());
            if (myConnection.getResponseCode() == 200) {
//                InputStream inputStream = null;
//                String result = null;
//                inputStream = myConnection.getInputStream();
//
//                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"), 8);
//
//                StringBuilder sb = new StringBuilder();
//
//                String line = null;
//                while ((line = reader.readLine()) != null)
//                {
//                    sb.append(line + "\n");
//                }
//                result = sb.toString();
//
//                JSONObject jObject = new JSONObject(result);

                myConnection.disconnect();

            } else {
            }

        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
