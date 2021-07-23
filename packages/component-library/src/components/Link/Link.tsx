// Next/link:
// https://github.com/mui-org/material-ui/blob/next/examples/nextjs-with-typescript/src/Link.tsx

/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import { Button } from '@material-ui/core';

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
  text?: string;
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(
  props,
  ref
) {
  const {
    to,
    linkAs,
    href = '#',
    replace,
    scroll,
    passHref,
    shallow,
    prefetch,
    locale,
    text,
    children,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}>
      <a ref={ref} {...other}>
        {text || children}
      </a>
    </NextLink>
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
  noLinkStyle?: boolean;
  variant?: String;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href = '#',
    noLinkStyle,
    role, // Link don't have roles.
    text,
    children,
    variant,
    ...other
  } = props;

  const router = useRouter();
  const pathname = href ?? '';
  // const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router?.pathname === pathname && activeClassName
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);
  console.log('link', { variant, href, text, children, isExternal, noLinkStyle });

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <a className={className} href={href as string} ref={ref as any} {...other}>
          {text || children}
        </a>
      );
    }

    return (
      <MuiLink className={className} href={href as string} ref={ref} {...other}>
        {text || children}
      </MuiLink>
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref as any} to={href} {...other}>
        {text || children}
      </NextLinkComposed>
    );
  }

  if (variant?.includes('button-')) {
    const buttonVariant = variant.replace('button-', '') as 'text' | 'outlined' | 'contained' | undefined;
    return (
      <NextLink href={href} as={linkAs}>
        <Button variant={buttonVariant}>{text || children}</Button>
      </NextLink>
    );
  }
  return (
    <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...other}>
      {text || children}
    </MuiLink>
  );
});

export default Link;
