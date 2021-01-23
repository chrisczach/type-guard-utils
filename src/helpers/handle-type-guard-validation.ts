import { TypeChecker, TypeCheckCallback } from "../types.d";

export const handleTypeGuardValidation = <T>(
  typeChecker: TypeChecker,
  expectArray: boolean,
  invalidTypeCallback?: TypeCheckCallback,
  validTypeCallback?: TypeCheckCallback
) => (value: T): T => {
  if (expectArray === Array.isArray(value) && Array.isArray(value)
    ? !value.some((element) => typeChecker(element))
    : !typeChecker(value)) {
    return invalidTypeCallback?.(value) ?? value;
  }
  return validTypeCallback?.(value) ?? value;
};
