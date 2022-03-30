declare type Unarray<T> = T extends Array<infer U> ? U : T;
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

declare type Variant = {
  [Name in keyof ComponentsPropsList]: {
    props: Partial<ComponentsPropsList[Name]>;
    style: Interpolation<{ theme: Theme }>;
  };
};
