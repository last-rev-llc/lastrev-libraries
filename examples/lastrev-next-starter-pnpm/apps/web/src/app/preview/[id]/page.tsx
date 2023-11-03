import React from 'react';
import ContentPreview from '@ui/ContentPreview';
import { client } from '@graphql-sdk/client';

import { AppProvider } from '@ui/AppProvider/AppProvider';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const locale = 'en-US';

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    other: {
      pageId: params.id
    }
  };
}

export default async function Preview({ params }: Props) {
  const { id } = params;
  const { data } = await client.Preview({ id, locale });
  if (!data?.content) {
    return notFound();
  }

  return (
    <AppProvider>
      <ContentPreview {...data} id={id} />
    </AppProvider>
  );
}
