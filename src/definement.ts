/**
 * @since 1.0.0
 */
import { pipe } from "fp-ts/lib/function";
import { Lattice } from "fp-ts/lib/Lattice";
import { Semigroupoid2 } from "fp-ts/lib/Semigroupoid";
import * as PR from "./predicate";
import * as RF from "./refinement";

/**
 * @summary
 * A predicate that dynamically returns a type guard for value `a`.
 *
 * @since 1.0.0
 */
export interface Definement<E, A> {
  <G extends E>(a: G): a is Extract<G, A>;
}

/**
 * @category Model
 * @since 1.0.0
 */
export const URI = "Definement";

/**
 * @category Model
 * @since 1.0.0
 */
export type URI = typeof URI;

declare module "fp-ts/lib/HKT" {
  export interface URItoKind2<E, A> {
    readonly [URI]: Definement<E, A>;
  }
}

/**
 * @category Semigroupoid
 * @since 1.0.0
 */
export const compose: <B, C>(
  bc: Definement<B, C>
) => <A>(ab: Definement<A, B>) => Definement<A, C> = meet as any;

/**
 * @category Constructor
 * @since 1.0.0
 */
export const init: Definement<unknown, unknown> = <G>(
  a: G
): a is Extract<G, unknown> => true;

/**
 * @category Constructor
 * @since 1.0.0
 */
export const literal = <A extends string | number>(literal: A) => <G extends A>(
  a: G
): a is Extract<G, unknown> => a === literal;

/**
 * @category Constructors
 * @since 1.0.0
 */
export function fromRefinement<E, A extends E>(
  predicate: RF.Refinement<E, A>
): Definement<E, A> {
  return predicate as any;
}

/**
 * @category Destructors
 * @since 1.0.0
 */
export function toPredicate<E, A>(fa: Definement<E, A>): PR.Predicate<E> {
  return fa;
}

/**
 * @category Destructors
 * @since 1.0.0
 */
export function toRefinement<E, A>(
  fa: Definement<E, A>
): A extends E ? RF.Refinement<E, A> : never {
  return fa as any;
}

/**
 * @category Lattice
 * @since 1.0.0
 */
export function meet<B, C>(
  bc: Definement<B, C>
): <A>(ab: Definement<A, B>) => Definement<A, B & C> {
  return PR.meet(bc) as any;
}

/**
 * @category Lattice
 * @since 1.0.0
 */
export function join<E, A extends E>(
  ab: Definement<E, A>
): <B extends E>(bc: Definement<E, B>) => Definement<E, A | B> {
  return PR.join(ab) as any;
}

/**
 * @category Instances
 * @since 1.0.0
 */
export function getLattice<E, A extends E>(): Lattice<Definement<E, A>> {
  return {
    join: (y, x) => pipe(y, join(x)),
    meet: (y, x) => pipe(y, meet(x)),
  };
}

/**
 * @category Combinators
 * @since 1.0.0
 */
export function not<E, A>(
  definement: Definement<E, A>
): Definement<E, Exclude<E, A>> {
  return PR.not(definement) as any;
}

/**
 * @category Combinators
 * @since 1.0.0
 */
export function local<R, Q>(
  f: (q: Q) => R
): <A>(fa: Definement<R, A>) => Definement<Q, A> {
  //@ts-expect-error
  return (fa) => (g) => fa(f(g));
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Semigroupoid: Semigroupoid2<URI> = {
  URI,
  compose: (bc, ab) => pipe(bc, compose(ab)),
};

/**
 * @category Combinators
 * @since 1.0.0
 */
export function getAsStrict<A>(value: A): Definement<unknown, A> {
  return RF.getIsLiteral(value as any) as any;
}

// PRIMITIVES

/**
 * @category Primitives
 * @since 1.0.0
 */
export const asString: Definement<unknown, string> = fromRefinement(
  RF.isString
);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const asNumber: Definement<unknown, number> = fromRefinement(
  RF.isNumber
);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const asBoolean: Definement<unknown, boolean> = fromRefinement(
  RF.isBoolean
);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const asTrue: Definement<unknown, true> = fromRefinement(RF.isTrue);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const asFalse: Definement<unknown, false> = fromRefinement(RF.isFalse);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const asUndefined: Definement<unknown, undefined> = getAsStrict(
  undefined
);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const asNull: Definement<unknown, null> = getAsStrict(null);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isNullable: Definement<unknown, null | undefined> = pipe(
  asUndefined,
  compose(asNull)
) as any;

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isArray: Definement<unknown, Array<any>> = <G>(
  a: G
): a is Extract<G, any[]> => Array.isArray(a);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isObject: Definement<unknown, object> = <G>(
  a: G
): a is Extract<G, object> => typeof a === "object";
