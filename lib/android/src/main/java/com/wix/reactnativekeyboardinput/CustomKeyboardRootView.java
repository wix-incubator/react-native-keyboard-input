package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;

import static com.wix.reactnativekeyboardinput.GlobalDefs.*;

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
            Log.d(TAG, "New custom keyboard content");
            mLayout.onKeyboardHasCustomContent();
        }
        super.onViewAdded(child);
    }
}
