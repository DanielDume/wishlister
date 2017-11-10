package com.wishlister.androidnativewishlister;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
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

import com.wishlister.androidnativewishlister.Model.WishItem;
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
    private ArrayList<WishItem> wishItems;
    private ListView listView;
    private static int ID =0;
    private boolean editFlag =false;
    private int Selected_ID =0;
    private final String EMPTY_STRING ="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listView = findViewById(R.id.listView);
        wishItems=new ArrayList<>();
        wishItems.add(new WishItem("name1","type1","shop1",1,15));
        ID++;
        adapter = new WishItemAdapter(this, wishItems);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                editText.setText(adapter.getItem(i).getName());
                editText2.setText(adapter.getItem(i).getType());
                editText3.setText(adapter.getItem(i).getShop());
                editText4.setText(Integer.toString(adapter.getItem(i).getPrice()));
                editFlag = true;
                Selected_ID =adapter.getItem(i).getId();
            }
        });
        button = findViewById(R.id.button2);
        editText = findViewById(R.id.editText);
        editText2 = findViewById(R.id.editText2);
        editText3 = findViewById(R.id.editText3);
        editText4 = findViewById(R.id.editText4);

                button.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
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
                                }
                            }
                            Selected_ID=0;
                            editText.setText(EMPTY_STRING);
                            editText2.setText(EMPTY_STRING);
                            editText3.setText(EMPTY_STRING);
                            editText4.setText(EMPTY_STRING);
                            adapter.notifyDataSetChanged();
                        }
                        else{
                            WishItem newWishItem = new WishItem(name,type,shop,price,ID);
                            ID++;
                            adapter.add(newWishItem);
                            Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                                    "mailto","daniel.dume05@gmail.com", null));
                            emailIntent.putExtra(Intent.EXTRA_SUBJECT, "New Food Order");
                            emailIntent.putExtra(Intent.EXTRA_TEXT, newFoodOrder.toString());
                            startActivity(Intent.createChooser(emailIntent, "Send email..."));
                        }
                    }
                }

        );

    }
}
