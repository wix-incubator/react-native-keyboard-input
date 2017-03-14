package com.wix.reactnativekeyboardinput;

import com.facebook.react.bridge.ReactApplicationContext;

public class AppContextHolder {

    private static ReactApplicationContext sContext;

    public static void setContext(ReactApplicationContext context) {
        sContext = context;
    }

    public static ReactApplicationContext getContext() {
        return sContext;
    }
}
