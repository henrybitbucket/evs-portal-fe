import * as React from 'react';

import { IBasicComponentProps } from '@app/components/Types';
import { concatClasses } from '@app/utils';

import PageItem from './PageItem';

interface IPaginationProps extends IBasicComponentProps {
  totalRecords: number;
  totalPages: number;
  pageNeighbours?: number;
  pageSize: number;
  onPageChanged: (query) => void;
  pageIndex: number;
  size: string;
}

const getClassNames = (props: IPaginationProps) => concatClasses(
  props.className,
  'pagination m-0',
  props.size && `pagination-${props.size}`,
);

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const ranges = [];

  while (i <= to) {
    ranges.push(i);
    i += step;
  }

  return ranges;
};

const PAGE_LIMIT = 10;

class Pagination extends React.PureComponent<IPaginationProps, any> {

  static defaultProps = {
    pageIndex: 1,
    pageNeighbours: 1,
    pageSize: 0,
    totalRecords: 0,
    totalPage: 0,
    size: 'sm',
  };

  private pageSize;
  private totalRecords;
  private pageNeighbours;
  private totalPages;

  constructor (props) {
    super(props);
    const { totalRecords = null, pageSize = PAGE_LIMIT, pageNeighbours = 0, totalPages = 0 } = props;

    this.pageSize = typeof pageSize === 'number' ? pageSize : PAGE_LIMIT;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = this.props.totalPages  ? totalPages : Math.ceil(this.totalRecords / this.pageSize);
  }

  componentWillReceiveProps(nextProps) {
    const { totalPages } = this.props;
    if (totalPages !== nextProps.totalPages) {
      this.pageSize = nextProps.pageSize;
      this.totalRecords = nextProps.totalRecords;
      this.totalPages = nextProps.totalPages;
    }
  }

  gotoPage = (page) => {
    const { onPageChanged } = this.props;

    const pageIndex = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      pageIndex,
      totalPages: this.totalPages,
      pageSize: this.pageSize,
      totalRecords: this.totalRecords,
    };

    onPageChanged(paginationData);
  }

  handleClick = (page, e) => {
    e.preventDefault();
    if (this.props.pageIndex !== page) this.gotoPage(page);
  }

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.props.pageIndex - this.pageNeighbours * 2 - 1);
  }

  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.props.pageIndex + this.pageNeighbours * 2 + 1);
  }

  handleLeftOne = (evt) => {
    evt.preventDefault();
    const { pageIndex } = this.props;
    if (pageIndex > 1) this.gotoPage(pageIndex - 1);
  }

  handleRightOne = (evt) => {
    evt.preventDefault();
    const { pageIndex } = this.props;
    if (pageIndex < this.totalPages) this.gotoPage(pageIndex + 1);
  }

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const pageIndex = this.props.pageIndex;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = pageIndex - pageNeighbours;
      const rightBound = pageIndex + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }

  renderPageItem() {
    const { pageIndex } = this.props;
    const pages = this.fetchPageNumbers();

    return(
      <>
        <PageItem
          onClick={this.handleLeftOne}
          disabled={pageIndex === 1 ? true : undefined}
        >
          <span className="icon wb-chevron-left-mini"></span>
        </PageItem>

        {pages.map((page, idx) => {
          if (page === LEFT_PAGE) {
            return (
              <PageItem
                key={idx}
                onClick={this.handleMoveLeft}
                title="Previous 3 pages"
              >
              .....
              </PageItem>
            );
          }
          if (page === RIGHT_PAGE) {
            return (
              <PageItem
                key={idx}
                onClick={this.handleMoveRight}
                title="Next 3 pages"
              >
              .....
              </PageItem>
            );
          }

          return(
            <PageItem
              active={pageIndex === page ? true : undefined }
              key={idx}
              onClick={e => this.handleClick(page, e)}
            >
            {page}
            </PageItem>
          );
        })}

        <PageItem
          onClick={this.handleRightOne}
          disabled={pageIndex === this.totalPages ? true : undefined}
        >
          <span className="icon wb-chevron-right-mini"></span>
        </PageItem>
      </>
    );
  }

  render() {
    if (!this.totalRecords) return null;
    return(
      <ul className={getClassNames(this.props)}>
        {this.renderPageItem()}
      </ul>
    );
  }
}

export { Pagination };
