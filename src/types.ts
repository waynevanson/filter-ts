import { UnionizeArray } from "./utils";
import { UnionToIntersection } from "./utils/types";

export interface Predicate<A> {
  (a: A): boolean;
}

export interface Refinement<A, B extends A> {
  (a: A): a is B;
}

export interface Definement<T, U> {
  <A extends T>(a: A): a is A extends U ? A : never;
}

// PARAMS

export type RefinementUnionParameter<
  D extends readonly Refinement<any, any>[]
> = UnionizeArray<D> extends infer U
  ? U extends any
    ? U extends Refinement<infer A, any>
      ? A
      : never
    : never
  : never;

export type RefinementIntersectParameter<
  D extends readonly Refinement<any, any>[]
> = UnionToIntersection<RefinementUnionParameter<D>>;

// RETURNS

export type RefinementUnionReturn<
  D extends readonly Refinement<any, any>[]
> = UnionizeArray<D> extends infer U
  ? U extends any
    ? U extends Refinement<any, infer B>
      ? B
      : never
    : never
  : never;

export type RefinementIntersectReturn<
  D extends readonly Refinement<any, any>[]
> = UnionToIntersection<RefinementUnionReturn<D>>;

// MATCH

export type RefinementMatchParam<
  D extends readonly Refinement<any, any>[],
  A extends RefinementIntersectParameter<D> = RefinementIntersectParameter<D>,
  B extends RefinementUnionParameter<D> = RefinementUnionParameter<D>
> = A extends B ? (B extends A ? A : never) : never;

// LOGIC

export type RefinementAnd<
  D extends readonly Refinement<any, any>[],
  M extends RefinementMatchParam<D> = RefinementMatchParam<D>
> = Refinement<M, Extract<RefinementIntersectReturn<D>, M>>;
