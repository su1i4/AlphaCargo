#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h> // Import RCTRootView

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"AlphaCargo";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // --- ADD THE DELAY AND RCTRootView SETUP HERE ---
  NSURL *jsCodeLocation = [self bundleURL]; // Get the bundle URL

  // Add a small delay here (e.g., 0.1 seconds)
  [NSThread sleepForTimeInterval:1.5];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:self.moduleName
                                               initialProperties:self.initialProps
                                                   launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1]; // Or set to your desired background color


    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;


    if(!self.window) { //Important check added
        self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    }

    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];

  // --- END OF ADDED CODE ---

  return [super application:application didFinishLaunchingWithOptions:launchOptions]; // Call super *after* our setup
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end