import React from 'react';
import {
  Container,
  Box as MuiBox,
  Grid as MuiGrid,
  Typography,
  FormControl as MuiFormControl,
  TextField
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styled from '@mui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import LRFALink from '../Link';

import CModule from '../ContentModule';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import snakeCase from 'lodash/snakeCase';
import sidekick from '@last-rev/contentful-sidekick-util';
import getFirstOfArray from '../../utils/getFirstOfArray';
import { CustomFormProps, MailchimpFormProps, SubscribeFormData } from './MailchimpForm.types';
const url = '//strong365.us3.list-manage.com/subscribe/post?u=d86f5abb669bd78efab8bbf17&id=a842d73410';

const CustomForm = ({
  status,
  message: rawMessage,
  subscribe,
  actions,
  successMessage,
  image,
  internalTitle,
  sidekickLookup
}: CustomFormProps) => {
  const { handleSubmit, control } = useForm<SubscribeFormData>();
  const message = typeof rawMessage === 'string' ? rawMessage.split('. ')[0] : '';
  const loading = status === 'sending';
  return (
    <form id={`form_${snakeCase(internalTitle)}`} onSubmit={handleSubmit(subscribe)} style={{ width: '100%' }}>
      <FormContainer container>
        <Grid sx={{ px: 5, opacity: status === 'success' ? 0 : 1 }} container item xs={12} sm={8}>
          {/* {status === 'error' ? <Box>Error {message}</Box> : null} */}
          <Controller
            name="FNAME"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FirstNameTextField
                id="mce-FNAME"
                name="FNAME"
                variant="filled"
                fullWidth
                margin="normal"
                disabled={loading}
                label="First Name (optional)"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : ''}
              />
            )}
          />
          <Controller
            name="LNAME"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LastNameTextField
                id="mce-LNAME"
                name="LNAME"
                variant="filled"
                fullWidth
                margin="normal"
                disabled={loading}
                label="Last Name (optional)"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : ''}
              />
            )}
          />
          <Controller
            name="EMAIL"
            control={control}
            defaultValue=""
            rules={{ required: 'Email required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <EmailTextField
                id="mce-EMAIL"
                name="EMAIL"
                type="email"
                fullWidth
                margin="normal"
                disabled={loading}
                variant="filled"
                label="Email Address"
                value={value}
                onChange={onChange}
                error={!!error || !!message}
                helperText={error ? error.message : message} // Use the MailChimp error message by default
              />
            )}
          />
        </Grid>
        <SubmitContainer container item xs={12} sm={4} sx={{ px: 5, zIndex: 1, opacity: status === 'success' ? 0 : 1 }}>
          <FormControl>
            {actions?.map((link) => (
              <Link key={link.id} {...link} type="submit" disabled={loading} />
            ))}
          </FormControl>
        </SubmitContainer>
        <FormImage __typename="Media" {...sidekick(sidekickLookup?.image)} {...getFirstOfArray(image)} />
        <SuccessRoot
          container
          sx={{
            p: 5,
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            opacity: status === 'success' ? 1 : 0,
            pointerEvents: status === 'success' ? 'initial' : 'none'
          }}>
          {successMessage ? (
            <ContentModule
              __typename="Text"
              variant="mailchimp-form"
              body={successMessage}
              data-testid="MailchimpForm-successMessage"
            />
          ) : (
            <Box>Success</Box>
          )}
        </SuccessRoot>
      </FormContainer>
    </form>
  );
};

export const MailchimpForm = ({
  internalTitle,
  variant,
  contentWidth = 'lg',
  title,
  subtitle,
  body,
  successMessage,
  actions,
  image,
  sidekickLookup
}: MailchimpFormProps) => (
  <ErrorBoundary>
    <Root {...sidekick(sidekickLookup)} variant={variant} data-testid="MailchimpForm">
      <ContentContainer maxWidth={contentWidth}>
        <ContentRoot container>
          <TextsRoot item xs={9} sm={7}>
            {title ? (
              <TitleMailChimpForm {...sidekick(sidekickLookup?.title)} variant="h3" data-testid="MailchimpForm-title">
                {title}
              </TitleMailChimpForm>
            ) : null}
            {subtitle ? (
              <SubtitleMailChimpForm
                {...sidekick(sidekickLookup?.subtitle)}
                variant="h4"
                data-testid="MailchimpForm-subtitle">
                {subtitle}
              </SubtitleMailChimpForm>
            ) : null}
            {body ? (
              <BodyMailChimpForm
                __typename="Text"
                variant="MailchimpForm"
                sidekickLookup={sidekickLookup?.body}
                body={body}
                data-testid="MailchimpForm-body"
              />
            ) : null}
          </TextsRoot>
          <FormRoot container item sx={{ position: 'relative' }}>
            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }) => (
                <CustomForm
                  internalTitle={internalTitle}
                  status={status}
                  message={message}
                  subscribe={subscribe}
                  actions={actions}
                  successMessage={successMessage}
                  image={image}
                  sidekickLookup={sidekickLookup}
                />
              )}
            />
          </FormRoot>
        </ContentRoot>
      </ContentContainer>
    </Root>
  </ErrorBoundary>
);

