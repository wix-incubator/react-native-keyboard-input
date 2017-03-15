package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.PixelUtil;

import java.lang.ref.WeakReference;

import static com.wix.reactnativekeyboardinput.RuntimeUtils.runOnUIThread;
import static com.wix.reactnativekeyboardinput.ViewUtils.getCurrentActivity;
import static com.wix.reactnativekeyboardinput.ViewUtils.getWindow;

public class CustomKeyboardLayout implements ReactSoftKeyboardMonitor.Listener {

    private static final int DEFAULT_KEYBOARD_HEIGHT_DP = 100;
    private final int DEFAULT_KEYBOARD_HEIGHT_PX;

    private final InputMethodManager mInputMethodManager;
    private final ReactSoftKeyboardMonitor mKeyboardMonitor;

    private WeakReference<CustomKeyboardRootViewShadow> mShadowNode;

    public CustomKeyboardLayout(ReactContext reactContext, ReactSoftKeyboardMonitor keyboardMonitor) {
        mKeyboardMonitor = keyboardMonitor;
        mInputMethodManager = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);

        DEFAULT_KEYBOARD_HEIGHT_PX = (int) PixelUtil.toPixelFromDIP(DEFAULT_KEYBOARD_HEIGHT_DP);

        mKeyboardMonitor.setListener(this);
    }

    @Override
    public void onSoftKeyboardVisible(boolean distinct) {
        if (distinct) {
            clearKeyboardOverlayMode();
        }
        hideCustomKeyboardContent();
    }


    public void setShadowNode(CustomKeyboardRootViewShadow node) {
        mShadowNode = new WeakReference<>(node);
    }

    public void onKeyboardHasCustomContent() {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                showCustomKeyboardContent();
                setKeyboardOverlayMode();
                hideSoftKeyboardIfNeeded();
            }
        });
    }

    public void forceReset(final Promise promise) {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                if (getCurrentActivity().getCurrentFocus() != null) {
                    showSoftKeyboard();
                } else {
                    hideCustomKeyboardContent();
                    clearKeyboardOverlayMode();
                }
                promise.resolve(null);
            }
        });
    }

    private void showCustomKeyboardContent() {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                final CustomKeyboardRootViewShadow shadowNode = mShadowNode.get();
                if (shadowNode != null) {
                    shadowNode.setHeight(getHeightForCustomContent());
                }
            }
        });
    }

    private void hideCustomKeyboardContent() {
        final CustomKeyboardRootViewShadow shadowNode = mShadowNode.get();
        if (shadowNode != null) {
            shadowNode.setHeight(0);
        }
    }

    private void showSoftKeyboard() {
        mInputMethodManager.showSoftInput(getCurrentActivity().getCurrentFocus(), 0);
    }

    private void hideSoftKeyboardIfNeeded() {
        final View focusedView = getCurrentActivity().getCurrentFocus();
        if (focusedView != null) {
            mInputMethodManager.hideSoftInputFromWindow(focusedView.getWindowToken(), 0);
        }
    }

    private int getHeightForCustomContent() {
        final Integer height = mKeyboardMonitor.getLastKnownKeyboardHeight();
        return height == null ? DEFAULT_KEYBOARD_HEIGHT_PX : height;
    }

    private void setKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
    }

    private void clearKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    }

}
