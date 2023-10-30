type Address = {
  streetAddress?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
};

export const formatAddress = (value: Address): string => {
  const parts: (string | null | undefined)[] = [
    value.streetAddress,
    value.streetAddress2,
    value.city ? (value.state ? `${value.city},` : `${value.city}`) : null,
    value.state,
    value.postalCode
  ];
  return parts
    .filter((part) => part != null && part !== '')
    .join(' ')
    .trim();
};
