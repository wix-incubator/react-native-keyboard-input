package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;

import java.lang.ref.WeakReference;

import static com.wix.reactnativekeyboardinput.AppContextHolder.getCurrentActivity;
import static com.wix.reactnativekeyboardinput.RuntimeUtils.runOnUIThread;
import static com.wix.reactnativekeyboardinput.ViewUtils.getWindow;

public class CustomKeyboardLayout implements ReactSoftKeyboardMonitor.Listener {

    private final InputMethodManager mInputMethodManager;
    private final ReactSoftKeyboardMonitor mKeyboardMonitor;
    private CustomKeyboardLayout.OnKeyboardResignedHandler mKeyboardResignedHandler;

    private WeakReference<CustomKeyboardRootViewShadow> mShadowNode = new WeakReference<>(null);

    public CustomKeyboardLayout(ReactContext reactContext, ReactSoftKeyboardMonitor keyboardMonitor) {
        mKeyboardMonitor = keyboardMonitor;
        mInputMethodManager = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);
        mKeyboardResignedHandler = null;

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
                    sendOnKeyboardResignedEvent();
                }
                promise.resolve(null);
            }
        });
    }

    public void clearFocusedView() {
        final View focusedView = getCurrentActivity().getCurrentFocus();
        if (focusedView != null) {
            runOnUIThread(new Runnable() {
                @Override
                public void run() {
                    focusedView.clearFocus();
                    sendOnKeyboardResignedEvent();
                }
            });
        }
    }

    public interface OnKeyboardResignedHandler {
        void onKeyboardResignedHandler();
    }

    public void setOnKeyboardResignedHandler(CustomKeyboardLayout.OnKeyboardResignedHandler l) {
        mKeyboardResignedHandler = l;
    }

    private void sendOnKeyboardResignedEvent() {
        if(mKeyboardResignedHandler != null) {
            mKeyboardResignedHandler.onKeyboardResignedHandler();
        }
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
        sendOnKeyboardResignedEvent();
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
        return mKeyboardMonitor.getKeyboardHeight();
    }

    private void setKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
    }

    private void clearKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    }

}
