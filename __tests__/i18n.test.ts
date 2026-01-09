import {i18n, useTranslation} from '../src/i18n';
import {en} from '../src/i18n/en';
import {es} from '../src/i18n/es';

describe('I18n Service', () => {
  beforeEach(() => {
    // Reset to default locale before each test
    i18n.setLocale('en');
  });

  describe('Locale Management', () => {
    it('should start with English as default locale', () => {
      expect(i18n.getLocale()).toBe('en');
    });

    it('should switch to Spanish locale', () => {
      i18n.setLocale('es');
      expect(i18n.getLocale()).toBe('es');
    });

    it('should fall back to English for invalid locale', () => {
      i18n.setLocale('fr' as any);
      expect(i18n.getLocale()).toBe('en');
    });

    it('should return available locales', () => {
      const locales = i18n.getAvailableLocales();
      expect(locales).toContain('en');
      expect(locales).toContain('es');
      expect(locales.length).toBe(2);
    });

    it('should get locale display names', () => {
      expect(i18n.getLocaleDisplayName('en')).toBe('English');
      expect(i18n.getLocaleDisplayName('es')).toBe('Español');
    });
  });

  describe('Translation Retrieval', () => {
    it('should get English translations', () => {
      const translation = i18n.getTranslation();
      expect(translation.home.title).toBe('Electronics Repair Assistant');
      expect(translation.common.ok).toBe('OK');
    });

    it('should get Spanish translations', () => {
      i18n.setLocale('es');
      const translation = i18n.getTranslation();
      expect(translation.home.title).toBe(
        'Asistente de Reparación Electrónica',
      );
      expect(translation.common.ok).toBe('Aceptar');
    });

    it('should get translation for specific locale', () => {
      const enTranslation = i18n.getTranslationForLocale('en');
      const esTranslation = i18n.getTranslationForLocale('es');

      expect(enTranslation.home.title).toBe('Electronics Repair Assistant');
      expect(esTranslation.home.title).toBe(
        'Asistente de Reparación Electrónica',
      );
    });
  });

  describe('Translation Keys (t function)', () => {
    it('should translate simple keys', () => {
      expect(i18n.t('common.ok')).toBe('OK');
      expect(i18n.t('common.cancel')).toBe('Cancel');
    });

    it('should translate nested keys', () => {
      expect(i18n.t('home.title')).toBe('Electronics Repair Assistant');
      expect(i18n.t('modes.inspection.title')).toBe('Inspection');
      expect(i18n.t('arCamera.title')).toBe('AR View');
    });

    it('should translate to Spanish', () => {
      i18n.setLocale('es');
      expect(i18n.t('common.ok')).toBe('Aceptar');
      expect(i18n.t('home.title')).toBe('Asistente de Reparación Electrónica');
      expect(i18n.t('modes.inspection.title')).toBe('Inspección');
    });

    it('should return key for missing translations', () => {
      const missingKey = 'nonexistent.key.path';
      expect(i18n.t(missingKey)).toBe(missingKey);
    });

    it('should return key for invalid path', () => {
      expect(i18n.t('home.nonexistent')).toBe('home.nonexistent');
    });
  });

  describe('Mode Translations', () => {
    it('should have all mode translations in English', () => {
      const translation = i18n.getTranslation();
      expect(translation.modes.inspection.title).toBe('Inspection');
      expect(translation.modes.measurement.title).toBe('Measurement');
      expect(translation.modes.repair.title).toBe('Repair');
      expect(translation.modes.creation.title).toBe('Creation');
      expect(translation.modes.validation.title).toBe('Validation');
    });

    it('should have all mode translations in Spanish', () => {
      i18n.setLocale('es');
      const translation = i18n.getTranslation();
      expect(translation.modes.inspection.title).toBe('Inspección');
      expect(translation.modes.measurement.title).toBe('Medición');
      expect(translation.modes.repair.title).toBe('Reparación');
      expect(translation.modes.creation.title).toBe('Creación');
      expect(translation.modes.validation.title).toBe('Validación');
    });

    it('should have mode descriptions', () => {
      const translation = i18n.getTranslation();
      expect(translation.modes.inspection.description).toBeDefined();
      expect(translation.modes.inspection.description.length).toBeGreaterThan(
        0,
      );
    });

    it('should have short labels for all modes', () => {
      const translation = i18n.getTranslation();
      expect(translation.modes.inspection.shortLabel).toBe('Inspect');
      expect(translation.modes.measurement.shortLabel).toBe('Measure');
      expect(translation.modes.repair.shortLabel).toBe('Repair');
      expect(translation.modes.creation.shortLabel).toBe('Create');
      expect(translation.modes.validation.shortLabel).toBe('Validate');
    });
  });

  describe('Component Translations', () => {
    it('should translate component types in English', () => {
      const translation = i18n.getTranslation();
      expect(translation.components.resistor).toBe('Resistor');
      expect(translation.components.capacitor).toBe('Capacitor');
      expect(translation.components.microcontroller).toBe('Microcontroller');
    });

    it('should translate component types in Spanish', () => {
      i18n.setLocale('es');
      const translation = i18n.getTranslation();
      expect(translation.components.resistor).toBe('Resistor');
      expect(translation.components.capacitor).toBe('Capacitor');
      expect(translation.components.microcontroller).toBe('Microcontrolador');
    });
  });

  describe('Pin Type Translations', () => {
    it('should translate pin types in English', () => {
      const translation = i18n.getTranslation();
      expect(translation.pins.vcc).toBe('VCC (Power)');
      expect(translation.pins.gnd).toBe('GND (Ground)');
      expect(translation.pins.data).toBe('Data');
    });

    it('should translate pin types in Spanish', () => {
      i18n.setLocale('es');
      const translation = i18n.getTranslation();
      expect(translation.pins.vcc).toBe('VCC (Alimentación)');
      expect(translation.pins.gnd).toBe('GND (Tierra)');
      expect(translation.pins.data).toBe('Datos');
    });
  });

  describe('Measurement Translations', () => {
    it('should translate measurement terms', () => {
      expect(i18n.t('measurements.voltage')).toBe('Voltage');
      expect(i18n.t('measurements.expected')).toBe('Expected');
      expect(i18n.t('measurements.passed')).toBe('Passed');

      i18n.setLocale('es');
      expect(i18n.t('measurements.voltage')).toBe('Voltaje');
      expect(i18n.t('measurements.expected')).toBe('Esperado');
      expect(i18n.t('measurements.passed')).toBe('Aprobado');
    });
  });

  describe('Error Messages', () => {
    it('should have error messages in both languages', () => {
      expect(i18n.t('errors.generic')).toContain('error');

      i18n.setLocale('es');
      expect(i18n.t('errors.generic')).toContain('error');
    });

    it('should have specific error messages', () => {
      const translation = i18n.getTranslation();
      expect(translation.errors.networkError).toBeDefined();
      expect(translation.errors.permissionDenied).toBeDefined();
      expect(translation.errors.deviceNotSupported).toBeDefined();
    });
  });

  describe('useTranslation Hook', () => {
    it('should return translation utilities', () => {
      const {t, translation, locale, availableLocales} = useTranslation();

      expect(typeof t).toBe('function');
      expect(translation).toBeDefined();
      expect(locale).toBe('en');
      expect(availableLocales).toContain('en');
      expect(availableLocales).toContain('es');
    });

    it('should translate using hook', () => {
      const {t} = useTranslation();
      expect(t('common.ok')).toBe('OK');
      expect(t('home.title')).toBe('Electronics Repair Assistant');
    });

    it('should provide setLocale function', () => {
      const {setLocale, locale: initialLocale} = useTranslation();
      expect(initialLocale).toBe('en');

      setLocale('es');
      const {locale: newLocale} = useTranslation();
      expect(newLocale).toBe('es');
    });

    it('should provide getLocaleDisplayName function', () => {
      const {getLocaleDisplayName} = useTranslation();
      expect(getLocaleDisplayName('en')).toBe('English');
      expect(getLocaleDisplayName('es')).toBe('Español');
    });
  });

  describe('Translation Completeness', () => {
    it('English and Spanish translations should have same structure', () => {
      const enKeys = JSON.stringify(Object.keys(en));
      const esKeys = JSON.stringify(Object.keys(es));
      expect(enKeys).toBe(esKeys);
    });

    it('all common keys should be present in both languages', () => {
      const commonKeys = Object.keys(en.common);
      const esCommonKeys = Object.keys(es.common);
      expect(commonKeys).toEqual(esCommonKeys);
    });

    it('all mode keys should be present in both languages', () => {
      const enModeKeys = Object.keys(en.modes);
      const esModeKeys = Object.keys(es.modes);
      expect(enModeKeys).toEqual(esModeKeys);
    });
  });
});
