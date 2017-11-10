package com.wishlister.androidnativewishlister.Repository;

import com.wishlister.androidnativewishlister.Model.WishItem;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Daniel on 11/6/2017.
 */

public interface IWishItemRepository {
    ArrayList<WishItem> getAllItems();
}
