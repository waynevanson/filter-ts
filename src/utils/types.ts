export type And<A, B> = A & B;
export type Or<A, B> = A | B;
export type Not<A, B> = Exclude<A, B>;

export interface Predicate<A> {
  (a: A): boolean;
}
