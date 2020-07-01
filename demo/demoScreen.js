import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';
import {KeyboardRegistry} from 'react-native-keyboard-input';
import {_} from 'lodash';

import './demoKeyboards';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

export default class KeyboardInput extends Component {
  static propTypes = {
    message: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
    this.resetKeyboardView = this.resetKeyboardView.bind(this);
    this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
    this.showLastKeyboard = this.showLastKeyboard.bind(this);
    this.isCustomKeyboardOpen = this.isCustomKeyboardOpen.bind(this);

    this.state = {
      lastOpenedKeyboard: {
        component: undefined,
        initialProps: undefined,
      },
      customKeyboard: {
        component: undefined,
        initialProps: undefined,
      },
      receivedKeyboardData: undefined,
      useSafeArea: true,
      keyboardOpenState: false,
    };
  }

  onKeyboardItemSelected(keyboardId, params) {
    const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(params)}`;
    this.setState({receivedKeyboardData});
  }

  onKeyboardResigned() {
    this.setState({keyboardOpenState: false});
    this.resetKeyboardView();
  }

  getToolbarButtons() {
    return [
      {
        text: 'show1',
        testID: 'show1',
        onPress: () => this.showKeyboardView('KeyboardView', 'FIRST - 1 (passed prop)'),
      },
      {
        text: 'show2',
        testID: 'show2',
        onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2 (passed prop)'),
      },
      {
        text: 'reset',
        testID: 'reset',
        onPress: () => this.resetKeyboardView(),
      },
    ];
  }

  resetKeyboardView() {
    this.setState({customKeyboard: {}});
  }

  showKeyboardView(component, title) {
    this.setState({
      keyboardOpenState: true,
      customKeyboard: {
        component,
        initialProps: {title},
      },
      lastOpenedKeyboard: {
        component,
        initialProps: {title},
      }
    });
  }

  showLastKeyboard() {
    const {lastOpenedKeyboard} = this.state;
    this.setState({
      keyboardOpenState: true,
      customKeyboard: lastOpenedKeyboard,
    });
  }

  isCustomKeyboardOpen = () => {
    const {keyboardOpenState, customKeyboard} = this.state;
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  }

  toggleUseSafeArea = () => {
    const {useSafeArea} = this.state;
    this.setState({
      useSafeArea: !useSafeArea,
    });

    if (this.isCustomKeyboardOpen()) {
      setTimeout(() => {
        this.showLastKeyboard();
      }, 500);
    }
  }

  safeAreaSwitchToggle = () => {
    const {useSafeArea} = this.state;
    return (
      <View style={styles.safeAreaSwitchContainer}>
        <Text>Safe Area Enabled:</Text>
        <Switch style={styles.switch} value={useSafeArea} onValueChange={this.toggleUseSafeArea}/>
        <View style={{margin: 15}}>
          <Text>Keyboard Open: {this.state.keyboardOpenState ? 'true' : 'false'}</Text>
        </View>
      </View>
    );
  }

  keyboardAccessoryViewContent() {
    return (
      <View style={styles.keyboardContainer}>
        <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
        <View style={styles.inputContainer}>
          <AutoGrowingTextInput
            maxHeight={200}
            style={styles.textInput}
            ref={(r) => {
              this.textInputRef = r;
            }}
            placeholder={'Message'}
            underlineColorAndroid="transparent"
            onFocus={() => this.resetKeyboardView()}
            testID={'input'}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => KeyboardUtils.dismiss()}>
            <Text>Action</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          {
            this.getToolbarButtons().map((button, index) =>
              <TouchableOpacity
                onPress={button.onPress}
                style={{paddingLeft: 15, paddingBottom: 10}}
                key={index}
                testID={button.testID}
              >
                <Text>{button.text}</Text>
              </TouchableOpacity>)
          }
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
        >
          <Text style={styles.welcome}>{this.props.message ? this.props.message : 'Keyboards example'}</Text>
          <Text testID={'demo-message'}>{this.state.receivedKeyboardData}</Text>
          { this.safeAreaSwitchToggle() }
        </ScrollView>

        <KeyboardAccessoryView
          key={this.state.useSafeArea}
          renderContent={this.keyboardAccessoryViewContent}
          onHeightChanged={height => this.setState({keyboardAccessoryViewHeight: IsIOS ? height : undefined})}
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          kbComponent={this.state.customKeyboard.component}
          kbInitialProps={this.state.customKeyboard.initialProps}
          onItemSelected={this.onKeyboardItemSelected}
          onKeyboardResigned={this.onKeyboardResigned}
          revealKeyboardInteractive
          useSafeArea={this.state.useSafeArea}
        />
      </View>
    );
  }
}

const COLOR = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR,
  },
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  keyboardContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: COLOR,
      },
    }),
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  switch: {
    marginLeft: 15,
  },
  safeAreaSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
