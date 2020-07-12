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
declare function or<D extends readonly Refinement<any, any>[]>(
  ...refinements: EnforceNonEmptyArray<D>
): any;

/**
 * @category Combinator
 */
export function not<A, B extends A>(refinement: Refinement<A, B>) {
  return (a: A): a is Exclude<A, B> => !refinement(a);
}

declare function nand<D extends readonly Refinement<any, any>[]>(
  ...refinements: EnforceNonEmptyArray<D>
): any;

declare function nor<D extends readonly Refinement<any, any>[]>(
  ...refinements: EnforceNonEmptyArray<D>
): any;

declare function xor<D extends readonly Refinement<any, any>[]>(
  ...refinements: EnforceNonEmptyArray<D>
): any;

declare function xnor<D extends readonly Refinement<any, any>[]>(
  ...refinements: EnforceNonEmptyArray<D>
): any;
