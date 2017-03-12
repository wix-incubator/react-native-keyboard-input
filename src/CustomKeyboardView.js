import React, {Component, PropTypes} from 'react';
import {View, Platform, Dimensions, Keyboard, DeviceEventEmitter} from 'react-native';
import TextInputKeyboardManagerIOS from './TextInputKeyboardMangerIOS';
import TextInputKeyboardManagerAndroid from './TextInputKeyboardManagerAndroid';
import KeyboardRegistry from './KeyboardsRegistry';

const IsAndroid = Platform.OS === 'android';
const ScreenSize = Dimensions.get('window');

export default class CustomKeyboardView extends Component {
  static propTypes = {
    inputRef: PropTypes.object,
    initialProps: PropTypes.object,
    component: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      androidKeyboardHeight: 0,
      component: undefined,
      canShowAndroidKeyboardComponent: false
    };

    const {inputRef, component, initialProps} = props;
    if (TextInputKeyboardManagerIOS && inputRef && component) {
      TextInputKeyboardManagerIOS.setInputComponent(inputRef, {component, initialProps});
    }
  }

  componentWillMount() {
    if (IsAndroid) {
      this.keyboardEventListeners = [
        // Keyboard.addListener('keyboardDidShow', this.androidKeyboardDidShow.bind(this)),
      ];
      DeviceEventEmitter.addListener("customKeyboardModeEnded", this.onCustomKeyboardModeEnded.bind(this));
    }
  }

  componentWillReceiveProps(nextProps) {
    const {inputRef, component, initialProps} = nextProps;
    if (IsAndroid) {
      console.log("ASDASD", 'componentWillReceiveProps', component, this.state);
      if (component) {
        if (!this.state.canShowAndroidKeyboardComponent) {
          this.enterCustomKeyboardMode(component);
        }
      }
    } else if (TextInputKeyboardManagerIOS && inputRef && component !== this.props.component) {
      if (component) {
        TextInputKeyboardManagerIOS.setInputComponent(inputRef, {component, initialProps});
      } else {
        TextInputKeyboardManagerIOS.removeInputComponent(inputRef);
      }
    }
  }

  componentWillUnmount() {
    if (this.keyboardEventListeners) {
      this.keyboardEventListeners.forEach(eventListener => eventListener.remove());
    }
  }

  // androidKeyboardDidShow(event) {
  //   this.setState({canShowAndroidKeyboardComponent: false});
  //   const keyboardHeight = event.endCoordinates.height;
  //   if (this.state.androidKeyboardHeight !== keyboardHeight) {
  //     this.setState({androidKeyboardHeight: keyboardHeight});
  //   }
  // }

  async enterCustomKeyboardMode(component) {
    console.log("ASDASD", "enterCustomKeyboardMode-1 (enter)");
    await TextInputKeyboardManagerAndroid.enterCustomKeyboardMode();
    console.log("ASDASD", "enterCustomKeyboardMode-2");
    const androidKeyboardHeight = await TextInputKeyboardManagerAndroid.getKeyboardHeight();
    console.log("ASDASD", "enterCustomKeyboardMode-3", androidKeyboardHeight);
    this.setState({component, canShowAndroidKeyboardComponent: true, androidKeyboardHeight });
    console.log("ASDASD", "enterCustomKeyboardMode-4 (done)");
  }

  onCustomKeyboardModeEnded() {
    console.log("ASDASD", 'onCustomKeyboardModeEnded');
    this.setState({canShowAndroidKeyboardComponent: false});
  }

  render() {
    if (IsAndroid && this.state.component && this.state.canShowAndroidKeyboardComponent) {
      const KeyboardComponent = KeyboardRegistry.getComponent(this.props.component);
      return (
        <View style={{width: ScreenSize.width, height: this.state.androidKeyboardHeight}}>
          <KeyboardComponent {...this.props.initialProps}/>
        </View>
      );
    }
    return null;
  }
}
