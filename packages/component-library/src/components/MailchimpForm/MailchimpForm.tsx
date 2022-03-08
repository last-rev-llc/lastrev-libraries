import React from 'react';
import { Container, Box, Grid, Typography, Breakpoint, FormControl, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styled from '@mui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Link from '../Link';
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import ContentModule from '../ContentModule';
import { RichText } from '../Text';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import snakeCase from 'lodash/snakeCase';
import sidekick from '../../utils/sidekick';
import getFirstOfArray from '../../utils/getFirstOfArray';
const url = '//strong365.us3.list-manage.com/subscribe/post?u=d86f5abb669bd78efab8bbf17&id=a842d73410';

export interface MailchimpFormProps {
  internalTitle?: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  successMessage?: RichText;
  actions?: any[];
  image?: MediaProps | MediaProps[];
  background?: any;
  contentWidth?: false | Breakpoint | undefined;
  variant?: any;
  theme: any;
  sidekickLookup: any;
}

interface FormFields {
  EMAIL: string;
  FNAME?: string;
  LNAME?: string;
}

type StatusTypes = 'sending' | 'error' | 'success' | undefined | null;

type SubscribeType = (data: FormFields) => void;

interface CustomFormProps {
  internalTitle?: string;
  status?: StatusTypes;
  message?: String | Error | null;
  subscribe: SubscribeType;
  actions?: any[];
  successMessage?: RichText;
  image?: MediaProps | MediaProps[];
  sidekickLookup: any;
}
interface SubscribeFormData {
  EMAIL: string;
  FNAME?: string;
  LNAME?: string;
}

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
              <TextField
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
              <TextField
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
              <TextField
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
        <FormImage {...sidekick(sidekickLookup?.image)} {...getFirstOfArray(image)} />
        <Grid
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
        </Grid>
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
        <Grid container>
          <Grid item xs={9} sm={7}>
            {title ? (
              <Typography {...sidekick(sidekickLookup?.title)} variant="h3" data-testid="MailchimpForm-title">
                {title}
              </Typography>
            ) : null}
            {subtitle ? (
              <Typography {...sidekick(sidekickLookup?.subtitle)} variant="h4" data-testid="MailchimpForm-subtitle">
                {subtitle}
              </Typography>
            ) : null}
            {body ? (
              <ContentModule
                __typename="Text"
                variant="MailchimpForm"
                sidekickLookup={sidekickLookup?.body}
                body={body}
                data-testid="MailchimpForm-body"
              />
            ) : null}
          </Grid>

          <Grid container item sx={{ position: 'relative' }}>
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
          </Grid>
        </Grid>
      </ContentContainer>
    </Root>
  </ErrorBoundary>
);

const Root = styled(Box, {
  name: 'MailchimpForm',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'Form',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8)
}));

const FormImage = styled(Media, {
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

const FormContainer = styled(Grid, {
  name: 'Form',
  slot: 'FormContainer',
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

const SubmitContainer = styled(Grid, {
  name: 'Form',
  slot: 'SubmitContainer',
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

export default MailchimpForm;
