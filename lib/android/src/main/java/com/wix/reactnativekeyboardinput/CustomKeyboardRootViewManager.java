package com.wix.reactnativekeyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class CustomKeyboardRootViewManager extends ViewGroupManager<CustomKeyboardRootView> {

    private final CustomKeyboardScreen mScreen;

    public CustomKeyboardRootViewManager(CustomKeyboardScreen screen) {
        mScreen = screen;
    }

    @Override
    public String getName() {
        return "CustomKeyboardViewNative";
    }

    @Override
    public CustomKeyboardRootView createViewInstance(ThemedReactContext reactContext) {
        return new CustomKeyboardRootView(reactContext, mScreen);
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        return new CustomKeyboardRootViewShadow(mScreen);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }
}
