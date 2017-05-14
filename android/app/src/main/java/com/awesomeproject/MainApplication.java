package com.awesomeproject;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.wix.reactnativekeyboardinput.KeyboardInputPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return Arrays.<ReactPackage>asList(
          new KeyboardInputPackage(MainApplication.this)
      );
  }
}
