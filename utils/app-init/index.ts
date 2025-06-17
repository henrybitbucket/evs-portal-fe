import { isServer } from '@app/utils';
import Router from 'next/router';

const redirect = isServer()
  ? (_?, as?, res?) => res.redirect(as)
  : (url?, as?) => Router.replace(url, as);

const checkUserLoginedOrNot = (res, isTokenExisted: string, asPath: string) => {
  if (!isTokenExisted && !(/auth/.test(asPath))) {
    redirect('/signin', '/auth/signin', res);
    return;
  }
  if (isTokenExisted && /auth/.test(asPath)) {
    redirect('/', '/', res);
    return;
  }
};

const hasAccessOnPage = (res, menuItems, userInfo, asPath) => {

  if (asPath === '/no-authorization') {
    return true;
  }
  let hasAccessOnPage = false;
  let pathItem = null;

  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].path === asPath) {
      pathItem = menuItems[i];
      break;
    }
    if (menuItems[i].children?.length) {
      const subMenu = menuItems[i].children;
      for (let i = 0; i < subMenu.length; i++) {
        if (subMenu[i].path === asPath) {
          pathItem = subMenu[i];
          break;
        }
      }
    }
  }

  const isSuperAdmin = userInfo?.authorities?.filter(r => r.authority.includes('SUPER_ADMIN'))?.length;
  if (pathItem) {
    const authorities = userInfo?.authorities.map(r => r.authority);
    let hasPermission = false;
    let hasRole = false;
    let hasGroup = false;

    pathItem.permissions.forEach(item => {
      if (userInfo?.permissions.includes(item)) {
        hasPermission = true;
        return;
      }
    });
    pathItem.roles.forEach(item => {
      if (authorities.includes(item)) {
        hasRole = true;
        return;
      }
    });
    pathItem.groups.forEach(item => {
      if (userInfo?.groups.includes(item)) {
        hasGroup = true;
        return;
      }
    });
    if (isSuperAdmin || (hasPermission || hasGroup || hasRole) || pathItem.permitAll) {
      hasAccessOnPage = true;
    }
  }
  if (!!isSuperAdmin) {
    hasAccessOnPage = true
  }
  return hasAccessOnPage;
}

export { checkUserLoginedOrNot, redirect, hasAccessOnPage };
