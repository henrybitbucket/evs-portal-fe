import { $post, $get, $put, $delete } from '../request';
import moment from 'moment';

if (typeof window === 'object') {
  window.moment = moment;
}
const getLogs = async (params, req): Promise<any> => {
  //const res = await $post('logs', params, req);
  //return res;
  return { response: {} }
};

const getDevices = async (params, req): Promise<any> => {
  let url = 'm2m/dm/devices?';
  if (params.offset) {
    url += '&offset=' + params.offset;
  }
  if (params.limit) {
    url += '&limit=' + params.limit;
  }
  if (params.type) {
    url += '&type=' + params.type;
  }
  if (params.keyword) {
    url += '&keyword=' + params.keyword;
  }

  const res = await $get(req, url);
  return res;
};

const removeCSR = async (params, req): Promise<any> => {
  let url = 'm2m/dm/device';
  if (params.id) {
    url += '/' + params.id;
  }

  const res = await $delete(url);
  return res;
};

const getGatewayNetworkInfo = async (params, req): Promise<any> => {
  let url = 'v1/gateway/' + params.gatewayId + '/network-info';
  if (!!params.checkNetworkChange) {
    url += '?checkNetworkChange=true';
  }
  const res = await $get(req, url);
  return res;
};

const getLastSubmit = async (params, req): Promise<any> => {
  let url = 'last-submitted-meter-commission' + "?uid=" + params.uid + "&msn=" + params.msn;
  const res = await $get(req, url);
  return res;
};

const getGatewayDevices = async (params, req): Promise<any> => {
  let url = 'v1/devices/' + params.gatewayId + '?checkExistPI=true';
  if (params.groupType) {
    url += '&groupType=' + params.groupType;
  }
  const res = await $get(req, url);
  return res;
};

const updateGatewayDevice = async (params, req): Promise<any> => {
  let url = 'v1/devices/' + params.gatewayId + '/' + params.macAddress + '/update?';
  if (params.name) {
    url += '&name=' + params.name;
  }
  if (params.type) {
    url += '&type=' + params.type;
  }
  const res = await $post(url, (!!params.payload ? params.payload : null));
  return res;
};

const turnSwitchDevice = async (params, req): Promise<any> => {
  const url = 'v1/devices/' + params.gatewayId + '/' + params.macAddress + '/turn-switch/' + params.type;
  const res = await $post(url);
  return res;
};

const removeDevice = async (params, req): Promise<any> => {
  let url = 'v1/devices/' + params.deviceType + '/' + params.serial + '/remove?';

  if (params.linkedBplId) {
    url += '&linkedBplId=' + params.linkedBplId;
  }
  if (params.aId) {
    url += '&aId=' + params.aId;
  }
  if (params.friendlyName) {
    url += '&friendlyName=' + params.friendlyName;
  }
  const res = await $delete(url);
  return res;
};

const getPiUploads = async (params, req): Promise<any> => {
  let url = params.gatewayId + '/uploads?';
  if (params.offset) {
    url += '&offset=' + params.offset;
  }
  if (params.limit) {
    url += '&limit=' + params.limit;
  }

  const res = await $get(req, url);
  return res;
};

const startLearnAppliance = async (params, req): Promise<any> => {
  let url = 'v1/appliances/' + params.gatewayId + '/startLearnAppliance';
  if (params.friendlyName) {
    url += '?friendlyName=' + params.friendlyName;
  }
  const res = await $put(url, req);
  return res;
};

const stopLearnAppliance = async (params, req): Promise<any> => {
  let url = 'v1/appliances/' + params.gatewayId + '/stopLearnAppliance';
  if (params.friendlyName) {
    url += '?friendlyName=' + params.friendlyName;
  }
  const res = await $put(url, req);
  return res;
};

const getAppliances = async (params, req): Promise<any> => {
  let url = 'v1/appliances/' + params.gatewayId;
  if (params.friendlyName) {
    url += '?friendlyName=' + params.friendlyName;
  }
  const res = await $get(req, url);
  return res;
};

const updateAppliances = async (params, req): Promise<any> => {
  const url = 'v1/appliances/' + params.gatewayId;

  const res = await $put(url, params.payload, req);
  return res;
};

const getRMServers = async (req): Promise<any> => {
  const url = 'v1/servers';
  const res = await $get(req, url);
  return res;
};

const getCountries = async (req): Promise<any> => {
  const url = 'countries';
  const res = await $get(req, url);
  return res;
};

const getPASLocks = async (params, req): Promise<any> => {
  const url = 'pas_locks';
  const res = await $post(url, params, req);
  return res;
};

const getPASLockEventLogs = async (params, req): Promise<any> => {
  const url = 'pas_lock_event_logs';
  const res = await $post(url, params, req);
  return res;
};

const getServerStatus = async (params, req): Promise<any> => {
  const url = '/rm/status';
  const res = await $get(req, url);
  return res;
};

const getBuilding = async (params, req): Promise<any> => {
  let url = 'buildings?';
  if (params.searchAll) {
    url += '&search=' + params.searchAll;
  }
  const res = await $post(url, params, req);
  return res;
};

const saveBuilding = async (params, req): Promise<any> => {
  const url = 'building';
  const res = await $post(url, params, req);
  return res;
};

const deleteBuilding = async (params, req): Promise<any> => {
  const url = 'building/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const getBuildingUnits = async (params, req): Promise<any> => {
  const url = 'buildingunits';
  const res = await $post(url, params, req);
  return res;
};

