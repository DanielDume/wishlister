package com.wishlister.androidnativewishlister.Adapters;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.wishlister.androidnativewishlister.Model.WishItem;
import com.wishlister.androidnativewishlister.R;

import java.util.ArrayList;

/**
 * Created by Daniel on 11/9/2017.
 */

public class WishItemAdapter extends BaseAdapter {
    private ArrayList<WishItem> items;
    private Context context;

    private static class ViewHolder{
        private TextView itemView;
    }

    public WishItemAdapter(ArrayList<WishItem> items, Context context) {
        this.items = items;
        this.context = context;
    }

    public void add(WishItem item){
        this.items.add(item);
        notifyDataSetChanged();
    }

    public void setItems(ArrayList<WishItem> items) {
        this.items = items;
    }

    public ArrayList<WishItem> getItems() {
        return items;
    }

    @Override
    public int getCount() {
        return items.size();
    }

    @Override
    public Object getItem(int position) {
        return items.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = View.inflate(context, R.layout.list_item, null);

        TextView nameView = v.findViewById(R.id.textView);
        TextView typeView = v.findViewById(R.id.textView2);
        TextView shopView = v.findViewById(R.id.textView3);
        TextView priceView = v.findViewById(R.id.textView4);

        nameView.setText(items.get(position).getName());
        typeView.setText(items.get(position).getType());
        shopView.setText(items.get(position).getShop());
        priceView.setTest(items.get(position).getPrice());



    }
}
