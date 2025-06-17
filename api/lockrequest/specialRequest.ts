import { $post, $get, $put, $delete } from '../request';

const getListLockSpecialRequest = async (params, req): Promise<any> => {
    params = params || {offset: 0, limit: 10000}
    const res = await $post('lockRequestsSpecial', params, req);
    return res;
};

const createLockSpecialRequest = async (params): Promise<any> => {
  const res = await $post('lockRequestSpecial', params);
  return res;
};

const deleteLockSpecialRequest = async (params): Promise<any> => {
  const res = await $delete('lockRequestSpecial/' + params.id);
  return res;
};

export {
  getListLockSpecialRequest,
  createLockSpecialRequest,
  deleteLockSpecialRequest
}