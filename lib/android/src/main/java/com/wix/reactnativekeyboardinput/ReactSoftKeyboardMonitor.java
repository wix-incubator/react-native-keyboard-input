package com.wix.reactnativekeyboardinput;

import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.view.ViewTreeObserver;

import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;

import static com.wix.reactnativekeyboardinput.ViewUtils.getReactRootView;
import static com.wix.reactnativekeyboardinput.ViewUtils.getWindow;

public class ReactSoftKeyboardMonitor implements LifecycleEventListener {

    public interface Listener {
        void onSoftKeyboardVisible(boolean distinct);
    }

    private final ViewTreeObserver.OnGlobalLayoutListener mWindowLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            initGloballyVisibleHeight();
            ReactRootView reactRootView = getReactRootView();
            if (mLastReactRootView == reactRootView) {
                return;
            }

            removeInnerLayoutListener();
            mLastReactRootView = reactRootView;
            if (mLastReactRootView != null) { // This is applicable when running a react reload in dev mode
                registerInnerLayoutListener();

                initGloballyVisibleHeight(); // TODO: running this each time might be redundant
                initLocallyVisibleHeight();
            }
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

    private Listener mExternalListener;

    private ReactRootView mLastReactRootView;
    private int mLocallyVisibleHeight;
    private int mMaxVisibleHeight;
    private int mLastVisibleHeight;
    private boolean mSoftKeyboardUp;
    private Integer mKeyboardHeight;
    private boolean hasLayoutListeners;

    public ReactSoftKeyboardMonitor(ReactContext reactContext) {
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public void onHostResume() {
        if (!hasLayoutListeners) {
            hasLayoutListeners = true;
            registerWindowLayoutListener();
        }
    }

    @Override
    public void onHostDestroy() {
        removeAllLayoutListeners();
        hasLayoutListeners = false;
    }

    @Override
    public void onHostPause() {
    }

    public void setListener(Listener listener) {
        mExternalListener = listener;
    }

    @Nullable
    public Integer getLastKnownKeyboardHeight() {
        return mKeyboardHeight;
    }

    private void registerWindowLayoutListener() {
        getWindow().getDecorView().getViewTreeObserver().addOnGlobalLayoutListener(mWindowLayoutListener);
    }

    private void registerInnerLayoutListener() {
        final ViewTreeObserver viewTreeObserver = mLastReactRootView.getViewTreeObserver();
        viewTreeObserver.addOnGlobalLayoutListener(mRuntimeLayoutListener);
    }

    private void removeInnerLayoutListener() {
        if (mLastReactRootView != null) {
            final ViewTreeObserver viewTreeObserver = mLastReactRootView.getViewTreeObserver();
            viewTreeObserver.removeOnGlobalLayoutListener(mRuntimeLayoutListener);
        }
    }

    private void removeAllLayoutListeners() {
        getWindow().getDecorView().getViewTreeObserver().removeOnGlobalLayoutListener(mWindowLayoutListener);

        final ViewTreeObserver viewTreeObserver = getReactRootView().getViewTreeObserver();
        viewTreeObserver.removeOnGlobalLayoutListener(mRuntimeLayoutListener);
    }

    private void initGloballyVisibleHeight() {
        mMaxVisibleHeight = getGloballyVisibleHeight();
        mLastVisibleHeight = mMaxVisibleHeight;
    }

    private void initLocallyVisibleHeight() {
        mLocallyVisibleHeight = getLocallyVisibleHeight();
        mKeyboardHeight = null; // Reset so the keyboard would be measure on the next opportunity.
    }

    private void refreshKeyboardHeight() {
        if (mKeyboardHeight != null) {
            return;
        }

        RuntimeUtils.runOnUIThread(new Runnable() {
            @Override
            public void run() {
                final int locallyVisibleHeight = getLocallyVisibleHeight();
                if (mLocallyVisibleHeight > locallyVisibleHeight) {
                    mKeyboardHeight = mLocallyVisibleHeight - locallyVisibleHeight;
                }
            }
        });
    }

    private int getGloballyVisibleHeight() {
        final Rect visibleArea = new Rect();
        getWindow().getDecorView().getWindowVisibleDisplayFrame(visibleArea);
        return visibleArea.height();
    }

    private int getLocallyVisibleHeight() {
        return mLastReactRootView.getHeight();
    }
}