const saveBuildingUnit = async (params, req): Promise<any> => {
  const url = 'buildingunit';
  const res = await $post(url, params, req);
  return res;
};

const deleteBuildingUnit = async (params, req): Promise<any> => {
  const url = 'buildingunit/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const getFloorLevels = async (params, req): Promise<any> => {
  const url = 'floorlevels';
  const res = await $post(url, params, req);
  return res;
};

const saveFloorLevel = async (params, req): Promise<any> => {
  const url = 'floorlevel';
  const res = await $post(url, params, req);
  return res;
};

const deleteFloorLevel = async (params, req): Promise<any> => {
  const url = 'floorlevel/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const deleteMeter = async (params, req): Promise<any> => {
  const url = 'meter/' + params.msn;
  const res = await $delete(url, params, req);
  return res;
};

const getDMSSites = async (params, req): Promise<any> => {
  const url = 'sites';
  const res = await $post(url, params, req);
  return res;
};

const saveDMSProject = async (params, req): Promise<any> => {
  const url = 'dms/project';
  const res = await $post(url, params, req);
  return res;
};

const getDMSProjects = async (params, req): Promise<any> => {
  const url = 'dms/projects';
  const res = await $post(url, params, req);
  return res;
};

const getDMSApplications = async (params, req): Promise<any> => {
  const url = 'dms/applications';
  const res = await $post(url, params, req);
  return res;
};

const getDMSApplicationUsers = async (params, req): Promise<any> => {
  const url = 'dms/applications/' + params.options?.applicationId + '/users';
  const res = await $post(url, params, req);
  return res;
};

const getDMSPicUsers = async (params, req): Promise<any> => {
  const url = 'dms/pic-users';
  const res = await $post(url, params, req);
  return res;
};

const deleteDMSProject = async (params, req): Promise<any> => {
  const url = 'dms/project/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const saveDMSSite = async (params, req): Promise<any> => {
  const url = 'site';
  const res = await $post(url, params, req);
  return res;
};

const deleteDMSSite = async (params, req): Promise<any> => {
  const url = 'site/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const deleteDMSWorkOrders = async (params, req): Promise<any> => {
  const url = 'work-order/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const saveDMSWorkOrder = async (params, req): Promise<any> => {
  const url = 'work-order/' + params.site?.id;
  const res = await $post(url, params, req);
  return res;
};

const saveDMSApplication = async (params, req): Promise<any> => {
  const url = 'dms/project/' + params.projectId + '/application';
  const res = await $post(url, params, req);
  return res;
};

const updateDMSApplication = async (params, req): Promise<any> => {
  const url = 'dms/project/' + params.projectId + '/application/' + params.id;
  const res = await $put(url, params, req);
  return res;
};

const rejectDMSApplication = async (params, req): Promise<any> => {
  const url = 'dms/application/' + params.id + '/reject';
  const res = await $put(url, params, req);
  return res;
};

const terminateDMSApplication = async (params, req): Promise<any> => {
  const url = 'dms/application/' + params.id + '/terminate';
  const res = await $put(url, params, req);
  return res;
};

const deleteDMSApplication = async (params, req): Promise<any> => {
  const url = 'dms/application/' + params.id + '/delete';
  const res = await $delete(url);
  return res;
};

const approveDMSApplication = async (params, req): Promise<any> => {
  const url = 'dms/application/' + params.id + '/approve';
  const res = await $put(url, params, req);
  return res;
};

const linkLocationSite = async (params, req): Promise<any> => {
  const url = 'site/' + params.siteId + '/location';
  const res = await $post(url, params, req);
  return res;
};

const linkProjectSite = async (params, req): Promise<any> => {
  const url =  'dms/project/' + params.projectId + '/link-site';
  const res = await $post(url, params, req);
  return res;
};

const linkProjectPicUser = async (params, req): Promise<any> => {
  const url =  'dms/project/' + params.projectId + '/link-pic-user';
  const res = await $post(url, params, req);
  return res;
};

const unLinkLocationSite = async (params, req): Promise<any> => {
  const url = 'site/' + params.siteId + '/location/' + params.linkSiteLocationId;
  const res = await $delete(url, params, req);
  return res;
};

const linkLocationLock = async (params, req): Promise<any> => {
  const url = 'lock/' + params.lockId + '/location';
  const res = await $post(url, params, req);
  return res;
};

const unLinkLocationLock = async (params, req): Promise<any> => {
  const url = 'lock/' + params.lockId + '/location/' + params.linkLockLocationId;
  const res = await $delete(url, params, req);
  return res;
};

const getBlocks = async (params, req): Promise<any> => {
  const url = 'blocks';
  const res = await $post(url, params, req);
  return res;
};

const saveBlock = async (params, req): Promise<any> => {
  const url = 'block';
  const res = await $post(url, params, req);
  return res;
};

const deleteBlock = async (params, req): Promise<any> => {
  const url = 'block/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const getLearntApplianceID = async (params, req): Promise<any> => {
  let url = 'v1/appliances/' + params.gatewayId + '/getLearntApplianceID';
  if (params.friendlyName) {
    url += '?friendlyName=' + params.friendlyName;
  }
  const res = await $get(req, url);
  return res;
};

const getLearntApplianceStatus = async (params, req): Promise<any> => {
  let url = 'v1/appliances/' + params.gatewayId + '/getLearntApplianceStatus';
  url += '?arrId=' + (params.arrId || '');
  const res = await $get(req, url);
  return res;
};

