---
'@last-rev/graphql-cms-core': patch
'@last-rev/cms-path-util': patch
'@last-rev/types': patch
---

Update internationalized-array field locale resolution to match `sanity-plugin-internationalized-array` v5's storage shape, where the locale is stored on a `language` field instead of `_key` (`_key` is now a random array-item id, consistent with other Sanity array items). This is a breaking change from the pre-v5 `_key`-as-locale shape.

Also fixes `getDefaultFieldValue` so Sanity i18n array fields are correctly unwrapped to the default-locale value instead of returning the raw array.
