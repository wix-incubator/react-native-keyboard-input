package com.wix.reactnativekeyboardinput;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

public class KeyboardInputModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "CustomKeyboardInput";

    private final CustomKeyboardLayout mLayout;

    public KeyboardInputModule(ReactApplicationContext reactContext, CustomKeyboardLayout layout) {
        super(reactContext);

        mLayout = layout;
        mLayout.setOnKeyboardResignedHandler(new CustomKeyboardLayout.OnKeyboardResignedHandler() {
            @Override
            public void onKeyboardResignedHandler() {
                getReactApplicationContext().getJSModule(RCTDeviceEventEmitter.class).emit("kbdResigned", null);
            }
        });
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void reset(Promise promise) {
        mLayout.forceReset(promise);
    }

    @ReactMethod
    public void clearFocusedView() {
        mLayout.clearFocusedView();
    }
}
