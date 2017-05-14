package com.wix.reactnativekeyboardinput.utils;

import com.wix.reactnativekeyboardinput.ReactContextHolder;

public class RuntimeUtils {

    public static void runOnUIThread(Runnable runnable) {
        ReactContextHolder.getContext().runOnUiQueueThread(runnable);
    }
}
