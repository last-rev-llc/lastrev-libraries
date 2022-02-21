const createPermaLink = (section?: string) => {
  if (!section) return '';
  const link = section
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\-_\s]/g, '')
    .split(' ')
    .reduce((accum, txt) => {
      return (accum ? accum + '-' : '') + txt;
    }, '');

  return link ? `#${link}` : '';
};

export default createPermaLink;
