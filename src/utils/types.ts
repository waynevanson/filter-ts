export type Not<A, B> = Exclude<A, B>;

export interface Predicate<A> {
  (a: A): boolean;
}
