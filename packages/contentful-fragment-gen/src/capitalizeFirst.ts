const capitalizeFirst = (str: string, typeMappings: Record<string, string>) => {
  const mappedStr = typeMappings[str] || str;
  return mappedStr.charAt(0).toUpperCase() + mappedStr.slice(1);
};

export default capitalizeFirst;
