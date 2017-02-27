//
//  RCTCustomKeyboardViewController.m
//
//  Created by Leo Natan (Wix) on 12/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomKeyboardViewController.h"

@implementation RCTCustomKeyboardViewController

- (instancetype)initWithRootView:(RCTRootView*)rootView
{
	self = [super init];
	
	if(self)
	{
		self.inputView = [[UIInputView alloc] initWithFrame:CGRectZero inputViewStyle:UIInputViewStyleKeyboard];
		
		rootView.translatesAutoresizingMaskIntoConstraints = NO;
		[self.view addSubview:rootView];
		
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
