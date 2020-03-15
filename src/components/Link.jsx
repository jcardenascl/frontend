// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, children, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other}>
        {children || <span className="sr-only">Anchor tag</span>}
      </a>
    </NextLink>
  );
});

NextComposed.defaultProps = {
  as: ''
};

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  });

  return (
    <NextComposed className={className} ref={innerRef} href={href} {...other} />
  );
}

Link.defaultProps = {
  activeClassName: '',
  as: '',
  className: '',
  innerRef: {},
  onClick: () => null
};

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onClick: PropTypes.func
};

export default React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
));