import { Definement, Predicate, Refinement, RefinementAnd } from "./types";
import { EnforceNonEmptyArray } from "./utils/types";

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
 * Returns a refinement that returns a type
 *
 * @category Combinators
 *
 * @todo
 * Pipeable overloads.
 * Should end up using at least 2 refinements.
 */
export function and<D extends readonly Refinement<any, any>[]>(
  ...refinements: EnforceNonEmptyArray<D>
): RefinementAnd<D> {
  return (a: any): a is any => {
    let result = true;

    for (const refinement of refinements) {
      result = refinement(a);
      if (result === false) {
        break;
      }
    }

    return result;
  };
}

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
