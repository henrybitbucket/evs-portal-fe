const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

export interface ILocationProps {
  fullUrl: string;
  origin: string;
}

const isServer = () => Object.prototype.toString.call(global.process) === '[object process]';

const concatClasses = (...args): string => {
  return args.reduce((acc, className) => className ? `${acc} ${className}` : acc, '');
};

const repTextCapitalize = (str: string) => str.replace(/[A-Z]/g, item => `_${item}`).toUpperCase();
const checkParternEmail = (email: string) => email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const getLocation = (req: any) => req && req ? {
  // https://stackoverflow.com/a/10185427
  fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
  origin: `${req.protocol}://${req.get('host')}`,
} : undefined;

const persistStoreBetweenPageTransitions = (store) => {
  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = store;
  }
  return window[__NEXT_REDUX_STORE__];
};

const getStoreBetweenPageTransitions = () => {
  if (window[__NEXT_REDUX_STORE__]) {
    return window[__NEXT_REDUX_STORE__];
  }
  return null;
};

const toDoubleDigit = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

export {
  concatClasses,
  isServer,
  getLocation,
  persistStoreBetweenPageTransitions,
  getStoreBetweenPageTransitions,
  checkParternEmail,
  repTextCapitalize,
  toDoubleDigit,
};
