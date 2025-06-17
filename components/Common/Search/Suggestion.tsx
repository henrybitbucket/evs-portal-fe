import React from 'react';
import Highlighter from 'react-highlight-words';

import { IBasicComponentProps } from '@app/components/Types';
import { styleForSuggestions } from './styles';

import { IStaffProps } from '@app/api/staff/types';

export interface ISuggestionProps extends IBasicComponentProps {
  items?: any;
  changeKeyWord?: any;
  keyWord?: string;
}

class Suggestion extends React.Component<ISuggestionProps, any> {

  static defaultProps = {
    items: {
      staffs: [],
      departments: [],
      postions: [],
    },
  };

  state = {
    textSelected: '',
  };

  handleClickOption = (name: string) => {
    if (name === this.props.keyWord) return;
    this.props.changeKeyWord(name);
  }

  renderRemainItems(items: any, key: string) {
    const { keyWord, t } = this.props;
    if (items.length) {
      return(
        <>
        <div className="as-hr">in<strong className="ml-1"> {t(key.toUpperCase())}</strong><div></div></div>
        <ul className="options">
            {items.map((item, idx) =>
            <li
              key={idx}
              className="option-tree"
              onClick={() => this.handleClickOption(`${key === 'positions' ?  'p' : 'd'}:${item.name}`)}
            >
                <div className="name">
                  <Highlighter
                    searchWords={[keyWord]}
                    textToHighlight={item.name}
                  />
                </div>
                {key === 'positions' && <div className="count">{item.count ? `(${item.count})` : ''}</div> }
            </li>,
          )}
        </ul>
        </>
      );
    }
  }

  renderStaffs(staffs: IStaffProps[]) {
    const { keyWord } = this.props;
    return(
      <ul className="options">
        {staffs.map((staff, idx) =>
          <li
            key={idx}
            className="option-tree"
            onClick={() => this.handleClickOption(`${staff.fullName}`)}>
            <div className="name">
              <Highlighter
                searchWords={[keyWord]}
                textToHighlight={`${staff.fullName}`}
              />
            </div>
            {staff.phone &&
              <div className="phone"><span>Phone: </span>
                <Highlighter
                  searchWords={[keyWord]}
                  textToHighlight={staff.phone}
                />
              </div>}
            {staff.email &&
              <div className="email"><span>Email: </span>
                <Highlighter
                  searchWords={[keyWord]}
                  textToHighlight={staff.email}
                />
              </div>}
            {staff.positionName &&
              <>
                <div className="space">-</div>
                <div className="position">
                  <Highlighter
                    searchWords={[keyWord]}
                    textToHighlight={staff.positionName}
                  />
                </div>
              </>
            }
            <div className={`status status-lg status-${staff.isChekin ? 'online' : 'off'}`}></div>
          </li>,
        )}
      </ul>
    );
  }
  render() {
    const { items } = this.props;
    const { staffs, positions, departments } = this.props.items;
    const isShow = staffs.length || positions.length || departments.length ;
    return (
      <div className={`search-suggestion ${isShow ? 'd-block' : 'd-none'}`}>
      <style jsx>{styleForSuggestions}</style>
      <ul className="options">
        {
          Object.keys(items).map((item, idx) =>
            <li key={idx} className="option">
              { item === 'staffs' ?
                this.renderStaffs(items[item]) :
                this.renderRemainItems(items[item], item)
              }
            </li>,
          )
        }
      </ul>
    </div>
    );
  }
}

export { Suggestion };
