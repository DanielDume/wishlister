package com.wishlister.androidnativewishlister;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.wishlister.androidnativewishlister.Model.WishItem;
import com.wishlister.androidnativewishlister.Repository.IWishItemRepository;
import com.wishlister.androidnativewishlister.Repository.WishItemRepository;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private IWishItemRepository itemRepository = new WishItemRepository();

    private ListView mListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mListView = (ListView) findViewById(R.id.list_view);
        final ArrayList<WishItem> items = itemRepository.getAllItems();



//        final ListView listview = (ListView) findViewById(R.id.listview);
//        String[] values = new String[] {"ASDF", "ZCXVB", "QWERT"};
//        final ArrayList<String> list = new ArrayList<>();
//        for (int i = 0; i < values.length; ++i){
//            list.add(values[i]);
//        }



    }
}
