/**
 * Filters fixtures
 */

export const defaults = {
  filters: [
    {
      uid: 'filter-default-001',
      name: 'All Devices',
      description: 'All devices in the account',
      type: 'default',
      category: 'General',
      active: true,
      deviceCount: 150,
    },
    {
      uid: 'filter-default-002',
      name: 'Windows Servers',
      description: 'All Windows Server devices',
      type: 'default',
      category: 'Operating System',
      active: true,
      deviceCount: 15,
    },
    {
      uid: 'filter-default-003',
      name: 'Offline Devices',
      description: 'Devices that are currently offline',
      type: 'default',
      category: 'Status',
      active: true,
      deviceCount: 7,
    },
  ],
};

export const custom = {
  filters: [
    {
      uid: 'filter-custom-001',
      name: 'Critical Servers',
      description: 'Production servers requiring monitoring',
      type: 'custom',
      category: 'Custom',
      criteria: [
        {
          field: 'deviceType',
          operator: 'equals',
          value: 'server',
          logicalOperator: 'and',
        },
        {
          field: 'udf15',
          operator: 'equals',
          value: 'Critical',
        },
      ],
      active: true,
      deviceCount: 5,
      createdBy: 'admin@testmsp.com',
      createdAt: 1704067200000,
    },
    {
      uid: 'filter-custom-002',
      name: 'Low Disk Space',
      description: 'Devices with less than 20% free disk space',
      type: 'custom',
      active: true,
      deviceCount: 12,
      createdBy: 'admin@testmsp.com',
      createdAt: 1705363200000,
    },
  ],
};
