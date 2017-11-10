package com.wishlister.androidnativewishlister.Repository;

import com.wishlister.androidnativewishlister.Model.WishItem;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Daniel on 11/6/2017.
 */

public class WishItemRepository implements IWishItemRepository {
    public ArrayList<WishItem> getAllItems(){
        ArrayList<WishItem> items = new ArrayList<>();
        items.add(new WishItem("name","type","shop",1.1));
        items.add(new WishItem("name2","type2","shop2",2.2));
        items.add(new WishItem("name3","type3","shop3",3.3));

        return items;
    }
}
