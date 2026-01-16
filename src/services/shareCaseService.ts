/**
 * ERA IV: Share Case Service
 *
 * This service enables offline community sharing of repair cases.
 * Cases can be exported, packaged, and shared without requiring cloud infrastructure.
 *
 * Features:
 * - Generate shareable case packages
 * - Create shareable links (data URIs)
 * - Package multiple cases together
 * - Validate and import shared cases
 */

import {RepairCase} from '../types';
import {caseManagementService} from './caseManagementService';

// ==================== TYPES ====================

export interface CasePackage {
  version: string;
  packageId: string;
  createdDate: string;
  author?: string;
  description?: string;
  cases: RepairCase[];
  metadata: {
    totalCases: number;
    boardTypes: string[];
    failurePatterns: string[];
    tags: string[];
  };
  signature?: string; // For future verification
}

export interface ShareOptions {
  format: 'json' | 'datauri' | 'qr';
  includeMetadata?: boolean;
  compress?: boolean;
}

export interface ShareResult {
  success: boolean;
  format: string;
  data: string;
  size: number;
  error?: string;
}

// ==================== SHARE CASE SERVICE ====================

class ShareCaseService {
  private readonly VERSION = '1.0';

  // ==================== CASE PACKAGING ====================

  /**
   * Create a shareable case package
   */
  createCasePackage(
    caseIds: string[],
    author?: string,
    description?: string,
  ): CasePackage | null {
    const cases: RepairCase[] = [];

    // Gather cases
    for (const caseId of caseIds) {
      const repairCase = caseManagementService.getCase(caseId);
      if (repairCase) {
        cases.push(repairCase);
      }
    }

    if (cases.length === 0) {
      return null;
    }

    // Extract metadata
    const boardTypes = Array.from(new Set(cases.map(c => c.boardType)));
    const failurePatterns = Array.from(
      new Set(cases.map(c => c.failurePattern)),
    );
    const allTags = cases.flatMap(c => c.tags || []);
    const tags = Array.from(new Set(allTags));

    const packageId = `pkg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    return {
      version: this.VERSION,
      packageId,
      createdDate: new Date().toISOString(),
      author,
      description,
      cases,
      metadata: {
        totalCases: cases.length,
        boardTypes,
        failurePatterns,
        tags,
      },
    };
  }

  /**
   * Share a single case
   */
  shareCase(
    caseId: string,
    options: ShareOptions = {format: 'json'},
  ): ShareResult {
    const repairCase = caseManagementService.getCase(caseId);
    if (!repairCase) {
      return {
        success: false,
        format: options.format,
        data: '',
        size: 0,
        error: 'Case not found',
      };
    }

    const casePackage = this.createCasePackage([caseId]);
    if (!casePackage) {
      return {
        success: false,
        format: options.format,
        data: '',
        size: 0,
        error: 'Failed to create case package',
      };
    }

    return this.packageToFormat(casePackage, options);
  }

  /**
   * Share multiple cases
   */
  shareCases(
    caseIds: string[],
    author?: string,
    description?: string,
    options: ShareOptions = {format: 'json'},
  ): ShareResult {
    const casePackage = this.createCasePackage(caseIds, author, description);
    if (!casePackage) {
      return {
        success: false,
        format: options.format,
        data: '',
        size: 0,
        error: 'No cases found to share',
      };
    }

    return this.packageToFormat(casePackage, options);
  }

  // ==================== FORMAT CONVERSION ====================

  /**
   * Convert case package to requested format
   */
  private packageToFormat(
    casePackage: CasePackage,
    options: ShareOptions,
  ): ShareResult {
    try {
      const jsonData = JSON.stringify(casePackage, null, options.compress ? 0 : 2);

      switch (options.format) {
        case 'json':
          return {
            success: true,
            format: 'json',
            data: jsonData,
            size: jsonData.length,
          };

        case 'datauri':
          const dataUri = `data:application/json;base64,${this.base64Encode(jsonData)}`;
          return {
            success: true,
            format: 'datauri',
            data: dataUri,
            size: dataUri.length,
          };

        case 'qr':
          // Generate a shortened version for QR codes
          const shortData = this.createShortPackage(casePackage);
          const shortJson = JSON.stringify(shortData, null, 0);
          return {
            success: true,
            format: 'qr',
            data: shortJson,
            size: shortJson.length,
          };

        default:
          return {
            success: false,
            format: options.format,
            data: '',
            size: 0,
            error: `Unsupported format: ${options.format}`,
          };
      }
    } catch (error) {
      return {
        success: false,
        format: options.format,
        data: '',
        size: 0,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Create a shortened package for QR codes (essential data only)
   */
  private createShortPackage(pkg: CasePackage): object {
    return {
      v: pkg.version,
      id: pkg.packageId,
      d: pkg.createdDate,
      c: pkg.cases.map(c => ({
        id: c.id,
        n: c.caseNumber,
        b: c.boardType,
        f: c.failurePattern,
        s: c.repairSuccess,
        t: c.timestamp,
      })),
      m: {
        n: pkg.metadata.totalCases,
        b: pkg.metadata.boardTypes,
        f: pkg.metadata.failurePatterns,
      },
    };
  }

  // ==================== IMPORT ====================

  /**
   * Import a shared case package
   */
  importSharedPackage(data: string): {
    success: boolean;
    imported: number;
    failed: number;
    packageId?: string;
    error?: string;
  } {
    try {
      let packageData: CasePackage;

      // Detect format and parse
      if (data.startsWith('data:')) {
        // Data URI
        const base64Data = data.split(',')[1];
        const jsonData = this.base64Decode(base64Data);
        packageData = JSON.parse(jsonData);
      } else {
        // Direct JSON
        packageData = JSON.parse(data);
      }

      // Validate package
      if (!this.validatePackage(packageData)) {
        return {
          success: false,
          imported: 0,
          failed: 0,
          error: 'Invalid package format',
        };
      }

      // Import cases
      const result = caseManagementService.importCases(
        JSON.stringify(packageData.cases),
      );

      return {
        success: result.imported > 0,
        imported: result.imported,
        failed: result.failed,
        packageId: packageData.packageId,
      };
    } catch (error) {
      return {
        success: false,
        imported: 0,
        failed: 0,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Validate package structure
   */
  private validatePackage(pkg: any): boolean {
    return (
      pkg &&
      pkg.version &&
      pkg.packageId &&
      pkg.cases &&
      Array.isArray(pkg.cases) &&
      pkg.metadata
    );
  }

  // ==================== SHAREABLE LINKS ====================

  /**
   * Generate a shareable link for a case
   */
  generateShareLink(caseId: string): string | null {
    const result = this.shareCase(caseId, {format: 'datauri', compress: true});
    if (!result.success) {
      return null;
    }

    // In a real app, this would be a short URL service
    // For now, return the data URI directly
    return result.data;
  }

  /**
   * Generate a shareable link for multiple cases
   */
  generateShareLinkMultiple(
    caseIds: string[],
    author?: string,
    description?: string,
  ): string | null {
    const result = this.shareCases(caseIds, author, description, {
      format: 'datauri',
      compress: true,
    });
    if (!result.success) {
      return null;
    }

    return result.data;
  }

  // ==================== CASE PREVIEW ====================

  /**
   * Get preview information from a shared package without importing
   */
  previewSharedPackage(data: string): {
    success: boolean;
    packageId?: string;
    createdDate?: string;
    author?: string;
    description?: string;
    totalCases?: number;
    boardTypes?: string[];
    failurePatterns?: string[];
    error?: string;
  } {
    try {
      let packageData: CasePackage;

      // Detect format and parse
      if (data.startsWith('data:')) {
        const base64Data = data.split(',')[1];
        const jsonData = this.base64Decode(base64Data);
        packageData = JSON.parse(jsonData);
      } else {
        packageData = JSON.parse(data);
      }

      if (!this.validatePackage(packageData)) {
        return {
          success: false,
          error: 'Invalid package format',
        };
      }

      return {
        success: true,
        packageId: packageData.packageId,
        createdDate: packageData.createdDate,
        author: packageData.author,
        description: packageData.description,
        totalCases: packageData.metadata.totalCases,
        boardTypes: packageData.metadata.boardTypes,
        failurePatterns: packageData.metadata.failurePatterns,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Base64 encode (browser-safe)
   */
  private base64Encode(str: string): string {
    // In React Native, use proper base64 encoding
    // For now, simple implementation
    try {
      return Buffer.from(str, 'utf-8').toString('base64');
    } catch {
      // Fallback for environments without Buffer
      return btoa(str);
    }
  }

  /**
   * Base64 decode (browser-safe)
   */
  private base64Decode(str: string): string {
    try {
      return Buffer.from(str, 'base64').toString('utf-8');
    } catch {
      // Fallback for environments without Buffer
      return atob(str);
    }
  }

  /**
   * Calculate package statistics
   */
  getPackageStats(pkg: CasePackage): {
    totalCases: number;
    successRate: number;
    averageCost: number;
    averageTime: number;
    uniqueBoards: number;
    uniquePatterns: number;
  } {
    const cases = pkg.cases;
    const successfulCases = cases.filter(c => c.repairSuccess).length;
    const casesWithCost = cases.filter(c => c.actualCost !== undefined);
    const casesWithTime = cases.filter(c => c.actualTime !== undefined);

    const totalCost = casesWithCost.reduce(
      (sum, c) => sum + (c.actualCost || 0),
      0,
    );
    const totalTime = casesWithTime.reduce(
      (sum, c) => sum + (c.actualTime || 0),
      0,
    );

    return {
      totalCases: cases.length,
      successRate: cases.length > 0 ? (successfulCases / cases.length) * 100 : 0,
      averageCost: casesWithCost.length > 0 ? totalCost / casesWithCost.length : 0,
      averageTime: casesWithTime.length > 0 ? totalTime / casesWithTime.length : 0,
      uniqueBoards: pkg.metadata.boardTypes.length,
      uniquePatterns: pkg.metadata.failurePatterns.length,
    };
  }
}

// Export singleton instance
export const shareCaseService = new ShareCaseService();
export default shareCaseService;
