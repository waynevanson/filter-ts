# `refinement-ts`

Combinators for composing strongly typed predicates: refinements and definements.

The basic operations of `and`, `or` and `not` have been implemented.
Feature requests are welcome.

## Quick Start

### Installation

Install from NPM with `yarn add refinement-ts` or `npm install refinement-ts --save`, dependant on your package manager of choice.

### Example

```ts
import { refinement as RF } from "refinement-ts";

const isString = (a: unknown): a is string => typeof a === "string";
const isNumber = (a: unknown): a is number => typeof a === "number";
const isShrek = (a: unknown): a is "Shrek" => a === "Shrek";

// RF.Refinement is here only to show what it's doing.
// types will be infered from usage.

// result type has been narrowed to `"Shrek"`
// because type `string & "Shrek"` is type `"Shrek"`
const result1: RF.Refinement<unknown, "Shrek"> = RF.and(isString, isShrek);

// result type has been widened to `string`
// because type `string | "Shrek"` is type `string`

const result2: RF.Refinement<unknown, string> = RF.or(isString, isShrek);

// tserror.
// becuase type `string & number` is type `never`.
const result3: RF.Refinement<unknown, string> = RF.and(isString, isNumber);

// result type is widened to `string | number`
// because type `string | number` is type `string | number`.

const result4: RF.Refinement<unknown, string> = RF.or(isString, isNumber);
```

## Refinement

Here is the signature for a refinement:

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B;
}
```

A refinement is a predicate with a type guard, which can be read about from [the typescript handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates).

I saw the name in `fp-ts` and felt it is fitting.

## Definement

Here is the signature for a definement:

```ts
export interface Definement<T, U> {
  <A extends T>(a: A): a is A extends U ? A : never;
}
```

This is just like a refinement, but uses a generic as the input value. This is constrained by the input type `T`.

This is very special because it can take any compatible or incompatible return value and refine it in real time.

My experience indicates these are useful when refining different types of objects.

## What's next?

Glad you asked.

### Tests

These should be easy, but I haven't done them.
If you're new to testing and want to give it a go, I welcome PR's.

### Catalogue

I'd love to see a catalogue of refinements and definements for most cases.
Writing refinements and definements is extremely verbose in Typescript.

### Constructors

I'd like to see a constructor that build a `Definement` and a `Refinement` out of thin air, to save some time.
