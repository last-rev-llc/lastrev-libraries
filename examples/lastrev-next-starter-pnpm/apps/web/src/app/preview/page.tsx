import React from 'react';
import ContentPreview from '@ui/ContentPreview';
import { getClient } from '@graphql-sdk/client';

import { AppProvider } from '@ui/AppProvider/AppProvider';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const locale = 'en-US';

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    other: {
      pageId: params.id
    }
  };
}

export default async function Preview({ params, searchParams }: Props) {
  const { id } = params;
  const environment = searchParams.environment;
  const client = getClient({ environment });
  const { data } = await client.Preview({ id, locale });

  if (!data?.content) {
    return notFound();
  }

  return (
    <AppProvider>
      <ContentPreview {...data} id={id} searchParams={searchParams} />
    </AppProvider>
  );
}
