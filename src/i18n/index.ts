import {Translation} from './types';
import {en} from './en';
import {es} from './es';

export type Locale = 'en' | 'es';

const translations: Record<Locale, Translation> = {
  en,
  es,
};

/**
 * I18n service for managing translations
 */
class I18nService {
  private currentLocale: Locale = 'es';

  /**
   * Get current locale
   */
  getLocale(): Locale {
    return this.currentLocale;
  }

  /**
   * Set current locale
   */
  setLocale(locale: Locale): void {
    if (translations[locale]) {
      this.currentLocale = locale;
    } else {
      console.warn(`Locale ${locale} not found, falling back to 'en'`);
      this.currentLocale = 'en';
    }
  }

  /**
   * Get translation object for current locale
   */
  getTranslation(): Translation {
    return translations[this.currentLocale];
  }

  /**
   * Get translation object for specific locale
   */
  getTranslationForLocale(locale: Locale): Translation {
    return translations[locale] || translations.en;
  }

  /**
   * Get all available locales
   */
  getAvailableLocales(): Locale[] {
    return Object.keys(translations) as Locale[];
  }

  /**
   * Get locale display name
   */
  getLocaleDisplayName(locale: Locale): string {
    const displayNames: Record<Locale, string> = {
      en: 'English',
      es: 'Español',
    };
    return displayNames[locale] || locale;
  }

  /**
   * Translate a nested key path
   * Example: t('home.title') or t('modes.inspection.title')
   */
  t(key: string): string {
    const translation = this.getTranslation();
    const keys = key.split('.');
    let value: any = translation;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }
}

// Export singleton instance
export const i18n = new I18nService();

// Export hook for React components (can be enhanced with React Context later)
export const useTranslation = () => {
  const translation = i18n.getTranslation();
  const locale = i18n.getLocale();
  const setLocale = (newLocale: Locale) => i18n.setLocale(newLocale);
  const t = (key: string) => i18n.t(key);

  return {
    t,
    translation,
    locale,
    setLocale,
    availableLocales: i18n.getAvailableLocales(),
    getLocaleDisplayName: i18n.getLocaleDisplayName.bind(i18n),
  };
};

export default i18n;
