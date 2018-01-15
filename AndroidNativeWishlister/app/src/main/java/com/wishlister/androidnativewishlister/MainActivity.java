package com.wishlister.androidnativewishlister;

import android.app.AlertDialog;
import android.arch.persistence.room.Room;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.JsonReader;
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
import com.wishlister.androidnativewishlister.Model.UserData;
import com.wishlister.androidnativewishlister.Model.UserDataDao;
import com.wishlister.androidnativewishlister.Model.WishItem;
import com.wishlister.androidnativewishlister.Model.WishItemDao;
import com.wishlister.androidnativewishlister.Repository.IWishItemRepository;
import com.wishlister.androidnativewishlister.Repository.WishItemRepository;
import org.json.*;
import com.loopj.android.http.*;
import com.wishlister.androidnativewishlister.Utils.LoginRestClient;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Hashtable;

import javax.net.ssl.HttpsURLConnection;

import cz.msebera.android.httpclient.Header;

public class MainActivity extends AppCompatActivity {

    private Button loginButton;


    private EditText editText;
    private EditText editText2;
    private AppDatabase db;
    private UserDataDao userDataDao;



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data){
//        adapter.setItems((ArrayList<WishItem>) wishItemDao.getAll());
//        adapter.notifyDataSetChanged();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.login);

        editText = (EditText)findViewById(R.id.username);
        editText2 = (EditText)findViewById(R.id.password);
        loginButton = (Button)findViewById(R.id.loginButton);
        db = AppDatabase.getAppDatabase(this);

        userDataDao = db.userDataDao();
        UserData userData = userDataDao.getData();
        if (userData != null){
            Intent intent = new Intent(MainActivity.this, ItemListActivity.class);
            startActivity(intent);
        }
        loginButton.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {

                        //Intent intent = new Intent(MainActivity.this, ItemListActivity.class);
                        //startActivity(intent);
                        AsyncTask.execute(new Runnable() {
                            @Override
                            public void run() {
//                                int a = 10;
//                                a++;
//                                Intent intent = new Intent(MainActivity.this, ItemListActivity.class);
//                                startActivity(intent);
                                String username = editText.getText().toString();
                                String password = editText2.getText().toString();
                                try{
                                    URL loginEndpoint = new URL("http://10.10.10.10:3000/auth/signIn");
                                    HttpURLConnection myConnection =
                                            (HttpURLConnection) loginEndpoint.openConnection();
                                    myConnection.setRequestMethod("POST");

                                    String myData = "username="+username+"&password="+password;
                                    myConnection.setDoOutput(true);
                                    myConnection.getOutputStream().write(myData.getBytes());

                                    HashMap<String, String> userData = new HashMap<String, String>();

                                    if (myConnection.getResponseCode() == 200) {
                                        // Success
                                        InputStream responseBody = myConnection.getInputStream();
                                        InputStreamReader responseBodyReader =
                                                new InputStreamReader(responseBody, "UTF-8");

                                        JsonReader jsonReader = new JsonReader(responseBodyReader);

                                        jsonReader.beginObject(); // Start processing the JSON object
                                        while (jsonReader.hasNext()) { // Loop through all keys
                                            String key = jsonReader.nextName(); // Fetch the next key
                                            if (key.equals("token") || key.equals("username") || key.equals("role")){
                                                userData.put(key, jsonReader.nextString());
                                            }
                                            else {
                                                jsonReader.skipValue();
                                            }
                                        }
                                        jsonReader.close();
                                        myConnection.disconnect();
                                        userData.put("username", editText.getText().toString());
                                        if (userData.get("token") != null && userData.get("role") != null){
                                            UserData userData1 = new UserData(userData.get("username"), userData.get("token"), userData.get("role"));
                                            userDataDao.addItem(userData1);
                                            Intent intent = new Intent(MainActivity.this, ItemListActivity.class);
                                            startActivity(intent);
                                        }

                                    } else {
                                        // Error handling code goes here
                                    }
                                }
                                catch (Exception e){

                                }

                                return;
                            }
                        });

                    }
                }

        );

    }
}
