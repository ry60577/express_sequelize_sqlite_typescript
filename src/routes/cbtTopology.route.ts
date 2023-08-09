import { Request, Response, Router } from 'express';
import { Op, QueryTypes } from 'sequelize';
// import { statisticsValidate } from '../json_validate/statistics.validate';
import { eapStatisticsValidate } from '../json_validate/eap-statistic.validate';
import sequelizeConnection from '../models';
import DevicesModel from '../models/owgw/devices.model';
import StatisticsModel from '../models/owgw/statistics.model';

const cbtTopologyRouter = Router();

interface TrafficStatistic {
  timeStamp: string;
  appName: string;
  Tx: number;
  Rx: number;
  srcMac: string;
  destMac: string;
  Type: string;
}

interface TrafficStatisticObject {
  service: string;
  down: number;
  up: number;
}

cbtTopologyRouter.get('/cbtTopology/eap', async (req: Request, res: Response) => {
  const Answer = [];
  const controller = await DevicesModel.findOne({ where: { Compatible: 'cybertan_ey006-a1' } });
  const controllerObject = {
    uplink: controller?.MACAddress,
    connectType: 0,
    quality: 100,
  };
  const eapList = await DevicesModel.findAll({ where: { Compatible: { [Op.like]: `%eww%` } } });
  for (let index = 0; index < eapList.length; index++) {
    const eapDevice = eapList[index];
    const eapObject = {
      name: eapDevice.Manufacturer,
      model: eapDevice.Manufacturer,
      deviceVer: eapDevice.Firmware,
      isFwUpdate: 'new',
      macAddr: eapDevice.MACAddress,
      serialNumber: eapDevice.SerialNumber,
      status: !eapDevice.onboard ? 'pending' : true && eapDevice.onboard ? 'online' : 'offline', // 需要call API 取得 EAP 最新的連線資訊，再進行連線狀態判斷
      cpuUsage: 0,
      loadAverage: '',
      memoryUsage: 0,
      systemUptime: 0,
      trafficStatistics: [] as any,
      wifiInfo: [] as any,
      netInfo: {
        uplink: controllerObject.uplink,
        connectType: controllerObject.connectType,
        quality: controllerObject.quality,
        activity: 0,
        ipAddr: '',
        rxBytes: 0,
        rxPackets: 0,
        txBytes: 0,
        txPackets: 0,
      },
    };
    const statistics = await StatisticsModel.findOne({ where: { SerialNumber: eapDevice.SerialNumber } });
    if (statistics) {
      const statisticsValidate_ = eapStatisticsValidate(JSON.parse(statistics?.Data ?? ''));
      console.log(statisticsValidate_);
      if (statisticsValidate_ === true) {
        const statisticData = JSON.parse(statistics?.Data ?? '');
        if (statisticData.backhaulClients && statisticData.backhaulClients.length > 0) {
          for (let backhaul_index = 0; backhaul_index < statisticData.backhaulClients.length; backhaul_index++) {
            const backhaul = statisticData.backhaulClients[backhaul_index];
            eapObject.netInfo.uplink = backhaul.netInfo.uplink;
            eapObject.netInfo.connectType = backhaul.netInfo.connectType;
            eapObject.netInfo.quality = backhaul.quality;
          }
        }
        eapObject.systemUptime = statisticData.unit.uptime;
        eapObject.memoryUsage = ((statisticData.unit.memory.total - statisticData.unit.memory.free) * 100) / statisticData.unit.memory.total;
        eapObject.loadAverage = statisticData.unit.load.join(' ');
        eapObject.cpuUsage = statisticData.unit.load[0] * 100;

        let txPackets2G = 0,
          txPackets5G = 0,
          rxPackets2G = 0,
          rxPackets5G = 0,
          txBytes2G = 0,
          txBytes5G = 0,
          rxBytes2G = 0,
          rxBytes5G = 0,
          txDrop2G = 0,
          txDrop5G = 0,
          txRetry2G = 0,
          txRetry5G = 0,
          clientNum2G = 0,
          clientNum5G = 0;

        if (statisticData.interfaces.length > 0) {
          for (let interface_index = 0; interface_index < statisticData.interfaces.length; interface_index++) {
            const interfaceObject = statisticData.interfaces[interface_index];
            if (interfaceObject.name.includes('up0v') || interfaceObject.name === 'up1v0') {
              for (let ipv4Address_index = 0; ipv4Address_index < interfaceObject.ipv4.addresses.length; ipv4Address_index++) {
                const addr = interfaceObject.ipv4.addresses[ipv4Address_index];
                eapObject.netInfo.ipAddr = addr.substr(0, addr.indexOf('/'));
              }
            }

            eapObject.netInfo.rxPackets = interfaceObject.counters.rx_packets;
            eapObject.netInfo.txPackets = interfaceObject.counters.tx_packets;
            eapObject.netInfo.txBytes = interfaceObject.counters.tx_bytes;
            eapObject.netInfo.rxBytes = interfaceObject.counters.rx_bytes;
            if (interfaceObject.ssids.length > 0) {
              for (let ssid_index = 0; ssid_index < interfaceObject.ssids.length; ssid_index++) {
                const ssidInfo = interfaceObject.ssids[ssid_index];
                if (ssidInfo.associations?.length > 0) {
                  for (let association_index = 0; association_index < ssidInfo.associations.length; association_index++) {
                    const association = ssidInfo.associations[association_index];
                    if (ssidInfo.mode) {
                      let rx_packets, tx_packets, tx_drop, rx_bytes, tx_bytes, tx_retries;
                      rx_packets = association.rx_packets ?? 0;
                      tx_packets = association.tx_packets ?? 0;
                      rx_bytes = association.rx_bytes ?? 0;
                      tx_bytes = association.tx_bytes ?? 0;
                      tx_retries = association.tx_retries ?? 0;
                      tx_drop = association.tx_drop ?? 0;

                      if (ssidInfo.mode === 'ap') {
                        if (ssidInfo.band === '5g') {
                          txPackets5G += tx_packets;
                          rxPackets5G += rx_packets;
                          txBytes5G += tx_bytes;
                          rxBytes5G += rx_bytes;
                          txDrop5G += tx_drop;
                          txRetry5G += tx_retries;
                        } else {
                          txPackets2G += tx_packets;
                          rxPackets2G += rx_packets;
                          txBytes2G += tx_bytes;
                          rxBytes2G += rx_bytes;
                          txDrop2G += tx_drop;
                          txRetry2G += tx_retries;
                        }
                      }

                      if (eapObject.netInfo.connectType != 0 && ssidInfo.mode === 'station') {
                        eapObject.netInfo.txPackets = tx_packets;
                        eapObject.netInfo.rxPackets = rx_packets;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if (statisticData.fronthaulClients.length > 0) {
          for (let fronthaul_index = 0; fronthaul_index < statisticData.fronthaulClients.length; fronthaul_index++) {
            const fronthaul = statisticData.fronthaulClients[fronthaul_index];
            if (fronthaul.netInfo.connectType === 1) clientNum2G++;
            if (fronthaul.netInfo.connectType === 2) clientNum5G++;

            let macAddr = fronthaul.macAddr ?? '';
            if (macAddr) {
              const trafficStatisticList = await sequelizeConnection.query(
                "SELECT * FROM TrafficStatistic WHERE srcMac = :macAddr AND Type = 'day'",
                {
                  replacements: { macAddr: macAddr.toUpperCase() },
                  type: QueryTypes.SELECT,
                }
              );
              for (let trafficStatistic_index = 0; trafficStatistic_index < trafficStatisticList.length; trafficStatistic_index++) {
                const trafficStatistic: TrafficStatistic = trafficStatisticList[trafficStatistic_index] as TrafficStatistic;
                const eapTrafficStatisticIndex = eapObject.trafficStatistics.findIndex(
                  (item: TrafficStatisticObject) => item?.service === trafficStatistic.appName
                );
                if (eapTrafficStatisticIndex > -1) {
                  eapObject.trafficStatistics[eapTrafficStatisticIndex].down += trafficStatistic.Rx;
                  eapObject.trafficStatistics[eapTrafficStatisticIndex].up += trafficStatistic.Tx;
                } else {
                  if (trafficStatistic.appName !== '__unknown') {
                    eapObject.trafficStatistics.push({
                      down: trafficStatistic.Rx,
                      up: trafficStatistic.Tx,
                      service: trafficStatistic.appName,
                    });
                  }
                }
              }
            }
          }
          eapObject.trafficStatistics.splice(0, 1);
        }

        if (statisticData.radios.length > 0) {
          for (let radios_index = 0; radios_index < statisticData.radios.length; radios_index++) {
            const radios = statisticData.radios[radios_index];
            const channel_ = radios.channel?.at(0) ?? radios.channel;
            eapObject.wifiInfo.push({
              channel: channel_,
              band: channel_ <= 13 ? 2 : 5,
              txPackets: channel_ <= 13 ? txPackets2G : txPackets5G,
              rxPackets: channel_ <= 13 ? rxPackets2G : rxPackets5G,
              txBytes: channel_ <= 13 ? txBytes2G : txBytes5G,
              rxBytes: channel_ <= 13 ? rxBytes2G : rxBytes5G,
              txDrop: channel_ <= 13 ? txDrop2G : txDrop5G,
              txRetry: channel_ <= 13 ? txRetry2G : txRetry5G,
              clientNum: channel_ <= 13 ? clientNum2G : clientNum5G,
              txPower: radios.tx_power,
            });
          }
        }
      }
    }
    Answer.push(eapObject);
  }

  return res.status(200).json(Answer);
});

export default cbtTopologyRouter;
