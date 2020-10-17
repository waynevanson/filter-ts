---
title: definement.ts
nav_order: 1
parent: Modules
---

## definement overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [getAsStrict](#getasstrict)
  - [local](#local)
  - [not](#not)
- [Constructor](#constructor)
  - [init](#init)
  - [literal](#literal)
- [Constructors](#constructors)
  - [fromRefinement](#fromrefinement)
- [Destructors](#destructors)
  - [toPredicate](#topredicate)
  - [toRefinement](#torefinement)
- [Instances](#instances)
  - [getLattice](#getlattice)
- [Lattice](#lattice)
  - [join](#join)
  - [meet](#meet)
- [Primitives](#primitives)
  - [asBoolean](#asboolean)
  - [asFalse](#asfalse)
  - [asNull](#asnull)
  - [asNumber](#asnumber)
  - [asString](#asstring)
  - [asTrue](#astrue)
  - [asUndefined](#asundefined)
  - [isArray](#isarray)
  - [isNullable](#isnullable)
  - [isObject](#isobject)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [utils](#utils)
  - [Definement (interface)](#definement-interface)

---

# Combinators

## getAsStrict

**Signature**

```ts
export declare function getAsStrict<A>(value: A): Definement<unknown, A>
```

Added in v1.0.0

## local

**Signature**

```ts
export declare function local<R, Q>(f: (q: Q) => R): <A>(fa: Definement<R, A>) => Definement<Q, A>
```

Added in v1.0.0

## not

**Signature**

```ts
export declare function not<E, A>(definement: Definement<E, A>): Definement<E, Exclude<E, A>>
```

Added in v1.0.0

# Constructor

## init

**Signature**

```ts
export declare const init: Definement<unknown, unknown>
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <A extends string | number>(literal: A) => <G extends A>(a: G) => a is Extract<G, unknown>
```

Added in v1.0.0

# Constructors

## fromRefinement

**Signature**

```ts
export declare function fromRefinement<E, A extends E>(predicate: RF.Refinement<E, A>): Definement<E, A>
```

Added in v1.0.0

# Destructors

## toPredicate

**Signature**

```ts
export declare function toPredicate<E, A>(fa: Definement<E, A>): PR.Predicate<E>
```

Added in v1.0.0

## toRefinement

**Signature**

```ts
export declare function toRefinement<E, A>(fa: Definement<E, A>): A extends E ? RF.Refinement<E, A> : never
```

Added in v1.0.0

# Instances

## getLattice

**Signature**

```ts
export declare function getLattice<E, A extends E>(): Lattice<Definement<E, A>>
```

Added in v1.0.0

# Lattice

## join

**Signature**

```ts
export declare function join<E, A extends E>(
  ab: Definement<E, A>
): <B extends E>(bc: Definement<E, B>) => Definement<E, A | B>
```

Added in v1.0.0

## meet

**Signature**

```ts
export declare function meet<A, B, C>(bc: Definement<A & B, C>): (ab: Definement<A, B>) => Definement<A, B & C>
```

Added in v1.0.0

# Primitives

## asBoolean

**Signature**

```ts
export declare const asBoolean: Definement<unknown, boolean>
```

Added in v1.0.0

## asFalse

**Signature**

```ts
export declare const asFalse: Definement<unknown, false>
```

Added in v1.0.0

## asNull

**Signature**

```ts
export declare const asNull: Definement<unknown, null>
```

Added in v1.0.0

## asNumber

**Signature**

```ts
export declare const asNumber: Definement<unknown, number>
```

Added in v1.0.0

## asString

**Signature**

```ts
export declare const asString: Definement<unknown, string>
```

Added in v1.0.0

## asTrue

**Signature**

```ts
export declare const asTrue: Definement<unknown, true>
```

Added in v1.0.0

## asUndefined

**Signature**

```ts
export declare const asUndefined: Definement<unknown, undefined>
```

Added in v1.0.0

## isArray

**Signature**

```ts
export declare const isArray: Definement<unknown, any[]>
```

Added in v1.0.0

## isNullable

**Signature**

```ts
export declare const isNullable: Definement<unknown, null>
```

Added in v1.0.0

## isObject

**Signature**

```ts
export declare const isObject: Definement<unknown, object>
```

Added in v1.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: Definement<B, C>) => <A>(ab: Definement<A, B>) => Definement<A, C>
```

Added in v1.0.0

# utils

## Definement (interface)

**Signature**

```ts
export interface Definement<E, A> {
  <G extends E>(a: G): a is Extract<G, A>
}
```

Added in v1.0.0
