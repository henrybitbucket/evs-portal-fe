import React from 'react';
import dynamic from 'next/dynamic';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { appWithTranslation } from '@app/i18nnext';

import MainLayout from '@app/components/MainLayout';
import { StatusBar } from '@app/components/Common';

import { Provider } from 'react-redux';
import configureStore from '@app/redux/store';
import { toggleSiteMenu } from '@app/redux/site-menu/actions';

import { tokenName } from '@app/utils/public-config';
import { setCookie, getCookie, eraseCookie } from '@app/utils/cookie';
import { assureUser } from '@app/utils/user-init';
import { hasAccessOnPage, redirect } from '@app/utils/app-init';
import { getMenuItems, getProfile } from '@app/api/user';
import { getSettings } from '@app/api/log';
import NavbarHeader from '@app/components/NavbarHeader';
import MenuBar from '@app/components/MenuBar';

import {
  isServer,
  getStoreBetweenPageTransitions,
  persistStoreBetweenPageTransitions,
} from '@app/utils';

const getOrInitReduxStore = (props) => {
  const { store } = props;
  if (store && store.dispatch) {
    return store;
  }

  return configureStore(props.initialState);
};

const hookIntoRouterCallbacks = (store) => {
  Router.events.on('routeChangeStart', () => {
    // store.dispatch(toggleSiteMenu(false));
    NProgress.start();
  });
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
};

const isNotAuthenPage = (asPath: string) => asPath && /\/(auth)/.test(asPath);

interface IMyAppState {
  online?: boolean;
}

