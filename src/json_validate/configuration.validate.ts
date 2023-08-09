import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  required: ['interfaces', 'metrics', 'services'],
  properties: {
    interfaces: {
      type: 'array',
      required: ['ipv6', 'ethernet', 'ipv4', 'name', 'role', 'services'],
      items: {
        type: 'object',
        properties: {
          ipv6: {
            type: 'object',
            properties: {
              enable: { type: 'boolean' },
            },
          },
          ethernet: {
            type: 'array',
            required: ['select-ports'],
            items: {
              type: 'object',
              properties: {
                macaddr: { type: 'string' },
                'select-ports': {
                  type: 'array',
                  items: { type: 'string' },
                },
              },
            },
          },
          ipv4: {
            type: 'object',
            required: ['use-dns', 'portForwardEnable', 'port-forward'],
            properties: {
              addressing: {
                type: 'string',
                enum: ['dynamic', 'static'],
              },
              subnet: { type: 'string' },
              gateway: { type: 'string' },
              dhcp: {
                type: 'object',
                required: ['lease-first', 'lease-count', 'lease-time'],
                properties: {
                  'lease-first': { type: 'integer' },
                  'lease-count': { type: 'integer' },
                  'lease-time': { type: 'string' },
                },
              },
              'use-dns': {
                type: 'array',
                items: { type: 'string' },
              },
              portForwardEnable: { type: 'boolean' },
              'port-forward': {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    enable: { type: 'boolean' },
                    name: { type: 'string' },
                    protocol: {
                      type: 'string',
                      enum: ['tcp', 'udp', 'all'],
                    },
                    'internal-address': { type: 'string' },
                    'internal-port': { type: 'string' },
                    'external-port': { type: 'string' },
                  },
                },
              },
            },
          },
          name: { type: 'string' },
          role: {
            type: 'string',
            enum: ['upstream', 'downstream'],
          },
          services: {
            type: 'array',
            enum: ['lldp', 'ssh', 'mdns'],
          },
          ssid: {
            type: 'array',
            required: ['name', 'bss-mode', 'cbtDisplay', 'encryption', 'roaming', 'services', 'wifi-bands'],
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                'bss-mode': {
                  type: 'string',
                  enum: ['ap', 'sta', 'wds-ap', 'wds-sta', 'wds-repeater', 'mesh'],
                },
                cbtDisplay: { type: 'boolean' },
                cbtMacAddressFilter: {
                  type: 'object',
                  properties: {
                    macs: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                    enable: { type: 'boolean' },
                    type: {
                      type: 'string',
                      enum: ['allow', 'deny'],
                    },
                  },
                },
                cbtWpaGroupRekey: { type: 'integer' },
                encryption: {
                  type: 'object',
                  required: ['ieeee80211w', 'proto'],
                  properties: {
                    ieeee80211w: {
                      type: 'string',
                      enum: ['disabled', 'optional', 'requiredd'],
                    },
                    key: { type: 'string' },
                    proto: {
                      type: 'string',
                      enum: ['none', 'psk2+ccmp', 'sae', 'sae-mixed'],
                    },
                  },
                },
                'hidden-ssid': { type: 'boolean' },
                roaming: {
                  type: 'object',
                  required: ['enable'],
                  properties: {
                    enable: { type: 'boolean' },
                    'domain-Identifier': { type: 'string' },
                    'generate-psk': { type: 'boolean' },
                    'message-exchange': { type: 'string' },
                    'pmk-r0-key-holder': { type: 'string' },
                    'pmk-r1-key-holder': { type: 'string' },
                  },
                },
                rrm: {
                  type: 'object',
                  properties: {
                    'neighbor-reporting': { type: 'boolean' },
                  },
                },
                services: {
                  type: 'array',
                  items: { type: 'string' },
                },
                'wifi-bands': {
                  type: 'array',
                  items: { type: 'string', enum: ['5G', '2G'] },
                },
              },
            },
          },
          vlan: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
            },
          },
          'broad-band': {
            type: 'object',
            properties: {
              protocol: { type: 'string', default: 'pppoe' },
              'user-name': { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
      },
    },
    metrics: {
      type: 'object',
      required: ['health', 'statistics'],
      properties: {
        health: {
          type: 'object',
          required: ['interval'],
          properties: {
            interval: { type: 'integer' },
          },
        },
        statistics: {
          type: 'object',
          required: ['interval'],
          properties: {
            interval: { type: 'integer' },
            types: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['ssids', 'lldp', 'clients'],
              },
            },
          },
        },
      },
    },
    radios: {
      type: 'array',
      items: {
        type: 'object',
        required: ['band', 'channel', 'cbtTxLevel', 'cbtTxHigh', 'cbtTxMedium', 'cbtTxLow', 'channel-width', 'country'],
        properties: {
          band: {
            type: 'string',
            enum: ['5G', '2G'],
          },
          channel: {
            type: ['string', 'number'],
            default: 'auto',
          }, // 0 不支援
          cbtTxLevel: { type: 'string' },
          cbtTxHigh: { type: 'integer' },
          cbtTxMedium: { type: 'integer' },
          cbtTxLow: { type: 'integer' },
          'channel-width': { type: 'integer' },
          country: { type: 'string' },
        },
      },
    },
    services: {
      type: 'object',
      properties: {
        lldp: {
          type: 'object',
          required: ['describe', 'location'],
          properties: {
            describe: { type: 'string' },
            location: { type: 'string' },
          },
        },
        // controller不會有，但EAP有 wifi-steering
        'wifi-steering': {
          type: 'object',
          required: ['mode', 'cbtSensitivity', 'cbtrequireddHigh', 'cbtrequireddMedium', 'cbtrequireddLow'],
          properties: {
            mode: {
              type: 'string',
              enum: ['none', 'local'],
            },
            cbtSensitivity: {
              type: 'string',
              enum: ['high', 'medium', 'low'],
            },
            cbtrequireddHigh: { type: 'integer' },
            cbtrequireddMedium: { type: 'integer' },
            cbtrequireddLow: { type: 'integer' },
          },
        },
        // controller有，但EAP沒有 log
        log: {
          type: 'object',
          required: ['enable', 'host', 'port', 'priority'],
          properties: {
            enable: { type: 'boolean' },
            host: { type: 'string' },
            port: { type: 'integer' },
            priority: { type: 'integer' },
          },
        },
        ntp: {
          type: 'object',
          required: ['enable', 'servers'],
          properties: {
            enable: { type: 'boolean' },
            servers: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        mdns: {
          type: 'object',
          required: ['enable'],
          properties: {
            enable: { type: 'boolean' },
          },
        },
      },
    },
    'third-party': {
      type: 'object',
      required: ['cbtStaticRoutesIpv4', 'cbtStaticRoutesIpv6', 'cbtFirewallIpv4', 'cbtFirewallIpv6'],
      properties: {
        cbtStaticRoutesIpv4: {
          type: 'object',
          required: ['enable', 'staticRoutes'],
          properties: {
            enable: { type: 'boolean' },
            staticRoutes: {
              type: 'object',
              required: ['enable', 'interface', 'name', 'targetIP', 'netmask'],
              properties: {
                enable: { type: 'boolean' },
                interface: { type: 'string' },
                name: { type: 'string' },
                targetIP: { type: 'string' },
                netmask: { type: 'number' },
                gatewayIP: { type: 'string' },
              },
            },
          },
        },
        cbtStaticRoutesIpv6: {
          type: 'object',
          required: ['enable', 'staticRoutes'],
          properties: {
            enable: { type: 'boolean' },
            staticRoutes: {
              type: 'object',
              required: ['enable', 'interface', 'name', 'targetIP', 'netmask'],
              properties: {
                enable: { type: 'boolean' },
                interface: { type: 'string' },
                name: { type: 'string' },
                targetIP: { type: 'string' },
                netmask: { type: 'number' },
                gatewayIP: { type: 'string' },
              },
            },
          },
        },
        cbtFirewallIpv4: {
          type: 'object',
          required: ['enable', 'staticRoutes'],
          properties: {
            enable: { type: 'boolean' },
            staticRoutes: {
              type: 'object',
              required: ['enable', 'interface', 'name', 'targetIP', 'netmask'],
              properties: {
                enable: { type: 'boolean' },
                interface: { type: 'string' },
                name: { type: 'string' },
                targetIP: { type: 'string' },
                netmask: { type: 'number' },
                gatewayIP: { type: 'string' },
              },
            },
          },
        },
        cbtFirewallIpv6: {
          type: 'object',
          required: ['enable', 'staticRoutes'],
          properties: {
            enable: { type: 'boolean' },
            staticRoutes: {
              type: 'object',
              required: ['enable', 'interface', 'name', 'targetIP', 'netmask'],
              properties: {
                enable: { type: 'boolean' },
                interface: { type: 'string' },
                name: { type: 'string' },
                targetIP: { type: 'string' },
                netmask: { type: 'number' },
                gatewayIP: { type: 'string' },
              },
            },
          },
        },
        cbtBridge: { type: 'boolean' },
      },
    },
    uuid: { type: 'integer' },
  },
};

const validateFn = ajv.compile(schema);

export const configValidate = (validateData: any) => (validateFn(validateData) ? validateFn(validateData) : validateFn.errors);
