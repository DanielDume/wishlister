package com.wishlister.androidnativewishlister.Model;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;
import android.support.annotation.NonNull;

import java.io.Serializable;

/**
 * Created by Daniel on 11/6/2017.
 */
@Entity
public class WishItem implements Serializable{
    @PrimaryKey
    @NonNull
    private String id;
    private String name, type, shop;
    private double price;
    @Ignore
    public WishItem(String name, String type, String shop, double price) {
        this.name = name;
        this.type = type;
        this.shop = shop;
        this.price = price;
    }

    public WishItem(String name, String type, String shop, double price, String id) {
        this.name = name;
        this.type = type;
        this.shop = shop;
        this.price = price;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getShop() {
        return shop;
    }

    public void setShop(String shop) {
        this.shop = shop;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "WishItem{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", shop='" + shop + '\'' +
                ", price=" + price +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
