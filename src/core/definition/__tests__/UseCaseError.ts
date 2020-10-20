import { UseCaseError } from '..';

test('message property should have custom message', () => {
  const msg = `A random error message`;
  const err = new UseCaseError(msg);
  expect(err.message).toBe(msg);
  expect(err.name).toBe('UseCaseError');
});

test('name property should have the same name as the class', () => {
  /**
   * PseudoError class is used to test the name
   * property of the UseCaseError instance
   */
  class PseudoError extends UseCaseError {
    /**
     * @param {string} msg
     */
    constructor(msg: string) {
      super(msg);
    }
  }
  const err = new UseCaseError('error message');
  const err2 = new PseudoError('error message 2');
  expect(err.name).toBe('UseCaseError');
  expect(err2.name).toBe('PseudoError');
});
