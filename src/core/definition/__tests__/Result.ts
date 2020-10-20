import { Result, UseCaseError } from '..';

test('#getValue when the value is present should return the value', () => {
  const val1 = 'success';
  const res1 = new Result(undefined, val1);
  expect(res1.getValue()).toBe('success');

  const val2 = { res: 'success' };
  const res2 = new Result(undefined, val2);
  expect(res2.getValue()).toEqual(val2);
});

test('#getValue when there is error in the result should throw error', () => {
  const res = new Result(new Error('error'));
  expect(() => res.getValue()).toThrowError(
    "Can't get the value of an error result. Use 'errorValue' instead.",
  );
});

test('#getError should return error when error is present', () => {
  const err = new Error('error');
  const res = new Result(err);
  expect(res.getError()).toBeInstanceOf(Error);
  expect(res.getError()).toEqual(err);
});

test('#getError should return undefined when error is not present', () => {
  const res = new Result(undefined, undefined);
  expect(res.getError()).toBeUndefined();
});

test('static method #fail should return Result object with the given error', () => {
  const err = new UseCaseError('error');
  const obj = Result.fail(err);
  expect(obj).toBeInstanceOf(Result);
  expect(obj.getError()).toEqual(err);
});

test('static method #ok should return Result object with the given value', () => {
  const val = 'value';
  const obj = Result.ok(val);
  expect(obj).toBeInstanceOf(Result);
  expect(obj.getValue()).toEqual(val);
});
