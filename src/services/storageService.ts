import AsyncStorage from '@react-native-async-storage/async-storage';
import {MeasurementLog, ValidationResult} from '../types';

const MEASUREMENT_LOGS_KEY = '@iaRealidad:measurementLogs';
const VALIDATION_RESULTS_KEY = '@iaRealidad:validationResults';
const SETTINGS_KEY = '@iaRealidad:settings';

/**
 * Storage service for measurement logs and validation results
 * Uses AsyncStorage for persistent local storage
 */
class StorageService {
  private measurementLogs: MeasurementLog[] = [];
  private validationResults: ValidationResult[] = [];
  private initialized: boolean = false;

  /**
   * Initialize storage and load existing data
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Load measurement logs
      const logsData = await AsyncStorage.getItem(MEASUREMENT_LOGS_KEY);
      if (logsData) {
        this.measurementLogs = JSON.parse(logsData);
      }

      // Load validation results
      const resultsData = await AsyncStorage.getItem(VALIDATION_RESULTS_KEY);
      if (resultsData) {
        this.validationResults = JSON.parse(resultsData);
      }

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize storage:', error);
    }
  }

  /**
   * Ensure storage is initialized before operations
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  /**
   * Save a measurement log entry
   */
  async saveMeasurementLog(log: MeasurementLog): Promise<void> {
    await this.ensureInitialized();
    this.measurementLogs.push(log);
    try {
      await AsyncStorage.setItem(
        MEASUREMENT_LOGS_KEY,
        JSON.stringify(this.measurementLogs),
      );
    } catch (error) {
      console.error('Failed to save measurement log:', error);
      throw error;
    }
  }

  /**
   * Get all measurement logs
   */
  async getMeasurementLogs(): Promise<MeasurementLog[]> {
    await this.ensureInitialized();
    return [...this.measurementLogs];
  }

  /**
   * Get measurement logs filtered by component ID
   */
  async getMeasurementLogsByComponent(
    componentId: string,
  ): Promise<MeasurementLog[]> {
    await this.ensureInitialized();
    return this.measurementLogs.filter(log => log.componentId === componentId);
  }

  /**
   * Get measurement logs filtered by date range
   */
  async getMeasurementLogsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<MeasurementLog[]> {
    await this.ensureInitialized();
    return this.measurementLogs.filter(
      log => log.timestamp >= startDate && log.timestamp <= endDate,
    );
  }

  /**
   * Save a validation result
   */
  async saveValidationResult(result: ValidationResult): Promise<void> {
    await this.ensureInitialized();
    this.validationResults.push(result);
    try {
      await AsyncStorage.setItem(
        VALIDATION_RESULTS_KEY,
        JSON.stringify(this.validationResults),
      );
    } catch (error) {
      console.error('Failed to save validation result:', error);
      throw error;
    }
  }

  /**
   * Get all validation results
   */
  async getValidationResults(): Promise<ValidationResult[]> {
    await this.ensureInitialized();
    return [...this.validationResults];
  }

  /**
   * Get validation results filtered by test ID
   */
  async getValidationResultsByTest(
    testId: string,
  ): Promise<ValidationResult[]> {
    await this.ensureInitialized();
    return this.validationResults.filter(result => result.testId === testId);
  }

  /**
   * Get recent validation results (last N results)
   */
  async getRecentValidationResults(
    limit: number = 10,
  ): Promise<ValidationResult[]> {
    await this.ensureInitialized();
    return this.validationResults
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, limit);
  }

  /**
   * Get validation statistics
   */
  async getValidationStatistics(): Promise<{
    totalTests: number;
    passedTests: number;
    failedTests: number;
    passRate: number;
  }> {
    await this.ensureInitialized();
    const totalTests = this.validationResults.length;
    const passedTests = this.validationResults.filter(
      result => result.passed,
    ).length;
    const failedTests = totalTests - passedTests;
    const passRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

    return {
      totalTests,
      passedTests,
      failedTests,
      passRate,
    };
  }

  /**
   * Clear all measurement logs
   */
  async clearMeasurementLogs(): Promise<void> {
    this.measurementLogs = [];
    try {
      await AsyncStorage.removeItem(MEASUREMENT_LOGS_KEY);
    } catch (error) {
      console.error('Failed to clear measurement logs:', error);
    }
  }

  /**
   * Clear all validation results
   */
  async clearValidationResults(): Promise<void> {
    this.validationResults = [];
    try {
      await AsyncStorage.removeItem(VALIDATION_RESULTS_KEY);
    } catch (error) {
      console.error('Failed to clear validation results:', error);
    }
  }

  /**
   * Clear all stored data
   */
  async clearAll(): Promise<void> {
    await this.clearMeasurementLogs();
    await this.clearValidationResults();
  }

  /**
   * Export logs as JSON string
   */
  async exportLogs(): Promise<string> {
    await this.ensureInitialized();
    return JSON.stringify(
      {
        measurementLogs: this.measurementLogs,
        validationResults: this.validationResults,
        exportedAt: new Date().toISOString(),
      },
      null,
      2,
    );
  }

  /**
   * Import logs from JSON string
   */
  async importLogs(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      if (data.measurementLogs) {
        this.measurementLogs = data.measurementLogs;
        await AsyncStorage.setItem(
          MEASUREMENT_LOGS_KEY,
          JSON.stringify(this.measurementLogs),
        );
      }
      if (data.validationResults) {
        this.validationResults = data.validationResults;
        await AsyncStorage.setItem(
          VALIDATION_RESULTS_KEY,
          JSON.stringify(this.validationResults),
        );
      }
    } catch (error) {
      throw new Error('Invalid import data format');
    }
  }

  /**
   * Save user settings
   */
  async saveSettings(settings: Record<string, any>): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  /**
   * Get user settings
   */
  async getSettings(): Promise<Record<string, any>> {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {};
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default storageService;
