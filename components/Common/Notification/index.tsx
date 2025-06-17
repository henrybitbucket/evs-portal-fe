import * as React from 'react';

import { IBasicComponentProps } from '@app/components/Types';

import { concatClasses } from '@app/utils';

import css from 'styled-jsx/css';
import { setTimeout, clearTimeout } from 'timers';

const styles = css`
  .notification {
    position: absolute;
    right:0;
    top:15px;
    transition: 0.7s all ease-out;
  }
  .notification-hide {
    opacity: 0;
    visibility: hidden;
  }
  .notification-show {
    opacity: 1;
    visibility: unset;
  }
  #top-right {
    right:0;
    top:10%;
  }
  #top-left {
    left:0;
    top:10%;
  }
  #bottom-right {
    right:0;
    bottom:10%;
  }
  #bottom-left {
    left:0;
    bottom:10%;
  }
`;

export interface INotificationProps extends IBasicComponentProps {
  notiStatus: boolean;
  className?: string;
  onClick?: (ev: any) => any;
  onCallback?: (ev: any) => any;
  type?: string;
  position?: string;
}

// color: primary/info/success/danger/warning
// const getClassNames = props => concatClasses(
//   'alert',
//   'dark',
//   'alert-icon',
//   `alert-${props.color}`,
//   'alert-dismissible',
//   props.className,
// );

class Notification extends React.Component<INotificationProps, any>  {
  constructor(props) {
    super(props);
    this.state = {
      arrayClass: {
        className: this.props.className,
        type: this.props.type,
      },
      position: this.props.position,
      notiStatus: this.props.notiStatus,
      isShowNoti: this.props.notiStatus,
      // timer: null,
    };
    // this.handleClose = this.handleClose.bind(this);
  }

  getClassNames = (item) => {
    return concatClasses(
      'alert',
      'dark',
      'alert-icon',
      `alert-${item.type}`,
      'alert-dismissible',
      item.className,
    );
  }
  componentDidMount() {
    // this.timeOutNoti = setTimeout(this.handleClose, 10000);
    this.timer = setTimeout(() => {
      this.handleClose();
    }, 10000);
  }

  componentDidUpdate() {
    if (this.state.notiStatus !== this.props.notiStatus) {
      this.setState({
        notiStatus: this.props.notiStatus,
        isShowNoti: this.props.notiStatus,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClose = () => {
    this.setState({
      isShowNoti: false,
    });
  }

  render() {
    const { arrayClass, position, isShowNoti } = this.state;
    const { children } = this.props;
    return (
      <div
        id={position}
        className={(isShowNoti) ?
          'col-12 col-md-3 notification notification-show'
        : 'col-12 col-md-3 notification notification-hide'}
      >
        <style jsx>{styles}</style>
        <div
          className={this.getClassNames(arrayClass)}
          role="alert"
        >
          <button type="button" className="close" onClick={this.handleClose}>
            <span aria-hidden="true">×</span>
          </button>
          {/* <i className="icon wb-check" aria-hidden="true"></i> */}
          {children}
        </div>
      </div>
    );
  }

}

// const Notification: React.SFC<INotificationProps> =
//   ({ className, color, content, ...rest }) =>
//   <div className="col-12 col-md-3 notification">
//     <style jsx>{styles}</style>
//     <div
//       className={getClassNames({ className, color })}
//       role="alert"
//     >
//       <button type="button" className="close" data-dismiss="alert" aria-label="Close">
//         <span aria-hidden="true">×</span>
//       </button>
//       {/* <i className="icon wb-check" aria-hidden="true"></i> */}
//       {content}
//     </div>
//   </div>;

export { Notification };
