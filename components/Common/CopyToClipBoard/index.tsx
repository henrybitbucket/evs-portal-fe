import React, { useRef, useState } from 'react';
import css from 'styled-jsx/css';

interface ICopyToClipBoardProps {
  text: string;
}

const styles = css`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  textarea {
    position: fixed;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
  div {
    cursor: pointer;
    :hover {
      span {
        opacity: 1;
      }
    }
    span {
      color: $primary;
      margin-left: 8px;
      opacity: 0;
      transition: opacity .2s ease-in-out;
    }
  }
`;
const CopyToClipBoard: React.SFC<ICopyToClipBoardProps> = (props: ICopyToClipBoardProps) => {

  const [isCopied, setCopied] = useState(false);
  const textAreaRef = useRef(null);

  const copyToClipboard = () => {
    const isIOS = navigator.userAgent.match(/ipad|iphone/i);
    if (isIOS) {
      let range;
      let selection;
      range = document.createRange();
      range.selectNodeContents(textAreaRef.current);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textAreaRef.current.setSelectionRange(0, 999999);
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
      return;
    }

    textAreaRef.current.select();
    document.execCommand('copy');

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <style jsx>{styles}</style>

      <div onClick={copyToClipboard}>
        {props.text}
        <span>{!isCopied ? 'Copy' : 'Copied'}</span>
      </div>
      <textarea
        readOnly
        ref={textAreaRef}
        value={props.text}
      />
    </>
  );
};

export { CopyToClipBoard };
