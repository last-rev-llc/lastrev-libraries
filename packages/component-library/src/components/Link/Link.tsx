// Next/link:
// https://github.com/mui-org/material-ui/blob/next/examples/nextjs-with-typescript/src/Link.tsx

/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import styled from '@mui/system/styled';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import Button, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import sidekick from '../../utils/sidekick';
import { useThemeProps } from '@mui/system';

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
      locale={locale}
      {...other}>
      <a ref={ref} {...other}>
        {text || children}
      </a>
    </NextLink>
  );
});

export type LinkProps = {
  __typename?: string;
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
  noLinkStyle?: boolean;
  variant?: 'button-contained' | 'button-outlined' | 'button-text' | 'text' | any;
  icon?: string;
  iconPosition?: string;
  children?: any;
  onClick?: any;
  type?: string;
  sidekickLookup?: any;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href' | 'variant'> &
  Omit<MuiButtonProps, 'href' | 'variant'>;

// Icon component using FontAwesome
const getIcon = (icon: string) => {
  const brandIcons = ['google', 'twitter', 'facebook', 'github', 'linkedin', 'pinterest', 'instagram', 'youtube'];
  return <Icon className={`fa${brandIcons.includes(icon.toLowerCase()) ? 'b' : 's'} fa-${icon.toLowerCase()}`} />;
};

const getButtonContent = (text: string | undefined, children: any, iconPosition: string | undefined, icon: any) => {
  if (!icon) return text || children;
  return (
    <ButtonWrap sx={{ flexDirection: iconPosition === 'Left' ? 'row-reverse' : undefined }}>
      <span>{text || children}</span>
      {icon && (
        <Box sx={{ margin: iconPosition === 'Left' ? '0 10px 0 0' : '0 0 0 10px' }}>{icon && getIcon(icon)}</Box>
      )}
    </ButtonWrap>
  );
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<any, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'MuiLink-selected',
    as: linkAs,
    className: classNameProps,
    href = '#',
    noLinkStyle,
    role, // Links don't have roles.
    text,
    children,
    variant,
    icon,
    iconPosition,
    sidekickLookup,
    ...other
  } = useThemeProps({ name: 'Link', props });

  // Color prop fails if it's null
  if (!other.color) delete other.color;

  const router = useRouter();
  const pathname = href ?? '';
  // const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: (router?.asPath === pathname || router?.asPath === `${pathname}/`) && activeClassName
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);
  const extra = { ...other, ...sidekick(sidekickLookup) };

  /** Link with Icon only
   * - Classes reference FontAwesome stylesheet linked in .storybook/preview
   * - Include that css file in head of any given project to render
   */
  // NOTES:
  // - 1. ** Custom for Strong365 using FontAwesome **
  // -->  ** Is it possible to extend in that repo? **
  // - 2. Better to use SVG
  // --> https://material-ui.com/components/icons/#font-vs-svg-which-approach-to-use
  if (!noLinkStyle && icon && !text) {
    if (isExternal) {
      return (
        <a
          className={className}
          href={href as string}
          ref={ref as any}
          target="_blank"
          rel="noopener noreferrer"
          {...extra}>
          <IconButton aria-label={icon} size="large">
            {getIcon(icon)}
          </IconButton>
        </a>
      );
    }
    if (href !== '#') {
      return (
        <NextLink href={href} as={linkAs}>
          <IconButton aria-label={icon} type={other.type} {...extra} className={className} size="large">
            {getIcon(icon)}
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
        onClick={other.onClick}
        size="large">
        {getIcon(icon)}
      </IconButton>
    );
  }

  if (variant?.includes('button-')) {
    const buttonVariant = variant.replace('button-', '') as 'text' | 'outlined' | 'contained' | undefined;
    if (href !== '#') {
      if (isExternal) {
        return (
          <a href={href as string} ref={ref as any} target="_blank" rel="noopener noreferrer" {...extra}>
            <Button
              className={className}
              variant={buttonVariant}
              type={other.type}
              {...extra}
              startIcon={icon && iconPosition === 'Left' && getIcon(icon)}
              endIcon={icon && iconPosition !== 'Left' && getIcon(icon)}>
              {text || children}
            </Button>
          </a>
        );
      }

      return (
        <NextLink href={href} as={linkAs}>
          <Button
            className={className}
            variant={buttonVariant}
            type={other.type}
            {...extra}
            startIcon={icon && iconPosition === 'Left' && getIcon(icon)}
            endIcon={icon && iconPosition !== 'Left' && getIcon(icon)}>
            {text || children}
          </Button>
        </NextLink>
      );
    }
    return (
      <Button
        className={className}
        variant={buttonVariant}
        onClick={other.onClick}
        type={other.type}
        {...extra}
        startIcon={icon && iconPosition === 'Left' && getIcon(icon)}
        endIcon={icon && iconPosition !== 'Left' && getIcon(icon)}>
        {text || children}
      </Button>
    );
  }

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <a
          className={className}
          href={href as string}
          ref={ref as any}
          target="_blank"
          rel="noopener noreferrer"
          {...extra}>
          {getButtonContent(text, children, iconPosition, icon)}
        </a>
      );
    }

    return (
      <MuiLink
        className={className}
        href={href as string}
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        {...extra}>
        {getButtonContent(text, children, iconPosition, icon)}
      </MuiLink>
    );
  }

  if (noLinkStyle && icon) {
    return (
      <NextLinkComposed className={className} ref={ref as any} to={href} {...extra}>
        <ButtonWrap sx={{ flexDirection: iconPosition === 'Left' ? 'row-reverse' : undefined }}>
          <span>{children || text}</span>
          {icon && (
            <Box sx={{ margin: iconPosition === 'Left' ? '0 10px 0 0' : '0 0 0 10px' }}>{icon && getIcon(icon)}</Box>
          )}
        </ButtonWrap>
      </NextLinkComposed>
    );
  }
  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref as any} to={href} {...extra}>
        {children || text}
      </NextLinkComposed>
    );
  }

  return (
    <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...extra}>
      {getButtonContent(text, children, iconPosition, icon)}
    </MuiLink>
  );
});

const ButtonWrap = styled(Box, {
  name: 'Box',
  slot: 'Content'
})<{}>(() => ({
  display: 'inline-flex',
  alignItems: 'center'
}));

export default Link;
