export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type EnforceTupleArray<T extends readonly any[]> = T extends {
  0: any;
  1: any;
}
  ? T
  : never;

export type UnionizeArray<T> = T extends Array<infer U> ? U : never;

export type And<A, B> = A & B;
export type Or<A, B> = A | B;
export type Not<A, B> = Exclude<A, B>;

export interface Predicate<A> {
  (a: A): boolean;
}
