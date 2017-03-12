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

import static android.view.View.GONE;

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
                    sendEndCustomKeyboardMode();
                    getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
                }
                Log.e("HATUL", "visibleHeight="+visibleHeight + ", maxVisibleHeight="+mMaxVisibleHeight + ", kbdUp=false->TRUE");
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

    @ReactMethod
    public void enterCustomKeyboardMode(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
                mInputMethodManager.hideSoftInputFromWindow(getCurrentActivity().getCurrentFocus().getWindowToken(), 0);
                Log.e("ASDASD", "enterCustomKeyboardMode native completed");
                promise.resolve(null);
            }
        });
    }

    @ReactMethod
    public void getKeyboardHeight(Promise promise) {
        if (mLastKeyboardHeight == null) {
            if (mRootHeight != getReactRootView().getMeasuredHeight()) {
                mLastKeyboardHeight = mRootHeight - getReactRootView().getMeasuredHeight();
            }
        }
        Log.e("ASDASD", "getKeyboardHeight: "+mLastKeyboardHeight);
        promise.resolve(mLastKeyboardHeight == null ? DEFAULT_KEYBOARD_HEIGHT_PX : mLastKeyboardHeight);
    }

    private View getReactRootView() {
        return getCurrentActivity().getWindow().getDecorView();
    }

    private Window getWindow() {
        return getCurrentActivity().getWindow();
    }

    private void sendEndCustomKeyboardMode() {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("customKeyboardModeEnded", null);
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
}
