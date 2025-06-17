import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';

import { IBasicPageProps } from '@app/components/Types';

import { PublicFooter } from '@app/components/Footer/PublicFooter';
import { PublicHeader } from '@app/components/Header/PublicHeader';
import { LoginKit } from '@app/components/Login';

import 'moment-timezone';
import {eraseCookie} from "@app/utils/cookie";
import {tokenName} from "@app/utils/public-config";

const styles = css`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  :global(body) {
    padding: 0px;
    height: 100%;
  }
  :global(#__next) {
    height: 100%;
  }
  :global(#__next > div) {
    height: 100%;
  }
  :global(.page-content) {
    padding: 0px;
    padding: 0px;
    height: 100%;
    background: #f3f3f4;
  }
  .dashboard {
    .check-in-box {
      .action{
        a {
          display:block;
          float:left;
        }
        span {
          float:right;
          width:unset;
        }
      }
    }
    .panel-hide {
      opacity: 0;
      visibility: hidden;
    }
    .panel-show {
      opacity: 1;
      visibility: unset;
    }
  }
  @include media-breakpoint-down(sm){
    :global(#toast-container) {
      top: 76px;
      left: 10px;
      right: 10px
      & :global(.toast-info) {
        width: 100%;
      }
    }
  }
  :global(.button-btn) {
    border: unset;
    outline: unset;
    display: flex;
    border-radius: 5px;
    height: 40px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-color: #042ee1;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    width: 150px;
    text-transform: uppercase;
    transition: 0.2s;
    &:hover {
      background-color: #03114e;
      color: #fffe00;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: 0.2s;
    }
  }

`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
    constructor(props) {
        super(props);
        this.state = {}
        this.logout.bind(this);
    }
    static getInitialProps = async () => {
        return {
            namespacesRequired: ['common'],
        };
    }
    state = {

    };

    async componentDidMount() {

    }

    logout() {
        eraseCookie(tokenName);
        console.info('RD /auth/signin page logOut')
        require('@app/utils/next-routes').Router.pushRoute('/auth/signin');
    }

    render() {
        const { t } = this.props;
        return (
            <TotPage title={t('Authorization')}>
                <div className="dashboard">
                    <style jsx>{styles}</style>
                    <PageContent className='home'>
                        <div
                            style={{
                                background: 'url(http://anc.com) right top / 1190px no-repeat rgb(243, 243, 244)',
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'column',
                                minHeight: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-center',
                            }}
                        >
                            <h1 style={{fontWeight: 'bold', color: 'linear-gradient(to right,#4880EC, #019CAD)'}}>No authorization found</h1>
                            <h3>This page is not publically available.</h3>
                            <h3>To access it please login first.</h3>
                            <button
                                className="button-btn"
                                style={{
                                    outline: 'unset',
                                    border: 'unset',
                                    marginTop: '20px',
                                }}
                                onClick={() => {
                                   this.logout();
                                }}
                            >
                                {'RETURN SIGN IN'}
                            </button>
                        </div>
                    </PageContent>
                </div>
            </TotPage>
        );
    }
}

export default withNamespaces('common')(Homepage);
