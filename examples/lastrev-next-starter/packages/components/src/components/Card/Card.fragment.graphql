fragment Card_FieldsFragment on Card {
  ...Content_BaseFragment
  variant
  theme {
    id
    components
    typography
  }
  media {
    ...Media_BaseFragment
  }
  title
  subtitle
  actions {
    ...Link_BaseFragment
  }
  link {
    ...Link_CardFragment
  }
}

# Base fragment used everywhere there's a Card
fragment Card_BaseFragment on Card {
  ...Card_FieldsFragment
  body {
    ...RichText_BaseFragment
  }
}

# Specific fragment used for the RichText embedded entries
fragment Card_RichTextFragment on Card {
  ...Card_FieldsFragment

  body {
    ...RichText_CardFragment
  }
}
