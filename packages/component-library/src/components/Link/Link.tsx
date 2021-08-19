// Next/link:
// https://github.com/mui-org/material-ui/blob/next/examples/nextjs-with-typescript/src/Link.tsx

/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import sidekick from '../../utils/sidekick';
// TODO: Button components aren't hyperlinking

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
  icon?: string;
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
    role, // Links don't have roles.
    text,
    children,
    variant,
    icon,
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

  const brandIcons = ['google', 'twitter', 'facebook', 'github', 'linkedin', 'pinterest', 'instagram', 'youtube'];

  /** Link with Icon only
   * - Classes reference FontAwesome stylesheet linked in .storybook/preview
   * - Include that css file in head of any given project to render
   */
  // NOTES:
  // - 1. ** Custom for Strong365 using FontAwesome **
  // -->  ** Is it possible to extend in that repo? **
  // - 2. Better to use SVG
  // --> https://material-ui.com/components/icons/#font-vs-svg-which-approach-to-use
  // - 3. TODOs: Create Link with Icon version
  // --> https://next.material-ui.com/components/buttons/#buttons-with-icons-and-label
  if (icon && !text) {
    if (isExternal) {
      return (
        <a
          className={className}
          href={href as string}
          ref={ref as any}
          target="_blank"
          rel="noopener noreferrer"
          {...extra}>
          <IconButton aria-label={icon}>
            <Icon className={`fa${brandIcons.includes(icon.toLowerCase()) ? 'b' : 's'} fa-${icon.toLowerCase()}`} />
          </IconButton>
        </a>
      );
    }
    if (href !== '#') {
      return (
        <NextLink href={href} as={linkAs}>
          <IconButton aria-label={icon} type={other.type} {...extra}>
            <Icon className={`fa${brandIcons.includes(icon.toLowerCase()) ? 'b' : 's'} fa-${icon.toLowerCase()}`} />
          </IconButton>
        </NextLink>
      );
    }
    return (
      <IconButton
        aria-label={icon}
        // component={Link}
        // href={href}
        // ref={ref}
        // type={other.type}
        // {...extra}
      >
        <Icon className={`fa${brandIcons.includes(icon.toLowerCase()) ? 'b' : ''} fa-${icon.toLowerCase()}`} />
      </IconButton>
    );
  }

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
        {children || text}
      </NextLinkComposed>
    );
  }

  if (variant?.includes('button-')) {
    const buttonVariant = variant.replace('button-', '') as 'text' | 'outlined' | 'contained' | undefined;
    if (href !== '#') {
      return (
        <NextLink href={href} as={linkAs}>
          <Button variant={buttonVariant} type={other.type} {...extra}>
            {text || children}
          </Button>
        </NextLink>
      );
    }
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
