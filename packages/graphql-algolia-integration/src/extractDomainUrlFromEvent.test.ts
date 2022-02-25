import extractDomainUrlFromEvent from './extractDomainUrlFromEvent';

describe('extractDomainUrlFromEvent.ts', () => {
  it('correctly extracts domain url from event', () => {
    const event = {
      rawUrl: 'https://www.example.com/foo/bar'
    };
    const domainUrl = extractDomainUrlFromEvent(event);
    expect(domainUrl).toEqual('https://www.example.com');
  });

  it('correctly extracts domain url from event twice in a row', () => {
    const event = {
      rawUrl: 'https://www.example.com/foo/bar'
    };
    const domainUrl = extractDomainUrlFromEvent(event);
    expect(domainUrl).toEqual('https://www.example.com');

    const domainUrl2 = extractDomainUrlFromEvent(event);
    expect(domainUrl2).toEqual('https://www.example.com');
  });

  it('returns null with no event', () => {
    const domainUrl = extractDomainUrlFromEvent(undefined);
    expect(domainUrl).toBeNull();
  });

  it('returns null when rawUrl does not contain a domain', () => {
    const domainUrl = extractDomainUrlFromEvent({ rawUrl: 'foo' });
    expect(domainUrl).toBeNull();
  });
});
