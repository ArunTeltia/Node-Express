import UseCaseError from 'core/definition/UseCaseError';

/**
 * Result class is the generic class for creating the use case results
 */
class Result<T, E = UseCaseError> {
  private value?: T;
  private error?: E;

  public isError: boolean;

  /**
   * @param {E} error error if any
   * @param {T} value result value if any
   */
  constructor(error?: E, value?: T) {
    if (error) {
      this.isError = true;
      this.error = error;
    } else {
      this.isError = false;
      this.value = value;
    }
  }

  /**
   * getValue returns the value if there is no error
   *
   * However if the instance was instantiated with no value and an error
   * then executing this method will throw the following error
   *
   * `Can't get the value of an error result. Use 'errorValue' instead.`
   * @return {T}
   */
  public getValue(): T {
    if (this.isError) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      );
    }

    return this.value as T;
  }

  /**
   * getError returns the error if the object was instantiated with an error
   * @return {E | undefined}
   */
  public getError(): E | undefined {
    if (this.isError) {
      return this.error as E;
    }

    return undefined;
  }

  /**
   * fail returns an object of `Result` class and initialises
   * it with the given error
   * @param {E} error
   * @return {Result<U, E>}
   */
  public static fail<U, E extends UseCaseError>(error: E): Result<U, E> {
    return new Result<U, E>(error);
  }

  /**
   * ok returns an object of `Result` class and initialises
   * it with `undefined` error and a value
   * @param {T} result
   * @return {Result<T>}
   */
  public static ok<T>(result: T): Result<T> {
    return new Result<T>(undefined, result);
  }
}

export default Result;
