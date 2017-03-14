package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;
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
        Log.e("QWEQWE", "onViewAdded: "+child);
        if (getChildCount() == 1) {
            mScreen.onKeyboardHasCustomContent();
        }
        super.onViewAdded(child);
    }

    @Override
    public void onViewRemoved(View child) {
        Log.e("QWEQWE", "onViewRemoved: "+child);
        super.onViewRemoved(child);
    }
}
