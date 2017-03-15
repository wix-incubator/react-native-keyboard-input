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

    private CustomKeyboardLayout mLayout;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        init(reactContext);
        return Arrays.<NativeModule>asList(new KeyboardInputModule(reactContext, mLayout));
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        init(reactContext);
        return Arrays.<ViewManager>asList(new CustomKeyboardRootViewManager(mLayout));
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    private void init(ReactApplicationContext reactContext) {
        if (AppContextHolder.getContext() == null) {
            AppContextHolder.setContext(reactContext);

            mLayout = new CustomKeyboardLayout(reactContext, new ReactSoftKeyboardMonitor(reactContext));
        }
    }
}