const setFriendlyName = async (params, req): Promise<any> => {
  let url = 'v1/appliances/' + params.gatewayId + '/' + params.applianceId + '/setFriendlyName';
  if (params.friendlyName) {
    url += '?friendlyName=' + params.friendlyName;
  }
  const res = await $post(url, params, req);
  return res;
};
const getGatewayId = async (params, req): Promise<any> => {
  const url = 'v1/gateway/' + params.smartDbNumber;
  const res = await $get(req, url);
  return res;
};

const linkOrUnlinkAppliances = async (params, req): Promise<any> => {
  let url = 'v1/appliances/' + params.gatewayId + '/' + params.linkedApplianceId + '?';

  if (params.linkedApplianceName) {
    url += 'friendlyName=' + params.linkedApplianceName;

  }
  if (params.id) {
    url += '&linkedBplId=' + (params.unLink ? 'none' : params.id);
  }

  if (params.type) {
    url += '&type=' + params.type;
    delete params.type;
  }

  if (params.unLink) {
    delete params.linkedApplianceId;
    delete params.linkedApplianceName;
    delete params.isMedical;
    delete params.isHeating;
  }

  delete params.unLink;
  delete params.gatewayId;
  delete params.applianceId;
  delete params.linkedBplId;

  const res = await $put(url, params, req);
  return res;
};

if (typeof window === 'object') {
  window.setFriendlyName = setFriendlyName;
}

const removeGateway = async (params, req): Promise<any> => {
  const url = 'gateway/' + params.gatewayId + '/unregister/';
  const res = await $delete(url, params, req);
  return res;
};

const addZWaveDevices = async (params, req): Promise<any> => {
  let url = 'v1/devices/' + params.gatewayId + '/addZWaveDevices?';

  if (params.qrCode) {
    url += '&qrCode=' + params.qrCode;
  }
  if (params.description) {
    url += '&desc=' + params.description;
  }
  const res = await $post(url);
  return res;
};

const removeZWaveDevices = async (params, req): Promise<any> => {
  let url = 'v1/devices/' + params.gatewayId + '/removeZWaveDevices?';
  if (params.deviceId) {
    url += '&deviceId=' + params.deviceId;
  }
  const res = await $post(url);
  return res;
};

const updateZWaveDevice = async (params, req): Promise<any> => {
  let url = 'v1/devices/' + params.gatewayId + '/updateZWaveDevice?';

  url += '&deviceId=' + (params.deviceId || '');
  url += '&description=' + (params.description || '');
  url += '&typename=' + (params.typename || '');
  url += '&assocId=' + (params.assocId || '');
  url += '&assocDesc=' + (params.assocDesc || '');

  const res = await $post(url);
  return res;
};

const turnSwitchZwaveDevice = async (params, req): Promise<any> => {
  const url = 'v1/devices/' + params.gatewayId + '/' + params.deviceId + '/turn-switch-zwave/' + params.type;
  const res = await $post(url);
  return res;
};

const updateGateway = async (params, req): Promise<any> => {
  const url = 'v1/gateways/' + params.smartDbNumber + '/update';
  const res = await $post(url, params, req);
  return res;
};

const getOSInfos = async (params, req): Promise<any> => {
  let url = 'v1/zabbix/prov-portal-api.php?';
  if (params.gatewayId) {
    url += '?host=' + params.gatewayId;
  }
  const res = await $get(req, url);
  return res;
};

const getZwaveDeviceStatus = async (params, latest): Promise<any> => {
  let url = 'v1/devices/pi-status?';
  if (latest) {
    url += '&latest=' + latest;
  }
  const res = await $post(url, params);
  return res;
};

