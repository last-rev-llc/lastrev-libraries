fragment NavigationItem_BaseFragment on NavigationItem {
  ...NavigationItem_BaseFieldsFragment
  subNavigation {
    ...Content_BaseFragment
    ...Link_BaseFragment

    ... on NavigationItem {
      ...NavigationItem_BaseFieldsFragment
      subNavigation {
        ...Content_BaseFragment
        ...Link_BaseFragment
      }
    }
  }
}

fragment NavigationItem_BaseFieldsFragment on NavigationItem {
  ...Content_BaseFragment
  text
  href
  variant
  summary
  image {
    ...Media_BaseFragment
  }
}
