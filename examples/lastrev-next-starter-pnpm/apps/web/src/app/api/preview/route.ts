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
  if ((secret !== process.env.PREVIEW_TOKEN || 'MY_SECRET_TOKEN') && process.env.NODE_ENV !== 'development') {
    return new Response(`Invalid token sec:${secret} - tok:${process.env.PREVIEW_TOKEN}`, { status: 401 });
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
