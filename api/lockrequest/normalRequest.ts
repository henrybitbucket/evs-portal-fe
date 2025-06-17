import { $post, $get, $put, $delete } from '../request';

const getListLockNormalAccess = async (params, req): Promise<any> => {
    params = params || {offset: 0, limit: 10000}
    const res = await $post('lockRequestsNormal', params, req);
    return res;
};

const createLockNormalRequest = async (params): Promise<any> => {
  const res = await $post('lockRequestNormal', params);
  return res;
};

const deleteLockNormalRequest = async (params): Promise<any> => {
  const res = await $delete('lockRequestNormal/' + params.id);
  return res;
};

export {
    getListLockNormalAccess,
    createLockNormalRequest,
    deleteLockNormalRequest
}