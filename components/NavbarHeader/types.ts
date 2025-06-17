import { IBasicComponentProps } from '@app/components/Types';

interface INavbarHeaderProps extends IBasicComponentProps {
  isToggle: boolean;
  userInfo: any;
  toggleSiteMenu: (toggle: boolean) => void;
  logOut: () => void;
  openSideMenu: (toggle: boolean) => void;
  isOpenSideMenu: boolean
}

export {
  INavbarHeaderProps,
};
