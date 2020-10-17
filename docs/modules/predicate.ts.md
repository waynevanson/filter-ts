---
title: predicate.ts
nav_order: 3
parent: Modules
---

## predicate overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [BooleanAlgebra](#booleanalgebra)
  - [implies](#implies)
  - [join](#join)
  - [meet](#meet)
  - [not](#not)
- [Combinator](#combinator)
  - [local](#local)
- [Combinators](#combinators)
  - [Primitive (type alias)](#primitive-type-alias)
  - [getOne](#getone)
  - [getZero](#getzero)
- [Constructors](#constructors)
  - [fromDefinement](#fromdefinement)
  - [fromRefinement](#fromrefinement)
- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [Destructors](#destructors)
  - [toDefinement](#todefinement)
  - [toRefinement](#torefinement)
- [Instances](#instances)
  - [Contravariant](#contravariant-1)
  - [getBooleanAlgebra](#getbooleanalgebra)
- [Model](#model)
  - [Predicate](#predicate)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)

---

# BooleanAlgebra

## implies

**Signature**

```ts
export declare function implies<A>(ab: Predicate<A>): (bc: Predicate<A>) => Predicate<A>
```

Added in v1.0.0

## join

**Signature**

```ts
export declare function join<A>(ab: Predicate<A>): (bc: Predicate<A>) => Predicate<A>
```

Added in v1.0.0

## meet

**Signature**

```ts
export declare function meet<A>(ab: Predicate<A>): (bc: Predicate<A>) => Predicate<A>
```

Added in v1.0.0

## not

**Signature**

```ts
export declare function not<A>(predicate: Predicate<A>): Predicate<A>
```

Added in v1.0.0

# Combinator

## local

**Signature**

```ts
export declare function local<R, Q>(f: (q: Q) => R): (fa: Predicate<R>) => Predicate<Q>
```

Added in v1.0.0

# Combinators

## Primitive (type alias)

**Signature**

```ts
export type Primitive = string | number | boolean | null | undefined | bigint | symbol
```

Added in v1.0.0

## getOne

**Signature**

```ts
export declare function getOne<A extends Primitive>(value: A): Predicate<A>
```

Added in v1.0.0

## getZero

**Signature**

```ts
export declare function getZero<A extends Primitive>(value: A): Predicate<A>
```

Added in v1.0.0

# Constructors

## fromDefinement

**Signature**

```ts
export declare function fromDefinement<E>(definement: DF.Definement<E, any>): Predicate<E>
```

Added in v1.0.0

## fromRefinement

**Signature**

```ts
export declare function fromRefinement<E>(refinement: RF.Refinement<E, any>): Predicate<E>
```

Added in v1.0.0

# Contravariant

## contramap

**Signature**

```ts
export declare function contramap<A, B>(f: (b: B) => A): (fa: Predicate<A>) => Predicate<B>
```

Added in v1.0.0

# Destructors

## toDefinement

**Signature**

```ts
export declare function toDefinement<E, A extends E>(predicate: Predicate<E>): DF.Definement<E, A>
```

Added in v1.0.0

## toRefinement

**Signature**

```ts
export declare function toRefinement<E, A extends E>(predicate: Predicate<E>): RF.Refinement<E, A>
```

Added in v1.0.0

# Instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'Predicate'>
```

Added in v1.0.0

## getBooleanAlgebra

**Signature**

```ts
export declare function getBooleanAlgebra<A extends Primitive>(value: A): BooleanAlgebra<Predicate<A>>
```

Added in v1.0.0

# Model

## Predicate

**Signature**

```ts
export declare const Predicate: any
```

Added in v1.0.0

## URI

**Signature**

```ts
export declare const URI: 'Predicate'
```

Added in v1.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.0.0
