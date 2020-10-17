/**
 * @since 1.0.0
 */
import { pipe, Refinement } from "fp-ts/function";
import { Lattice } from "fp-ts/lib/Lattice";
import * as DF from "./definement";
import * as PR from "./predicate";

/**
 * @category Constructors
 * @since 1.0.0
 */
export function fromPredicate<A, B extends A>(
  predicate: PR.Predicate<A>
): Refinement<A, B> {
  return predicate as any;
}

/**
 * @category Constructors
 * @since 1.0.0
 */
export function fromDefinement<A, B>(
  definement: DF.Definement<A, B>
): Refinement<A, Extract<B, A>> {
  return definement as any;
}

/**
 * @category Destructors
 * @since 1.0.0
 */
export declare function toDefinement<E, A extends E>(
  refinement: Refinement<E, A>
): DF.Definement<E, A>;

/**
 * @category Destructors
 * @since 1.0.0
 */
export declare function toPredicate<E>(
  refinement: Refinement<E, any>
): PR.Predicate<E>;

/**
 * @category Lattice
 * @since 1.0.0
 */
export function meet<A, B extends A, C extends B>(
  bc: Refinement<B, C>
): (ab: Refinement<A, B>) => Refinement<A, B & C> {
  return PR.meet(bc) as any;
}

/**
 * @category Combinator
 * @since 1.0.0
 */
export function implies<A, B extends A>(
  ab: Refinement<A, B>
): <C extends A>(
  bc: Refinement<A, C>
) => Refinement<A, Extract<Exclude<B, A>, C>> {
  return PR.implies(ab) as any;
}

/**
 * @category Lattice
 * @since 1.0.0
 */
export function join<A, B extends A>(
  ab: Refinement<A, B>
): <C extends B>(bc: Refinement<B, C>) => Refinement<A, B | C> {
  return PR.join(ab) as any;
}

/**
 * @category Combinator
 * @since 1.0.0
 */
export function not<E, A extends E>(fa: Refinement<E, A>) {
  return PR.not(fa);
}

/**
 * @category Instances
 * @since 1.0.0
 */
export function getLattice<E, A extends E>(): Lattice<Refinement<E, A>> {
  return {
    join: (x, y) => pipe(y, join(x)),
    meet: (x, y) => pipe(y, meet(x)),
  };
}

/**
 * @category Constructors
 * @since 1.0.0
 */
export function getIsLiteral<A extends PR.Primitive>(
  value: A
): Refinement<unknown, A> {
  return (a): a is A => a === value;
}

/**
 * @category Constructors
 * @since 1.0.0
 */
export function getIs<A>(value: A): Refinement<unknown, A> {
  return (a): a is A => a === value;
}

// PRIMITIVES

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isString: Refinement<unknown, string> = (
  a: unknown
): a is string => typeof a === "string";

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isNumber: Refinement<unknown, number> = (
  a: unknown
): a is number => typeof a === "number";

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isBoolean: Refinement<unknown, boolean> = (
  a: unknown
): a is boolean => typeof a === "boolean";

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isTrue: Refinement<unknown, true> = (a: unknown): a is true =>
  a === true;

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isFalse: Refinement<unknown, false> = (a: unknown): a is false =>
  a === false;

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isUndefined: Refinement<unknown, undefined> = getIsLiteral(
  undefined
);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isNull: Refinement<unknown, null> = getIsLiteral(null);

/**
 * @category Primitives
 * @since 1.0.0
 */
export const isNullable: Refinement<unknown, null | undefined> = pipe(
  isUndefined,
  meet(isNull)
);
