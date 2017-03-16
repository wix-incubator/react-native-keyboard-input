package com.wix.reactnativekeyboardinput;

import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.view.ViewTreeObserver;
import android.view.WindowManager;

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
            ReactRootView reactRootView = getReactRootView();
            if (mLastReactRootView == reactRootView) {
                return;
            }
            initKeyboardConfig(); // TODO: Fix this using a dedicated "screen monitor" class, reporting to both this monitor and the layout manager

            removeInnerLayoutListener();
            mLastReactRootView = reactRootView;
            if (mLastReactRootView != null) { // This is applicable when activity is going down (e.g. bundle reload in RN dev mode)
                registerInnerLayoutListener();

                initViewportVisibleHeight(); // TODO: running this each time might be redundant
                initLocallyVisibleHeight();
            }
        }
    };

    private final ViewTreeObserver.OnGlobalLayoutListener mInnerLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            Integer viewportVisibleHeight = getViewportVisibleHeight();
            if (viewportVisibleHeight.equals(mLastViewportVisibleHeight)) {
                return;
            }
            mLastViewportVisibleHeight = viewportVisibleHeight;

            if (viewportVisibleHeight < mMaxViewportVisibleHeight) {
                mExternalListener.onSoftKeyboardVisible(!mSoftKeyboardUp);
                refreshKeyboardHeight();
                mSoftKeyboardUp = true;
            } else {
                mSoftKeyboardUp = false;
            }
        }
    };

    private Listener mExternalListener;

    /** Monitor root react-view to detect root-view replacement, normally handled by a complete reinit (synonym with a screen replacement in RNN apps). */
    private ReactRootView mLastReactRootView;

    /**
     * Soft-keyboard appearance (yes or no) is deduced according to <b>view-port</b> (window-level display-frame), as
     * root-view height normally remains unaffected during immediate layout. We therefore keep the maximal view-port size so we could
     * concurrently compare heights in each layout.
     */
    private int mMaxViewportVisibleHeight;
    private Integer mLastViewportVisibleHeight;

    /**
     * Soft-keyboard *height* (when visible) is calculated deduced by the effect on the root react-view height. This is ineffective in trying to
     * monitor keyboard appearance -- only for height measuring.
     */
    private int mLocallyVisibleHeight;

    private boolean mSoftKeyboardUp;
    private Integer mKeyboardHeight;
    private boolean hasWindowLayoutListener;

    public ReactSoftKeyboardMonitor(ReactContext reactContext) {
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public void onHostResume() {
        if (!hasWindowLayoutListener) {
            hasWindowLayoutListener = true;
            registerWindowLayoutListener();
        }
    }

    @Override
    public void onHostDestroy() {
        removeAllLayoutListeners();
        hasWindowLayoutListener = false;
    }

    @Override
    public void onHostPause() {
    }

    public void setListener(Listener listener) {
        mExternalListener = listener;
    }

    @Nullable
    public Integer getKeyboardHeight() {
        if (mKeyboardHeight != null) {
            return mKeyboardHeight;
        }

        return (int) (.5f * mLocallyVisibleHeight);
    }

    private void registerWindowLayoutListener() {
        getWindow().getDecorView().getViewTreeObserver().addOnGlobalLayoutListener(mWindowLayoutListener);
    }

    private void registerInnerLayoutListener() {
        final ViewTreeObserver viewTreeObserver = mLastReactRootView.getViewTreeObserver();
        viewTreeObserver.addOnGlobalLayoutListener(mInnerLayoutListener);


    }

    private void removeInnerLayoutListener() {
        if (mLastReactRootView != null) {
            final ViewTreeObserver viewTreeObserver = mLastReactRootView.getViewTreeObserver();
            viewTreeObserver.removeOnGlobalLayoutListener(mInnerLayoutListener);
        }
    }

    private void removeAllLayoutListeners() {
        getWindow().getDecorView().getViewTreeObserver().removeOnGlobalLayoutListener(mWindowLayoutListener);

        final ViewTreeObserver viewTreeObserver = getReactRootView().getViewTreeObserver();
        viewTreeObserver.removeOnGlobalLayoutListener(mInnerLayoutListener);
    }

    private void initKeyboardConfig() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    }

    private void initViewportVisibleHeight() {
        mMaxViewportVisibleHeight = getViewportVisibleHeight();
        mLastViewportVisibleHeight = null;
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

    private int getViewportVisibleHeight() {
        final Rect visibleArea = new Rect();
        getWindow().getDecorView().getWindowVisibleDisplayFrame(visibleArea);
        return visibleArea.height();
    }

    private int getLocallyVisibleHeight() {
        return mLastReactRootView.getHeight();
    }
}
