import React from 'react';
import Link from '@last-rev/component-library/dist/components/Link';
import { useRouter } from 'next/router';
import { useAuthContext } from '../AuthProvider';

export type { LinkProps, LinkClassKey, LinkClasses } from '@last-rev/component-library/dist/components/Link';

const withSubActivePath = (WrappedLink: any) => (props: any) => {
  const router = useRouter();
  // const { authenticated, setRedirect } = useAuthContext();
  const { setRedirect } = useAuthContext();

  // Check if the current path is a descendant of the href
  let className = router?.asPath.startsWith(props.href) ? props.subPathActiveClassName : '';
  className = `${props?.className} ${className}`;

  const handleClick = () => {
    // if (authenticated) {
    //   window.location.href = props.href;
    //   return;
    // } else {
    //   setRedirect(props.href);
    //   window.location.href = `${process.env.USER_AUTH_DOMAIN}/api/idp/sfCommunity`;
    // }
    setRedirect(props.href);
    window.location.href = `${process.env.USER_AUTH_DOMAIN}/api/idp/sfCommunity`;
  };

  if (props.requireLogin) {
    return (
      <button onClick={handleClick} style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}>
        <WrappedLink {...props} href="javascript:void(0)" className={className} />
      </button>
    );
  }

  return <WrappedLink {...props} className={className} />;
};

export default withSubActivePath(Link);
