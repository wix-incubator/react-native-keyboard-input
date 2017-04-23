//
//  RCTCustomKeyboardViewController.m
//
//  Created by Leo Natan (Wix) on 12/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomKeyboardViewController.h"

#if __has_include(<KeyboardTrackingView/ObservingInputAccessoryView.h>)
#import <KeyboardTrackingView/ObservingInputAccessoryView.h>
#endif


@implementation RCTCustomKeyboardViewController

- (instancetype)initWithRootView:(RCTRootView*)rootView
{
	self = [super init];
	
	if(self)
	{
		self.inputView = [[UIInputView alloc] initWithFrame:CGRectZero inputViewStyle:UIInputViewStyleKeyboard];

#if __has_include(<KeyboardTrackingView/ObservingInputAccessoryView.h>)
        CGFloat keyboardHeight = [ObservingInputAccessoryView sharedInstance].keyboardHeight;
        if (keyboardHeight > 0) {
            self.inputView.allowsSelfSizing = YES;
            [self.inputView.heightAnchor constraintEqualToConstant:keyboardHeight].active = YES;
        }
#endif
		rootView.translatesAutoresizingMaskIntoConstraints = NO;
		[self.inputView addSubview:rootView];
		
		[rootView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor].active = YES;
		[rootView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor].active = YES;
		[rootView.topAnchor constraintEqualToAnchor:self.view.topAnchor].active = YES;
		[rootView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;
		
		//!!!
		self.view.translatesAutoresizingMaskIntoConstraints = NO;
	}
	
	return self;
}

@end
