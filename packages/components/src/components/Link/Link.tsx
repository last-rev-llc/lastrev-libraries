import React from 'react';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import { useRouter } from 'next/router';

const withSubActivePath = (WrappedLink: any) => (props: any) => {
  const router = useRouter();

  // Check if the current path is a descendant of the href
  let className = router?.asPath.startsWith(props.href) ? props.subPathActiveClassName : '';
  className = `${props?.className} ${className}`;

  return <WrappedLink {...props} className={className} />;
};

export default withSubActivePath(Link);
