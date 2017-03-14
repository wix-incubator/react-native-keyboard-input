package com.wix.reactnativekeyboardinput;

import android.app.Activity;
import android.content.Context;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;

import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.PixelUtil;

import java.lang.ref.WeakReference;

public class CustomKeyboardScreen {

    private final ViewTreeObserver.OnGlobalLayoutListener mInitialLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            initGloballyVisibleHeight();
            initLocallyVisibleHeight();

            registerRuntimeLayoutListener();
        }
    };

    private final ViewTreeObserver.OnGlobalLayoutListener mRuntimeLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            int visibleHeight = getGloballyVisibleHeight();
            if (mLastVisibleHeight == visibleHeight) {
                return;
            }
            mLastVisibleHeight = visibleHeight;

            if (visibleHeight < mMaxVisibleHeight) {
                if (!mSoftKeyboardUp) {
                    clearKeyboardOverlayMode();
                }
                hideCustomKeyboardContent();
                refreshKeyboardHeight();
                mSoftKeyboardUp = true;
            } else {
                mSoftKeyboardUp = false;
            }

        }
    };

    private static final int DEFAULT_KEYBOARD_HEIGHT_DP = 100;
    private final int DEFAULT_KEYBOARD_HEIGHT_PX;

    private final ReactContext mReactContext;
    private final InputMethodManager mInputMethodManager;

    private int mLocallyVisibleHeight;
    private Integer mMaxVisibleHeight;
    private Integer mLastVisibleHeight;
    private boolean mSoftKeyboardUp;
    private Integer mKeyboardHeight;
    private boolean hasLayoutListeners;

    private WeakReference<CustomKeyboardRootViewShadow> mShadowNode;

    public CustomKeyboardScreen(ReactContext reactContext) {
        mReactContext = reactContext;
        mInputMethodManager = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);

        DEFAULT_KEYBOARD_HEIGHT_PX = (int) PixelUtil.toPixelFromDIP(DEFAULT_KEYBOARD_HEIGHT_DP);
    }

    public void onScreenContentCreated() {
        if (!hasLayoutListeners) {
            hasLayoutListeners = true;
            registerInitialLayoutListener();
        }
    }

    public void onScreenContentDestroyed() {
        removeAllLayoutListeners();
        hasLayoutListeners = false;
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

    private void initGloballyVisibleHeight() {
        mMaxVisibleHeight = getGloballyVisibleHeight();
        mLastVisibleHeight = mMaxVisibleHeight;
    }

    private void initLocallyVisibleHeight() {
        mLocallyVisibleHeight = getLocallyVisibleHeight();
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
        return mKeyboardHeight == null ? DEFAULT_KEYBOARD_HEIGHT_PX : mKeyboardHeight;
    }

    private int getLocallyVisibleHeight() {
        return getReactRootView().getHeight();
    }

    private int getGloballyVisibleHeight() {
        final Rect visibleArea = new Rect();
        getWindow().getDecorView().getWindowVisibleDisplayFrame(visibleArea);
        return visibleArea.height();
    }

    private void refreshKeyboardHeight() {
        if (mKeyboardHeight != null) {
            return;
        }

        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                final int locallyVisibleHeight = getLocallyVisibleHeight();
                if (mLocallyVisibleHeight != locallyVisibleHeight) {
                    mKeyboardHeight = mLocallyVisibleHeight - getLocallyVisibleHeight();
                }
            }
        });
    }

    private void setKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
    }

    private void clearKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    }

    private void registerInitialLayoutListener() {
        final ViewTreeObserver viewTreeObserver = getReactRootView().getViewTreeObserver();
        viewTreeObserver.addOnGlobalLayoutListener(mInitialLayoutListener);
    }

    private void registerRuntimeLayoutListener() {
        final ViewTreeObserver viewTreeObserver = getReactRootView().getViewTreeObserver();
        viewTreeObserver.removeOnGlobalLayoutListener(mInitialLayoutListener);
        viewTreeObserver.addOnGlobalLayoutListener(mRuntimeLayoutListener);
    }

    private void removeAllLayoutListeners() {
        final ViewTreeObserver viewTreeObserver = getReactRootView().getViewTreeObserver();
        viewTreeObserver.removeOnGlobalLayoutListener(mInitialLayoutListener);
        viewTreeObserver.removeOnGlobalLayoutListener(mRuntimeLayoutListener);
    }

    private Window getWindow() {
        return getCurrentActivity().getWindow();
    }

    private View getReactRootView() {
        return ViewUtils.findChildByClass((ViewGroup) getCurrentActivity().getWindow().getDecorView(), ReactRootView.class);
    }

    private Activity getCurrentActivity() {
        return mReactContext.getCurrentActivity();
    }

    private void runOnUIThread(Runnable runnable) {
        mReactContext.runOnUiQueueThread(runnable);
    }
}
