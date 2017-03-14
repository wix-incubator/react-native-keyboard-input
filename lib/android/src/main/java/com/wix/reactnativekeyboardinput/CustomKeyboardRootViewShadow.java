package com.wix.reactnativekeyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;

public class CustomKeyboardRootViewShadow extends LayoutShadowNode {

    CustomKeyboardRootViewShadow(CustomKeyboardScreen screen) {
        setStyleHeight(0);

        screen.setShadowNode(this);
    }

    public void setHeight(int heightPx) {
        setStyleHeight(heightPx);
    }
}
