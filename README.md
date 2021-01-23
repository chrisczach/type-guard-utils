# Type Guard Utils

<p>Just some operators and decorators to check return types at runtime. Mostly useful for doing sanity checks at the edges of your apps</p>

******

## Rxjs Operators

<dl>
<dt><a href="#typeGuardCheckOperator">typeGuardCheckOperator</a></dt>
<dd><p>An an operator to use with rxjs observables. Could be used to check the type on any state of an observable.</p>
<p>The best use case for this would be on the edges of your application such as request to external APIs.
This would help with both verifying that the you defined the correct types for the returned values.
This would also help to catch if the data type returned from an API changes.</p>
</dd>
<dt><a href="#typeGuardMapOperator">typeGuardMapOperator</a></dt>
<dd><p>Same as typeGuardCheckOperator expect that the observable gets emitted to the return value from either the invalidTypeCallback or the validTypeCallback.
If either callback is omitted the stream is re-emitted when that callback is called.</p>
</dd>
</dl>

******

## Typescript Method Decorators

<dl>
<dt><a href="#checkWithTypeGuard">checkWithTypeGuard(typeChecker, expectArray, invalidTypeCallback, validTypeCallback, mapInsteadOfCheck)</a></dt>
<dd><p>A method decorator to check return type.</p>
<p>For Observables: Wraps the typeGuardMapOperator.</p>
<p>For Promises and non-async values: Wraps internal handleTypeGuardValidation function.</p>
<p>Can handle <ReturnType>() =&gt; ReturnType | &lt;Promise<ReturnType>&gt; | &lt;Observable<ReturnType>&gt;</p>
</dd>
<dt><a href="#typeGuardOperatorFactory">typeGuardOperatorFactory(operator)</a></dt>
<dd><p>Mostly for internal use but exposing incase anyone wants to do anything other than the predefined operators.</p>
</dd>
</dl>

<a name="typeGuardCheckOperator"></a>

******
# Detailed function descriptions
******

## typeGuardCheckOperator
An an operator to use with rxjs observables. Could be used to check the type on any state of an observable.

The best use case for this would be on the edges of your application such as request to external APIs.
This would help with both verifying that the you defined the correct types for the returned values.
This would also help to catch if the data type returned from an API changes.

**Kind**: global variable  

| Param | Description |
| --- | --- |
| typeChecker | A function that acts as a type guard. Accepts the item in and returns a boolean for if its valid |
| expectArray | Apply the typeChecker to an array of items instead of individual item. |
| invalidTypeCallback | Callback for if typeChecker(item) returns false |
| validTypeCallback | Callback for if typeChecker(item) returns true |

<a name="typeGuardMapOperator"></a>

## typeGuardMapOperator
Same as typeGuardCheckOperator expect that the observable gets emitted to the return value from either the invalidTypeCallback or the validTypeCallback.
If either callback is omitted the stream is re-emitted when that callback is called.

**Kind**: global variable  
<a name="checkWithTypeGuard"></a>

## checkWithTypeGuard(typeChecker, expectArray, invalidTypeCallback, validTypeCallback, mapInsteadOfCheck)
A method decorator to check return type.

Usage:

### @checkWithTypeGuard(typeChecker, expectArray, invalidTypeCallback)
### someMethod(...) {...}

For Observables: Wraps the typeGuardMapOperator.

For Promises and non-async values: Wraps internal handleTypeGuardValidation function.

Can handle <ReturnType>() => ReturnType | <Promise<ReturnType>> | <Observable<ReturnType>>

**Kind**: global function  

| Param | Default | Description |
| --- | --- | --- |
| typeChecker |  | A function that acts as a type guard. Accepts the item in and returns a boolean for if its valid |
| expectArray | <code>false</code> | Apply the typeChecker to an array of items instead of individual item |
| invalidTypeCallback |  | Callback for if typeChecker(item) returns false |
| validTypeCallback |  | Callback for if typeChecker(item) returns true |
| mapInsteadOfCheck | <code>false</code> | If true the return type gets mapped to the return from either the invalidTypeCallback or validTypeCallback. Default is that the return value is unchanged. |

<a name="typeGuardOperatorFactory"></a>

## typeGuardOperatorFactory(operator)
Mostly for internal use but exposing incase anyone wants to do anything other than the predefined operators.

**Kind**: global function  

| Param | Description |
| --- | --- |
| operator | Accepts an rxjs operator |r
