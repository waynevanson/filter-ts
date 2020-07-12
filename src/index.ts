import { Refinement, Predicate } from "fp-ts/es6/function";
import { Definement } from "../definement-ts";

/**
 * @category Combinators
 */
export function fromDefinement<A, B extends A>(
  a: Definement<A, B>
): Refinement<A, B> {
  return a as any;
}

/**
 * @category Combinators
 */
export function fromPredicate<A, B extends A>(
  predicate: Predicate<A>
): Refinement<A, B> {
  return predicate as any;
}

/**
 * @summary
 * Returns a function that
 */
export function and(...refinements: readonly Refinement<any, any>[]) {}
