import { linkMock } from '../Link/Link.mock';
import { mediaMock } from '../Media/Media.mock';
import { paragraphMock, richTextMock } from '../Text/Text.mock';

export const baseMock = () => ({
  variant: 'default',
  introText: paragraphMock({ text: 'This is the intro text' }),
  eyebrow: 'This is the eyebrow',
  title: 'This is the title',
  subtitle: 'This is the subtitle',
  body: richTextMock({ text: 'This is the body' }),
  mediaItems: [mediaMock({ title: 'Media 1' }), mediaMock({ title: 'Media 2' })],
  actions: [
    linkMock({ text: 'Action 1', variant: 'button-contained' }),
    linkMock({ text: 'Action 2', variant: 'button-outlined' })
  ],
  link: linkMock({ text: 'Block Link', variant: 'button-contained' })
});
