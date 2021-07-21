# Expected Environment Variables

- CONTENTFUL_ACCESSTOKEN (required) - Access Token for Contentful
- CONTENTFUL_SPACE_ID (required when syncing from cms) - ID of the Contentful Space
- CONTENTFUL_HOST (optional) - Contentful Host to use. If not provided, defaults to `cdn.contentful.com`
- CONTENTFUL_ENV (optional) - Contentful environment. If not provided, defaults to `master`
- LAST_REV_SYNC_PREVIEW (optional) - boolean (1 or 0) to sync preview instead of production, when syncing from S3, defaults to false
- LAST_REV_API_KEY (required when syncing from S3) - API Key for the LastRev API
- LAST_REV_API_URL (required when syncing from S3) - URL for the LastRev API
