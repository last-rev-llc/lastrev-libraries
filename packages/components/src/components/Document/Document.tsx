import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LaunchIcon from '@mui/icons-material/Launch';
import sidekick from '@last-rev/contentful-sidekick-util';

import Link from '../Link';
import { useLocalizationContext } from '../LocalizationContext';

interface DocumentProps {
  googleId?: string;
  googleDocUrl?: string;
  lastUpdatedDateOfGoogleDoc?: string;
  downloadUrl?: string;
  sidekickLookup?: any;
}

const Document = ({
  googleId,
  googleDocUrl,
  lastUpdatedDateOfGoogleDoc,
  downloadUrl,
  sidekickLookup
}: DocumentProps) => {
  const localization = useLocalizationContext();
  const docType = (googleDocUrl: any) => {
    if (googleDocUrl?.includes('document')) return 'document';
    if (googleDocUrl?.includes('spreadsheets')) return 'spreadsheets';
    if (googleDocUrl?.includes('presentation')) return 'presentation';
    return 'document';
  };
  return (
    <Box {...sidekick(sidekickLookup)}>
      {(downloadUrl || lastUpdatedDateOfGoogleDoc) && (
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
          justifyContent="flex-end"
          gap={2}
          mb={1}
          sx={{ button: { padding: 0 } }}>
          {googleId && (
            <GoogleDocLink
              href={`https://docs.google.com/${docType(googleDocUrl)}/d/${googleId}/edit#`}
              rel="nofollow noopener"
              target="_blank">
              <LaunchIcon fontSize="small" />
              {localization['document.googleDocLink.label']?.shortTextValue ?? 'Click here for the Google Doc link'}
            </GoogleDocLink>
          )}
          <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
            {lastUpdatedDateOfGoogleDoc && (
              <Typography variant="overline" mr={1}>
                {lastUpdatedDateOfGoogleDoc}
              </Typography>
            )}
            {downloadUrl && (
              <Link
                href={downloadUrl}
                icon="download"
                size="small"
                target="_parent"
                style={{ transform: 'scale(0.7)' }}
              />
            )}
          </Stack>
        </Box>
      )}
      <iframe src={googleDocUrl} width="100%" height="500px" />{' '}
    </Box>
  );
};

const GoogleDocLink = styled(Link, {
  name: 'Document',
  slot: 'GoogleDocLink'
})(() => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: 'auto',
  // TODO: Add new brand color to theme
  color: '#2D5E4A',
  fontSize: '14px',
  textIndent: 4
}));

export default Document;
