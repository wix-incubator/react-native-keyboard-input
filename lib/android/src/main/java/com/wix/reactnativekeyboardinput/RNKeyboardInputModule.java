package com.wix.reactnativekeyboardinput;

import android.content.Context;
import android.graphics.Rect;
import android.util.Log;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.PixelUtil;

import java.util.LinkedList;
import java.util.List;

public class RNKeyboardInputModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private final int DEFAULT_KEYBOARD_HEIGHT_DP = 100;
    private final int DEFAULT_KEYBOARD_HEIGHT_PX;

    private final InputMethodManager mInputMethodManager;

    private int mRootHeight;
    private Integer mMaxVisibleHeight;
    private Integer mLastVisibleHeight;
    private boolean mSoftKeyboardUp;
    private Integer mLastKeyboardHeight;

    private boolean hasLayoutListeners;

    private List<RNKeyboardViewGroup> mCustomViews = new LinkedList<>();

    private final OnGlobalLayoutListener mInitialLayoutListener = new OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {

            // TODO: Will this be called only after JS has loaded and root react-view completely inflated?

            mRootHeight = getReactRootView().getHeight();

            Rect visibleArea = new Rect();
            getWindow().getDecorView().getWindowVisibleDisplayFrame(visibleArea);
            mMaxVisibleHeight = visibleArea.height();
            mLastVisibleHeight = mMaxVisibleHeight;
            Log.e("HATUL", "Setting height for the 1st time: "+mMaxVisibleHeight);

            final ViewTreeObserver viewTreeObserver = getWindow().getDecorView().getViewTreeObserver();
            viewTreeObserver.removeOnGlobalLayoutListener(this);
            viewTreeObserver.addOnGlobalLayoutListener(mRuntimeLayoutListener);
        }
    };
    private final OnGlobalLayoutListener mRuntimeLayoutListener = new OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            Rect visibleArea = new Rect();
            getWindow().getDecorView().getWindowVisibleDisplayFrame(visibleArea);

            int visibleHeight = visibleArea.height();
            if (mLastVisibleHeight == visibleHeight) {
                return;
            }
            mLastVisibleHeight = visibleHeight;
            if (visibleHeight < mMaxVisibleHeight) {
                if (!mSoftKeyboardUp) {
//                    mCustomKeyboardContent.setVisibility(GONE);
                    getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
                }
                Log.e("HATUL", "visibleHeight="+visibleHeight + ", maxVisibleHeight="+mMaxVisibleHeight + ", kbdUp=false->TRUE");
                sendKeyboardHeightUpdate(0);
                mSoftKeyboardUp = true;
            } else {
                Log.e("HATUL", "visibleHeight="+visibleHeight + ", maxVisibleHeight="+mMaxVisibleHeight + ", kbdUp=true->FALSE");
                mSoftKeyboardUp = false;
            }

        }
    };

    public RNKeyboardInputModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mInputMethodManager = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);

        DEFAULT_KEYBOARD_HEIGHT_PX = (int) PixelUtil.toPixelFromDIP(DEFAULT_KEYBOARD_HEIGHT_DP);

        reactContext.addLifecycleEventListener(this);

    }

    @Override
    public String getName() {
        return "CustomKeyboardInput";
    }

    void attachCustomView(RNKeyboardViewGroup view) {
        mCustomViews.add(view);
    }

    void detachCustomView(RNKeyboardViewGroup view) {
        mCustomViews.remove(view);
    }

    @ReactMethod
    public void enterCustomKeyboardMode(final Promise promise) {
        Log.e("ASDASD", "enterCustomKeyboardMode (native)");
        refreshKeyboardHeight();

        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
                mInputMethodManager.hideSoftInputFromWindow(getCurrentActivity().getCurrentFocus().getWindowToken(), 0);
                sendKeyboardHeightUpdate(mLastKeyboardHeight == null ? DEFAULT_KEYBOARD_HEIGHT_PX : mLastKeyboardHeight);
                Log.e("ASDASD", "enterCustomKeyboardMode (native) completed");
                promise.resolve(null);
            }
        });
    }


//    @ReactMethod
//    public void getKeyboardHeight(Promise promise) {
//        Log.e("ASDASD", "getKeyboardHeight: "+mLastKeyboardHeight + " mKbdUp: "+mSoftKeyboardUp);
//        if (mSoftKeyboardUp) {
//            promise.resolve(0);
//        } else {
//            promise.resolve(mLastKeyboardHeight == null ? DEFAULT_KEYBOARD_HEIGHT_PX : mLastKeyboardHeight);
//        }
//    }

    private View getReactRootView() {
        return getCurrentActivity().getWindow().getDecorView();
    }

    private Window getWindow() {
        return getCurrentActivity().getWindow();
    }

    private void sendKeyboardHeightUpdate(final Integer height) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("customKeyboardHeightUpdated", height);
            }
        });
    }

    @Override
    public void onHostResume() {
        if (!hasLayoutListeners) {
            hasLayoutListeners = true;

            final ViewTreeObserver viewTreeObserver = getCurrentActivity().getWindow().getDecorView().getViewTreeObserver();
            viewTreeObserver.addOnGlobalLayoutListener(mInitialLayoutListener);
        }
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        final ViewTreeObserver viewTreeObserver = getCurrentActivity().getWindow().getDecorView().getViewTreeObserver();
        viewTreeObserver.removeOnGlobalLayoutListener(mInitialLayoutListener);
        viewTreeObserver.removeOnGlobalLayoutListener(mRuntimeLayoutListener);
        hasLayoutListeners = false;
    }

    private void refreshKeyboardHeight() {
        if (mLastKeyboardHeight == null) {
            if (mRootHeight != getReactRootView().getMeasuredHeight()) {
                mLastKeyboardHeight = mRootHeight - getReactRootView().getMeasuredHeight();
                for (RNKeyboardViewGroup view : mCustomViews) {
                    view.onHeightDetected(mLastKeyboardHeight);
                }
            }
        }
    }
}
