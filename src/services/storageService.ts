import {MeasurementLog, ValidationResult} from '../types';

/**
 * Storage service for measurement logs and validation results
 * In production, this would use AsyncStorage or a database
 * For now, we use in-memory storage for demonstration
 */
class StorageService {
  private measurementLogs: MeasurementLog[] = [];
  private validationResults: ValidationResult[] = [];

  /**
   * Save a measurement log entry
   */
  async saveMeasurementLog(log: MeasurementLog): Promise<void> {
    this.measurementLogs.push(log);
    // In production: await AsyncStorage.setItem(MEASUREMENT_LOGS_KEY, JSON.stringify(this.measurementLogs));
  }

  /**
   * Get all measurement logs
   */
  async getMeasurementLogs(): Promise<MeasurementLog[]> {
    // In production: const data = await AsyncStorage.getItem(MEASUREMENT_LOGS_KEY);
    // return data ? JSON.parse(data) : [];
    return [...this.measurementLogs];
  }

  /**
   * Get measurement logs filtered by component ID
   */
  async getMeasurementLogsByComponent(
    componentId: string,
  ): Promise<MeasurementLog[]> {
    return this.measurementLogs.filter(log => log.componentId === componentId);
  }

  /**
   * Get measurement logs filtered by date range
   */
  async getMeasurementLogsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<MeasurementLog[]> {
    return this.measurementLogs.filter(
      log => log.timestamp >= startDate && log.timestamp <= endDate,
    );
  }

  /**
   * Save a validation result
   */
  async saveValidationResult(result: ValidationResult): Promise<void> {
    this.validationResults.push(result);
    // In production: await AsyncStorage.setItem(VALIDATION_RESULTS_KEY, JSON.stringify(this.validationResults));
  }

  /**
   * Get all validation results
   */
  async getValidationResults(): Promise<ValidationResult[]> {
    // In production: const data = await AsyncStorage.getItem(VALIDATION_RESULTS_KEY);
    // return data ? JSON.parse(data) : [];
    return [...this.validationResults];
  }

  /**
   * Get validation results filtered by test ID
   */
  async getValidationResultsByTest(
    testId: string,
  ): Promise<ValidationResult[]> {
    return this.validationResults.filter(result => result.testId === testId);
  }

  /**
   * Get recent validation results (last N results)
   */
  async getRecentValidationResults(
    limit: number = 10,
  ): Promise<ValidationResult[]> {
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
    // In production: await AsyncStorage.removeItem(MEASUREMENT_LOGS_KEY);
  }

  /**
   * Clear all validation results
   */
  async clearValidationResults(): Promise<void> {
    this.validationResults = [];
    // In production: await AsyncStorage.removeItem(VALIDATION_RESULTS_KEY);
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
      }
      if (data.validationResults) {
        this.validationResults = data.validationResults;
      }
    } catch (error) {
      throw new Error('Invalid import data format');
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default storageService;
