package com.wishlister.androidnativewishlister.Model;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import java.util.List;

/**
 * Created by Daniel on 1/15/2018.
 */
@Dao
public interface UserDataDao {
    @Query(("SELECT * FROM UserData"))
    public List<UserData> getAll();

    @Insert
    public void addItem(UserData item);

    @Update
    public void updateItem(UserData item);

    @Query("SELECT * FROM UserData LIMIT 1")
    public UserData getData();

    @Delete
    public void deleteItem(UserData item);
}
