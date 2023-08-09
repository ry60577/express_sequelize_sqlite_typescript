import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  required: ['interfaces', 'version', 'unit', 'link-state', 'backhaulClients', 'fronthaulClients', 'radios'],
  properties: {
    interfaces: {
      type: 'array',
      required: ['counters', 'dns_servers', 'ipv4', 'location', 'name', 'uptime', 'clients', 'ssids'],
      items: [
        {
          type: 'object',
          properties: {
            counters: {
              type: 'object',
              required: [
                'collisions',
                'multicast',
                'rx_bytes',
                'rx_dropped',
                'rx_errors',
                'rx_packets',
                'tx_bytes',
                'tx_dropped',
                'tx_errors',
                'tx_packets',
              ],
              properties: {
                collisions: {
                  type: 'integer',
                },
                multicast: {
                  type: 'integer',
                },
                rx_bytes: {
                  type: 'integer',
                },
                rx_dropped: {
                  type: 'integer',
                },
                rx_errors: {
                  type: 'integer',
                },
                rx_packets: {
                  type: 'integer',
                },
                tx_bytes: {
                  type: 'integer',
                },
                tx_dropped: {
                  type: 'integer',
                },
                tx_errors: {
                  type: 'integer',
                },
                tx_packets: {
                  type: 'integer',
                },
              },
            },
            dns_servers: {
              type: 'array',
              items: [
                {
                  type: 'string',
                },
              ],
            },
            ipv4: {
              type: 'object',
              required: ['addresses', 'dhcp_server', 'leasetime'],
              properties: {
                addresses: {
                  type: 'array',
                  items: [
                    {
                      type: 'string',
                    },
                  ],
                },
                dhcp_server: {
                  type: 'string',
                },
                leasetime: {
                  type: 'integer',
                },
              },
            },
            location: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            uptime: {
              type: 'integer',
            },
            clients: {
              type: 'array',
              items: [
                {
                  type: 'object',
                  required: ['mac', 'ports'],
                  properties: {
                    ipv4_addresses: {
                      type: 'array',
                      items: [
                        {
                          type: 'string',
                        },
                      ],
                    },
                    ipv6_addresses: {
                      type: 'array',
                      items: [
                        {
                          type: 'string',
                        },
                      ],
                    },
                    mac: {
                      type: 'string',
                    },
                    ports: {
                      type: 'array',
                      items: [
                        {
                          type: 'string',
                        },
                      ],
                    },
                  },
                },
              ],
            },
            ssids: {
              type: 'array',
              items: [
                {
                  type: 'object',
                  required: ['band', 'bssid', 'encryption', 'iface', 'location', 'mode', 'phy', 'radio', 'ssid', 'wds'],
                  properties: {
                    associations: {
                      type: 'array',
                      items: [
                        {
                          type: 'object',
                          properties: {
                            ack_signal: {
                              type: 'integer',
                            },
                            ack_signal_avg: {
                              type: 'integer',
                            },
                            bssid: {
                              type: 'string',
                            },
                            connected: {
                              type: 'integer',
                            },
                            inactive: {
                              type: 'integer',
                            },
                            rssi: {
                              type: 'integer',
                            },
                            rx_bytes: {
                              type: 'integer',
                            },
                            rx_duration: {
                              type: 'integer',
                            },
                            rx_packets: {
                              type: 'integer',
                            },
                            rx_rate: {
                              type: 'object',
                              properties: {
                                bitrate: {
                                  type: 'integer',
                                },
                                chwidth: {
                                  type: 'integer',
                                },
                              },
                              required: ['bitrate', 'chwidth'],
                            },
                            station: {
                              type: 'string',
                            },
                            tid_stats: {
                              type: 'array',
                              items: {},
                            },
                            tx_bytes: {
                              type: 'integer',
                            },
                            tx_duration: {
                              type: 'integer',
                            },
                            tx_failed: {
                              type: 'integer',
                            },
                            tx_packets: {
                              type: 'integer',
                            },
                            tx_rate: {
                              type: 'object',
                              properties: {
                                bitrate: {
                                  type: 'integer',
                                },
                                chwidth: {
                                  type: 'integer',
                                },
                              },
                              required: ['bitrate', 'chwidth'],
                            },
                            tx_retries: {
                              type: 'integer',
                            },
                          },
                          required: [
                            'ack_signal',
                            'ack_signal_avg',
                            'bssid',
                            'connected',
                            'inactive',
                            'rssi',
                            'rx_bytes',
                            'rx_duration',
                            'rx_packets',
                            'rx_rate',
                            'station',
                            'tid_stats',
                            'tx_bytes',
                            'tx_duration',
                            'tx_failed',
                            'tx_packets',
                            'tx_rate',
                            'tx_retries',
                          ],
                        },
                      ],
                    },
                    band: {
                      type: 'string',
                    },
                    bssid: {
                      type: 'string',
                    },
                    encryption: {
                      type: 'string',
                    },
                    iface: {
                      type: 'string',
                    },
                    location: {
                      type: 'string',
                    },
                    mode: {
                      type: 'string',
                    },
                    phy: {
                      type: 'string',
                    },
                    radio: {
                      type: 'object',
                      required: ['$ref'],
                      properties: {
                        $ref: {
                          type: 'string',
                        },
                      },
                    },
                    ssid: {
                      type: 'string',
                    },
                    wds: {
                      type: 'boolean',
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
    version: { type: 'integer' },
    unit: {
      type: 'object',
      required: ['load', 'localtime', 'memory'],
      properties: {
        load: {
          type: 'array',
          items: { type: 'number' },
        },
        localtime: { type: 'integer' },
        memory: {
          type: 'object',
          required: ['buffered', 'cached', 'free', 'total'],
          properties: {
            buffered: { type: 'integer' },
            cached: { type: 'integer' },
            free: { type: 'integer' },
            total: { type: 'integer' },
          },
        },
        uptime: { type: 'integer' },
      },
    },
    'link-state': {
      type: 'object',
      required: ['upstream'],
      properties: {
        downstream: {
          type: 'object',
          properties: {
            lan1: {
              type: 'object',
              required: ['carrier'],
              properties: {
                carrier: { type: 'integer' },
              },
            },
            lan2: {
              type: 'object',
              required: ['carrier'],
              properties: {
                carrier: { type: 'integer' },
              },
            },
            lan3: {
              type: 'object',
              required: ['carrier'],
              properties: {
                carrier: { type: 'integer' },
              },
            },
          },
        },
        upstream: {
          type: 'object',
          required: [],
          properties: {
            eth0: {
              type: 'object',
              required: ['carrier', 'duplex', 'rx_bytes', 'rx_packets', 'speed', 'tx_bytes', 'tx_packets'],
              properties: {
                carrier: { type: 'integer' },
                duplex: { type: 'string' },
                rx_bytes: { type: 'integer' },
                rx_packets: { type: 'integer' },
                speed: { type: 'integer' },
                tx_bytes: { type: 'integer' },
                tx_packets: { type: 'integer' },
              },
            },
          },
        },
      },
    },

    backhaulClients: {
      type: 'array',
      items: [
        {
          type: 'object',
          required: ['channel', 'macAddr', 'netInfo', 'quality', 'signal'],
          properties: {
            channel: {
              type: 'integer',
              nullable: true,
            },
            macAddr: {
              type: 'string',
            },
            netInfo: {
              type: 'object',
              required: ['connectType', 'uplink'],
              properties: {
                connectType: {
                  type: 'integer',
                },
                uplink: {
                  type: 'string',
                },
              },
            },
            quality: {
              type: 'integer',
            },
            signal: {
              type: 'integer',
            },
          },
        },
      ],
    },
    fronthaulClients: {
      type: 'array',
      required: ['channel', 'macAddr', 'netInfo', 'quality', 'signal'],
      items: [
        {
          type: 'object',
          properties: {
            channel: {
              type: ['integer', 'null'],
            },
            macAddr: {
              type: 'string',
            },
            netInfo: {
              type: 'object',
              required: ['connectType', 'uplink'],
              properties: {
                connectType: {
                  type: 'integer',
                },
                uplink: {
                  type: 'string',
                },
              },
            },
            quality: {
              type: 'integer',
            },
            signal: {
              type: 'integer',
            },
          },
        },
      ],
    },
    radios: {
      type: 'array',
      items: {
        type: 'object',
        required: ['channel', 'channel_width', 'phy', 'tx_power'],
        properties: {
          channel: {
            type: 'array',
            items: { type: 'integer' },
          },
          channel_width: { type: 'string' },
          phy: { type: 'string' },
          tx_power: { type: 'integer' },
        },
      },
    },
  },
};

const validateFn = ajv.compile(schema);

export const eapStatisticsValidate = (validateData: any) => (validateFn(validateData) ? validateFn(validateData) : validateFn.errors);
