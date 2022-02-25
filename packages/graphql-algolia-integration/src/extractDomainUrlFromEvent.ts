const domainUrlRegex = /^(https?:\/\/[^\/]*)/gim;

const extractDomainUrlFromEvent = (event: any) => {
  const domainUrlMatch = (event?.rawUrl || '').match(domainUrlRegex);
  const domainUrl = domainUrlMatch && domainUrlMatch[0];
  return domainUrl || null;
};

export default extractDomainUrlFromEvent;
