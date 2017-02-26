//
//  RCTCustomInputController.m
//
//  Created by Leo Natan (Wix) on 13/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomInputController.h"
#import "WXInputViewControllerManager.h"
#import <React/RCTUIManager.h>
#import "RCTCustomKeyboardViewController.h"

@implementation RCTCustomInputController

@synthesize bridge=_bridge;

- (dispatch_queue_t)methodQueue
{
	return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(CustomInputController)

RCT_EXPORT_METHOD(presentCustomInputView:(nonnull NSNumber*)inputFieldTag : (nonnull NSString*)moduleName)
{
	RCTBridge* bridge = [(RCTRootView*)[[UIApplication sharedApplication].delegate.window.rootViewController view] bridge];
	
	UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
	if([inputField isKindOfClass:[UITextField class]] == NO && [inputField isKindOfClass:[UITextView class]] == NO)
	{
		return;
	}
	
	RCTRootView* rv = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"CustomInput" initialProperties:nil];
	UIViewController* vc = [UIViewController new];
	vc.view = rv;
	
	RCTCustomKeyboardViewController* customKeyboardController = [[RCTCustomKeyboardViewController alloc] initWithRootView:rv];
	[WXInputViewControllerManager presentInputViewController:customKeyboardController forTextField:(id)inputField];
}

@end
