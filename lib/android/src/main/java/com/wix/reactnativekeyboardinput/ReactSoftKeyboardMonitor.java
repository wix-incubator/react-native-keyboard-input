package com.wix.reactnativekeyboardinput;

import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.view.ViewTreeObserver;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;

import static com.wix.reactnativekeyboardinput.ViewUtils.getReactRootView;
import static com.wix.reactnativekeyboardinput.ViewUtils.getWindow;

public class ReactSoftKeyboardMonitor implements LifecycleEventListener {

    public interface Listener {
        void onSoftKeyboardVisible(boolean distinct);
    }

    private final ViewTreeObserver.OnGlobalLayoutListener mInitialLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            initGloballyVisibleHeight();

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
                mExternalListener.onSoftKeyboardVisible(!mSoftKeyboardUp);
                refreshKeyboardHeight();
                mSoftKeyboardUp = true;
            } else {
                mSoftKeyboardUp = false;
            }
        }
    };

    private final ReactContext mReactContext;

    private Listener mExternalListener;

    private int mMaxVisibleHeight;
    private int mLastVisibleHeight;
    private boolean mSoftKeyboardUp;
    private Integer mKeyboardHeight;
    private boolean hasLayoutListeners;

    public ReactSoftKeyboardMonitor(ReactContext reactContext) {
        mReactContext = reactContext;

        mReactContext.addLifecycleEventListener(this);
    }

    @Override
    public void onHostResume() {
        if (!hasLayoutListeners) {
            hasLayoutListeners = true;
            registerInitialLayoutListener();
        }
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        removeAllLayoutListeners();
        hasLayoutListeners = false;
    }

    public void setListener(Listener listener) {
        mExternalListener = listener;
    }

    @Nullable
    public Integer getLastKnownKeyboardHeight() {
        return mKeyboardHeight;
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

    private void initGloballyVisibleHeight() {
        mMaxVisibleHeight = getGloballyVisibleHeight();
        mLastVisibleHeight = mMaxVisibleHeight;
    }

    private void refreshKeyboardHeight() {
        if (mKeyboardHeight != null) {
            return;
        }

        RuntimeUtils.runOnUIThread(new Runnable() {
            @Override
            public void run() {
                final int locallyVisibleHeight = getLocallyVisibleHeight();
                if (locallyVisibleHeight < mMaxVisibleHeight) {
                    mKeyboardHeight = mMaxVisibleHeight - getLocallyVisibleHeight();
                }
            }
        });
    }

    private int getLocallyVisibleHeight() {
        return getReactRootView().getHeight();
    }

    private int getGloballyVisibleHeight() {
        final Rect visibleArea = new Rect();
        getWindow().getDecorView().getWindowVisibleDisplayFrame(visibleArea);
        return visibleArea.height();
    }
}