const getSettings = async (params, req): Promise<any> => {
  const url = 'settings';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const saveSetting = async (params, req): Promise<any> => {
  const url = 'setting';
  const res = await $post(url, params, req);
  return res;
};

const deleteSetting = async (params, req): Promise<any> => {
  const url = 'setting/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const getSettingByKey = async (params, req): Promise<any> => {
  const url = 'setting/' + params.key;
  const res = await $get(req, url);
  return res;
};

const getCompanies = async (params, req): Promise<any> => {
  const url = 'companies';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteCompany = async (params): Promise<any> => {
  const res = await $delete('company/' + params.id);
  return res;
};

const createCompany = async (params): Promise<any> => {
  const res = await $post('company', params);
  return res;
};

const getLocks = async (params, req): Promise<any> => {
  const url = 'locks';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteLock = async (params): Promise<any> => {
  const res = await $delete('lock/' + params.id);
  return res;
};

const createLock = async (params): Promise<any> => {
  const res = await $post('lock', params);
  return res;
};

const getKeys = async (params, req): Promise<any> => {
  const url = 'keys';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteKey = async (params): Promise<any> => {
  const res = await $delete('key/' + params.id);
  return res;
};

const createKey = async (params): Promise<any> => {
  const res = await $post('key', params);
  return res;
};

const getKeyGroups = async (params, req): Promise<any> => {
  const url = 'keyGroups';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteKeyGroup = async (params): Promise<any> => {
  const res = await $delete('keyGroup/' + params.id);
  return res;
};

const createKeyGroup = async (params): Promise<any> => {
  const res = await $post('keyGroup', params);
  return res;
};

const getPermitToEnter = async (params, req): Promise<any> => {
  const url = 'permitsToEnter';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deletePermit = async (params): Promise<any> => {
  const res = await $delete('permitToEnter/' + params.id);
  return res;
};

const createPermit = async (params): Promise<any> => {
  const res = await $post('permitToEnter', params);
  return res;
};

const getLockGroups = async (params, req): Promise<any> => {
  const url = 'lockGroups';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};
const deleteLockGroup = async (params): Promise<any> => {
  const res = await $delete('lockGroup/' + params.id);
  return res;
};

const createLockGroup = async (params): Promise<any> => {
  const res = await $post('lockGroup', params);
  return res;
};
const getHistoryLogs = async (params, req): Promise<any> => {
  const url = 'historyLogs';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const getPayments = async (params, req): Promise<any> => {
  const url = 'payments';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deletePayment = async (params): Promise<any> => {
  const res = await $delete('payment/' + params.id);
  return res;
};

const createPayment = async (params): Promise<any> => {
  const res = await $post('payment', params);
  return res;
};

const getQRCode = async (params, req): Promise<any> => {
  const url = 'qrCodes';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteQRCode = async (params): Promise<any> => {
  const res = await $delete('qrCode/' + params.id);
  return res;
};

const createQRCode = async (params): Promise<any> => {
  const res = await $post('qrCode', params);
  return res;
};

const getBeacons = async (params, req): Promise<any> => {
  const url = 'beacons';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteBeacon = async (params): Promise<any> => {
  const res = await $delete('beacon/' + params.id);
  return res;
};

const createBeacon = async (params): Promise<any> => {
  const res = await $post('beacon', params);
  return res;
};

const getAlarms = async (params, req): Promise<any> => {
  const url = 'fireAlarms';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteAlarm = async (params): Promise<any> => {
  const res = await $delete('fireAlarm/' + params.id);
  return res;
};

const createAlarm = async (params): Promise<any> => {
  const res = await $post('fireAlarm', params);
  return res;
};

const getAlarmResponses = async (params, req): Promise<any> => {
  const url = 'fireAlarmRespones';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteAlarmResponse = async (params): Promise<any> => {
  const res = await $delete('fireAlarmRespone/' + params.id);
  return res;
};

const createAlarmResponse = async (params): Promise<any> => {
  const res = await $post('fireAlarmRespones', params);
  return res;
};

const getGantryAccess = async (params, req): Promise<any> => {
  const url = 'get/gantryAccess';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteGantryAccess = async (params): Promise<any> => {
  const res = await $delete('gantryAccess/' + params.id);
  return res;
};

const createGantryAccess = async (params): Promise<any> => {
  const res = await $post('gantryAccess', params);
  return res;
};

const getUserLocationTracking = async (params, req): Promise<any> => {
  const url = 'userLocations';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteUserLocationTracking = async (params): Promise<any> => {
  const res = await $delete('userLocation/' + params.id);
  return res;
};

const createUserLocationTracking = async (params): Promise<any> => {
  const res = await $post('userLocations', params);
  return res;
};

const getLockApprovalSetting = async (params, req): Promise<any> => {
  const url = 'lockApprovalSettings';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const deleteLockApprovalSetting = async (params): Promise<any> => {
  const res = await $delete('lockApprovalSetting/' + params.id);
  return res;
};

const createLockApprovalSetting = async (params): Promise<any> => {
  const res = await $post('lockApprovalSetting', params);
  return res;
};

const sendCommand = async (params): Promise<any> => {
  const res = await $post('command', params);
  return res;
};

const getECode = async (params): Promise<any> => {
  const res = await $post('get_ecode', params);
  return res;
};

const getFiles = async (params, req): Promise<any> => {
  const res = await $get(req, 'files?types=' + params.type + (!!params.uid ? ('&uids=' + params.uid) : ''));
  return res;
};

const getP1Files = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('p1-files', params, req);
  return res;
};

const countAlarms = async (req): Promise<any> => {
  const res = await $get(req, 'cal-dashboard');
  return res;
};

const getAllDevices = async (params, req): Promise<any> => {
  const url = 'ca-request-logs';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const getAllMeterDevices = async (params, req): Promise<any> => {
  const url = 'meters';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const getDeviceLogs = async (params, req): Promise<any> => {
  const url = 'device-logs';
  params = params || { offset: 0, limit: 10000 };
  const res = await $post(url, params, req);
  return res;
};

const getMeterCommissions = async (params, req): Promise<any> => {
  const url = 'meter-commissions';
  params = params || { offset: 0, limit: 5 };
  const res = await $post(url, params, req);
  return res;
};

const editDevice = async (params): Promise<any> => {
  const res = await $post('ca-request-log', params);
  return res;
};

const uploadFirmware = async (params): Promise<any> => {
  const formData = new FormData();
  formData.append('file', params.file, params.file.name);
  const res = await $post('firm-ware/upload/' + params.version + '/' + params.hashCode, formData);
  return res;
};

const getUploadedFirmware = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('firm-wares', params);
  return res;
};

const getVendors = async (req): Promise<any> => {
  const res = await $get(req, 'vendors');
  return res;
};

const getP2Managers = async (req): Promise<any> => {
  const res = await $get(req, 'p2/get-managers');
  return res;
};

const getP2WorkerByManager = async (manager, req): Promise<any> => {
  const res = await $get(req, `p2/${manager}/get-workers`);
  return res;
};

const deleteFirmware = async (params): Promise<any> => {
  const res = await $delete('firm-ware/' + params.id);
  return res;
};

const getRelatedLogs = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('logs', params);
  return res;
};

const getMeterLogs = async (params): Promise<any> => {
  const res = await $post('meter/logs', params);
  return res;
};

const getCids = async (params, req): Promise<any> => {
  const res = await $get(req, 'ca-request-log/cids');
  return res;
};

const getDeviceGroups = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('device-groups', params);
  return res;
};

const UpdateGroupRole = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('device-group-role', params);
  return res;
};

const addDeviceGroup = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('device-group', params);
  return res;
};

const deleteDeviceGroup = async (params): Promise<any> => {
  const res = await $delete('device-group/' + params.id);
  return res;
};

const editGroup = async (params): Promise<any> => {
  const res = await $post('device-group', params);
  return res;
};

const getCountDevices = async (params, req): Promise<any> => {
  const res = await $get(req, 'ca-request-log/count-devices');
  return res;
};

const getDashboard = async (params, req): Promise<any> => {
  const res = await $get(req, 'dashboard');
  return res;
};

const getCountAlarm = async (params, req): Promise<any> => {
  const res = await $get(req, 'cal-dashboard');
  return res;
};

const markViewAll = async (): Promise<any> => {
  const res = await $post('alarm-mark-view-all', {});
  return res;
};

const getPiClients = async (params, req): Promise<any> => {
  let url = 'pis?';
  if (params.offset) {
    url += '&offset=' + params.offset;
  }
  if (params.limit) {
    url += '&limit=' + params.limit;
  }
  if (params.type) {
    url += '&type=' + params.type;
  }
  const res = await $get(req, url);
  return res;
};

const getBatchLogs = async (params, req): Promise<any> => {
  let url = 'batch-logs?';
  if (params.offset) {
    url += '&offset=' + params.offset;
  }
  if (params.limit) {
    url += '&limit=' + params.limit;
  }
  if (params.search) {
    url += '&search=' + params.search;
  }
  if (Number(params.groupTaskId) > 0) {
    url += '&groupTaskId=' + params.groupTaskId;
  }
  const res = await $get(req, url);
  return res;
};

const pingPi = async (params, req): Promise<any> => {
  let url = 'ping?type=ping';
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      url = url.concat(`&${key}=${params[key]}`);
    }
  });
  const res = await $get(req, url);
  return res;
};

const getPiLogs = async (params, req): Promise<any> => {
  let url = 'pi/logs?msn=' + params.msn + '&mid=' + params.mid;
  const res = await $get(req, url);
  return res;
};

const getDevicesInGroup = async (params): Promise<any> => {
  const res = await $post('devices-in-groups', params);
  return res;
};

const getGroupTask = async (params, req): Promise<any> => {
  let url = 'schedule/group-task?';
  if (params.offset) {
    url += '&offset=' + params.offset;
  }
  if (params.limit) {
    url += '&limit=' + params.limit;
  }
  const res = await $post(url, params);
  return res;
};

const getCommand = async (params, req): Promise<any> => {
  let url = '/command-enum?';
  if (params.offset) {
    url += '&offset=' + params.offset;
  }
  if (params.limit) {
    url += '&limit=' + params.limit;
  }
  const res = await $get(req, url);
  return res;
};

const createSchedule = async (params): Promise<any> => {
  let time = params.time || '';
  let dayOfWeek = params.dayOfWeek || 0;
  let dayOfMonth = params.dayOfMonth || 1;
  delete params.time;
  delete params.dayOfWeek;
  delete params.dayOfMonth;

  let temp = time.split(/\:/g);
  if (temp.length == 2 && !isNaN(Number(temp[0])) && !isNaN(Number(temp[1]))) {
    params.hour = Number(temp[0]);
    params.minute = Number(temp[1]);
  }
  if (params.type == 'DAILY') {
    params.startTime = '1970-01-01T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    params.startTime = moment(params.startTime).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  if (params.type == 'WEEKLY') {
    params.startTime = '1970-02-15T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    let d = new Date(params.startTime);
    d.setDate(d.getDate() + (dayOfWeek - d.getDay()))
    params.startTime = moment(d).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  if (params.type == 'MONTHLY') {
    params.startTime = '1970-02-15T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    let d = new Date(params.startTime);
    d.setDate(dayOfMonth)
    params.startTime = moment(d).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  if (params.type == 'ONE_TIME') {
    params.startTime = params.date + 'T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    params.startTime = moment(params.startTime).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  console.log(params);
  const res = await $post('schedule/group-task/create', params);
  return res;
};

const editSchedule = async (params): Promise<any> => {
  let time = params.time || '';
  delete params.time;
  let temp = time.split(/\:/g);
  if (temp.length == 2 && !isNaN(Number(temp[0])) && !isNaN(Number(temp[1]))) {
    params.hour = Number(temp[0]);
    params.minute = Number(temp[1]);
  }

  if (params.type == 'DAILY') {
    params.startTime = '1970-01-01T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    params.startTime = moment(params.startTime).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  if (params.type == 'ONE_TIME') {
    params.startTime = params.date + 'T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    params.startTime = moment(params.startTime).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  console.log(params);
  const res = await $put('schedule/group-task/edit/'+ params.id, params);
  return res;
};

const deleteSchedule = async (params, req): Promise<any> => {
  const url = 'schedule/group-task/' + params.id + '/remove';
  const res = await $delete(url, params, req);
  return res;
};

const getReport = async (params): Promise<any> => {
  const res = await $post('reports', params);
  return res;
};

const deleteReport = async (params, req): Promise<any> => {
  const url = 'report/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const getParameter = async (params, req): Promise<any> => {
  let url = '/report/parameters/' + params.id;
  const res = await $get(req, url);
  return res;
};

const getP2Jobs = async (params, req): Promise<any> => {
  let url = 'p2/job-no/' + (params?.jobNo || 'na') + '/jobs?hasSubmitReport=' + (params?.hasSubmitReport || '') + '&msn=' + (params?.msn || '') + '&p2Worker=' + (params?.p2Worker || '') + '&contractOrder=' + (params?.contractOrder || '');
  const res = await $get(req, url);
  return res;
};

const saveP2Job = async (params): Promise<any> => {
  const res = await $post('p2/job-no/' + params.jobNo + '/job', params);
  return res;
};

const getP1Report = async (params, req): Promise<any> => {
  const res = await $post('p1_reports', params, req);
  return res;
};

const validateLoginPwd = async (params): Promise<any> => {
  const res = await $post('user/validate-password', params);
  return res;
};

const deleteP2Report = async (params): Promise<any> => {
  const res = await $delete('p2/job-no/' + params.jobNo + '/job');
  return res;
};

const deleteP1Report = async (params): Promise<any> => {
  const res = await $delete('p1_report/' + params.id + '/');
  return res;
};

const createReportSchedule = async (params): Promise<any> => {
  let time = params.time || '';
  let dayOfWeek = params.dayOfWeek || 0;
  let dayOfMonth = params.dayOfMonth || 1;
  delete params.time;
  let temp = time.split(/\:/g);
  if (temp.length == 2 && !isNaN(Number(temp[0])) && !isNaN(Number(temp[1]))) {
    params.hour = Number(temp[0]);
    params.minute = Number(temp[1]);
  }

  if (params.type == 'DAILY') {
    params.startTime = '1970-01-01T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    params.startTime = moment(params.startTime).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  if (params.type == 'ONE_TIME') {
    params.startTime = params.date + 'T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    params.startTime = moment(params.startTime).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  if (params.type == 'WEEKLY') {
    params.startTime = '1970-02-15T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    let d = new Date(params.startTime);
    d.setDate(d.getDate() + (dayOfWeek - d.getDay()))
    params.startTime = moment(d).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  if (params.type == 'MONTHLY') {
    params.startTime = '1970-02-15T' + (params.hour > 9 ? params.hour : ('0' + params.hour)) + ':' + (params.minute > 9 ? params.minute : ('0' + params.minute)) + ':00'
    let d = new Date(params.startTime);
    d.setDate(dayOfMonth)
    params.startTime = moment(d).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
  console.log(params);
  const res = await $post('schedule/report-task/create', params);
  return res;
};

const getReportSchedule = async (params): Promise<any> => {
  const res = await $post('schedule/report-task/' + params.id, params);
  return res;
};

const getReportFileSchedule = async (params): Promise<any> => {
  const res = await $post('/schedule/report-task/download/' + params.id, params);
  return res;
};

const deleteReportTask = async (params, req): Promise<any> => {
  const url = 'schedule/report-task/' + params.id + '/remove';
  const res = await $delete(url, params, req);
  return res;
};

const getReportFile = async (params, req): Promise<any> => {
  let url = 'schedule/report-file?';
  if (params.search) {
    url += '&search=' + params.search;
  }
  if (Number(params.reportTaskId) > 0) {
    url += '&reportTaskId=' + params.reportTaskId;
  } else {

  }
  const res = await $post(url, params);
  return res;
};

const searchBatchLog = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('batch-logs/search', params);
  return res;
};

const searchLogs = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('logs/search', params);
  return res;
};

const searchLinkMSN = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('caRequestLog/search', params);
  return res;
};

const saveMeterCommissionSubmit = async (params): Promise<any> => {
  const res = await $post('submit-meter-commission', params);
  return res;
};

const saveBulkSubmitP1Report = async (params): Promise<any> => {
  const res = await $post('bulk-submit-p1-report', params);
  return res;
};

const saveBulkMeterCommissionSubmit = async (params): Promise<any> => {
  const res = await $post('bulk-submit-meter-commission', params);
  return res;
};

const saveBulkReportAck = async (params): Promise<any> => {
  const res = await $post('bulk-submit-report-ack', params);
  return res;
};

const getRoles = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('roles', params);
  return res;
};

const createRoles = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('role/create', params);
  return res;
};

const createP2Workers = async (params): Promise<any> => {
  params = params || {};
  const res = await $post(`p2/${params.manager}/add-worker`, params.workers);
  return res;
};

const updateRoles = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $put('role/update', params);
  return res;
};

const deleteRole = async (params, req): Promise<any> => {
  const url = 'role/delete/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const deleteP2Worker = async (params, req): Promise<any> => {
  params = params || {};
  const url = `p2/${params.manager}/delete-worker/${params.worker}`;
  const res = await $delete(url, params, req);
  return res;
};

const getPermission = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('permissions', params);
  return res;
};

const getGroupUsers = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('groupUsers', params);
  return res;
};

const getMyGroupUsers = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('myGroupUsers', params);
  return res;
};


const createGroupUser = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('groupUser/create', params);
  return res;
};

const createSubGroupUser = async (params): Promise<any> => {
  params = params || {  };
  const res = await $post('subGroupUser/create', params);
  return res;
};

const addUserToSubGroup = async (params): Promise<any> => {
  params = params || {  };
  const res = await $post('subGroupUser/addUserToSubGroup', params);
  return res;
};

const addRoleToSubGroupMember = async (params): Promise<any> => {
  params = params || {  };
  const res = await $post('subGroupUser/addRoleToSubGroupMember', params);
  return res;
};

const updateGroupUser = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $put('groupUser/update', params);
  return res;
};

const deleteGroupUser = async (params, req): Promise<any> => {
  const url = 'groupUser/delete/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const deleteSubGroupUser = async (params, req): Promise<any> => {
  const url = 'subGroupUser/delete/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const getBlockOfBuilding = async (params, req): Promise<any> => {
  let url = 'blocks';
  const res = await $post(url, params, req);
  return res;
};

const saveBlockOfBuilding = async (params, req): Promise<any> => {
  let url = 'block';
  const res = await $post(url, params, req);
  return res;
};

const deleteBlockOfBuilding = async (params, req): Promise<any> => {
  let url = 'block/' + params.id;
  const res = await $delete(url, params, req);
  return res;
};

const getMeterFileDatas = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('meterFileDatas', params);
  return res;
};

const unLinkMsn = async (params, req): Promise<any> => {
  const url = 'un-link-msn/' + params.cid;
  const res = await $post(url);
  return res;
};
const linkMsn = async (params, req): Promise<any> => {
  const res = await $post('link-msn', params);
  return res;
};

const batchCoupleDevices = async (params, req): Promise<any> => {
  const res = await $post('ca-request-log/batch-couple', params);
  return res;
};

const removeEVSDevice = async (params, req): Promise<any> => {
  const url = 'remove-device/' + params.uid;
  const res = await $delete(url, params.reason);
  return res;
};

const getAddressLogs = async (params): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('address-logs', params);
  return res;
};

const getOtp = async (params): Promise<any> => {
  const res = await $post('otp', params);
  return res;
};

const resetPassword = async (params): Promise<any> => {
  const res = await $post('user/resetPassword', params);
  return res;
};

const preLogin = async (params): Promise<any> => {
  const url = 'user/credential-type?username=' + params.username;
  const res = await $post(url, params);
  return res;
};

const getP1OnlineStatuses = async (params, req): Promise<any> => {
  const url = 'p1-online-statuses';
  params = params || { offset: 0, limit: 5 };
  const res = await $post(url, params, req);
  return res;
};

const getRelayStatusLogs = async (params, req): Promise<any> => {
  const url = 'rls-command-logs';
  params = params || { offset: 0, limit: 10 };
  const res = await $post(url, params, req);
  return res;
};

const sendRLSCommandForDevices = async (params, req): Promise<any> => {
  const url = 'ca-request-log/command?command=' + params.command;
  params = params || { offset: 0, limit: 10000 };
  delete params.command;
  const res = await $post(url, params, req);
  return res;
};

const getUserOfSubGroups = async (params, req): Promise<any> => {
  params = params || {offset: 0, limit: 10000}
  const res = await $post('getUserOfSubGroup', params, req);
  return res;
};

const getRoleOfMemberSubGroup = async (params, req): Promise<any> => {
  params = params || {offset: 0, limit: 10000}
  params.offset = 0;
  params.limit = 10000;
  const res = await $post('getRoleOfMemberSubGroup', params, req);
  return res;
};

const removeUserFromSubGroup = async (params): Promise<any> => {
  params = params || {};
  const res = await $post('subGroupUser/removeUserFromSubGroup', params);
  return res;
};

const getProjectTags = async (params, req): Promise<any> => {
  const url = 'project-tags';
  params = params || { offset: 0, limit: 10 };
  const res = await $post(url, params, req);
  return res;
};

const deleteProjectTag = async (params, req): Promise<any> => {
  const url = 'project-tag/' + params.tagId;
  const res = await $delete(url, params, req);
  return res;
};

const saveProjectTag = async (params): Promise<any> => {
  const res = await $post('project-tag', params);
  return res;
};

const getDMSSiteWorkOrders = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('work-orders', params, req);
  return res;
};

