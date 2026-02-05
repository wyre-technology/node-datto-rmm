/**
 * Audit types
 */

import type { Uid } from './common.js';

/**
 * Device audit information
 */
export interface DeviceAudit {
  /** Device UID */
  deviceUid: Uid;
  /** Device hostname */
  hostname?: string;
  /** Last audit timestamp */
  lastAuditAt?: number;
  /** Operating system information */
  operatingSystem?: {
    name?: string;
    version?: string;
    architecture?: string;
    buildNumber?: string;
    servicePackMajor?: number;
    servicePackMinor?: number;
    installDate?: number;
    lastBootTime?: number;
  };
  /** Hardware information */
  hardware?: {
    manufacturer?: string;
    model?: string;
    serialNumber?: string;
    biosVersion?: string;
    biosDate?: string;
    totalMemoryBytes?: number;
    processorName?: string;
    processorCores?: number;
    processorLogicalCores?: number;
    processorSpeed?: number;
  };
  /** Network information */
  network?: {
    domainName?: string;
    workgroup?: string;
    ipAddresses?: string[];
    macAddresses?: string[];
    defaultGateway?: string;
    dnsServers?: string[];
  };
  /** Storage information */
  storage?: {
    drives?: Array<{
      name?: string;
      driveType?: string;
      totalSizeBytes?: number;
      freeSizeBytes?: number;
      fileSystem?: string;
    }>;
  };
  /** User information */
  users?: {
    loggedInUsers?: string[];
    localUsers?: Array<{
      username?: string;
      fullName?: string;
      disabled?: boolean;
      lastLogon?: number;
    }>;
  };
}

/**
 * Software item in audit
 */
export interface AuditSoftware {
  /** Software name */
  name: string;
  /** Software version */
  version?: string;
  /** Software publisher */
  publisher?: string;
  /** Installation date */
  installDate?: number;
  /** Installation location */
  installLocation?: string;
  /** Uninstall string */
  uninstallString?: string;
  /** Software size in bytes */
  sizeBytes?: number;
  /** Is 64-bit */
  is64Bit?: boolean;
}

/**
 * ESXi host audit information
 */
export interface EsxiHostAudit {
  /** Device UID */
  deviceUid: Uid;
  /** ESXi hostname */
  hostname?: string;
  /** ESXi version */
  version?: string;
  /** Build number */
  build?: string;
  /** Update level */
  updateLevel?: number;
  /** Patch level */
  patchLevel?: number;
  /** License type */
  licenseType?: string;
  /** Total memory bytes */
  totalMemoryBytes?: number;
  /** Total CPU cores */
  totalCpuCores?: number;
  /** CPU model */
  cpuModel?: string;
  /** Virtual machines */
  virtualMachines?: Array<{
    name?: string;
    powerState?: string;
    guestOs?: string;
    memoryMb?: number;
    cpuCount?: number;
  }>;
  /** Datastores */
  datastores?: Array<{
    name?: string;
    type?: string;
    capacityBytes?: number;
    freeSpaceBytes?: number;
  }>;
  /** Network adapters */
  networkAdapters?: Array<{
    name?: string;
    macAddress?: string;
    ipAddress?: string;
    connected?: boolean;
  }>;
}

/**
 * Printer audit information
 */
export interface PrinterAudit {
  /** Device UID */
  deviceUid: Uid;
  /** Printer name */
  printerName?: string;
  /** Printer model */
  model?: string;
  /** Manufacturer */
  manufacturer?: string;
  /** Serial number */
  serialNumber?: string;
  /** Connection type */
  connectionType?: 'usb' | 'network' | 'other';
  /** IP address (for network printers) */
  ipAddress?: string;
  /** Port name */
  portName?: string;
  /** Driver name */
  driverName?: string;
  /** Is default printer */
  isDefault?: boolean;
  /** Is shared */
  isShared?: boolean;
  /** Printer status */
  status?: string;
  /** Supply levels */
  supplyLevels?: Array<{
    name?: string;
    type?: string;
    levelPercent?: number;
    colorCode?: string;
  }>;
  /** Page counts */
  pageCounts?: {
    total?: number;
    color?: number;
    blackWhite?: number;
    duplex?: number;
  };
}

/**
 * Response for device audit
 */
export interface DeviceAuditResponse {
  /** Device audit data */
  audit: DeviceAudit;
}

/**
 * Response for device software list
 */
export interface DeviceSoftwareResponse {
  /** List of installed software */
  software: AuditSoftware[];
}

/**
 * Response for ESXi host audit
 */
export interface EsxiHostAuditResponse {
  /** ESXi host audit data */
  audit: EsxiHostAudit;
}

/**
 * Response for printer audit
 */
export interface PrinterAuditResponse {
  /** Printer audit data */
  audit: PrinterAudit;
}
