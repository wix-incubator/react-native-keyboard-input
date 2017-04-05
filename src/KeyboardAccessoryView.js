import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Platform, Dimensions, NativeModules, NativeEventEmitter, processColor} from 'react-native';
import {KeyboardTrackingView} from 'react-native-keyboard-tracking-view';
import CustomKeyboardView from './CustomKeyboardView';

const IsIOS = Platform.OS === 'ios';
const ScreenSize = Dimensions.get('window');

export default class KeyboardAccessoryView extends Component {
  static propTypes = {
    renderContent: PropTypes.func,
    onHeightChanged: React.PropTypes.func,
    kbInputRef: React.PropTypes.object,
    kbComponent: React.PropTypes.string,
    kbInitialProps: React.PropTypes.object,
    onItemSelected: React.PropTypes.func,
    onRequestShowKeyboard: React.PropTypes.func,
    onIOSKeyboardResigned: React.PropTypes.func,
    iOSScrollBehavior: React.PropTypes.string
  };
  static defaultProps = {
    iOSScrollBehavior: null
  };

  constructor(props) {
    super(props);

    this.onContainerComponentHeightChanged = this.onContainerComponentHeightChanged.bind(this);
    this.processInitialProps = this.processInitialProps.bind(this);

    if(IsIOS && NativeModules.CustomInputController) {
      const CustomInputControllerEvents = new NativeEventEmitter(NativeModules.CustomInputController);
      this.customInputControllerEventsSubscriber = CustomInputControllerEvents.addListener('keyboardResigned', (params) => {
        if(this.props.onIOSKeyboardResigned) {
          this.props.onIOSKeyboardResigned();
        }
      });
    }
  }

  componentWillUnmount() {
    if(this.customInputControllerEventsSubscriber) {
      this.customInputControllerEventsSubscriber.remove();
    }
  }

  onContainerComponentHeightChanged(event) {
    if (this.props.onHeightChanged) {
       this.props.onHeightChanged(event.nativeEvent.layout.height)
    }
  }

  getIOSTrackingScrollBehavior() {
    let scrollBehavior = this.props.iOSScrollBehavior;
    if(IsIOS && NativeModules.KeyboardTrackingViewManager && scrollBehavior === null) {
      scrollBehavior = NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorFixedOffset;
    }
    return scrollBehavior;
  }

  processInitialProps() {
    const processedProps = this.props.kbInitialProps;
    if(IsIOS && processedProps && processedProps.backgroundColor) {
      processedProps.backgroundColor = processColor(processedProps.backgroundColor);
    }
    return processedProps;
  }

  render() {
    return (
      <KeyboardTrackingView
        style={styles.trackingToolbarContainer}
        onLayout={this.onContainerComponentHeightChanged}
        scrollBehavior={this.getIOSTrackingScrollBehavior()}
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
      }
    })
  },
});
