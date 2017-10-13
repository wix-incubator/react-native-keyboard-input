import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Platform, Dimensions, NativeModules, NativeEventEmitter, DeviceEventEmitter, processColor} from 'react-native';
import {KeyboardTrackingView} from 'react-native-keyboard-tracking-view';
import CustomKeyboardView from './CustomKeyboardView';

const IsIOS = Platform.OS === 'ios';
const ScreenSize = Dimensions.get('window');

export default class KeyboardAccessoryView extends Component {
  static propTypes = {
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
  };
  static defaultProps = {
    iOSScrollBehavior: -1,
    revealKeyboardInteractive: false,
    manageScrollView: true,
    requiresSameParentToManageScrollView: false,
  };

  constructor(props) {
    super(props);

    this.onContainerComponentHeightChanged = this.onContainerComponentHeightChanged.bind(this);
    this.processInitialProps = this.processInitialProps.bind(this);
    this.registerForKeyboardResignedEvent = this.registerForKeyboardResignedEvent.bind(this);

    this.registerForKeyboardResignedEvent();
  }

  componentWillUnmount() {
    if (this.customInputControllerEventsSubscriber) {
      this.customInputControllerEventsSubscriber.remove();
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

  processInitialProps() {
    if (IsIOS && this.props.kbInitialProps && this.props.kbInitialProps.backgroundColor) {
      const processedProps = Object.assign({}, this.props.kbInitialProps);
      processedProps.backgroundColor = processColor(processedProps.backgroundColor);
      return processedProps;
    }
    return this.props.kbInitialProps;
  }

  render() {
    return (
      <KeyboardTrackingView
        style={styles.trackingToolbarContainer}
        onLayout={this.onContainerComponentHeightChanged}
        scrollBehavior={this.getIOSTrackingScrollBehavior()}
        revealKeyboardInteractive={this.props.revealKeyboardInteractive}
        manageScrollView={this.props.manageScrollView}
        requiresSameParentToManageScrollView={this.props.requiresSameParentToManageScrollView}
      >
        {this.props.renderContent && this.props.renderContent()}
        <CustomKeyboardView
          inputRef={this.props.kbInputRef}
          component={this.props.kbComponent}
          initialProps={this.processInitialProps()}
          onItemSelected={this.props.onItemSelected}
          onRequestShowKeyboard={this.props.onRequestShowKeyboard}
        />
      </KeyboardTrackingView>
    );
  }
}

const styles = StyleSheet.create({
  trackingToolbarContainer: {
    ...Platform.select({
      ios: {
        width: ScreenSize.width,
        position: 'absolute',
        bottom: 0,
        left: 0,
      },
    }),
  },
});
