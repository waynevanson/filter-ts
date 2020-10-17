---
title: refinement.ts
nav_order: 4
parent: Modules
---

## refinement overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinator](#combinator)
  - [implies](#implies)
  - [not](#not)
- [Constructors](#constructors)
  - [Refinement](#refinement)
  - [fromDefinement](#fromdefinement)
  - [fromPredicate](#frompredicate)
  - [getIs](#getis)
  - [getIsLiteral](#getisliteral)
- [Destructors](#destructors)
  - [toDefinement](#todefinement)
  - [toPredicate](#topredicate)
- [Instances](#instances)
  - [getLattice](#getlattice)
- [Lattice](#lattice)
  - [join](#join)
  - [meet](#meet)
- [Primitives](#primitives)
  - [isBoolean](#isboolean)
  - [isFalse](#isfalse)
  - [isNull](#isnull)
  - [isNullable](#isnullable)
  - [isNumber](#isnumber)
  - [isString](#isstring)
  - [isTrue](#istrue)
  - [isUndefined](#isundefined)

---

# Combinator

## implies

**Signature**

```ts
export declare function implies<A, B extends A>(
  ab: Refinement<A, B>
): <C extends A>(bc: Refinement<A, C>) => Refinement<A, Extract<Exclude<B, A>, C>>
```

Added in v1.0.0

## not

**Signature**

```ts
export declare function not<E, A extends E>(fa: Refinement<E, A>)
```

Added in v1.0.0

# Constructors

## Refinement

**Signature**

```ts
export declare const Refinement: any
```

Added in v1.0.0

## fromDefinement

**Signature**

```ts
export declare function fromDefinement<A, B>(definement: DF.Definement<A, B>): Refinement<A, Extract<B, A>>
```

Added in v1.0.0

## fromPredicate

**Signature**

```ts
export declare function fromPredicate<A, B extends A>(predicate: PR.Predicate<A>): Refinement<A, B>
```

Added in v1.0.0

## getIs

**Signature**

```ts
export declare function getIs<A>(value: A): Refinement<unknown, A>
```

Added in v1.0.0

## getIsLiteral

**Signature**

```ts
export declare function getIsLiteral<A extends PR.Primitive>(value: A): Refinement<unknown, A>
```

Added in v1.0.0

# Destructors

## toDefinement

**Signature**

```ts
export declare function toDefinement<E, A extends E>(refinement: Refinement<E, A>): DF.Definement<E, A>
```

Added in v1.0.0

## toPredicate

**Signature**

```ts
export declare function toPredicate<E>(refinement: Refinement<E, any>): PR.Predicate<E>
```

Added in v1.0.0

# Instances

## getLattice

**Signature**

```ts
export declare function getLattice<E, A extends E>(): Lattice<Refinement<E, A>>
```

Added in v1.0.0

# Lattice

## join

**Signature**

```ts
export declare function join<A, B extends A>(
  ab: Refinement<A, B>
): <C extends B>(bc: Refinement<B, C>) => Refinement<A, B | C>
```

Added in v1.0.0

## meet

**Signature**

```ts
export declare function meet<A, B extends A, C extends B>(
  bc: Refinement<B, C>
): (ab: Refinement<A, B>) => Refinement<A, B & C>
```

Added in v1.0.0

# Primitives

## isBoolean

**Signature**

```ts
export declare const isBoolean: Refinement<unknown, boolean>
```

Added in v1.0.0

## isFalse

**Signature**

```ts
export declare const isFalse: Refinement<unknown, false>
```

Added in v1.0.0

## isNull

**Signature**

```ts
export declare const isNull: Refinement<unknown, null>
```

Added in v1.0.0

## isNullable

**Signature**

```ts
export declare const isNullable: Refinement<unknown, null>
```

Added in v1.0.0

## isNumber

**Signature**

```ts
export declare const isNumber: Refinement<unknown, number>
```

Added in v1.0.0

## isString

**Signature**

```ts
export declare const isString: Refinement<unknown, string>
```

Added in v1.0.0

## isTrue

**Signature**

```ts
export declare const isTrue: Refinement<unknown, true>
```

Added in v1.0.0

## isUndefined

**Signature**

```ts
export declare const isUndefined: Refinement<unknown, undefined>
```

Added in v1.0.0
