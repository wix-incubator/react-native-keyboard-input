//
//  RCTCustomInputController.m
//
//  Created by Leo Natan (Wix) on 13/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomInputController.h"
#import "RCTUIManager.h"
#import "RCTCustomKeyboardViewController.h"

@interface _WXInputHelperView : UIView

@property (nullable, nonatomic, readwrite, strong) UIInputViewController *inputViewController;

@end

@implementation _WXInputHelperView

- (BOOL)canBecomeFirstResponder
{
	return YES;
}

- (BOOL)resignFirstResponder
{
	BOOL rv = [super resignFirstResponder];

	[self removeFromSuperview];

	return rv;
}

@end


@implementation RCTCustomInputController

@synthesize bridge=_bridge;

- (dispatch_queue_t)methodQueue
{
	return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(CustomInputController)

RCT_EXPORT_METHOD(presentCustomInputComponent:(nonnull NSNumber*)inputFieldTag : (nonnull NSDictionary*)params)
{
	RCTBridge* bridge = [(RCTRootView*)[[UIApplication sharedApplication].delegate.window.rootViewController view] bridge];

	UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
	if([inputField isKindOfClass:[UITextField class]] == NO && [inputField isKindOfClass:[UITextView class]] == NO)
	{
		return;
	}

	RCTRootView* rv = [[RCTRootView alloc] initWithBridge:bridge moduleName:params[@"component"] initialProperties:params[@"initialProps"]];
	UIViewController* vc = [UIViewController new];
	vc.view = rv;

	RCTCustomKeyboardViewController* customKeyboardController = [[RCTCustomKeyboardViewController alloc] initWithRootView:rv];

	_WXInputHelperView* helperView = [[_WXInputHelperView alloc] initWithFrame:CGRectZero];
	helperView.backgroundColor = [UIColor clearColor];
	[inputField.superview addSubview:helperView];
	[inputField.superview sendSubviewToBack:helperView];

	helperView.inputViewController = customKeyboardController;
	[helperView reloadInputViews];
	[helperView becomeFirstResponder];
}

RCT_EXPORT_METHOD(resetInput:(nonnull NSNumber*)inputFieldTag)
{
	UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
	if([inputField isKindOfClass:[UITextField class]] == NO && [inputField isKindOfClass:[UITextView class]] == NO)
	{
		return;
	}

	if([inputField respondsToSelector:@selector(reactWillMakeFirstResponder)])
	{
		[inputField performSelector:@selector(reactWillMakeFirstResponder)];
	}
	[inputField becomeFirstResponder];
	if([inputField respondsToSelector:@selector(reactDidMakeFirstResponder)])
	{
		[inputField performSelector:@selector(reactDidMakeFirstResponder)];
	}
}

@end
