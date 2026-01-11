/**
 * Platform Utilities
 *
 * Helper functions for cross-platform compatibility across
 * Android, iOS, Windows, macOS, and Linux (via React Native for Web/Desktop)
 */

import {Platform} from 'react-native';

export interface PlatformInfo {
  isWeb: boolean;
  isNative: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWindows: boolean;
  isMacOS: boolean;
  isLinux: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  platformName: string;
  version?: string | number;
}

// Cache Linux detection result to avoid repeated navigator checks
let cachedIsLinux: boolean | null = null;

/**
 * Check if the app is running on Linux
 * Result is cached to avoid repeated DOM/navigator checks
 */
export const isLinux = (): boolean => {
  if (cachedIsLinux !== null) {
    return cachedIsLinux;
  }

  const OS = Platform.OS;
  if (OS !== 'web') {
    cachedIsLinux = false;
    return false;
  }

  try {
    cachedIsLinux =
      typeof navigator !== 'undefined' &&
      /Linux/i.test(navigator.userAgent) &&
      !/Android/i.test(navigator.userAgent);
  } catch (error) {
    // If navigator is not accessible, assume not Linux
    cachedIsLinux = false;
  }

  return cachedIsLinux;
};

/**
 * Get comprehensive platform information
 */
export const getPlatformInfo = (): PlatformInfo => {
  const OS = Platform.OS;

  const isWeb = OS === 'web';
  const isAndroidPlatform = OS === 'android';
  const isIOSPlatform = OS === 'ios';
  const isWindowsPlatform = OS === 'windows';
  const isMacOSPlatform = OS === 'macos';
  const isLinuxPlatform = isLinux();

  const isMobilePlatform = isAndroidPlatform || isIOSPlatform;
  const isDesktopPlatform =
    isWindowsPlatform || isMacOSPlatform || isLinuxPlatform;
  const isNative = !isWeb;

  return {
    isWeb,
    isNative,
    isAndroid: isAndroidPlatform,
    isIOS: isIOSPlatform,
    isWindows: isWindowsPlatform,
    isMacOS: isMacOSPlatform,
    isLinux: isLinuxPlatform,
    isDesktop: isDesktopPlatform,
    isMobile: isMobilePlatform,
    platformName: OS,
    version: Platform.Version,
  };
};

/**
 * Check if the app is running on a mobile device
 */
export const isMobile = (): boolean => {
  return Platform.OS === 'android' || Platform.OS === 'ios';
};

/**
 * Check if the app is running on a desktop platform
 */
export const isDesktop = (): boolean => {
  const OS = Platform.OS;
  return OS === 'windows' || OS === 'macos' || isLinux();
};

/**
 * Check if the app is running on Android
 */
export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

/**
 * Check if the app is running on iOS
 */
export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * Check if the app is running on Windows
 */
export const isWindows = (): boolean => {
  return Platform.OS === 'windows';
};

/**
 * Check if the app is running on macOS
 */
export const isMacOS = (): boolean => {
  return Platform.OS === 'macos';
};

/**
 * Get platform-specific styles or configurations
 */
export const selectPlatform = <T>(config: {
  android?: T;
  ios?: T;
  windows?: T;
  macos?: T;
  linux?: T;
  desktop?: T;
  mobile?: T;
  default: T;
}): T => {
  const platform = getPlatformInfo();

  if (config.android && platform.isAndroid) {
    return config.android;
  }
  if (config.ios && platform.isIOS) {
    return config.ios;
  }
  if (config.windows && platform.isWindows) {
    return config.windows;
  }
  if (config.macos && platform.isMacOS) {
    return config.macos;
  }
  if (config.linux && platform.isLinux) {
    return config.linux;
  }
  if (config.desktop && platform.isDesktop) {
    return config.desktop;
  }
  if (config.mobile && platform.isMobile) {
    return config.mobile;
  }

  return config.default;
};

/**
 * Get platform-specific camera permissions message
 */
export const getCameraPermissionMessage = (): string => {
  return selectPlatform({
    android:
      'This app requires camera access to provide AR-guided electronics repair assistance.',
    ios: 'This app requires camera access to provide AR-guided electronics repair assistance.',
    desktop:
      'This app requires webcam access to provide AR-guided electronics repair assistance.',
    default: 'Camera access is required for AR features.',
  });
};

/**
 * Check if camera/AR features are available on this platform
 */
export const isCameraAvailable = (): boolean => {
  // AR features work best on mobile devices
  // Desktop support would require webcam integration
  return isMobile();
};

/**
 * Get platform display name
 */
export const getPlatformDisplayName = (): string => {
  const platform = getPlatformInfo();

  if (platform.isAndroid) {
    return 'Android';
  }
  if (platform.isIOS) {
    return 'iOS';
  }
  if (platform.isWindows) {
    return 'Windows';
  }
  if (platform.isMacOS) {
    return 'macOS';
  }
  if (platform.isLinux) {
    return 'Linux';
  }

  return 'Unknown';
};
