import { pipe, Predicate, Refinement } from "fp-ts/lib/function";
import { definement as DF } from "../src/index";

const isString = (a: string | number): a is string => typeof a === "string";

const asLiteralC: DF.Definement<unknown, "C"> = (
  a: unknown
): a is Extract<typeof a, "C"> => a === "C";

const asNumber: DF.Definement<string | number, number> = (
  a: unknown
): a is Exclude<number, typeof a> => typeof a === "number";

const asString: DF.Definement<string | number, string> = (
  a: string | number
): a is Exclude<number, typeof a> => typeof a == "string";

describe("definement", () => {
  test("fromRefinement", () => {
    const result = DF.fromRefinement(isString);
    expect(result(2)).toBeFalsy();
    expect(result("2")).toBeTruthy();
  });

  test("toRefinement", () => {
    const result: Refinement<string | number, string> = DF.toRefinement(
      asString
    );
    expect(result(2)).toBeFalsy();
    expect(result("2")).toBeTruthy();
  });

  test("toPredicate", () => {
    const result: Predicate<string | number> = DF.toPredicate(asString);
    expect(result(2)).toBeFalsy();
    expect(result("2")).toBeTruthy();
  });

  test("meet/and", () => {
    const result: DF.Definement<string | number, "C"> = pipe(
      asString,
      DF.meet(asLiteralC)
    );
    expect(result(2)).toBeFalsy();
    expect(result("2")).toBeFalsy();
    expect(result("C")).toBeTruthy();
  });

  test("join/or", () => {
    const result = pipe(asNumber, DF.join(asString));
    expect(result(2)).toBeTruthy();
    expect(result("2")).toBeTruthy();
  });

  test("not", () => {
    const result = DF.not(asString);
    expect(result(2)).toBeTruthy();
    expect(result("2")).toBeFalsy();
  });
});
