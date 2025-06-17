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

`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
    static getInitialProps = async () => {
        return {
            namespacesRequired: ['common'],
        };
    }
    state = {

    };

    async componentDidMount() {

    }

    render() {
        const { t } = this.props;
        return (
            <TotPage title={t('HOME')}>
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
                            }}
                        >
                            <div className='mobile-hide' style={{height: '100px'}}></div>
                            <div style={{textAlign: 'center', marginBottom: '15px', marginTop: '15px', }}>

                            </div>
                            <div style={{flex: 1, minHeight: '600px',}}>
                                <LoginKit
                                    _ref={ref => this.loginKit = ref}
                                    popup={false}
                                    onSuccess={() => {
                                        this.loginKit && this.loginKit.hide();
                                        this.setState({writeReview: true,})
                                    }}
                                />
                            </div>
                            <PublicFooter disableTop={true}/>
                        </div>
                    </PageContent>
                </div>
            </TotPage>
        );
    }
}

export default withNamespaces('common')(Homepage);
