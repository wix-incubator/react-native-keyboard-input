package com.wix.reactnativekeyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class RNKeyboardViewManager extends ViewGroupManager<RNKeyboardViewGroup> {

    private final RNKeyboardInputModule mModule;

    public RNKeyboardViewManager(RNKeyboardInputModule module) {
        mModule = module;
    }

    @Override
    public String getName() {
        return "CustomKeyboardViewNative";
    }

    @Override
    public RNKeyboardViewGroup createViewInstance(ThemedReactContext reactContext) {
        return new RNKeyboardViewGroup(reactContext, mModule);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }
}
