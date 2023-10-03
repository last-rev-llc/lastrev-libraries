import React from 'react';
import clsx from 'clsx';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';

import sidekick from '@last-rev/contentful-sidekick-util';

import type { LinkProps, LinkOwnerState } from './Link.types';

const isReactComponent = (value: any): value is React.ComponentType<any> => {
  return typeof value === 'function' && value.prototype && typeof value.prototype.render === 'function';
};

// Icon component using FontAwesome
// TODO: Clean this up
const getIcon = (LinkIcon: string | React.ComponentType<any>) => {
  if (isReactComponent(LinkIcon)) {
    return <LinkIcon />;
  }

  const brandIcons = ['google', 'twitter', 'facebook', 'github', 'linkedin', 'pinterest', 'instagram', 'youtube'];
  const iconString = LinkIcon.toString().toLowerCase();
  return <Icon className={`fa${brandIcons.includes(iconString) ? 'b' : 's'} fa-${iconString}`} />;
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<any, LinkProps>(function Link(props, ref) {
  const ownerState = { ...props };

  const {
    activeClassName = 'MuiLink-selected',
    className: classNameProps,
    href = '#',
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
  } = props;

  // Color prop fails if it's null
  if (!other.color) delete other.color;

  const pathname = usePathname();
  const className = clsx(classNameProps, {
    [activeClassName]: pathname?.toLowerCase().startsWith(href?.toLowerCase()) && activeClassName
  });

  const sharedLinkProps = {
    'component': NextLink,
    className,
    ref,
    href,
    variant,
    ...other,
    ...sidekick(sidekickLookup),
    'aria-label': text,
    'ownerState': ownerState
  };

  if (children) {
    <RootLinkChildren {...sharedLinkProps}>{children}</RootLinkChildren>;
  }

  if (!text && icon) {
    return <RootIconButton {...sharedLinkProps}>{getIcon(icon)}</RootIconButton>;
  }

  if (variant?.includes('button')) {
    const buttonVariant = variant.replace('button', '') as 'text' | 'outlined' | 'contained' | undefined;

    return (
      <RootButton
        {...sharedLinkProps}
        variant={buttonVariant}
        startIcon={icon && iconPosition === 'Left' && getIcon(icon)}
        endIcon={icon && iconPosition !== 'Left' && getIcon(icon)}>
        {text || children}
      </RootButton>
    );
  }

  if (text && icon) {
    <RootLinkTextIcon {...sharedLinkProps}>
      <RootLinkText ownerState={ownerState}>{text}</RootLinkText>
      <RootLinkIcon ownerState={ownerState}>{getIcon(icon)}</RootLinkIcon>
    </RootLinkTextIcon>;
  }

  return <RootLink {...sharedLinkProps}>{text}</RootLink>;
});

const RootButton = styled(Button, {
  name: 'Link',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, styles.rootButton]
})<{ ownerState: LinkOwnerState }>``;

const RootIconButton = styled(IconButton, {
  name: 'Link',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, styles.rootIconButton]
})<{ ownerState: LinkOwnerState }>``;

const RootLinkTextIcon = styled(MuiLink, {
  name: 'Link',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, styles.rootLink]
})<{ ownerState: LinkOwnerState }>``;

const RootLink = styled(MuiLink, {
  name: 'Link',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, styles.rootLink]
})<{ ownerState: LinkOwnerState }>``;

const RootLinkChildren = styled(NextLink, {
  name: 'Link',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, styles.rootLinkChildren]
})<{ ownerState: LinkOwnerState }>``;

const RootLinkIcon = styled(Box, {
  name: 'Link',
  slot: 'RootLinkIcon',
  overridesResolver: (_, styles) => [styles.root, styles.rootLinkIcon]
})<{ ownerState: LinkOwnerState }>``;

const RootLinkText = styled(Box, {
  name: 'Link',
  slot: 'RootLinkText',
  overridesResolver: (_, styles) => [styles.root, styles.rootLinkText]
})<{ ownerState: LinkOwnerState }>``;

export default Link;
