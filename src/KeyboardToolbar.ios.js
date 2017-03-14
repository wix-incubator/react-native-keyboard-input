import React, {PropTypes} from 'react';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import {KeyboardTrackingView} from 'react-native-keyboard-tracking-view';
import CustomKeyboardView from './CustomKeyboardView';

const ScreenSize = Dimensions.get('window');

const KeyboardToolbar = ({renderContent, trackInteractive, onHeightChanged, kbInputRef, kbComponent, kbInitialProps}) => {
  return (
    <KeyboardTrackingView
      style={styles.trackingToolbarContainer}
      onLayout={event => onHeightChanged && onHeightChanged(event.nativeEvent.layout.height)}
      trackInteractive={trackInteractive}
    >
      {renderContent && renderContent()}
      <CustomKeyboardView inputRef={kbInputRef} component={kbComponent} initialProps={kbInitialProps}/>
    </KeyboardTrackingView>
  );
};

KeyboardToolbar.propTypes = {
  renderContent: PropTypes.func,
  trackInteractive: PropTypes.bool,
  onHeightChanged: React.PropTypes.func,
  kbInputRef: React.PropTypes.object,
  kbComponent: React.PropTypes.string,
  kbInitialProps: React.PropTypes.object,
};

KeyboardToolbar.defaultProps = {
  trackInteractive: false,
};

const styles = StyleSheet.create({
  trackingToolbarContainer: {
    width: ScreenSize.width,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default KeyboardToolbar;
