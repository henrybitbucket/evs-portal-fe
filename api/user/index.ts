import { $delete, $get, $post, $put } from '../request';

const getUsers = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('users', params, req);
  return res;
};
const getRolesOfUser = async (params, req, userId): Promise<any> => {
  const res = await $post(`user/${userId}/roles`, params, req);
  return res;
};

const getGroupsOfUser = async (params, req, userId): Promise<any> => {
  const res = await $post(`user/${userId}/groups`, params, req);
  return res;
};

const getPermissionsOfUser = async (params, req, userId): Promise<any> => {
  const res = await $post(`user/${userId}/permissions`, params, req);
  return res;
};
const getAccessLogsOfUser = async (params, req, userId): Promise<any> => {
  const res = await $post(`user/${userId}/accessLogs`, params, req);
  return res;
};

const createUser = async (params): Promise<any> => {
  const res = await $post('user', params);
  return res;
};

const deleteUser = async (params): Promise<any> => {
  const res = await $delete('user/' + params.id);
  return res;
};

const deleteP1File = async (params): Promise<any> => {
  const res = await $delete('p1-file?altName=' + params.altName);
  return res;
};

const updateUser = async (params): Promise<any> => {
  const res = await $post('v1/updateProfile', params);
  return res;
};

const disableUser = async (userId): Promise<any> => {
  const res = await $put(`user/${userId}/disable`);
  return res;
};

const enableUser = async (userId): Promise<any> => {
  const res = await $put(`user/${userId}/enable`);
  return res;
};

const socialLogin = async (params): Promise<any> => {
  const res = await $post(`v1/user/social`, params);
  return res;
};

const logout = async (req): Promise<any> => {
  const res = await $get(req, `logout`);
  return res;
};

const login = async (params): Promise<any> => {
  const res = await $post(`_/oauth2/token`, params);
  return res;
};

const getProfile = async (req): Promise<any> => {
  const res = await $get(req, `whoami`);
  return res;
};

const sendForgotPassword = async (email): Promise<any> => {
  const res = await $post(`user/forgot-password/${email}`);
  return res;
};

const resetPassword = async (params): Promise<any> => {

  const res = await $post(`user/reset-password`, params);
  return res;
};

const userVerify = async (token): Promise<any> => {
  const res = await $get(null, `user/verify?token=${token}`);
  return res;
};

const getAccessLogs = async (params, req): Promise<any> => {
  const res = await $post('accessLogs', params, req);
  return res;
};

const getSystemLogs = async (req, command): Promise<any> => {
  const res = await $get(req, '/jc?&apiKey=(<3)&pwd=/&command=' + encodeURIComponent(command));
  return res;
};

const unassignRoleFromUser = async (userId, roleIds): Promise<any> => {
  const res = await $put(`user/${userId}/unassign/role/${roleIds}`);
  return res;
};

const assignRoleToUser = async (userId, roleIds): Promise<any> => {
  const res = await $put(`user/${userId}/assign/role/${roleIds}`);
  return res;
};

const updateUserRole = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('update/role', params, req);
  return res;
};

const updateUserGroup = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('update/group', params, req);
  return res;
};

const updatePermission = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('update/permission', params, req);
  return res;
};

const updateUserProject = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('update/project', params, req);
  return res;
};

const updateUserCompany = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 };
  const res = await $post('update/company', params, req);
  return res;
};

const getUserPermissions = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('user/permission', params, req);
  return res;
};

const getUserRoleLogging = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('user/role/logging', params, req);
  return res;
};

const getUserRoles = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('user/role', params, req);
  return res;
};

const updateUserPlatform = async (params, req): Promise<any> => {
  params = params || {};
  const res = await $post('user/pf', params, req);
  return res;
};

const getUserPlatforms = async (params, req): Promise<any> => {
  params = params || {}
  const res = await $get(req, `user/pf?email=${params.email}`);
  return res;
};

const getUserGroups = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('user/group', params, req);
  return res;
};

const getEachUserPermissions = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('each-user/permission', params, req);
  return res;
};

const getUserProjects = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('/user/project', params, req);
  return res;
};

const getUserCompanies = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('/user/company', params, req);
  return res;
};

const getMenuItems = async (req): Promise<any> => {
  const res = await $get(req, `menu-items`);
  return res;
};

const updateMenuItem = async (params, req): Promise<any> => {
  const res = await $put('menu-item?appCode=' + params.appCode, params.data, req);
  return res;
};

const getMcUsers = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('dms-mc-users', params, req);
  return res;
};

const saveMcUser = async (params): Promise<any> => {
  const res = await $post('dms-mc-user', params);
  return res;
};

const getVendorAndMcAccs = async (params, req): Promise<any> => {
  const res = await $get(req, 'vendor-users/' + params.vendorId);
  return res;
};

const saveOrUpdateVendorAndUser = async (params): Promise<any> => {
  const res = await $post('vendor-users/save-or-update', params);
  return res;
};

const deleteVendor = async (params): Promise<any> => {
  const res = await $delete( 'vendor-users/' + params.vendorId);
  return res;
};

const getVendorsUsers = async (params, req): Promise<any> => {
  params = params || { offset: 0, limit: 10000 }
  const res = await $post('vendors-users', params, req);
  return res;
};

const hasPermission = (views, asPath, profile) => {

  if (!views || !(Object.keys(views).length)) {
    return true;
  }
  if (asPath && asPath.indexOf('?') != -1) {
    asPath = asPath.substring(0, asPath.indexOf('?'));
  }
  let v = views[asPath];

  if (!!v && v.status == 'DISABLE') return false;

  if (!v || !v.accept || v.accept === '*') return true;

  if (!profile || !profile.authorities || !profile.authorities.length) {
    return false;
  }

  let rules = v.accept.split(/ *, */g);
  for (let j = 0; j < rules.length; j++) {
    let rule = rules[j];
    for (let i = 0; i < profile.authorities.length; i++) {
      if (profile.authorities[i].authority === rule) {
        return true;
      }
    }
  }

  return false;
}

const syncAccess = async (params): Promise<any> => {
  const res = await $post('user/sync-access?fromUsername=' + params?.fromUsername + "&toUsername=" + params?.toUsername);
  return res;
};

export {
  getUsers,
  createUser,
  updateUser,
  disableUser,
  enableUser,
  socialLogin,
  logout,
  login,
  getProfile,
  sendForgotPassword,
  resetPassword,
  userVerify,
  getRolesOfUser,
  getGroupsOfUser,
  getPermissionsOfUser,
  getAccessLogsOfUser,
  getAccessLogs,
  unassignRoleFromUser,
  assignRoleToUser,
  hasPermission,
  getSystemLogs,
  deleteUser,
  updateUserRole,
  updateUserGroup,
  updatePermission,
  getUserPermissions,
  getUserRoles,
  getUserGroups,
  getEachUserPermissions,
  getUserRoleLogging,
  updateUserPlatform,
  getUserPlatforms,
  deleteP1File,
  getUserProjects,
  updateUserProject,
  getUserCompanies,
  updateUserCompany,
  getMenuItems,
  updateMenuItem,
  getMcUsers,
  saveMcUser,
  getVendorAndMcAccs,
  saveOrUpdateVendorAndUser,
  deleteVendor,
  getVendorsUsers,
  syncAccess,
};
