/**
 * UseCaseError class encapsualtes the use case errors
 */
class UseCaseError extends Error {
  /**
   * @param {string} message error message
   */
  constructor(message: string) {
    super(message);
    this.name = this.getErrorType();
  }

  /**
   * @return {string} error type from the class name
   */
  private getErrorType(): string {
    return this.constructor.name.toString();
  }
}

export default UseCaseError;