const Root = styled(MuiBox, {
  name: 'MailchimpForm',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'MailchimpForm',
  slot: 'ContentContainer',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8)
}));

const ContentRoot = styled(MuiGrid, {
  name: 'MailchimpForm',
  slot: 'ContentRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.contentRoot]
})``;

const TextsRoot = styled(MuiGrid, {
  name: 'MailchimpForm',
  slot: 'TextsRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.textsRoot]
})``;

const TitleMailChimpForm = styled(Typography, {
  name: 'MailchimpForm',
  slot: 'TitleMailChimpForm',
  overridesResolver: (_, styles) => [styles.titleMailChimpForm]
})``;

const SubtitleMailChimpForm = styled(Typography, {
  name: 'MailchimpForm',
  slot: 'SubtitleMailChimpForm',
  overridesResolver: (_, styles) => [styles.subtitleMailChimpForm]
})``;

const BodyMailChimpForm = styled(CModule, {
  name: 'MailchimpForm',
  slot: 'BodyMailChimpForm',
  overridesResolver: (_, styles) => [styles.bodyMailChimpForm]
})``;

const FormRoot = styled(MuiGrid, {
  name: 'MailchimpForm',
  slot: 'FormRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.formRoot]
})``;

//Form components

const FormContainer = styled(MuiGrid, {
  name: 'Form',
  slot: 'FormContainer',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.formContainer]
})<{ variant?: string }>(({ theme }) => ({
  'position': 'relative',
  'borderRadius': 20,
  'backgroundColor': theme.palette.quartiary?.main,
  'border': '1px solid grey',
  'paddingTop': theme.spacing(3),
  'paddingBottom': theme.spacing(4),
  'marginTop': theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3)
  },

  '& .MuiInputBase-input': {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.secondary.main}`
  },
  '& label.Mui-focused': {
    padding: '1px 4px',
    backgroundColor: 'white',
    border: `2px solid ${theme.palette.secondary.main}`,
    transform: 'translate(12px, -18px) scale(0.75)'
  }
}));

const Grid = styled(MuiGrid, {
  name: 'Form',
  slot: 'Grid',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.grid]
})``;

const FirstNameTextField = styled(TextField, {
  name: 'Form',
  slot: 'FirstNameTextField',
  overridesResolver: (_, styles) => [styles.firstNameTextField]
})``;

const LastNameTextField = styled(TextField, {
  name: 'Form',
  slot: 'LastNameTextField',
  overridesResolver: (_, styles) => [styles.lastNameTextField]
})``;

const EmailTextField = styled(TextField, {
  name: 'Form',
  slot: 'EmailTextField',
  overridesResolver: (_, styles) => [styles.emailTextField]
})``;

const SubmitContainer = styled(MuiGrid, {
  name: 'Form',
  slot: 'SubmitContainer',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.submitContainer]
})<{ variant?: string }>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    'paddingTop': theme.spacing(3),
    '& .MuiFormControl-root': {
      width: '100%',
      textAlign: 'center'
    }
  },

  [theme.breakpoints.up('md')]: {
    alignSelf: 'flex-end'
  }
}));

const FormControl = styled(MuiFormControl, {
  name: 'Form',
  slot: 'FormControl',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.formControl]
})``;

const Link = styled(LRFALink, {
  name: 'Form',
  slot: 'Link',
  overridesResolver: (_, styles) => [styles.link]
})``;

const FormImage = styled(CModule, {
  name: 'Form',
  slot: 'Image',
  overridesResolver: (_, styles) => [styles.formImage]
})<{ variant?: string }>(({ theme }) => ({
  position: 'absolute',
  height: '125%',
  maxWidth: '50%',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 0,
  objectFit: 'fill',
  [theme.breakpoints.down('lg')]: {
    bottom: 'initial',
    top: theme.spacing(3),
    maxWidth: '25%',
    height: 'auto'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const SuccessRoot = styled(MuiGrid, {
  name: 'Form',
  slot: 'SuccessRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.successRoot]
})``;

const ContentModule = styled(CModule, {
  name: 'Form',
  slot: 'ContentModule',
  overridesResolver: (_, styles) => [styles.contentModule]
})``;

const Box = styled(MuiBox, {
  name: 'Form',
  slot: 'Box',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.box]
})``;

export default MailchimpForm;
