import * as React from 'react';

import { IBasicComponentProps } from '@app/components/Types';

import { concatClasses } from '@app/utils';

import { getAncestorByDataAttr } from '@app/utils/dom/attrs-selectors';

import { DropdownTrigger } from './DropdownTrigger';
import { DropdownContent } from './DropdownContent';

export interface IDropdownProps extends IBasicComponentProps {
  disabled?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  isOpen?: boolean;
  initialIsOpen?: boolean;
}

interface IDropdownStates {
  isOpen: boolean;
}

const getClassNames = ({ className }: any, { isOpen }) => concatClasses(
  'dropdown',
  className,
  isOpen && 'is-open',
);

class Dropdown extends React.PureComponent<IDropdownProps, IDropdownStates> {

  static defaultProps = {
    triggerButtonDomProps: {},
    direction: 'bottom',
    isOpen: false,
  };

  static DropdownTrigger = DropdownTrigger;
  static DropdownContent = DropdownContent;

  state = {
    isOpen: this.props.isOpen,
  };

  isTouched = null;
  dropdownTriggerRef = null;

  componentDidMount() {
    if (this.props.isOpen) {
      this.handleListenEventClick();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen,
      }, () => {
        if (nextProps.isOpen) {
          this.handleListenEventClick();
        }
      });
    }
  }

  setTriggerRef = (el) => {
    if (el) {
      this.dropdownTriggerRef = el;
    }
  }

  handleClick = (ev) => {
    if (this.isTouched) {
      return;
    }
    this.handleTriggerButtonPressed(ev);
  }

  handleTouchStart = (ev) => {
    this.isTouched = true;
    this.handleTriggerButtonPressed(ev);
  }

  handleTriggerButtonPressed = (ev?) => {

    if (ev) ev.persist();

    this.setState({
      isOpen: !this.state.isOpen,
    }, () => {
      if (this.state.isOpen) {
        this.handleListenEventClick();
      } else {
        this.handleRemoveEventClick();
      }
    });
  }

  windowClickHandler = (ev) => {
    if (getAncestorByDataAttr(ev.target, 'dd-dropdown-trigger') !== this.dropdownTriggerRef) {
      this.handleRemoveEventClick();
      this.handleTriggerButtonPressed();
    }

  }

  handleListenEventClick = () => {
    window.addEventListener('click', this.windowClickHandler);
  }

  handleRemoveEventClick = () => {
    window.removeEventListener('click', this.windowClickHandler);
    window.removeEventListener('touchstart', this.windowClickHandler);
  }

  renderChild = (child) => {
    const { displayName } = child.type;

    if (displayName === 'DropdownTrigger') {
      return (
        <div data-dd-dropdown-trigger ref={this.setTriggerRef}>
          {
            React.cloneElement(
              child,
              {
                onClick: this.handleClick,
                onTouchStart: this.handleTouchStart,
              },
            )
          }
        </div>
      );

    }

    if (displayName === 'DropdownContent') {
      if (!this.state.isOpen) {
        return null;
      }
      return React.cloneElement(
        child,
        {
          direction: this.props.direction,
          triggerWidth: this.dropdownTriggerRef.clientWidth,
          triggerHeight: this.dropdownTriggerRef.clientHeight,
        });
    }
  }

  render() {
    return(
      <div className={getClassNames(this.props, this.state)}>

        {React.Children.map(this.props.children, this.renderChild)}

      </div>
    );
  }
}

export { Dropdown };