class MyApp extends App<any, IMyAppState> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const store = isServer() ? configureStore() : getStoreBetweenPageTransitions();
    let storeRequiredData;

    storeRequiredData = {
      store,
    };

    const { req, res, asPath } = ctx;

    let pathname = asPath.replace(/\?.*$/g, '');
    // const concurentDataFetchingBatch = [];
    // redux related dat fetching before getting initial state
    // concurentDataFetchingBatch.push(assureUser(store, req));
    // concurentDataFetchingBatch.push(assureTopNavMenu(store, req));

    // await Promise.all(concurentDataFetchingBatch);

    const isTokenExisted = getCookie(tokenName, req);
    const appCode = getCookie('app_code', req);
    // check user has token or not
    //checkUserLoginedOrNot(res, isTokenExisted, asPath);

    storeRequiredData.initialState = store.getState();

    let profile = null;
    // check user has token or not
    //checkUserLoginedOrNot(res, isTokenExisted, asPath);
    try {
      if (!!isTokenExisted) {
        let resProfile = await getProfile(req);
        const resMenuItems = await getMenuItems(req);

        profile = resProfile.response || {};
        console.info('user email', profile.email, asPath)
        if (resProfile && (resProfile.success != true)) {
          console.info('eraseCookie0', resProfile)
          eraseCookie(tokenName);
        }

        storeRequiredData.initialState.userInfo = profile;
        storeRequiredData.initialState.menuItems = resMenuItems?.response;

        if (profile.email && !!appCode) {
          if (pathname === '/auth/signin') {
            redirect('/', '/', res);
            return;
          } else if (!/\.[^/.]+$/.test(pathname) && pathname !== '/no-authorization') {
            let menuMms = [];
            let menuDms = [];
            resMenuItems?.response?.map(item => {
              if (item.appCode === "MMS") {
                menuMms = JSON.parse(item?.items);
              } else if (item.appCode === "DMS") {
                menuDms = JSON.parse(item?.items);
              }
            })
            const menuItems = appCode === 'MMS' ? menuMms :menuDms;
            if (!hasAccessOnPage(res, menuItems, storeRequiredData.initialState.userInfo, pathname)) {
              if (pathname === '/' && appCode === 'DMS') {
                redirect('/dms-locks', '/dms-locks', res);
                return;
              } else {
                redirect('/no-authorization', '/no-authorization', res);
                return;
              }
            }
          }
        }
      }
    } catch(err) {console.info(err)};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx, ...storeRequiredData,
      });
    }

    if (pageProps.loginRequire) {
        if (!storeRequiredData.initialState.userInfo || !storeRequiredData.initialState.userInfo.email || !appCode) {
            eraseCookie(tokenName);
            storeRequiredData.initialState.userInfo = null;
            if (asPath !== '/auth/signin') {
              redirect('/auth/signin', '/auth/signin', res);
            }
        }
    }

    return {
      // expose props from the component (allowing custom app behavior)
      pageProps,
      // expose server flag
      isServer,
      // expose redux store data
      ...storeRequiredData,
      asPath,
    };

  }
  state = {
    store: getOrInitReduxStore(this.props),
    online: true,
  };

  async componentDidMount() {
    assureUser(this.state.store);

    hookIntoRouterCallbacks(this.state.store);

    persistStoreBetweenPageTransitions(this.state.store);

    window.addEventListener('offline', this.handleOfflineEvent);
    window.addEventListener('online', this.handleOnlineEvent);

    let profile = null;
    const isTokenExisted = getCookie(tokenName, null);
    // check user has token or not
    //checkUserLoginedOrNot(res, isTokenExisted, asPath);
    try {
        if (!!isTokenExisted) {
            let resProfile = await getProfile(null);
            profile = resProfile.response || {};
            if (resProfile && (resProfile.success !== true)) {
                console.info('eraseCookie', resProfile)
                eraseCookie(tokenName);
            }
            if (this.props.asPath === '/auth/signin' && profile.email) {
                redirect('/', '/');
                return;
            }
            // redirect(this.props.asPath, this.props.asPath);
            this.state.store.dispatch({type: 'SET_USER_INFO', payload: profile})
        }
    } catch(err) {console.info(err)};

    this.onTouch();
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOfflineEvent);
    window.removeEventListener('online', this.handleOnlineEvent);
    clearInterval(this.checkTimeout);
  }

  onTouch = async () => {
    let touchTimeout = 3600;
    try {
      let params = {
          pageNumber: 1,
          limit: 100000,
          offset: 0,
      };
      let rp = await getSettings(params);
      rp = rp?.response || {};
      rp.results = rp.results || [];
      let second = (rp.results || []).filter(it => it.key === 'TIME_UI_TOUCH_EXPIRED')[0];
      touchTimeout = Number(second?.value) > 0 ? Number(second?.value) : 3600;
      if (touchTimeout < 60) {
        touchTimeout = 60;
      }
    } catch(err) {
      console.info(err)
    }
    document.body.addEventListener("click", () => {
      localStorage.setItem('_last_touch', Date.now() + '');
    });
    clearInterval(this.checkTimeout);
    this.checkTimeout = setInterval(() => {
      let lastTouch = localStorage.getItem('_last_touch');
      let store = this.state.store.getState();
      let loggedIn = store?.userInfo;
      let tmpTouchTimeout = touchTimeout;
      if (loggedIn?.autoLogoutUIInactive > 0) {
        tmpTouchTimeout = loggedIn?.autoLogoutUIInactive * 60;
      }
      if (loggedIn?.email && ((Date.now() - Number(lastTouch)) > (tmpTouchTimeout * 1000))) {
        eraseCookie(tokenName);
        redirect('/auth/signin', '/auth/signin');
      }
    }, 2000)
  }

  handleOfflineEvent = () => {
    this.setState({
      online: false,
    });
  }

  handleOnlineEvent = () => {
    this.setState({
      online: true,
    });
  }

  renderDynamicNavbar = () => {
    return <NavbarHeader/>
    const NavDynamic = dynamic(() =>
      import('@app/components/NavbarHeader').then(mod => mod.default),
    );
    return <NavDynamic />;
  }

  renderDynamicMenu = (pageProps) => {
    if (typeof window === 'object') {
      return <MenuBar asPath={pageProps.asPath || ''}/>
    }

    const MenuBarDynamic = dynamic(() =>
      import('@app/components/MenuBar').then(mod => mod.default),
    );
    return <MenuBarDynamic {...pageProps} asPath={pageProps.asPath || ''}/>;
  }

  renderDynamicFooter = () => {
    const FooterDynamic = dynamic(() =>
      import('@app/components/Footer').then(mod => mod.Footer),
    );
    return <FooterDynamic />;
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <Provider store={this.state.store}>
        <Container>
          {pageProps.useTemplate ?
            <MainLayout
              siteNavbarHeader={this.renderDynamicNavbar()}
              siteMenuBar={this.renderDynamicMenu(pageProps)}
              siteFooter={this.renderDynamicFooter()}
            >
              {!this.state.online && <StatusBar />}
              <Component {...pageProps} key={pageProps.key} />
            </MainLayout>
            : null
          }
          {
            !pageProps.useTemplate && (isNotAuthenPage(router.asPath) || true) ?
            <Component {...pageProps} key={pageProps.key} />
            : null
          }
        </Container>
      </Provider>
    );
  }
}

export default appWithTranslation(MyApp);
