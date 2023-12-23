```
// route handler with secret and slug
import { draftMode } from 'next/headers';
// import { redirect } from 'next/navigation';
import client from '../../../../../../packages/graphql-sdk/src/client';
import { notFound } from 'next/navigation';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const locale = searchParams.get('locale');
  // const environment = searchParams.get('environment');
  const id = searchParams.get('id');

  if (!id) {
    return notFound();
  }

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_TOKEN && process.env.NODE_ENV !== 'development') {
    return new Response(`Invalid token sec:${secret} - tok:${process.env.PREVIEW_TOKEN}, env:${process.env.NODE_ENV}`, {
      status: 401
    });
  }

  // Fetch the headless CMS to check if the provided `id` exists
  // getpageBySlug would implement the required fetching logic to the headless CMS
  const {
    data: { content }
  } = await client.Preview({ id, locale: locale ?? 'en-US' });

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!content) {
    return new Response('Invalid id', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched page
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  // TODO: Draft mode not propagating correctly
  // if ((content as any).path) {
  //   return new Response(null, {
  //     status: 307,
  //     headers: {
  //       Location: (content as any).path!
  //     }
  //   });
  // }
  return new Response(null, {
    status: 307,
    headers: {
      Location: `/preview/${content.id}`
    }
  });
}

```

API Summary:
This file contains a route handler for a GET request that handles previewing content from a headless CMS. It checks for a secret token, fetches content from the CMS based on the provided ID, and enables draft mode before redirecting to the previewed content.

Import statements:
- `draftMode` from 'next/headers': Used to enable draft mode for the previewed content.
- `client` from '../../../../../../packages/graphql-sdk/src/client': Imports the client for making requests to the headless CMS.
- `notFound` from 'next/navigation': Used to return a 404 response if the ID is not provided.

Internal Functions:
- `GET(request: Request)`: Handles the GET request and performs the necessary operations to preview content from the headless CMS.

External Services:
- Headless CMS: The code interacts with a headless CMS to fetch content based on the provided ID.

API Endpoints:
GET /api/route
Summary: Handles previewing content from a headless CMS based on the provided ID and secret token.
Example Usage:
```
curl -X GET \
  http://localhost:3000/api/route?secret=abc123&locale=en-US&id=123 \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
```

Example Response:
```json
{
  "status": 307,
  "headers": {
    "Location": "/preview/123"
  }
}
```

Interaction Summary:
1. The client makes a GET request to the /api/route endpoint with the required query parameters (secret, locale, id).
2. The route handler parses the query parameters and checks the secret token.
3. If the token is valid, it fetches the content from the headless CMS based on the provided ID.
4. If the content exists, draft mode is enabled and the client is redirected to the previewed content.

Developer Questions:
- How is the draft mode cookie managed and propagated throughout the application?
- What are the potential security risks associated with the handling of the secret token and content redirection?
- How can the code be extended to support additional query parameters or customization for the previewed content?

TODO:
- Investigate and resolve the issue with draft mode not propagating correctly.
- Implement additional error handling and validation for the query parameters and content fetching process.
```