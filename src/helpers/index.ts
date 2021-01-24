import { TypeChecker, TypeCheckCallback } from "../types";

/**
 * The validatorFactory returns a validator function that can be used to do runtime type checks for a certain type.
 * 
 * The invalidTypeCallback and validTypeCallbacks null/undefined or a some value.
 * If null/undefined the original value is returned from the validator function, if any other value is return that value is also returned by the validator.
 * 
 * Example:
 * let cars = 0;
 * const logInvalidType = (car) => {
 *     postToSomeLoggingService(car)
 * }
 * const incrementCarCount = () => {
 *     cars++
 * }
 * 
 * const carsValidator = validatorFactory(isCar, true, logInvalidCar, incrementCarCount)
 * 
 * In cases where invalidTypeCallback or validTypeCallback don't return anything we can use this to check a value and also a return value.
 * 
 * To check an existing value:
 * const car = {...}
 * carValidator(car)
 * 
 * To check a return value, you can just use the validator as a higher order function:
 * 
 * const car = carValidator(getNextCar())
 * 
 * @param typeChecker - A function that acts as a type guard. Accepts the item in and returns a boolean for if its valid
 * @param expectArray - Apply the typeChecker to an array of items instead of individual item.
 * @param invalidTypeCallback - Callback for if typeChecker(item) returns false
 * @param validTypeCallback - Callback for if typeChecker(item) returns true
 */
export const validatorFactory = <T>(
  typeChecker: TypeChecker,
  expectArray?: boolean,
  invalidTypeCallback?: TypeCheckCallback,
  validTypeCallback?: TypeCheckCallback
) => (value: T): T => {
        if (!!expectArray !== Array.isArray(value)) {
            return invalidTypeCallback?.(value) ?? value;
        }
        if (Array.isArray(value)
            ? !value.some((element) => typeChecker(element))
            : !typeChecker(value)) {
            return invalidTypeCallback?.(value) ?? value;
        }
        return validTypeCallback?.(value) ?? value;
};
