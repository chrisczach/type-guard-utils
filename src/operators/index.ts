import { MonoTypeOperatorFunction } from "rxjs";
import { map, tap } from "rxjs/operators";
import { handleTypeGuardValidation } from "../helpers";
import { TypeChecker, TypeCheckCallback } from "../types.d";

/**
 * Mostly for internal use but exposing incase anyone wants to do anything other than the predefined operators.
 * @param operator - Accepts an rxjs operator
 */

export const typeGuardOperatorFactory = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Operator extends <T>(...args: any[]) => MonoTypeOperatorFunction<T>
>(
  operator: Operator
) => <T>(
  typeChecker: TypeChecker,
  expectArray = false,
  invalidTypeCallback?: TypeCheckCallback,
  validTypeCallback?: TypeCheckCallback
): MonoTypeOperatorFunction<T> =>
  operator(
    handleTypeGuardValidation<T>(
      typeChecker,
      expectArray,
      invalidTypeCallback,
      validTypeCallback
    )
  );
/**
 * An an operator to use with rxjs observables. Could be used to check the type on any state of an observable.
 *
 * The best use case for this would be on the edges of your application such as request to external APIs.
 * This would help with both verifying that the you defined the correct types for the returned values.
 * This would also help to catch if the data type returned from an API changes.
 *
 * @param typeChecker - A function that acts as a type guard. Accepts the item in and returns a boolean for if its valid
 * @param expectArray - Apply the typeChecker to an array of items instead of individual item.
 * @param invalidTypeCallback - Callback for if typeChecker(item) returns false
 * @param validTypeCallback - Callback for if typeChecker(item) returns true
 */

export const typeGuardCheckOperator = typeGuardOperatorFactory(tap);
/**
 * Same as typeGuardCheckOperator expect that the observable gets emitted to the return value from either the invalidTypeCallback or the validTypeCallback.
 * If either callback is omitted the stream is re-emitted when that callback is called.
 */

export const typeGuardMapOperator = typeGuardOperatorFactory(map);
