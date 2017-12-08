package com.wishlister.androidnativewishlister;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.app.FragmentManager;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.github.mikephil.charting.animation.Easing;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.formatter.PercentFormatter;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.wishlister.androidnativewishlister.Model.AppDatabase;
import com.wishlister.androidnativewishlister.Model.WishItem;
import com.wishlister.androidnativewishlister.Model.WishItemDao;
import com.wishlister.androidnativewishlister.Repository.WishItemRepository;

import java.util.ArrayList;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;

/**
 * Created by Daniel on 11/10/2017.
 */

public class DetailsActivity extends AppCompatActivity {
    private WishItemRepository repo;
    private EditText editTextName;
    private EditText editTextType;
    private EditText editTextShop;
    private EditText editTextPrice;
    private String idItem;
    private Button submitButton;
    private Button deleteButton;
    private AppDatabase db;
    private WishItemDao wishItemDao;
    private WishItem editedItem;
    private NumberPicker numberPicker;
    private PieChart mChart;
    String[] types;
//    public static class DeleteDialog extends DialogFragment {
//        @Override
//        public Dialog onCreateDialog(Bundle savedInstanceState) {
//            // Use the Builder class for convenient dialog construction
//            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
//            builder.setMessage("Are you soure you want to delete this item?")
//                    .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
//                        public void onClick(DialogInterface dialog, int id) {
//
//                        }
//                    })
//                    .setNegativeButton("No", new DialogInterface.OnClickListener() {
//                        public void onClick(DialogInterface dialog, int id) {
//
//                        }
//                    });
//            return builder.create();
//        }
//    }

    String[] getTypes(){
        return new String[]{"type1", "type2", "type3"};
    }
    Hashtable<String, Integer> getUsedTypes()
    {
        ArrayList<WishItem> items = (ArrayList<WishItem>)wishItemDao.getAll();
        Hashtable<String, Integer> typesDisplayed = new Hashtable<>();
        for (int i = 0; i < items.size(); ++i){
            if (typesDisplayed.containsKey(items.get(i).getType())){
                typesDisplayed.put(items.get(i).getType(), typesDisplayed.get(items.get(i).getType()) + 1);
            }
            else {
                typesDisplayed.put(items.get(i).getType(), 1);
            }
        }
        return typesDisplayed;
    }
    public void setData(int count, float range){
        ArrayList<PieEntry> entries = new ArrayList<>();
//        int[] everyTypeCountArray = getEveryTypeCount();
//        for (int i = 0; i < count; i++) {
//            if (everyTypeCountArray[i] > 0) {
//                entries.add(new PieEntry((everyTypeCountArray[i] * range), animalTypes[i]));
//            }
//        }
        Hashtable<String, Integer> usedTypes = getUsedTypes();
        for(String key : usedTypes.keySet()){
            entries.add(new PieEntry(usedTypes.get(key), key));
        }
        PieDataSet dataSet = new PieDataSet(entries, "");
        dataSet.setSliceSpace(10f);
        dataSet.setSelectionShift(10f);

        // add colors
        ArrayList<Integer> colors = new ArrayList<>();

        for (int c : ColorTemplate.VORDIPLOM_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.JOYFUL_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.COLORFUL_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.LIBERTY_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.PASTEL_COLORS)
            colors.add(c);

        colors.add(ColorTemplate.getHoloBlue());
        dataSet.setColors(colors);

        PieData data = new PieData(dataSet);
        data.setValueFormatter(new PercentFormatter());
        data.setValueTextSize(11f);
        data.setValueTextColor(Color.BLACK);
        mChart.setData(data);

        mChart.invalidate();
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        db = AppDatabase.getAppDatabase(this);
        wishItemDao = db.wishItemDao();

        editTextName = (EditText)findViewById(R.id.detailsEditName);
        editTextType = (EditText)findViewById(R.id.detailsEditType);
        editTextShop = (EditText)findViewById(R.id.detailsEditShop);
        editTextPrice = (EditText)findViewById(R.id.detailsEditPrice);
        submitButton = (Button) findViewById(R.id.buttonSave);
        deleteButton = (Button) findViewById(R.id.buttonDelete);
        numberPicker = (NumberPicker) findViewById(R.id.numberPicker);
        types = getTypes();
        numberPicker.setMinValue(0);
        numberPicker.setMaxValue(types.length - 1);
        numberPicker.setDisplayedValues(types);
        numberPicker.setWrapSelectorWheel(true);

        numberPicker.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker picker, int oldVal, int newVal){
                editTextType.setText(types[newVal]);
            }
        });

        this.idItem=(String)getIntent().getSerializableExtra("idItem");

        editedItem = wishItemDao.getById(idItem);

        int i;
        for (i = 0; i < types.length; ++i){
            if(types[i] == editedItem.getType()){
                numberPicker.setValue(i);
                break;
            }
        }

        editTextName.setText(editedItem.getName());
        editTextType.setText(editedItem.getType());
        editTextShop.setText(editedItem.getShop());
        editTextPrice.setText(Double.toString(editedItem.getPrice()));

        mChart = (PieChart) findViewById(R.id.pieLayout);
        mChart.setUsePercentValues(true);
        mChart.getDescription().setEnabled(false);

        mChart.setExtraOffsets(5, 10, 5, 5);

        mChart.setDragDecelerationFrictionCoef(0.95f);

        mChart.setDrawHoleEnabled(true);
        mChart.setHoleColor(Color.WHITE);

        mChart.setTransparentCircleColor(Color.WHITE);
        mChart.setTransparentCircleAlpha(110);

        mChart.setHoleRadius(40f);
        mChart.setTransparentCircleRadius(61f);
        mChart.setRotationAngle(0);
        // enable rotation of the chart by touch
        mChart.setRotationEnabled(true);
        mChart.setHighlightPerTapEnabled(true);

        setData(0, 100);

        mChart.animateY(1400, Easing.EasingOption.EaseInOutQuad);

        submitButton.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        editedItem.setName(editTextName.getText().toString());
                        editedItem.setPrice(Double.valueOf(editTextPrice.getText().toString()));
                        editedItem.setType(editTextType.getText().toString());
                        editedItem.setShop(editTextShop.getText().toString());
                        wishItemDao.updateItem(editedItem);
                        setResult(1);
                        finish();
                    }
                }

        );
        deleteButton.setOnClickListener(
                new View.OnClickListener(){
                    @Override
                    public void onClick(View view){
                        AlertDialog.Builder alertDialog2 = new AlertDialog.Builder(
                                DetailsActivity.this);
                        alertDialog2.setTitle("Confirm Delete...");
                        alertDialog2.setMessage("Are you sure you want delete this item?");

                        alertDialog2.setPositiveButton("YES",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                        wishItemDao.deleteItem(editedItem);
                                        setResult(1);
                                        finish();

                                    }
                                });

                        alertDialog2.setNegativeButton("NO",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {

                                    }
                                });

                        alertDialog2.show();
                    }
                }
        );

    }
}
