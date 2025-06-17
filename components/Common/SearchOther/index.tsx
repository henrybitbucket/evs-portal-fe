import React, { useEffect, useRef } from 'react';

import { IBasicComponentProps } from '@app/components/Types';

import { styleForSearch } from './../Search/styles';

export interface ISearchProps extends IBasicComponentProps {
  placeholder?: string;
  onSearch?: (key: string) => void;
  name: string;
}

/**
 * Search component
 * @param inputEl: Refs
 * @param typingTimer: Timer of typing
 * @param doneTypingInterval: Timer after done typing
 */

const SearchOther: React.SFC<ISearchProps> = (props: ISearchProps) => {
  const inputEl = useRef(null);
  let typingTimer;
  const doneTypingInterval = 500;

  const doneTyping = () => {
    const value = inputEl && inputEl.current.value;
    // props.onSuggest(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      props.onSearch(inputEl.current.value);
      return;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') return;
    // hide suggestions box
    if (!inputEl.current.value) {
      clearTimeout(typingTimer);
      props.onSearch('');
      return;
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  };

  const handleKeyDown = () => {
    clearTimeout(typingTimer);
  };

  const removeKeyWord = (value: string) => {
    if (!value) return;
    inputEl.current.value = '';
    props.onSearch('');
  };

  // componentwillunmount, clear timout for search.
  useEffect(() => {
    return () => {
      clearTimeout(typingTimer);
    };
  }, []);

  const { placeholder, name } = props;
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
        <button
          type="button"
          className={`input-search-close icon ${isValid ? 'wb-close' : 'd-none'}`}
          onClick={() => removeKeyWord(isValid)}
        >
        </button>
      </div>
    </div>
  );
};

SearchOther.defaultProps = {
  name: 'search',
};

export { SearchOther };
