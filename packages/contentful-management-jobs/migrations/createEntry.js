const createEntry = ({ entry, fields, contentType, entryId }) => {
  const contentfulEntry = {
    entryId,
    contentType,
    contentfulFields: fields.reduce(
      (accum, field) =>
        entry[field]
          ? {
              ...accum,
              [field]: {
                'en-US': entry[field]
              }
            }
          : accum,
      {}
    )
  };

  return contentfulEntry;
};

exports.createEntry = createEntry;
