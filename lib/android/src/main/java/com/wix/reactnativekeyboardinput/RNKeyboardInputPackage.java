package com.wix.reactnativekeyboardinput;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RNKeyboardInputPackage implements ReactPackage {

    private RNKeyboardInputModule mModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(getModule(reactContext));
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new RNKeyboardViewManager(getModule(reactContext)));
    }

    private RNKeyboardInputModule getModule(ReactApplicationContext reactContext) {
        if (mModule == null) {
            mModule = new RNKeyboardInputModule(reactContext);
        }
        return mModule;
    }
}
