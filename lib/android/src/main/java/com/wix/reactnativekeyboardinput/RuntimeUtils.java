package com.wix.reactnativekeyboardinput;

public class RuntimeUtils {

    public static void runOnUIThread(Runnable runnable) {
        AppContextHolder.getContext().runOnUiQueueThread(runnable);
    }
}
