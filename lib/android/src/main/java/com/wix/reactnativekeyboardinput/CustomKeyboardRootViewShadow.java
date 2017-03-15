package com.wix.reactnativekeyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;

public class CustomKeyboardRootViewShadow extends LayoutShadowNode {

    CustomKeyboardRootViewShadow(CustomKeyboardLayout layout) {
        setStyleHeight(0);

        layout.setShadowNode(this);
    }

    public void setHeight(int heightPx) {
        setStyleHeight(heightPx);
    }
}
