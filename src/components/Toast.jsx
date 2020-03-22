// Dependencies
import React from 'react';
import propTypes from 'prop-types';

const Toast = ({
  type = 'success',
  title = 'Successfully',
  titleColor = 'text-gray-900',
  text = 'Here is my text',
  textColor = 'text-gray-500'
}) => {
  // Render
  switch (type) {
    case 'success':
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="flex-1 ml-3">
            {title && (
              <p className={`font-medium leading-5 ${titleColor}`}>{title}</p>
            )}

            {text && <p className={`mt-1 leading-5 ${textColor}`}>{text}</p>}
          </div>
        </div>
      );
    case 'warning':
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-orange-400"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="flex-1 ml-3">
            {title && (
              <p className={`font-medium leading-5 ${titleColor}`}>{title}</p>
            )}

            {text && <p className={`mt-1 leading-5 ${textColor}`}>{text}</p>}
          </div>
        </div>
      );
    case 'info':
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-blue-400"
            >
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="flex-1 ml-3">
            {title && (
              <p className={`font-medium leading-5 ${titleColor}`}>{title}</p>
            )}

            {text && <p className={`mt-1 leading-5 ${textColor}`}>{text}</p>}
          </div>
        </div>
      );
    case 'error':
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-red-400"
            >
              <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="flex-1 ml-3">
            {title && (
              <p className={`font-medium leading-5 ${titleColor}`}>{title}</p>
            )}

            {text && <p className={`mt-1 leading-5 ${textColor}`}>{text}</p>}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <div className="flex-1 ml-3">
            {title && (
              <p className={`font-medium leading-5 ${titleColor}`}>{title}</p>
            )}

            {text && <p className={`mt-1 leading-5 ${textColor}`}>{text}</p>}
          </div>
        </div>
      );
  }
};

Toast.defaultProps = {
  type: 'success',
  title: 'Successfully',
  titleColor: 'text-gray-900',
  text: 'Here is my text',
  textColor: 'text-gray-500'
};

Toast.propTypes = {
  type: propTypes.string,
  title: propTypes.string,
  titleColor: propTypes.string,
  text: propTypes.string,
  textColor: propTypes.string
};

export default Toast;
