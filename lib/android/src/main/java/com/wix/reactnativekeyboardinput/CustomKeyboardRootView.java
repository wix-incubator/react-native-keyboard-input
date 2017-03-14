package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.support.annotation.NonNull;
import android.view.View;
import android.widget.FrameLayout;

public class CustomKeyboardRootView extends FrameLayout {

    private final CustomKeyboardScreen mScreen;

    public CustomKeyboardRootView(@NonNull Context context, CustomKeyboardScreen screen) {
        super(context);
        mScreen = screen;

        setWillNotDraw(false);
    }

    @Override
    public void onViewAdded(View child) {
        if (getChildCount() == 1) {
            mScreen.onKeyboardHasCustomContent();
        }
        super.onViewAdded(child);
    }
}
