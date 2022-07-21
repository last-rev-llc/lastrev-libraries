// Next/link:
// https://github.com/mui-org/material-ui/blob/next/examples/nextjs-with-typescript/src/Link.tsx

/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import styled from '@mui/system/styled';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';
import sidekick from '@last-rev/contentful-sidekick-util';

import { NextLinkComposedProps, LinkProps } from './Link.types';
import useThemeProps from '../../utils/useThemeProps';

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps & { onClick?: any }>(
  function NextLinkComposed(props, ref) {
    const {
      to = '#',
      linkAs,

      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      locale,
      text,
      children,
      onClick,
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
        <RootLink ref={ref} {...other} onClick={onClick}>
          {text || children}
        </RootLink>
      </NextLink>
    );
  }
);

// Icon component using FontAwesome
const getIcon = (icon: string) => {
  const brandIcons = ['google', 'twitter', 'facebook', 'github', 'linkedin', 'pinterest', 'instagram', 'youtube'];
  return <Icon className={`fa${brandIcons.includes(icon.toLowerCase()) ? 'b' : 's'} fa-${icon.toLowerCase()}`} />;
};

const getButtonContent = (text: string | undefined, children: any, iconPosition: string | undefined, icon: any) => {
  if (!icon) return text || children;
  return (
    <Root sx={{ flexDirection: iconPosition === 'Left' ? 'row-reverse' : undefined }}>
      <span>{text || children}</span>
      {icon && (
        <Box sx={{ margin: iconPosition === 'Left' ? '0 10px 0 0' : '0 0 0 10px' }}>{icon && getIcon(icon)}</Box>
      )}
    </Root>
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
    // Remove id from other props
    id,
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
  const extra = { variant, ...other, ...sidekick(sidekickLookup), 'aria-label': text };

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
        <RootLink
          className={className}
          href={href as string}
          ref={ref as any}
          target="_blank"
          rel="noopener noreferrer"
          {...extra}>
          <RootIconButton aria-label={icon} size="large">
            {getIcon(icon)}
          </RootIconButton>
        </RootLink>
      );
    }
    if (href !== '#') {
      return (
        <NextLinkComposed to={href} linkAs={linkAs as any}>
          <RootIconButton type={other.type} {...extra} className={className} size="large" aria-label={icon}>
            {getIcon(icon)}
          </RootIconButton>
        </NextLinkComposed>
      );
    }
    return (
      <RootIconButton
        aria-label={icon}
        // component={Link}
        // href={href}
        // ref={ref}
        // type={other.type}
        // {...extra}
        onClick={other.onClick}
        size="large">
        {getIcon(icon)}
      </RootIconButton>
    );
  }
  if (variant?.includes('button-')) {
    const buttonVariant = variant.replace('button-', '') as 'text' | 'outlined' | 'contained' | undefined;
    if (href !== '#') {
      if (isExternal) {
        return (
          <RootLink href={href as string} ref={ref as any} target="_blank" rel="noopener noreferrer" {...extra}>
            <RootButton
              className={className}
              type={other.type}
              {...extra}
              variant={buttonVariant}
              startIcon={icon && iconPosition === 'Left' && getIcon(icon)}
              endIcon={icon && iconPosition !== 'Left' && getIcon(icon)}>
              {text || children}
            </RootButton>
          </RootLink>
        );
      }

      return (
        <NextLink href={href} as={linkAs as any} passHref>
          <RootButton
            className={className}
            type={other.type}
            {...extra}
            variant={buttonVariant}
            startIcon={icon && iconPosition === 'Left' && getIcon(icon)}
            endIcon={icon && iconPosition !== 'Left' && getIcon(icon)}>
            {text || children}
          </RootButton>
        </NextLink>
      );
    }

    return (
      <RootButton
        className={className}
        onClick={other.onClick}
        type={other.type}
        {...extra}
        variant={buttonVariant}
        startIcon={icon && iconPosition === 'Left' && getIcon(icon)}
        endIcon={icon && iconPosition !== 'Left' && getIcon(icon)}>
        {text || children}
      </RootButton>
    );
  }
  if (isExternal) {
    if (noLinkStyle) {
      return (
        <RootLink
          className={className}
          href={href as string}
          ref={ref as any}
          target="_blank"
          rel="noopener noreferrer"
          {...extra}>
          {getButtonContent(text, children, iconPosition, icon)}
        </RootLink>
      );
    }

    return (
      <RootMuiLink
        className={className}
        href={href as string}
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        {...extra}>
        {getButtonContent(text, children, iconPosition, icon)}
      </RootMuiLink>
    );
  }
  if (noLinkStyle && icon) {
    return (
      <NextLinkComposed className={className} ref={ref as any} to={href} {...other}>
        <Root sx={{ flexDirection: iconPosition === 'Left' ? 'row-reverse' : undefined }}>
          <span>{children || text}</span>
          {icon && (
            <Box sx={{ margin: iconPosition === 'Left' ? '0 10px 0 0' : '0 0 0 10px' }}>{icon && getIcon(icon)}</Box>
          )}
        </Root>
      </NextLinkComposed>
    );
  }
  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref as any} to={href} {...other}>
        {children || text}
      </NextLinkComposed>
    );
  }

  return (
    <RootMuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...extra}
      // Not getting the prop validation from NextLinkComposed
      // @ts-expect-error
      passHref>
      {getButtonContent(text, children, iconPosition, icon)}
    </RootMuiLink>
  );
});

const shouldForwardProp = (prop: string) => prop !== '__typename';

const Root = styled(Box, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{}>(() => ({
  display: 'inline-flex',
  alignItems: 'center'
}));

const RootLink = styled('a', {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root, styles.rootLink]
})<{}>(() => ({}));

const RootMuiLink = styled(MuiLink, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root, styles.rootMuiLink]
})``;

const RootButton = styled(Button, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root, styles.rootButton]
})``;

const RootIconButton = styled(IconButton, {
  name: 'Link',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root, styles.rootButton]
})``;

export default Link;
