package com.wix.reactnativekeyboardinput;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class KeyboardInputPackage implements ReactPackage {

    private CustomKeyboardScreen mScreen;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        init(reactContext);
        return Arrays.<NativeModule>asList(new KeyboardInputModule(reactContext, mScreen));
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        init(reactContext);
        return Arrays.<ViewManager>asList(new CustomKeyboardRootViewManager(mScreen));
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    private void init(ReactApplicationContext reactContext) {
        if (AppContextHolder.getContext() == null) {
            AppContextHolder.setContext(reactContext);

            mScreen = new CustomKeyboardScreen(reactContext, new ReactSoftKeyboardMonitor(reactContext));
        }
    }
}
