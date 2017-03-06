package com.wix.reactnativekeyboardinput;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class RNKeyboardInputModule extends ReactContextBaseJavaModule {

    public RNKeyboardInputModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CustomKeyboardInput";
    }
}
