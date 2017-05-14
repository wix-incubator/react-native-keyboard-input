package com.wix.reactnativekeyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;

public class CustomKeyboardRootViewShadow extends LayoutShadowNode {

    private final CustomKeyboardLayout mLayout;

    CustomKeyboardRootViewShadow(CustomKeyboardLayout layout) {
        setStyleHeight(0);

        mLayout = layout;
        mLayout.setShadowNode(this);
    }

    @Override
    public void onBeforeLayout() {
        mLayout.setShadowNode(this);
    }

    public void setHeight(int heightPx) {
        setStyleHeight(heightPx);
    }
}
