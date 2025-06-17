import React, { useEffect, useRef } from 'react';

import { IBasicComponentProps } from '@app/components/Types';
import { Tooltip } from '@app/components/Common';
import { Suggestion } from './Suggestion';

import { styleForSearch } from './styles';

export interface ISearchProps extends IBasicComponentProps {
  placeholder?: string;
  onSuggest?: (key: string) => void;
  onSearch?: (key: string) => void;
  items?: any;
  name: string;
  isLoading?: boolean;
}

/**
 * Search component
 * @param inputEl: Refs
 * @param typingTimer: Timer of typing
 * @param doneTypingInterval: Timer after done typing
 */

const Search: React.SFC<ISearchProps> = (props: ISearchProps) => {
  const inputEl = useRef(null);
  let typingTimer;
  const doneTypingInterval = 500;

  const doneTyping = () => {
    const value = inputEl && inputEl.current.value;
    if (props.onSuggest) props.onSuggest(value);
    if (!props.onSuggest && !value) props.onSearch(value);
  };

  const handleChangeKeyWord = (keyWord: string) => {
    inputEl.current.value = keyWord;
    props.onSearch(keyWord);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') return;
    // hide suggestions box
    if (!inputEl.current.value && props.onSuggest) {
      clearTimeout(typingTimer);
      props.onSuggest('');
      return;
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  };

  const handleKeyDown = () => {
    clearTimeout(typingTimer);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      clearTimeout(typingTimer);
      props.onSearch(inputEl.current.value);
      return;
    }
  };

  const removeKeyWord = (value: string) => {
    if (!value) return;
    inputEl.current.value = '';
    if (props.onSuggest) props.onSuggest('');
    if (!props.onSuggest) props.onSearch('');
    clearTimeout(typingTimer);
  };

  // componentwillunmount, clear timout for search.
  useEffect(() => {
    return () => {
      clearTimeout(typingTimer);
    };
  }, []);

  const { placeholder, name, items, isLoading, t } = props;
  const isValid = inputEl && inputEl.current && inputEl.current.value;

  return (
    <div className="search-custom">
      <style jsx>{styleForSearch}</style>
      <div className="input-search">
        <i className="input-search-icon wb-search" aria-hidden="true"></i>
        <input
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          ref={inputEl}
          type="text"
          className="form-control"
          name={name}
          id={name}
          placeholder={placeholder}
          autoFocus
        />
        <div className={`icon-container ${isLoading ? 'd-block' : 'd-none'}`}>
          <i className="loader"></i>
        </div>
        <button
          type="button"
          className={`input-search-close icon
          ${ isValid ? 'wb-close' : `${props.onSuggest} ? 'wb-help-circle' : ''`}`}
          onClick={() => removeKeyWord(isValid)}
        >
        </button>
        {props.onSuggest &&
          <Tooltip position="bottom">
            <div className="mb-2">{t('HOW_TO_SEARCH')}</div>
            <div className="text-left">- p: {t('POSITION')}</div>
            <div className="text-left">- d: {t('DEPARTMENT')}</div>
          </Tooltip>
        }
      </div>
      {items && props.onSuggest &&
        <Suggestion
          changeKeyWord={handleChangeKeyWord}
          t={t}
          keyWord={isValid}
          items={items} />
      }
    </div>
  );
};

Search.defaultProps = {
  name: 'search',
};

export { Search };
