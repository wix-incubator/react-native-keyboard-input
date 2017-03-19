package com.wix.reactnativekeyboardinput;

import android.support.annotation.Nullable;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;

import com.facebook.react.ReactRootView;

import static com.wix.reactnativekeyboardinput.AppContextHolder.getCurrentActivity;

public class ViewUtils {

    public static Window getWindow() {
        return getCurrentActivity().getWindow();
    }

    public static ReactRootView getReactRootView() {
        final ReactRootView view = findChildByClass((ViewGroup) getWindow().getDecorView(), ReactRootView.class);
        return view;
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
                if (view != null) {
                    return (T) view;
                }
            }
        }
        return null;
    }
}
