package com.wix.reactnativekeyboardinput;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class KeyboardInputModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static final String REACT_CLASS = "CustomKeyboardInput";

    private final CustomKeyboardScreen mScreen;

    public KeyboardInputModule(ReactApplicationContext reactContext, CustomKeyboardScreen screen) {
        super(reactContext);
        mScreen = screen;

        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void reset(Promise promise) {
        mScreen.forceReset(promise);
    }

    @Override
    public void onHostResume() {
        mScreen.onScreenContentCreated();
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        mScreen.onScreenContentDestroyed();
    }
}
