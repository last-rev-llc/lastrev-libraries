import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import sidekick from '@last-rev/contentful-sidekick-util';

import Link from '../Link';

interface DocumentProps {
  googleDocUrl?: string;
  lastUpdatedDateOfGoogleDoc?: string;
  downloadUrl?: string;
  sidekickLookup?: any;
}

const Document = ({ googleDocUrl, lastUpdatedDateOfGoogleDoc, downloadUrl, sidekickLookup }: DocumentProps) => {
  return (
    <Box {...sidekick(sidekickLookup)}>
      {(downloadUrl || lastUpdatedDateOfGoogleDoc) && (
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          gap={2}
          mb={1}
          sx={{ button: { padding: 0 } }}>
          {lastUpdatedDateOfGoogleDoc && <Typography variant="overline">{lastUpdatedDateOfGoogleDoc}</Typography>}
          {downloadUrl && <Link href={downloadUrl} icon="download" size="small" target="_parent" />}
        </Box>
      )}
      <iframe src={googleDocUrl} width="100%" height="500px" />{' '}
    </Box>
  );
};

export default Document;
