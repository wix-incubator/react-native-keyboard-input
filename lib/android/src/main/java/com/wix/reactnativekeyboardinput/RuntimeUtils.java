package com.wix.reactnativekeyboardinput;

public class RuntimeUtils {

    public static void runOnUIThread(Runnable runnable) {
        ReactContextHolder.getContext().runOnUiQueueThread(runnable);
    }
}
