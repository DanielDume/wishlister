package com.wishlister.androidnativewishlister.Repository;

import android.arch.persistence.room.Room;

import com.wishlister.androidnativewishlister.Model.AppDatabase;
import com.wishlister.androidnativewishlister.Model.WishItem;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import android.arch.persistence.room.Room;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
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
import com.wishlister.androidnativewishlister.Repository.IWishItemRepository;
import com.wishlister.androidnativewishlister.Repository.WishItemRepository;

import java.util.ArrayList;
import android.content.Context;

/**
 * Created by Daniel on 11/6/2017.
 */

public class WishItemRepository implements IWishItemRepository, Serializable {

    private ArrayList<WishItem> items = new ArrayList<>();

    private AppDatabase db;

    public WishItemRepository() {

    }

    public ArrayList<WishItem> getAllItems(){
        return items;
    }
    public void updateItem(WishItem newItem){
        WishItem item;
        for (int i = 0; i < items.size(); ++i){
            item = items.get(i);
            if (newItem.getId() == item.getId()){
                item.setName(newItem.getName());
                item.setPrice(newItem.getPrice());
                item.setShop(newItem.getShop());
                item.setType(newItem.getType());
                break;
            }
        }
    }
}
