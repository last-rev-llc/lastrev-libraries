// Next/link:
// https://github.com/mui-org/material-ui/blob/next/examples/nextjs-with-typescript/src/Link.tsx

/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import sidekick from '../../utils/sidekick';

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
  variant?: 'button-contained' | 'button-outlined' | 'button-text' | 'text' | any;
  onClick?: any;
  type?: string;
  sidekickLookup?: any;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href' | 'variant'> &
  Omit<MuiButtonProps, 'href' | 'variant'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<any, LinkProps>(function Link(props, ref) {
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
    sidekickLookup,
    ...other
  } = props;

  const router = useRouter();
  const pathname = href ?? '';
  // const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router?.pathname === pathname && activeClassName
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);
  // console.log('link', { variant, href, text, children, isExternal, noLinkStyle });
  const extra = { ...other, ...sidekick(sidekickLookup) };
  if (isExternal) {
    if (noLinkStyle) {
      return (
        <a className={className} href={href as string} ref={ref as any} {...extra}>
          {text || children}
        </a>
      );
    }

    return (
      <MuiLink className={className} href={href as string} ref={ref} {...extra}>
        {text || children}
      </MuiLink>
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref as any} to={href} {...extra}>
        {text || children}
      </NextLinkComposed>
    );
  }

  if (variant?.includes('button-') && href !== '#') {
    const buttonVariant = variant.replace('button-', '') as 'text' | 'outlined' | 'contained' | undefined;
    return (
      <NextLink href={href} as={linkAs}>
        <Button variant={buttonVariant} type={other.type} {...extra}>
          {text || children}
        </Button>
      </NextLink>
    );
  }
  if (variant?.includes('button-')) {
    const buttonVariant = variant.replace('button-', '') as 'text' | 'outlined' | 'contained' | undefined;
    return (
      <Button variant={buttonVariant} onClick={other.onClick} type={other.type} {...extra}>
        {text || children}
      </Button>
    );
  }
  return (
    <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...extra}>
      {text || children}
    </MuiLink>
  );
});

export default Link;
