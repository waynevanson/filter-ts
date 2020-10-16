/**
 * @summary
 * This module is not recommended, as predicates don't have any type safety.
 * Please opt to use the `Refinement` or `Definement` modules instead.
 *
 * We use this internally, as type safety is overridden on implementation.
 *
 * @since 1.0.0
 */
import { pipe, Predicate } from "fp-ts/function";
import * as RF from "./refinement";
import * as DF from "./definement";
import { BooleanAlgebra } from "fp-ts/lib/BooleanAlgebra";
import { Contravariant1 } from "fp-ts/lib/Contravariant";

export {
  /**
   * @category Model
   * @since 1.0.0
   */
  Predicate,
};

/**
 * @category Model
 * @since 1.0.0
 */
export const URI = "Predicate";

/**
 * @category Model
 * @since 1.0.0
 */
export type URI = typeof URI;

declare module "fp-ts/lib/HKT" {
  export interface URItoKind<A> {
    readonly [URI]: Predicate<A>;
  }
}

// CONSTRUCTORS

/**
 * @category Constructors
 * @since 1.0.0
 */
export function fromRefinement<E>(
  refinement: RF.Refinement<E, any>
): Predicate<E> {
  return refinement;
}

/**
 * @category Constructors
 * @since 1.0.0
 */
export function fromDefinement<E>(
  definement: DF.Definement<E, any>
): Predicate<E> {
  return definement;
}

// DESTRUCTORS

/**
 * @category Destructors
 * @since 1.0.0
 */
export function toRefinement<E, A extends E>(
  predicate: Predicate<E>
): RF.Refinement<E, A> {
  return predicate as any;
}

/**
 * @category Destructors
 * @since 1.0.0
 */
export function toDefinement<E, A extends E>(
  predicate: Predicate<E>
): DF.Definement<E, A> {
  return predicate as any;
}

/**
 * @category BooleanAlgebra
 * @since 1.0.0
 */
export function meet<A>(ab: Predicate<A>): (bc: Predicate<A>) => Predicate<A> {
  return (bc) => (a) => ab(a) && bc(a);
}

/**
 * @category BooleanAlgebra
 * @since 1.0.0
 */
export function join<A>(ab: Predicate<A>): (bc: Predicate<A>) => Predicate<A> {
  return (bc) => (a) => ab(a) || bc(a);
}

/**
 * @category BooleanAlgebra
 * @since 1.0.0
 */
export function not<A>(predicate: Predicate<A>): Predicate<A> {
  return (a) => !predicate(a);
}

/**
 * @category BooleanAlgebra
 * @since 1.0.0
 */
export function implies<A>(
  ab: Predicate<A>
): (bc: Predicate<A>) => Predicate<A> {
  return (bc) => (a) => !ab(a) || bc(a);
}

/**
 * @category Combinators
 * @since 1.0.0
 */
export type Primitive =
  | string
  | number
  | boolean
  | null
  | undefined
  | bigint
  | symbol;

/**
 * @category Combinators
 * @since 1.0.0
 */
export function getOne<A extends Primitive>(value: A): Predicate<A> {
  return (a) => a === value;
}

/**
 * @category Combinators
 * @since 1.0.0
 */
export function getZero<A extends Primitive>(value: A): Predicate<A> {
  return (a) => a !== value;
}

/**
 * @category Contravariant
 * @since 1.0.0
 */
export function contramap<A, B>(
  f: (b: B) => A
): (fa: Predicate<A>) => Predicate<B> {
  return (fa) => (b) => fa(f(b));
}

/**
 * @category Combinator
 * @since 1.0.0
 */
export function local<R, Q>(
  f: (q: Q) => R
): (fa: Predicate<R>) => Predicate<Q> {
  return contramap(f);
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap: (fa, f) => pipe(fa, contramap(f)),
};

/**
 * @category Instances
 * @since 1.0.0
 */
export function getBooleanAlgebra<A extends Primitive>(
  value: A
): BooleanAlgebra<Predicate<A>> {
  return {
    meet: (x, y) => pipe(y, meet(x)),
    join: (x, y) => pipe(y, join(x)),
    implies: (x, y) => pipe(y, implies(x)),
    not,
    one: getOne<A>(value),
    zero: getZero<A>(value),
  };
}
