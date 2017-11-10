package com.wishlister.androidnativewishlister;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.wishlister.androidnativewishlister.Model.WishItem;
import com.wishlister.androidnativewishlister.Repository.WishItemRepository;

/**
 * Created by Daniel on 11/10/2017.
 */

public class DetailsActivity extends AppCompatActivity {
    private WishItemRepository repo;
    private EditText editTextName;
    private EditText editTextType;
    private EditText editTextShop;
    private EditText editTextPrice;
    private int idItem;
    private Button submitButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        editTextName = (EditText)findViewById(R.id.detailsEditName);
        editTextType = (EditText)findViewById(R.id.detailsEditType);
        editTextShop = (EditText)findViewById(R.id.detailsEditShop);
        editTextPrice = (EditText)findViewById(R.id.detailsEditPrice);
        submitButton = (Button) findViewById(R.id.buttonSave);

        this.repo= (WishItemRepository) getIntent().getSerializableExtra("Repository");
        this.idItem=(int) getIntent().getSerializableExtra("idItem");

        WishItem item = repo.getAllItems().get(idItem);
        editTextName.setText(item.getName());
        editTextType.setText(item.getType());
        editTextShop.setText(item.getShop());
        editTextPrice.setText(Double.toString(item.getPrice()));

        submitButton.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        WishItem item = repo.getAllItems().get(idItem);
                        item.setName(editTextName.getText().toString());
                        item.setPrice(Double.valueOf(editTextPrice.getText().toString()));
                        item.setType(editTextType.getText().toString());
                        item.setShop(editTextShop.getText().toString());
                        Intent intent = new Intent(DetailsActivity.this, MainActivity.class);
                        intent.putExtra("Repository", repo);
                        startActivity(intent);
                    }
                }

        );

    }
}
