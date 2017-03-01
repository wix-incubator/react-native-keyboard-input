import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import {KeyboardTrackingView} from 'react-native-keyboard-tracking-view';
import CustomKeyboardView from './CustomKeyboardView';

const IsIOS = Platform.OS === 'ios';
const ScreenSize = Dimensions.get('window');

const KeyboardToolbar = ({content, trackInteractive, onHeightChanged, kbInputRef, kbComponent, kbInitialProps}) => {
  const ContainerComponent = (IsIOS && KeyboardTrackingView) ? KeyboardTrackingView : View;
  return (
    <ContainerComponent
      style={styles.trackingToolbarContainer}
      onLayout={(event) => onHeightChanged && onHeightChanged(event.nativeEvent.layout.height)}
      trackInteractive={trackInteractive}
    >
      {content}
      <CustomKeyboardView inputRef={kbInputRef} component={kbComponent} initialProps={kbInitialProps}/>
    </ContainerComponent>
  );
}

KeyboardToolbar.propTypes = {
  content: PropTypes.element,
  trackInteractive: PropTypes.bool,
  onHeightChanged: React.PropTypes.func,
  kbInputRef: React.PropTypes.object,
  kbComponent: React.PropTypes.string,
  kbInitialProps: React.PropTypes.object,
};

KeyboardToolbar.defaultProps = {
  trackInteractive: false
};

const styles = StyleSheet.create({
  trackingToolbarContainer: {
    position: 'absolute',
      bottom: 0,
      left: 0,
      width: ScreenSize.width
  }
});

export default KeyboardToolbar;