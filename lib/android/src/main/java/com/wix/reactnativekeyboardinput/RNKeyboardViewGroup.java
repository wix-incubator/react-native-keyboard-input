package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.uimanager.PixelUtil;

public class RNKeyboardViewGroup extends FrameLayout {

    private final RNKeyboardInputModule mModule;

    public RNKeyboardViewGroup(@NonNull Context context, RNKeyboardInputModule module) {
        super(context);
        mModule = module;

        super.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, (int) PixelUtil.toPixelFromDIP(100))); // TODO

        setBackgroundColor(Color.BLUE);

        setWillNotDraw(false);
    }

//    @Override
//    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//        int childrenCount = getChildCount();
//        int width = MeasureSpec.getSize(widthMeasureSpec);
//        int height = MeasureSpec.getSize(heightMeasureSpec);
//        setMeasuredDimension(width, (int) PixelUtil.toPixelFromDIP(100));
//    }

//    @Override
//    public void onViewAdded(View child) {
//        child.setLayoutParams(new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, (int) PixelUtil.toPixelFromDIP(100)));
//        super.onViewAdded(child);
//    }

    @Override
    public void setLayoutParams(ViewGroup.LayoutParams params) {
    }

    public void onHeightDetected(int heightPx) {
        super.setLayoutParams(new FrameLayout.LayoutParams(LayoutParams.MATCH_PARENT, heightPx));
    }

    public void onEnterCustomKeyboardsMode() {
        setVisibility(View.VISIBLE);
    }

    public void onLeaveCustomKeyboardsMode() {
        setVisibility(View.GONE);
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        mModule.attachCustomView(this);
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        mModule.detachCustomView(this);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        Log.e("ASDASD", "onLayout: " + t + " "+b + "   "+l+" "+r);
        super.onLayout(changed, l, t, r, b);
    }

}
