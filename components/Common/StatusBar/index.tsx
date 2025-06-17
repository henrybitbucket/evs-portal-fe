import React from 'react';
import css from 'styled-jsx/css';

import { IBasicComponentProps } from '@app/components/Types';

const styles = css`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  .status-bar {
    text-align: center;
    padding: 8px 16px;
    font-size: 14px;
    color: $white;
    background-color: $secondary;
    position: absolute;
    width: 100%;
    z-index: 100;
    top: 0px;
  }
`;

const StatusBar: React.SFC<IBasicComponentProps> = (props: IBasicComponentProps) => (
  <div className="status-bar">
    <style jsx>{styles}</style>
    You are offline now, please check your network :(
  </div>
);

export { StatusBar };
