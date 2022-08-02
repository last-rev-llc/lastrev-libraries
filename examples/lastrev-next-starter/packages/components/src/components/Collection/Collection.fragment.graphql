fragment Collection_FieldsFragment on Collection {
  ...Content_BaseFragment
  variant
  itemsVariant
  itemsWidth
  itemsSpacing
  theme {
    id
    components
    typography
  }
  settings
  styles
  introText {
    ...Text_IntroTextFragment
  }
}

# Base fragment used everywhere there's a Card
fragment Collection_BaseFragment on Collection {
  ...Collection_FieldsFragment
  items {
    ...Card_BaseFragment
    ...Link_BaseFragment
    ...NavigationItem_BaseFragment
    ...Media_BaseFragment
  }
}

# Specific fragment used for the RichText embedded entries
fragment Collection_RichTextFragment on Collection {
  ...Collection_FieldsFragment
  items {
    ...Card_RichTextFragment
    ...Link_BaseFragment
    ...NavigationItem_BaseFragment
  }
}
