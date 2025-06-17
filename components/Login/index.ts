let LoginKit = require('next/dynamic').default(() => import('./LoginKit').then(mod => mod.LoginKit), {ssr: false});
let UserForm = require('next/dynamic').default(() => import('./UserForm').then(mod => mod.UserForm), {ssr: false});

export {
  LoginKit,
  UserForm,
};
