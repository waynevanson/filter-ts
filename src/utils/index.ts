export type UnionizeArray<T> = T extends Array<infer U> ? U : never;
