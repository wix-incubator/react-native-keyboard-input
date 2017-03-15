package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.support.annotation.NonNull;
import android.view.View;
import android.widget.FrameLayout;

public class CustomKeyboardRootView extends FrameLayout {

    private final CustomKeyboardLayout mLayout;

    public CustomKeyboardRootView(@NonNull Context context, CustomKeyboardLayout layout) {
        super(context);
        mLayout = layout;

        setWillNotDraw(false);
    }

    @Override
    public void onViewAdded(View child) {
        if (getChildCount() == 1) {
            mLayout.onKeyboardHasCustomContent();
        }
        super.onViewAdded(child);
    }
}
