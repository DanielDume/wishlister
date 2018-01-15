package com.wishlister.androidnativewishlister.Utils;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

/**
 * Created by Daniel on 1/15/2018.
 */

public class LoginRestClient {
    private static final String BASE_URL = "http://10.10.10.10:3000/";
    private static AsyncHttpClient client = new AsyncHttpClient();

    public static void post(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.post(BASE_URL+"auth/signIn", params, responseHandler);
    }
}
