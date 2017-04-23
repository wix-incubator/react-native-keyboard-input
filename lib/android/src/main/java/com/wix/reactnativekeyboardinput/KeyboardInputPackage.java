package com.wix.reactnativekeyboardinput;

import android.app.Application;

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

    public KeyboardInputPackage(Application application) {
        AppContextHolder.setApplication(application);
    }

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

    private synchronized void init(ReactApplicationContext reactContext) {
        if (ReactContextHolder.getContext() == null) {
            ReactContextHolder.setContext(reactContext);

            mLayout = new CustomKeyboardLayout(reactContext, new ReactSoftKeyboardMonitor(reactContext));
        }
    }
}
