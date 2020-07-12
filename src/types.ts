export interface Predicate<A> {
  (a: A): boolean;
}

export interface Refinement<A, B extends A> {
  (a: A): a is B;
}

export interface Definement<T, U> {
  <A extends T>(a: A): a is A extends U ? A : never;
}
