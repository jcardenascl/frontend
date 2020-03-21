// Dependencies
import React from 'react';
import propTypes from 'prop-types';
import { CheveronRightOutlineMd, CheveronLeftOutlineMd } from 'react-heroicons';

const Pagination = props => {
  const maxElementsPerPage = 10;
  const increment = 5;

  const getCurrentPage = (start, end) => (start === 0 ? 1 : start / end + 1);

  const getPageNav = (firstPage, lastPage, start, end, url) => {
    const pageNav = [];

    for (let i = firstPage; i < lastPage; i += 1) {
      const pge = i + 1;
      const next = i * end;

      if (start === next) {
        pageNav.push(
          <li key={i} className="m-1">
            <a
              href="#!"
              className="px-5 py-4 text-white no-underline transition-all duration-200 bg-yellow-900 rounded"
            >
              {pge}
            </a>
          </li>
        );
      } else {
        pageNav.push(
          <li key={i} className="m-1">
            <a
              href={`${url}${pge}`}
              className="px-5 py-4 text-gray-600 no-underline transition-all duration-200 rounded hover:text-gray-700"
            >
              {pge}
            </a>
          </li>
        );
      }
    }

    return pageNav;
  };

  const getPageNext = (currentPage, pages, url) => {
    if (currentPage <= pages - 1) {
      return (
        <li className="m-1">
          <a
            href={`${url}${currentPage + 1}`}
            className="px-5 py-4 text-gray-600 no-underline transition-all duration-200 rounded hover:text-gray-700"
          >
            <CheveronRightOutlineMd className="w-5 h-5" />
          </a>
        </li>
      );
    }

    return <div />;
  };

  const getPagePrevious = (start, currentPage, url) => {
    if (start > 0) {
      return (
        <li className="m-1">
          <a
            href={`${url}${currentPage - 1}`}
            className="px-5 py-4 text-gray-600 no-underline transition-all duration-200 rounded hover:text-gray-700"
          >
            <CheveronLeftOutlineMd className="w-5 h-5" />
          </a>
        </li>
      );
    }

    return null;
  };

  const getPaginationStart = page => {
    const paginationPage = page > 0 ? page : 0;

    return paginationPage > 0
      ? paginationPage * maxElementsPerPage - maxElementsPerPage
      : 0;
  };

  const buildPagination = (total, end, start, url, elementsPerPage) => {
    const limit = elementsPerPage || maxElementsPerPage;

    let currentPage;
    let firstPage;
    let lastPage;
    let pageNav;
    let pageNext;
    let pagePrevious;
    let pages;
    let rest;

    if (total > end) {
      rest = total % end;
      pages = rest === 0 ? total / end : (total - rest) / end + 1;
      currentPage = start / end + 1;

      if (pages > limit) {
        if (start === 0) {
          firstPage = 0;
          lastPage = limit;
        }

        if (currentPage < increment) {
          firstPage = 0;
          lastPage = currentPage + increment + (increment - currentPage);
        } else {
          firstPage =
            currentPage - increment - (currentPage + increment - pages);
          lastPage = pages;
        }

        if (currentPage >= increment && currentPage <= pages - increment) {
          firstPage = currentPage - increment;
          lastPage = currentPage + increment;
        }
      } else {
        firstPage = 0;
        lastPage = pages;
      }

      pageNav = getPageNav(firstPage, lastPage, start, end, url);
      currentPage = getCurrentPage(start, end);
      pageNext = getPageNext(currentPage, pages, url);
      pagePrevious = getPagePrevious(start, currentPage, url);
    }

    return (
      <ul className="flex justify-center w-full p-0 mx-auto mt-24 mb-16 list-none">
        {pagePrevious}
        {pageNav}
        {pageNext}
      </ul>
    );
  };

  const getPagination = () => {
    const { page, total, url } = props;
    const start = getPaginationStart(page);

    if (total > maxElementsPerPage) {
      return buildPagination(total, maxElementsPerPage, start, url);
    }

    return <div />;
  };

  getPagination.propTypes = {
    page: propTypes.number.isRequired,
    total: propTypes.number.isRequired,
    url: propTypes.string.isRequired
  };

  return getPagination();
};

export default Pagination;
