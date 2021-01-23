import { Observable } from "rxjs";
import { handleTypeGuardValidation } from "../helpers";
import { typeGuardMapOperator, typeGuardCheckOperator } from "../operators";
import { TypeChecker, TypeCheckCallback } from "../types";

/**
 * A method decorator to check return type.
 *
 * For Observables: Wraps the typeGuardMapOperator.
 *
 * For Promises and non-async values: Wraps internal handleTypeGuardValidation function.
 *
 * Can handle <ReturnType>() => ReturnType | <Promise<ReturnType>> | <Observable<ReturnType>>
 *
 * @param typeChecker - A function that acts as a type guard. Accepts the item in and returns a boolean for if its valid
 * @param expectArray - Apply the typeChecker to an array of items instead of individual item
 * @param invalidTypeCallback - Callback for if typeChecker(item) returns false
 * @param validTypeCallback - Callback for if typeChecker(item) returns true
 * @param mapInsteadOfCheck - If true the return type gets mapped to the return from either the invalidTypeCallback or validTypeCallback.
 * Default is that the return value is unchanged.
 */

export const checkWithTypeGuard = (
  typeChecker: TypeChecker,
  expectArray = false,
  invalidTypeCallback?: TypeCheckCallback,
  validTypeCallback?: TypeCheckCallback,
  mapInsteadOfCheck = false
) => <Target>(
  target: Target,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const checkValue = handleTypeGuardValidation(
    typeChecker,
    expectArray,
    invalidTypeCallback,
    validTypeCallback
  );
  const originalMethod = descriptor.value;
  // eslint-disable-next-line no-param-reassign
  descriptor.value = function typeGuardWrapper<T>(...args: T[]) {
    const result = originalMethod.apply(this, args);
    const isObservable = result instanceof Observable;
    const isPromise = result.then;
    if (isObservable) {
      return result.pipe(
        (mapInsteadOfCheck ? typeGuardMapOperator : typeGuardCheckOperator)(
          typeChecker,
          expectArray,
          invalidTypeCallback,
          validTypeCallback
        )
      );
    }
    if (isPromise) {
      return result.then(checkValue);
    }
    return checkValue(result);
  };
  return descriptor;
};
