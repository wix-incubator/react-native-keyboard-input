import {AppRegistry, View} from 'react-native';
import React from 'react';
import KeyboardRegistry from './KeyboardsRegistry';

describe('KeyboardRegistry - components', () => {
  const mockComponent = 'test_component';
  const MockElement = React.createElement(View, [], ['Hello world']);
  const mockGenerator = () => MockElement;

  beforeEach(() => {
    AppRegistry.registerComponent = jest.fn(AppRegistry.registerComponent);
    console.error = jest.fn();
  });

  it('should register the component in the keyboard registry', () => {
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator);
    expect(KeyboardRegistry.getKeyboard(mockComponent)).toEqual(MockElement);
  });

  it('should register the component in the App Registry as well', () => {
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator);

    expect(AppRegistry.registerComponent).toHaveBeenCalledTimes(1);
    expect(AppRegistry.registerComponent.mock.calls[0][0]).toEqual(mockComponent);
    expect(AppRegistry.registerComponent.mock.calls[0][1]).toEqual(mockGenerator);
  });

  it('should fail if generator is not provided and produce an error', () => {
    KeyboardRegistry.registerKeyboard(mockComponent);
    expect(AppRegistry.registerComponent).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should only allow to register a generator function and produce an error', () => {
    KeyboardRegistry.registerKeyboard(mockComponent, MockElement);
    expect(AppRegistry.registerComponent).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should produce an error if component was not and return undefined', () => {
    const res = KeyboardRegistry.getKeyboard('not_existing_component');
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(res).toBe(undefined);
  });

  it('should get all keyboards, id of the keyboard included as a param', () => {
    const mockParams = {icon: 5, title: 'mock title'};
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator, mockParams);
    const keyboards = KeyboardRegistry.getAllKeyboards();
    expect(keyboards).toEqual([{id: mockComponent, ...mockParams}]);
  });
});

describe('KeyboardRegistry - listeners', () => {
  const mockId = 'a_listener';
  const mockCallback = () => {};
  const mockArgs = {param1: '1', param2: '2'};

  beforeEach(() => {
    KeyboardRegistry.eventEmitter = {
      listenOn: jest.fn(),
      emitEvent: jest.fn(),
      removeListeners: jest.fn(),
    };
  });

  it('should listen', () => {
    KeyboardRegistry.addListener(mockId, mockCallback);
    expect(KeyboardRegistry.eventEmitter.listenOn).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.listenOn.mock.calls[0][0]).toEqual(mockId);
    expect(KeyboardRegistry.eventEmitter.listenOn.mock.calls[0][1]).toEqual(mockCallback);
  });

  it('should notify', () => {
    KeyboardRegistry.notifyListeners(mockId, mockArgs);
    expect(KeyboardRegistry.eventEmitter.emitEvent).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][0]).toEqual(mockId);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][1]).toEqual(mockArgs);
  });

  it('should remove', () => {
    KeyboardRegistry.removeListeners(mockId);
    expect(KeyboardRegistry.eventEmitter.removeListeners.mock.calls[0][0]).toEqual(mockId);
  });

  it('should notify when calling onItemSelected with dedicated onItemSelected id', () => {
    KeyboardRegistry.onItemSelected(mockId, mockArgs);
    expect(KeyboardRegistry.eventEmitter.emitEvent).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][0]).toEqual(`${mockId}.onItemSelected`);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][1]).toEqual(mockArgs);
  });

  it('should notify when calling requestShowKeyboard with the keyboard id', () => {
    KeyboardRegistry.requestShowKeyboard(mockId, mockArgs);
    expect(KeyboardRegistry.eventEmitter.emitEvent).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][0]).toEqual('onRequestShowKeyboard');
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][1]).toEqual({keyboardId: mockId});
  });
});
