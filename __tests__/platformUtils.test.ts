/**
 * Platform Utilities Tests
 */

import {Platform} from 'react-native';
import {
  getPlatformInfo,
  isMobile,
  isDesktop,
  isAndroid,
  isIOS,
  isWindows,
  isMacOS,
  selectPlatform,
  getCameraPermissionMessage,
  isCameraAvailable,
  getPlatformDisplayName,
} from '../src/utils/platformUtils';

describe('Platform Utilities', () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    // Restore original platform
    Object.defineProperty(Platform, 'OS', {
      value: originalPlatform,
      writable: true,
    });
  });

  describe('getPlatformInfo', () => {
    it('should return correct info for Android', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });

      const info = getPlatformInfo();
      expect(info.isAndroid).toBe(true);
      expect(info.isMobile).toBe(true);
      expect(info.isDesktop).toBe(false);
      expect(info.isNative).toBe(true);
      expect(info.platformName).toBe('android');
    });

    it('should return correct info for iOS', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });

      const info = getPlatformInfo();
      expect(info.isIOS).toBe(true);
      expect(info.isMobile).toBe(true);
      expect(info.isDesktop).toBe(false);
      expect(info.isNative).toBe(true);
      expect(info.platformName).toBe('ios');
    });

    it('should return correct info for Windows', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });

      const info = getPlatformInfo();
      expect(info.isWindows).toBe(true);
      expect(info.isDesktop).toBe(true);
      expect(info.isMobile).toBe(false);
      expect(info.isNative).toBe(true);
      expect(info.platformName).toBe('windows');
    });

    it('should return correct info for macOS', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'macos',
        writable: true,
      });

      const info = getPlatformInfo();
      expect(info.isMacOS).toBe(true);
      expect(info.isDesktop).toBe(true);
      expect(info.isMobile).toBe(false);
      expect(info.isNative).toBe(true);
      expect(info.platformName).toBe('macos');
    });
  });

  describe('isMobile', () => {
    it('should return true for Android', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });
      expect(isMobile()).toBe(true);
    });

    it('should return true for iOS', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });
      expect(isMobile()).toBe(true);
    });

    it('should return false for Windows', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });
      expect(isMobile()).toBe(false);
    });

    it('should return false for macOS', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'macos',
        writable: true,
      });
      expect(isMobile()).toBe(false);
    });
  });

  describe('isDesktop', () => {
    it('should return false for Android', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });
      expect(isDesktop()).toBe(false);
    });

    it('should return false for iOS', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });
      expect(isDesktop()).toBe(false);
    });

    it('should return true for Windows', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });
      expect(isDesktop()).toBe(true);
    });

    it('should return true for macOS', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'macos',
        writable: true,
      });
      expect(isDesktop()).toBe(true);
    });
  });

  describe('Platform-specific checks', () => {
    it('isAndroid should work correctly', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });
      expect(isAndroid()).toBe(true);
      expect(isIOS()).toBe(false);
    });

    it('isIOS should work correctly', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });
      expect(isIOS()).toBe(true);
      expect(isAndroid()).toBe(false);
    });

    it('isWindows should work correctly', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });
      expect(isWindows()).toBe(true);
      expect(isMacOS()).toBe(false);
    });

    it('isMacOS should work correctly', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'macos',
        writable: true,
      });
      expect(isMacOS()).toBe(true);
      expect(isWindows()).toBe(false);
    });
  });

  describe('selectPlatform', () => {
    it('should select Android-specific value', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });

      const result = selectPlatform({
        android: 'android-value',
        ios: 'ios-value',
        default: 'default-value',
      });

      expect(result).toBe('android-value');
    });

    it('should select iOS-specific value', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });

      const result = selectPlatform({
        android: 'android-value',
        ios: 'ios-value',
        default: 'default-value',
      });

      expect(result).toBe('ios-value');
    });

    it('should select Windows-specific value', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });

      const result = selectPlatform({
        windows: 'windows-value',
        macos: 'macos-value',
        default: 'default-value',
      });

      expect(result).toBe('windows-value');
    });

    it('should select macOS-specific value', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'macos',
        writable: true,
      });

      const result = selectPlatform({
        windows: 'windows-value',
        macos: 'macos-value',
        default: 'default-value',
      });

      expect(result).toBe('macos-value');
    });

    it('should select mobile-specific value', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });

      const result = selectPlatform({
        mobile: 'mobile-value',
        desktop: 'desktop-value',
        default: 'default-value',
      });

      expect(result).toBe('mobile-value');
    });

    it('should select desktop-specific value', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });

      const result = selectPlatform({
        mobile: 'mobile-value',
        desktop: 'desktop-value',
        default: 'default-value',
      });

      expect(result).toBe('desktop-value');
    });

    it('should fallback to default value', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });

      const result = selectPlatform({
        android: 'android-value',
        ios: 'ios-value',
        default: 'default-value',
      });

      expect(result).toBe('default-value');
    });
  });

  describe('getCameraPermissionMessage', () => {
    it('should return appropriate message for Android', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });

      const message = getCameraPermissionMessage();
      expect(message).toContain('camera access');
      expect(message).toContain('AR-guided');
    });

    it('should return appropriate message for iOS', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });

      const message = getCameraPermissionMessage();
      expect(message).toContain('camera access');
      expect(message).toContain('AR-guided');
    });

    it('should return appropriate message for desktop', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });

      const message = getCameraPermissionMessage();
      expect(message).toContain('webcam access');
    });
  });

  describe('isCameraAvailable', () => {
    it('should return true for mobile platforms', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });
      expect(isCameraAvailable()).toBe(true);

      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });
      expect(isCameraAvailable()).toBe(true);
    });

    it('should return false for desktop platforms', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });
      expect(isCameraAvailable()).toBe(false);

      Object.defineProperty(Platform, 'OS', {
        value: 'macos',
        writable: true,
      });
      expect(isCameraAvailable()).toBe(false);
    });
  });

  describe('getPlatformDisplayName', () => {
    it('should return correct display names', () => {
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });
      expect(getPlatformDisplayName()).toBe('Android');

      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });
      expect(getPlatformDisplayName()).toBe('iOS');

      Object.defineProperty(Platform, 'OS', {
        value: 'windows',
        writable: true,
      });
      expect(getPlatformDisplayName()).toBe('Windows');

      Object.defineProperty(Platform, 'OS', {
        value: 'macos',
        writable: true,
      });
      expect(getPlatformDisplayName()).toBe('macOS');
    });
  });
});
