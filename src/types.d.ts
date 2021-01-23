
export type TypeChecker = <T>(itemToCheck: T) => boolean;

export type TypeCheckCallback = <T, R>(itemToCheck: T) => R;
