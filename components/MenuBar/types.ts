import { IBasicComponentProps } from '@app/components/Types';

interface IMenuBarProps extends IBasicComponentProps {
  userInfo: any;
  logOut: any;
  toggleSiteMenu: (toggle: boolean) => void;
}

export {
  IMenuBarProps,
};
