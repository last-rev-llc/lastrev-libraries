import React, { useRef } from 'react';
import { Container, Box, Grid, Typography, Breakpoint, FormControl, TextField, TextFieldProps } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Link from '../Link';
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import Text, { RichText } from '../Text';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const url = '//strong365.us3.list-manage.com/subscribe/post?u=d86f5abb669bd78efab8bbf17&id=a842d73410';

export interface MailchimpFormProps {
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
}

interface FormFields {
  EMAIL: string;
  FNAME?: string;
  LNAME?: string;
}

type StatusTypes = 'sending' | 'error' | 'success' | undefined;

type SubscribeType = (data: FormFields) => void;

interface CustomFormProps {
  status?: StatusTypes;
  message?: string | undefined;
  subscribe: SubscribeType;
}

export const MailchimpForm = ({
  variant,
  background,
  contentWidth,
  title,
  subtitle,
  body,
  successMessage,
  actions,
  image,
  theme
}: MailchimpFormProps) => {
  const emailRef = useRef<TextFieldProps>();
  const firstNameRef = useRef<TextFieldProps>();
  const lastNameRef = useRef<TextFieldProps>();

  const CustomForm = ({ status, message, subscribe }: CustomFormProps) => {
    const submit = () => {
      const emailValue = emailRef && emailRef.current && emailRef.current.value ? emailRef.current.value : '';
      const firstNameValue = firstNameRef && firstNameRef.current && firstNameRef.current.value ? firstNameRef.current.value : '';
      const lastNameValue = lastNameRef && lastNameRef.current && lastNameRef.current.value ? lastNameRef.current.value : '';
      return subscribe({
        EMAIL: emailValue,
        FNAME: firstNameValue,
        LNAME: lastNameValue
      });
    };

    //TODO - Error clears out state of textfields.   Should persist.
    switch (status) {
      case 'sending':
        return <Box>Sending...</Box>; //TODO: Add spinner or something

      case 'success':
        return (<Grid container pl={5} pr={5} item direction="column" xs={12} sm={6} alignContent="flex-start">
          {(successMessage ? <Text body={successMessage} /> : <Box>Success</Box>)}
        </Grid>);

      default:
        return (
          <>
            <Grid container pl={5} pr={5} item direction="column" xs={12} sm={6} alignContent="flex-start">
              {status === 'error' ? <Box>Error {message}</Box> : null}

              <TextField
                id="mce-FNAME"
                name="FNAME"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="First Name (optional)"
                inputRef={firstNameRef}
              />

              <TextField
                id="mce-LNAME"
                name="LNAME"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Last Name (optional)"
                inputRef={lastNameRef}
              />

              <TextField
                id="mce-EMAIL"
                name="EMAIL"
                type="email"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Email Address"
                inputRef={emailRef}
              />
            </Grid>

            <Grid container pl={5} pr={5} item xs={12} sm={6} className="submitContainer">
              <FormControl>
                {actions?.map((link) => (
                  <Link {...link} type="submit" onClick={submit} />
                ))}
              </FormControl>
            </Grid>
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <Root variant={variant}>
        <ContentContainer maxWidth={contentWidth}>
          <Grid container sx={{ maxWidth: 'xl' }}>
            <Grid container item xs={9} sm={7}>
              {title ? (
                <Typography variant="h1" component="h1">
                  {title}
                </Typography>
              ) : null}

              {subtitle ? (
                <Typography variant="h2" component="h2">
                  {subtitle}
                </Typography>
              ) : null}

              {body ? <Text body={body} /> : null}
            </Grid>

            <Grid container item>
              <Grid container className="formContainer">
                <MailchimpSubscribe
                  url={url}
                  render={({ subscribe, status, message }: CustomFormProps) => (
                    <CustomForm status={status} message={message} subscribe={subscribe} actions={actions} successMessage={successMessage} />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          {Array.isArray(image) ? <Media {...image[0]} /> : <Media {...image} />}
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'MailchimpForm',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({}));
export default MailchimpForm;