const getDMSSiteLocations = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('site/' + params?.options?.siteId + '/locations', params, req);
  return res;
};

const getDMSLockVendors = async (req): Promise<any> => {
  const res = await $get(req, 'dms-lock-vendors');
  return res;
};

const syncLocks = async (params, req): Promise<any> => {
  const res = await $post('sync_lock/' + params.vendor, params, req);
  return res;
};

const getDeviceFilters = async (req): Promise<any> => {
  const res = await $get(req, 'device-filters');
  return res;
};

const saveDeviceFilters = async (params): Promise<any> => {
  const res = await $post('device-filters', params);
  return res;
};

const updateVendor = async (params): Promise<any> => {
  const res = await $post('vendor', params);
  return res;
};

const updateDevicesNode = async (params): Promise<any> => {
  const res = await $post('devices-node?deviceIds=' + params.deviceIds + "&ieiNode=" + params.ieiNode + "&isDistributed=" + params.isDistributed + (!!params.sendMDTToPi ? ("&sendMDTToPi=" + params.sendMDTToPi) : ""), {...params.filter});
  return res;
};

const getAccessPermission = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10 };
  const url = 'dms/nus-access-keys';
  const res = await $post(url, params, req);
  return res;
};

const addAccessPermission = async (params, req): Promise<any> => {
  const url = 'dms/nus-access-key';
  const res = await $post(url, params, req);
  return res;
};

