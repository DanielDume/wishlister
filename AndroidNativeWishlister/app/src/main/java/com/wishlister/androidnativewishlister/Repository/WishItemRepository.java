package com.wishlister.androidnativewishlister.Repository;

import com.wishlister.androidnativewishlister.Model.WishItem;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Daniel on 11/6/2017.
 */

public class WishItemRepository implements IWishItemRepository, Serializable {

    private ArrayList<WishItem> items;

    public WishItemRepository() {
        ArrayList<WishItem> items = new ArrayList<>();
        items.add(new WishItem("name","type","shop",1.1, 0));
        items.add(new WishItem("name2","type2","shop2",2.2, 1));
        items.add(new WishItem("name3","type3","shop3",3.3, 2));
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
