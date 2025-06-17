import { $post, $get, $put, $delete } from '../request';

const getListLockSecondRequest = async (params, req): Promise<any> => {
    params = params || {offset: 0, limit: 10000}
    const res = await $post('lockRequestsSecond', params, req);
    return res;
};

const createLockSecondRequest = async (params): Promise<any> => {
  const res = await $post('lockRequestSecond', params);
  return res;
};

const deleteLockSecondRequest = async (params): Promise<any> => {
  const res = await $delete('lockRequestSecond/' + params.id);
  return res;
};

export {
    getListLockSecondRequest,
    createLockSecondRequest,
    deleteLockSecondRequest
}