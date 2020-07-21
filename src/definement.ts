import { Predicate } from "./utils/index";

/**
 * @summary
 * A predicate that dynamically returns a type guard for value `a`.
 */
export interface Definement<T, U> {
  <A extends T>(a: A): a is A extends U ? A : never;
}

/**
 * @category Constructors
 */
export function fromPredicate<A, B extends A>(
  predicate: Predicate<A>
): Definement<A, B> {
  return predicate as any;
}

/**
 * @category Constructors
 */
export function fromRefinement<A, B extends A>(
  predicate: Predicate<A>
): Definement<A, B> {
  return predicate as any;
}

/**
 * @category Combinators
 */
export function and<A, B extends A, C extends B>(
  x: Definement<A, B>,
  y: Definement<A, C>
): Definement<A, B & C>;

export function and<A, B extends A>(
  x: Definement<A, B>
): <C extends B>(y: Definement<A, C>) => Definement<A, B & C>;

export function and<A, B, C>(x: Definement<A, B>, y?: Definement<A, C>) {
  if (y === undefined) {
    return (y: Definement<A, C>) => <U extends A>(
      a: U
    ): a is Extract<U, B & C> => x(a) && y(a);
  }
  return <U extends A>(a: U): a is Extract<U, B & C> => x(a) && y(a);
}

/**
 * @category Combinators
 */
export function or<A, B extends A, C extends B>(
  x: Definement<A, B>,
  y: Definement<A, C>
): Definement<A, B | C>;

export function or<A, B extends A>(
  x: Definement<A, B>
): <C extends B>(y: Definement<A, C>) => Definement<A, B | C>;

export function or<A, B, C>(x: Definement<A, B>, y?: Definement<A, C>) {
  if (y === undefined) {
    return (y: Definement<A, C>) => <U extends A>(
      a: U
    ): a is Extract<U, B | C> => x(a) || y(a);
  }
  return <U extends A>(a: U): a is Extract<U, B | C> => x(a) || y(a);
}

/**
 * @category Combinators
 */
export function not<T, A>(x: Definement<T, A>) {
  return <U extends T>(a: U): a is Exclude<U, A> => {
    return !x(a);
  };
}
