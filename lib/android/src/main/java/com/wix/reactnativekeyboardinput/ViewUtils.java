package com.wix.reactnativekeyboardinput;

import android.support.annotation.Nullable;
import android.view.View;
import android.view.ViewGroup;

public class ViewUtils {

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
