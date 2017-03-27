import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Platform, Dimensions, NativeModules, NativeEventEmitter} from 'react-native';
import {KeyboardTrackingView} from 'react-native-keyboard-tracking-view';
import CustomKeyboardView from './CustomKeyboardView';

const IsIOS = Platform.OS === 'ios';
const ScreenSize = Dimensions.get('window');

export default class KeyboardAccessoryView extends Component {
  static propTypes = {
    renderContent: PropTypes.func,
    trackInteractive: PropTypes.bool,
    onHeightChanged: React.PropTypes.func,
    kbInputRef: React.PropTypes.object,
    kbComponent: React.PropTypes.string,
    kbInitialProps: React.PropTypes.object,
    onItemSelected: React.PropTypes.func,
    onRequestShowKeyboard: React.PropTypes.func,
    onIOSKeyboardResigned: React.PropTypes.func,
  };
  static defaultProps = {
    trackInteractive: false,
  }

  constructor(props) {
    super(props);

    this.onContainerComponentHeightChanged = this.onContainerComponentHeightChanged.bind(this);

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

  render() {
    const ContainerComponent = (IsIOS && KeyboardTrackingView) ? KeyboardTrackingView : View;
    return (
      <ContainerComponent
        style={styles.trackingToolbarContainer}
        onLayout={this.onContainerComponentHeightChanged}
        trackInteractive={this.props.trackInteractive}
      >
        {this.props.renderContent && this.props.renderContent()}
        <CustomKeyboardView
          inputRef={this.props.kbInputRef}
          component={this.props.kbComponent}
          initialProps={this.props.kbInitialProps}
          onItemSelected={this.props.onItemSelected}
          onRequestShowKeyboard={this.props.onRequestShowKeyboard}
        />
      </ContainerComponent>
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
