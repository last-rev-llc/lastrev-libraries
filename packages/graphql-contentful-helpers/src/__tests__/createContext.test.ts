import createContext from '../createContext';
import createSanityLoaders from '../createSanityLoaders';
import LastRevAppConfig from '../../../app-config/src';
import mockConfig from '../../../app-config/src/app-config.mock';
import sanityClient from '@sanity/client';

jest.mock('../createSanityLoaders');
jest.mock('@sanity/client', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('createContext with Sanity CMS', () => {
  test('initializes loaders and locales', async () => {
    const prodFetch = jest.fn().mockResolvedValue([{ code: 'en-US' }, { code: 'es-ES' }]);
    const previewFetch = jest.fn();
    (sanityClient as jest.Mock)
      .mockReturnValueOnce({ fetch: prodFetch })
      .mockReturnValueOnce({ fetch: previewFetch });

    const loaders = {} as any;
    (createSanityLoaders as jest.Mock).mockReturnValue(loaders);

    const config = new LastRevAppConfig({ ...mockConfig(), cms: 'Sanity' });
    const ctx = await createContext({ config });

    expect(sanityClient).toHaveBeenCalledTimes(2);
    expect(prodFetch).toHaveBeenCalledWith('*[_type == "i18n.locale"]{code}');
    expect(createSanityLoaders).toHaveBeenCalledWith(config, 'en-US');
    expect(ctx.defaultLocale).toBe('en-US');
    expect(ctx.locales).toEqual(['en-US', 'es-ES']);
    expect(ctx.loaders).toBe(loaders);
    expect(ctx.contentful).toHaveProperty('prod');
    expect(ctx.contentful).toHaveProperty('preview');
    expect(ctx.pathReaders).toBeUndefined();
  });
});
