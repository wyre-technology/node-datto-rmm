/**
 * Audit fixtures
 */

export const device = {
  audit: {
    deviceUid: 'device-uid-001',
    hostname: 'DESKTOP-001',
    lastAuditAt: 1706659200000,
    operatingSystem: {
      name: 'Windows 11 Pro',
      version: '22H2',
      architecture: 'x64',
      buildNumber: '22621',
      servicePackMajor: 0,
      servicePackMinor: 0,
      installDate: 1704067200000,
      lastBootTime: 1706572800000,
    },
    hardware: {
      manufacturer: 'Dell',
      model: 'OptiPlex 7080',
      serialNumber: 'ABC123XYZ',
      biosVersion: '2.8.0',
      totalMemoryBytes: 17179869184,
      processorName: 'Intel Core i7-10700',
      processorCores: 8,
      processorLogicalCores: 16,
      processorSpeed: 2900,
    },
    network: {
      domainName: 'TESTDOMAIN',
      ipAddresses: ['192.168.1.100'],
      macAddresses: ['AA:BB:CC:DD:EE:01'],
      defaultGateway: '192.168.1.1',
      dnsServers: ['192.168.1.1', '8.8.8.8'],
    },
    storage: {
      drives: [
        {
          name: 'C:',
          driveType: 'Fixed',
          totalSizeBytes: 512110190592,
          freeSizeBytes: 107374182400,
          fileSystem: 'NTFS',
        },
      ],
    },
    users: {
      loggedInUsers: ['TESTDOMAIN\\jsmith'],
      localUsers: [
        {
          username: 'Administrator',
          fullName: 'Administrator',
          disabled: false,
          lastLogon: 1706659200000,
        },
      ],
    },
  },
};

export const deviceSoftware = {
  software: [
    {
      name: 'Microsoft Office 365',
      version: '16.0.17126.20132',
      publisher: 'Microsoft Corporation',
      installDate: 1704067200000,
      sizeBytes: 2147483648,
      is64Bit: true,
    },
    {
      name: 'Google Chrome',
      version: '121.0.6167.140',
      publisher: 'Google LLC',
      installDate: 1706572800000,
      is64Bit: true,
    },
    {
      name: 'Adobe Acrobat Reader DC',
      version: '24.001.20604',
      publisher: 'Adobe Inc.',
      installDate: 1705363200000,
      is64Bit: true,
    },
  ],
};

export const esxihost = {
  audit: {
    deviceUid: 'device-esxi-001',
    hostname: 'ESXI-HOST-01',
    version: '8.0.0',
    build: '20513097',
    updateLevel: 1,
    licenseType: 'Standard',
    totalMemoryBytes: 137438953472,
    totalCpuCores: 32,
    cpuModel: 'Intel Xeon Gold 6248R',
    virtualMachines: [
      {
        name: 'VM-DC01',
        powerState: 'poweredOn',
        guestOs: 'Windows Server 2022',
        memoryMb: 8192,
        cpuCount: 4,
      },
      {
        name: 'VM-SQL01',
        powerState: 'poweredOn',
        guestOs: 'Windows Server 2022',
        memoryMb: 32768,
        cpuCount: 8,
      },
    ],
    datastores: [
      {
        name: 'datastore1',
        type: 'VMFS',
        capacityBytes: 2199023255552,
        freeSpaceBytes: 1099511627776,
      },
    ],
  },
};

export const printer = {
  audit: {
    deviceUid: 'device-printer-001',
    printerName: 'HP LaserJet Pro MFP',
    model: 'HP LaserJet Pro MFP M428fdw',
    manufacturer: 'HP',
    serialNumber: 'VNBX123456',
    connectionType: 'network',
    ipAddress: '192.168.1.50',
    portName: 'IP_192.168.1.50',
    driverName: 'HP Universal Printing PCL 6',
    isDefault: false,
    isShared: true,
    status: 'Ready',
    supplyLevels: [
      { name: 'Black Toner', type: 'toner', levelPercent: 65, colorCode: '#000000' },
      { name: 'Cyan Toner', type: 'toner', levelPercent: 80, colorCode: '#00FFFF' },
      { name: 'Magenta Toner', type: 'toner', levelPercent: 75, colorCode: '#FF00FF' },
      { name: 'Yellow Toner', type: 'toner', levelPercent: 70, colorCode: '#FFFF00' },
    ],
    pageCounts: {
      total: 15420,
      color: 5200,
      blackWhite: 10220,
      duplex: 3500,
    },
  },
};
