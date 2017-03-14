package com.wix.reactnativekeyboardinput;

import android.app.Activity;
import android.support.annotation.Nullable;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;

import com.facebook.react.ReactRootView;

public class ViewUtils {

    public static Activity getCurrentActivity() {
        return AppContextHolder.getContext().getCurrentActivity();
    }

    public static Window getWindow() {
        return getCurrentActivity().getWindow();
    }

    public static ReactRootView getReactRootView() {
        return findChildByClass((ViewGroup) getWindow().getDecorView(), ReactRootView.class);
    }

    /**
     * Returns the first instance of clazz in root
     */
    @Nullable public static <T> T findChildByClass(ViewGroup root, Class clazz) {
        for (int i = 0; i < root.getChildCount(); i++) {
            View view = root.getChildAt(i);
            if (clazz.isAssignableFrom(view.getClass())) {
                return (T) view;
            }

            if (view instanceof ViewGroup) {
                view = findChildByClass((ViewGroup) view, clazz);
                if (view != null && clazz.isAssignableFrom(view.getClass())) {
                    return (T) view;
                }
            }
        }
        return null;
    }
}
