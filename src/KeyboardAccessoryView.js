import React, {Component} from 'react';
import { View } from 'react-native'
import PropTypes from 'prop-types';
import {StyleSheet, Platform, NativeModules, NativeEventEmitter, DeviceEventEmitter, processColor, BackHandler} from 'react-native';
import CustomKeyboardView from './CustomKeyboardView';
import KeyboardUtils from './utils/KeyboardUtils';

const IsIOS = Platform.OS === 'ios';
const IsAndroid = Platform.OS === 'android';

export default class KeyboardAccessoryView extends Component {
  static propTypes = {
    // -------------------------------------------------------------------------
    // Following props has been added to make a custom keyboard show when it
    // has already been displayed, is hidden and is the last to have been dislpayed
    // See CustomKeyboardView's componentWillReceiveProps method
    isKeyBoardUp: this.propTypes.bool,
    tsToForceReceiveProps: PropTypes.number,
    // -------------------------------------------------------------------------
    renderContent: PropTypes.func,
    onHeightChanged: PropTypes.func,
    kbInputRef: PropTypes.object,
    kbComponent: PropTypes.string,
    kbInitialProps: PropTypes.object,
    onItemSelected: PropTypes.func,
    onRequestShowKeyboard: PropTypes.func,
    onKeyboardResigned: PropTypes.func,
    iOSScrollBehavior: PropTypes.number,
    revealKeyboardInteractive: PropTypes.bool,
    manageScrollView: PropTypes.bool,
    requiresSameParentToManageScrollView: PropTypes.bool,
    addBottomView: PropTypes.bool,
    allowHitsOutsideBounds: PropTypes.bool,
  };
  static defaultProps = {
    iOSScrollBehavior: -1,
    revealKeyboardInteractive: false,
    manageScrollView: true,
    requiresSameParentToManageScrollView: false,
    addBottomView: false,
    allowHitsOutsideBounds: false,
  };

  constructor(props) {
    super(props);

    this.onContainerComponentHeightChanged = this.onContainerComponentHeightChanged.bind(this);
    this.processInitialProps = this.processInitialProps.bind(this);
    this.registerForKeyboardResignedEvent = this.registerForKeyboardResignedEvent.bind(this);
    this.registerAndroidBackHandler = this.registerAndroidBackHandler.bind(this);
    this.onAndroidBackPressed = this.onAndroidBackPressed.bind(this);

    this.registerForKeyboardResignedEvent();
    this.registerAndroidBackHandler();
  }

  componentWillUnmount() {
    if (this.customInputControllerEventsSubscriber) {
      this.customInputControllerEventsSubscriber.remove();
    }
    if (IsAndroid) {
      BackHandler.removeEventListener('hardwareBackPress', this.onAndroidBackPressed);
    }
  }

  onContainerComponentHeightChanged(event) {
    if (this.props.onHeightChanged) {
      this.props.onHeightChanged(event.nativeEvent.layout.height);
    }
  }

  getIOSTrackingScrollBehavior() {
    let scrollBehavior = this.props.iOSScrollBehavior;
    if (IsIOS && NativeModules.KeyboardTrackingViewManager && scrollBehavior === -1) {
      scrollBehavior = NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorFixedOffset;
    }
    return scrollBehavior;
  }

  registerForKeyboardResignedEvent() {
    let eventEmitter = null;
    if (IsIOS) {
      if (NativeModules.CustomInputController) {
        eventEmitter = new NativeEventEmitter(NativeModules.CustomInputController);
      }
    } else {
      eventEmitter = DeviceEventEmitter;
    }

    if (eventEmitter !== null) {
      this.customInputControllerEventsSubscriber = eventEmitter.addListener('kbdResigned', () => {
        if (this.props.onKeyboardResigned) {
          this.props.onKeyboardResigned();
        }
      });
    }
  }

  registerAndroidBackHandler() {
    if (IsAndroid) {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPressed);
    }
  }

  onAndroidBackPressed() {
    if (this.props.kbComponent) {
      KeyboardUtils.dismiss();
      return true;
    }
    return false;
  }

  processInitialProps() {
    if (IsIOS && this.props.kbInitialProps && this.props.kbInitialProps.backgroundColor) {
      const processedProps = Object.assign({}, this.props.kbInitialProps);
      processedProps.backgroundColor = processColor(processedProps.backgroundColor);
      return processedProps;
    }
    return this.props.kbInitialProps;
  }

  async getNativeProps() {
    if (this.trackingViewRef) {
      return await this.trackingViewRef.getNativeProps();
    }
    return {};
  }

  scrollToStart() {
    if (this.trackingViewRef) {
      this.trackingViewRef.scrollToStart();
    }
  }

  render() {
    return (
      <View
        ref={r => this.trackingViewRef = r}
        style={styles.trackingToolbarContainer}
        onLayout={this.onContainerComponentHeightChanged}
        scrollBehavior={this.getIOSTrackingScrollBehavior()}
        revealKeyboardInteractive={this.props.revealKeyboardInteractive}
        manageScrollView={this.props.manageScrollView}
        requiresSameParentToManageScrollView={this.props.requiresSameParentToManageScrollView}
        addBottomView={this.props.addBottomView}
        allowHitsOutsideBounds={this.props.allowHitsOutsideBounds}
      >
        {this.props.renderContent && this.props.renderContent()}
        <CustomKeyboardView
          isKeyBoardUp={this.props.isKeyBoardUp}
          tsToForceReceiveProps={this.props.tsToForceReceiveProps}
          inputRef={this.props.kbInputRef}
          component={this.props.kbComponent}
          initialProps={this.processInitialProps()}
          onItemSelected={this.props.onItemSelected}
          onRequestShowKeyboard={this.props.onRequestShowKeyboard}
        />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  trackingToolbarContainer: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
    }),
  },
});