export {
  unLinkMsn,
  removeEVSDevice,
  getLogs,
  getDevices,
  getPiUploads,
  getGatewayDevices,
  updateGatewayDevice,
  turnSwitchDevice,
  removeDevice,
  startLearnAppliance,
  stopLearnAppliance,
  getAppliances,
  updateAppliances,
  getServerStatus,
  getRMServers,
  getBuilding,
  saveBuilding,
  deleteBuilding,
  getBuildingUnits,
  saveBuildingUnit,
  deleteBuildingUnit,
  getFloorLevels,
  saveFloorLevel,
  deleteFloorLevel,
  getBlocks,
  saveBlock,
  deleteBlock,
  getLearntApplianceID,
  getLearntApplianceStatus,
  setFriendlyName,
  linkOrUnlinkAppliances,
  getGatewayId,
  removeGateway,
  addZWaveDevices,
  removeZWaveDevices,
  updateZWaveDevice,
  turnSwitchZwaveDevice,
  updateGateway,
  getOSInfos,
  getZwaveDeviceStatus,
  removeCSR,
  getGatewayNetworkInfo,
  getSettings,
  saveSetting,
  deleteSetting,
  getCompanies,
  createCompany,
  deleteCompany,
  getKeyGroups,
  getKeys,
  getLockGroups,
  createLockGroup,
  deleteLockGroup,
  getLocks,
  createLock,
  deleteLock,
  deleteKey,
  createKey,
  getHistoryLogs,
  createPayment,
  getPayments,
  deletePayment,
  deleteKeyGroup,
  createKeyGroup,
  getPermitToEnter,
  deletePermit,
  createPermit,
  getQRCode,
  createQRCode,
  deleteQRCode,
  createBeacon,
  getBeacons,
  deleteBeacon,
  getAlarms,
  deleteAlarm,
  createAlarm,
  getAlarmResponses,
  createAlarmResponse,
  deleteAlarmResponse,
  createGantryAccess,
  deleteGantryAccess,
  getGantryAccess,
  getUserLocationTracking,
  deleteUserLocationTracking,
  createUserLocationTracking,
  createLockApprovalSetting,
  deleteLockApprovalSetting,
  getLockApprovalSetting,
  sendCommand,
  getAllDevices,
  editDevice,
  uploadFirmware,
  getUploadedFirmware,
  deleteFirmware,
  getRelatedLogs,
  getMeterLogs,
  getCids,
  getDeviceGroups,
  addDeviceGroup,
  deleteDeviceGroup,
  editGroup,
  countAlarms,
  getCountDevices,
  getDashboard,
  getCountAlarm,
  markViewAll,
  getPiClients,
  getBatchLogs,
  pingPi,
  getPiLogs,
  getDevicesInGroup,
  getGroupTask,
  getCommand,
  createSchedule,
  deleteSchedule,
  editSchedule,
  getReport,
  deleteReport,
  getParameter,
  createReportSchedule,
  getReportSchedule,
  getReportFileSchedule,
  deleteReportTask,
  getReportFile,
  searchBatchLog,
  searchLogs,
  searchLinkMSN,
  getRoles,
  createRoles,
  deleteRole,
  updateRoles,
  getPermission,
  UpdateGroupRole,
  getGroupUsers,
  createGroupUser,
  updateGroupUser,
  deleteGroupUser,
  getBlockOfBuilding,
  saveBlockOfBuilding,
  deleteBlockOfBuilding,
  getMeterFileDatas,
  getSettingByKey,
  getVendors,
  getAddressLogs,
  getOtp,
  resetPassword,
  getFiles,
  preLogin,
  getLastSubmit,
  getMeterCommissions,
  getP1OnlineStatuses,
  linkMsn,
  saveMeterCommissionSubmit,
  getP2Jobs,
  saveP2Job,
  saveBulkMeterCommissionSubmit,
  validateLoginPwd,
  deleteP2Report,
  getDeviceLogs,
  sendRLSCommandForDevices,
  getRelayStatusLogs,
  getP1Files,
  batchCoupleDevices,
  getP2Managers,
  getP2WorkerByManager,
  createP2Workers,
  deleteP2Worker,
  saveBulkSubmitP1Report,
  getP1Report,
  getMyGroupUsers,
  createSubGroupUser,
  deleteSubGroupUser,
  addUserToSubGroup,
  getUserOfSubGroups,
  removeUserFromSubGroup,
  getRoleOfMemberSubGroup,
  addRoleToSubGroupMember,
  deleteP1Report,
  getProjectTags,
  deleteProjectTag,
  saveProjectTag,
  saveBulkReportAck,
  getAllMeterDevices,
  getPASLocks,
  getPASLockEventLogs,
  getDMSSites,
  saveDMSSite,
  deleteDMSSite,
  getDMSProjects,
  saveDMSProject,
  deleteDMSProject,
  deleteDMSWorkOrders,
  getDMSSiteWorkOrders,
  getDMSSiteLocations,
  saveDMSWorkOrder,
  linkLocationSite,
  getDMSLockVendors,
  syncLocks,
  linkLocationLock,
  unLinkLocationSite,
  unLinkLocationLock,
  linkProjectSite,
  getDMSPicUsers,
  linkProjectPicUser,
  getDeviceFilters,
  saveDeviceFilters,
  updateDevicesNode,
  getDMSApplications,
  getDMSApplicationUsers,
  saveDMSApplication,
  updateDMSApplication,
  rejectDMSApplication,
  approveDMSApplication,
  deleteDMSApplication,
  terminateDMSApplication,
  getCountries,
  getECode,
  deleteMeter,
  updateVendor,
  getAccessPermission,
  addAccessPermission,
};
