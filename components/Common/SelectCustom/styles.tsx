import css from 'styled-jsx/css';

export default css`
  :global(.is-invalid .css-yk16xz-control) {
    border-color: #ff4c52 !important;
  }
  :global(.is-invalid + .invalid-feedback) {
    display: block !important;
  }
  :global(.css-1pahdxg-control) {
    border-color: #3e8ef7 !important;
    border-radius: 0.215rem !important;
    box-shadow: none !important;
    outline: 0 !important;
    border: 1px solid #3e8ef7 ;
    &:hover {
      border-color: #3e8ef7;
    }
  }
  :global(.css-yk16xz-control) {
    border-color: #e4eaec !important;
    border-radius: 0.215rem !important;
    color: #76838f !important;
    &:hover {
      border-color: #e4eaec !important;
    }
  }
  :global(.css-1uccc91-singleValue) {
    color: #76838f !important;
  }
`;
