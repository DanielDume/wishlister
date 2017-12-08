package com.wishlister.androidnativewishlister.Model;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Daniel on 12/7/2017.
 */
@Dao
public interface WishItemDao {
    @Query(("SELECT * FROM WishItem"))
    public List<WishItem> getAll();

    @Insert
    public void addItem(WishItem item);

    @Update
    public void updateItem(WishItem item);

    @Query("SELECT * FROM WishItem WHERE id = :id")
    public WishItem getById(String id);

    @Query("SELECT * FROM WishItem ORDER BY id DESC LIMIT 1")
    public WishItem getNextId();

    @Delete
    public void deleteItem(WishItem item);

}
