import ContentModule from '@ui/ContentModule/ContentModule';
import { client } from '@graphql-sdk/client';

import { AppProvider } from '@ui/AppProvider/AppProvider';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const locale = 'en-US';

export default async function Preview({ params }: Props) {
  const { id } = params;
  const { data } = await client.Preview({ id, locale });
  console.log('Preview', { id, data });
  if (!data?.content) {
    return notFound();
  }
  return (
    <AppProvider>
      <ContentModule {...data.content} />
    </AppProvider>
  );
}
