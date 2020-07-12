export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type EnforceNonEmptyArray<T extends readonly any[]> = T extends {
  0: any;
}
  ? T
  : never;
