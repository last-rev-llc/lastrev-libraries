# LastRev Contentful Sidekick Util

This utility outputs an object whose properties can be passed to a React html element in order to properly render the [Contentful Sidekick](https://github.com/last-rev-llc/contentful-sidekick) sidebar.

## Usage

### inputs

The default export is a single function that takes 4 parameters:

```javascript
import sidekick from '@last-rev/cms-sidekick-util';

const out = sidekick({ contentId, fieldName, contentTypeId, displayText });
```

- `contentId` : The id of the contentful entry being rendered
- `fieldName`: The API name of the field from the contentful entry which is rendered
- `contentTypeId`: The content type ID of the entry being rendered
- `displayText`: A human-friendly text that will be seen in the Contentful Sidekick sidebar. This can be used to represent the content itself, or it can be used on its own to group content in the sidebar

either one of `contentId` or `displayText` is required to output anything.

### outputs

The util outputs an object with the following properties:

- `csk-entry-id`: the content ID. will be omitted if no ID is passed to the util.
- `csk-entry-field`: the field name. will be omitted if no field is passed to the util.
- `csk-entry-type`: the content type ID. will be omitted if no type is passed to the util.
- `csk-entry-display-text`: The display text. It will either use what is passed into the util, or will construct one based on the field/type given. If neither of those are used, it will simply display "Item".

### usage

The object can be spread and passed to a react element in the following way:

```javascript
import React from 'react';
import sidekick from '@last-rev/cms-sidekick-util';

export default function MyComponent(id, title, sections) {
  return (
    <div {...sidekick(id, null, null, title)}>
      <h1 {...sidekick(id, 'title')}>{title}</h1>
      {sections && sections.length ? (
        <div {...sidekick(id, 'sections', null, 'Content Sections')}>
          {sections.map((section) => (
            <div {...sidekick(section.id, null, null, section.internalTitle)}> {/* ... render section here  */}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
```
