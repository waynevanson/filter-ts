import { And, Or, Predicate } from "./utils/index";
import { Definement } from "./definement";

/**
 * @summary
 * A predicate that returns a type guard for value `a`.
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B;
}

/**
 * @category Constructors
 */
export function fromPredicate<A, B extends A>(
  predicate: Predicate<A>
): Refinement<A, B> {
  return predicate as any;
}

/**
 * @category Constructors
 */
export function fromDefinement<A, B>(
  definement: Definement<A, B>
): Refinement<A, Extract<B, A>> {
  return definement as any;
}

/**
 * @summary
 * Combine two refinements andthat return true when they're both true.
 *
 * The result will be an intersection of both return types.
 *
 * @category Combinators
 */
export function and<A, B extends A, C extends B>(
  x: Refinement<A, B>,
  y: Refinement<A, C>
): Refinement<A, And<B, C>>;

export function and<A, B extends A>(
  x: Refinement<A, B>
): <C extends B>(y: Refinement<A, C>) => Refinement<A, And<B, C>>;

export function and<A, B extends A, C extends B>(
  x: Refinement<A, B>,
  y?: Refinement<A, C>
) {
  if (y === undefined) {
    return (y: Refinement<A, C>) => (a: A): a is And<B, C> => x(a) && y(a);
  }
  return (a: A): a is And<B, C> => x(a) && y(a);
}

/**
 * @category Combinators
 */
export function or<A, B extends A, C extends A>(
  x: Refinement<A, B>,
  y: Refinement<A, C>
): Refinement<A, Or<B, C>>;

export function or<A, B extends A>(
  x: Refinement<A, B>
): <C extends A>(y: Refinement<A, C>) => Refinement<A, Or<B, C>>;

export function or<A, B extends A, C extends A>(
  x: Refinement<A, B>,
  y?: Refinement<A, C>
) {
  if (y === undefined) {
    return (y: Refinement<A, C>) => (a: A): a is Or<B, C> => x(a) || y(a);
  }
  return (a: A): a is Or<B, C> => x(a) || y(a);
}

/**
 * @category Combinators
 */
export function not<A, B extends A>(x: Refinement<A, B>) {
  return (a: A): a is Exclude<A, B> => {
    return !x(a);
  };
}
