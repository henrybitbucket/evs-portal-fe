import * as React from 'react';
import css from 'styled-jsx/css';

import { concatClasses, isServer } from '@app/utils';
import { shouldRenderMobileVersion } from '@app/utils/dom/responsive-demensions';
import { IBasicComponentProps } from '@app/components/Types';

const getRootClassNames = (props) => {
  return concatClasses(
    'main-layout site-menubar-unfold',
    (props.isToggle || props.isOpenSideMenu) && 'site-menubar-open',
  );
};

const styles = css`
  .page {
    min-height: calc(100vh - 100px);
    margin-top: 48px !important;
    padding: 1.25rem 1.25rem !important;
    background-color: #f5f5f5 !important;
    transition: all 0.15s !important;
    .p-card {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.1875rem;
        margin-bottom: 1.25rem;
        box-shadow: 0 1px 2px rgba(0,0,0,.05);
    }
  }
`;

interface IMainLayoutProps extends IBasicComponentProps {
  children?: React.ReactNode;
  siteNavbarHeader: React.ReactNode;
  siteMenuBar: React.ReactNode;
  siteFooter: React.ReactNode;
  isToggle: boolean;
  toggleSiteMenu?: (isToggle: boolean) => void;
  isOpenSideMenu: boolean;
  openSideMenu?: (isToggle: boolean) => void;
}

// interface IMainLayoutState {}

class MainLayout extends React.PureComponent<IMainLayoutProps, any> {
  toggleSiteMenu = () => {
    if (!isServer() && shouldRenderMobileVersion()) {
      this.props.toggleSiteMenu(false);
    }
  }

  render() {
    return (
      <div className={getRootClassNames(this.props)}>
        <style jsx>{styles}</style>
        {this.props.siteNavbarHeader}
        {this.props.siteMenuBar}
        <div className="page" onClick={this.toggleSiteMenu}>
          <div className='p-card'>
            {this.props.children}
          </div>
        </div>
        {this.props.siteFooter}
      </div>
    );
  }
}

export { MainLayout };
