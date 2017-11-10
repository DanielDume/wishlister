package com.wishlister.androidnativewishlister.Model;

import java.io.Serializable;

/**
 * Created by Daniel on 11/6/2017.
 */

public class WishItem implements Serializable{
    private long id;
    private String name, type, shop;
    private double price;

    public WishItem(String name, String type, String shop, double price) {
        this.name = name;
        this.type = type;
        this.shop = shop;
        this.price = price;
    }

    public WishItem(String name, String type, String shop, double price, long id) {
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
