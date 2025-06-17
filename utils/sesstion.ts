const get = (key: string) => {
  if (typeof window !== 'undefined' && sessionStorage) {
    return JSON.parse(sessionStorage.getItem(key));
  }
  return undefined;
};

const set = (key: string, value: any) => {
  if (typeof window !== 'undefined' && sessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export {
  get,
  set,
};
