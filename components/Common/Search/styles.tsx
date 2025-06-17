import css from 'styled-jsx/css';

const styleForSearch = css`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  .search-custom {
    position: relative;
    .input-search {
      input {
        border-radius: 4px;
      }

      .input-search-close {
        outline: none;
        &.wb-help-circle {
          &:hover + :global(.tooltip) {
            opacity: 1;
          }
        }
      }

      :global(.tooltip) {
        right: -28px;
        :global(.tooltip-inner) {
          padding: 12px;
        }
      }

      .icon-container {
        position: absolute;
        right: 16px;
        top: calc(50% - 10px);
        z-index: 10;

        .loader {
          position: relative;
          height: 20px;
          width: 20px;
          display: inline-block;
          animation: around 5.4s infinite;
          &:after,
          &:before {
            content: "";
            background: white;
            position: absolute;
            display: inline-block;
            width: 100%;
            height: 100%;
            border-width: 2px;
            border-color: $primary $primary transparent transparent;
            border-style: solid;
            border-radius: 20px;
            box-sizing: border-box;
            top: 0;
            left: 0;
            animation: around 0.7s ease-in-out infinite;
          }
          &:after {
            animation: around 0.7s ease-in-out 0.1s infinite;
            background: transparent;
          }
        }

        @keyframes around {
          0% {
            transform: rotate(0deg)
          }
          100% {
            transform: rotate(360deg)
          }
        }
      }
    }
  }
`;

const styleForSuggestions = css.global`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  .search-suggestion {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1200;
    width: 100%;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 1rem;
    list-style: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid #e4eaec;
    border-radius: .215rem;
    box-shadow: 0 3px 12px rgba(0, 0, 0, .05);

    mark {
      background: unset;
      font-weight: 500;
      padding: 0;
      color: #76838f;
    }

    .options {
        padding: 0;
        margin: 0;
        list-style: none;
      .option {
        padding: 0;
        .as-hr {
          margin-top: 8px;
          padding: 3px 20px;
          padding-bottom: 0;
          display: flex;
          align-items: center;
          div {
            width: 100%;
            height: 1px;
            background-color: #76838f;
            opacity: 0.4;
            margin-left: 8px;
          }
        }
      }
      strong {
        display: block;
        font-size: .858rem;
        line-height: 1.57142857;
        color: #37474f;
        white-space: nowrap;
        cursor: default;
      }
      .option-tree {
        display: flex;
        align-items: center;
        padding: 5px 20px;
        clear: both;
        font-weight: 300;
        line-height: 1.57142857;
        :hover {
          text-decoration: none;
          cursor: pointer;
          background-color: #f3f7f9;
          outline: 0;
        }
        div {
          :first-child {
            margin: 0;
          }
          margin-left: 1rem;
        }
        .phone,
        .email {
          font-size: 13px;
        }

        .position,
        .space,
        .count{
          font-size: 12px;
          opacity: 0.6;
        }
        .count {
          margin-left: 8px;
        }
        .status {
          position: absolute;
          right: 20px;
        }
      }
    }
  }
`;

export {
  styleForSearch,
  styleForSuggestions,
};
