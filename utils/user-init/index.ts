import { getUser } from '@app/redux/user/actions';

const assureUser = async (store, req?) => {
  const { user } = store.getState();

  if (!user.initialised && !(/auth/.test(location.pathname))) {
    await store.dispatch(getUser(req));
  }
};

export { assureUser };
