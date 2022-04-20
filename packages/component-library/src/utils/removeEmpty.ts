function removeEmpty(obj: Object): Object {
  const clean = Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
      .filter(([_, v]) => v != null && (v !== Object(v) || Object.keys(v).length))
  );
  return Array.isArray(obj) ? Object.values(clean) : clean;
}
export default removeEmpty;
