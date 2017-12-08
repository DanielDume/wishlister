package com.wishlister.androidnativewishlister;

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
import com.wishlister.androidnativewishlister.Model.WishItemDao;
import com.wishlister.androidnativewishlister.Repository.IWishItemRepository;
import com.wishlister.androidnativewishlister.Repository.WishItemRepository;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private Button button;
    private EditText editText;
    private EditText editText2;
    private EditText editText3;
    private EditText editText4;
    private WishItemAdapter adapter;
    private ArrayList<WishItem> wishItems = new ArrayList<>();
    private ListView listView;
    private static int ID =0;
    private boolean editFlag =false;
    private String Selected_ID ="0";
    private final String EMPTY_STRING ="";
    private WishItemRepository repo;
    private AppDatabase db;
    private WishItemDao wishItemDao;



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        adapter.setItems((ArrayList<WishItem>) wishItemDao.getAll());
        adapter.notifyDataSetChanged();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        db = AppDatabase.getAppDatabase(this);
        wishItemDao = db.wishItemDao();
        ID = Integer.parseInt(wishItemDao.getNextId()) + 1;
        setContentView(R.layout.activity_main);
        listView = (ListView)findViewById(R.id.listView);
        ID = 1;
        adapter = new WishItemAdapter((ArrayList<WishItem>) wishItemDao.getAll(), this);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

                Intent intent = new Intent(MainActivity.this, DetailsActivity.class);
                intent.putExtra("idItem", adapter.getItem(i).getId());
                startActivityForResult(intent, 1);
            }
        });
        button = (Button)findViewById(R.id.button2);
        editText = (EditText)findViewById(R.id.editText);
        editText2 = (EditText)findViewById(R.id.editText2);
        editText3 = (EditText)findViewById(R.id.editText3);
        editText4 = (EditText)findViewById(R.id.editText4);

                button.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
//                        wishItemDao.addItem(new WishItem("n1", "t1", "s1", 11.22, "1" ));
//                        wishItemDao.addItem(new WishItem("n2", "t2", "s2", 22.22, "2" ));
//                        wishItemDao.addItem(new WishItem("n3", "t3", "s3", 11.22, "3" ));
                        String name = editText.getText().toString();
                        String type = editText2.getText().toString();
                        String shop = editText3.getText().toString();
                        Double price = Double.parseDouble(editText4.getText().toString());
                        if(editFlag){
                            for(int i =0;i<adapter.getCount();i++){
                                if(adapter.getItem(i).getId() == Selected_ID){
                                    adapter.getItem(i).setName(name);
                                    adapter.getItem(i).setType(type);
                                    adapter.getItem(i).setShop(shop);
                                    adapter.getItem(i).setPrice(price);
                                    break;
                                }
                            }
                            Selected_ID="0";
                            editText.setText(EMPTY_STRING);
                            editText2.setText(EMPTY_STRING);
                            editText3.setText(EMPTY_STRING);
                            editText4.setText(EMPTY_STRING);
                            adapter.notifyDataSetChanged();
                            editFlag = !editFlag;
                        }
                        else{
                            ID++;
                            WishItem newWishItem = new WishItem(name,type,shop,price,Integer.toString(ID));
                            adapter.add(newWishItem);
                            editText.setText(EMPTY_STRING);
                            editText2.setText(EMPTY_STRING);
                            editText3.setText(EMPTY_STRING);
                            editText4.setText(EMPTY_STRING);
                            wishItemDao.addItem(newWishItem);
//                            Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
//                                    "mailto","daniel.dume05@gmail.com", null));
//                            emailIntent.putExtra(Intent.EXTRA_SUBJECT, "New Wish Item");
//                            emailIntent.putExtra(Intent.EXTRA_TEXT, newWishItem.toString());
//                            startActivity(Intent.createChooser(emailIntent, "Send email..."));
                        }
                    }
                }

        );

    }
}
