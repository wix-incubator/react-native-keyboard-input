package com.wix.reactnativekeyboardinput.utils;

import com.facebook.react.bridge.GuardedRunnable;
import com.facebook.react.uimanager.UIManagerModule;
import com.wix.reactnativekeyboardinput.ReactContextHolder;

public class RuntimeUtils {

    public static void runOnUIThread(Runnable runnable) {
        ReactContextHolder.getContext().runOnUiQueueThread(runnable);
    }

    public static void dispatchUIUpdates(final Runnable userRunnable) {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                userRunnable.run();
                ReactContextHolder.getContext().runOnNativeModulesQueueThread(new GuardedRunnable(ReactContextHolder.getContext()) {
                    @Override
                    public void runGuarded() {
                        ReactContextHolder.getContext().getNativeModule(UIManagerModule.class).onBatchComplete();
                    }
                });
            }
        });
    }
}
