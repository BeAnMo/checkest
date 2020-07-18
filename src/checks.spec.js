import { check } from './checks';
import {
  isBoolean,
  isNull,
  isUndefined,
  isNumber,
  isString,
  isObject,
  isArray,
} from './predicates';

describe('"check"', () => {
  it('should pass primitive data', () => {
    expect(check(true, isBoolean)).toStrictEqual({ passed: true });
    expect(check(false, isBoolean)).toStrictEqual({ passed: true });
    expect(check(1, isNumber)).toStrictEqual({ passed: true });
    expect(check('this is a string', isString)).toStrictEqual({ passed: true });
    expect(check(null, isNull)).toStrictEqual({ passed: true });
    expect(check(undefined, isUndefined)).toStrictEqual({ passed: true });
  });

  it('should pass for black-boxed compound data', () => {
    expect(check({}, isObject)).toStrictEqual({ passed: true });
    expect(check([], isArray)).toStrictEqual({ passed: true });
    expect(check([1, 2, 3], isArray)).toStrictEqual({ passed: true });
    expect(check({ a: 1, b: 2, c: [1, 2, 3] }, isObject)).toStrictEqual({
      passed: true,
    });
    expect(check(Object.create(null), isObject)).toStrictEqual({
      passed: true,
    });
    expect(check(new Date(), isObject)).toStrictEqual({ passed: true });
  });

  it('should pass for detailed compound data', () => {
    expect(check([1, 2, 3], [isNumber])).toStrictEqual({
      passed: true,
    });
    expect(
      check(
        { a: 1, b: 'whut?', c: [1, 2, 3] },
        { a: isNumber, b: isString, c: [isNumber] }
      )
    ).toStrictEqual({
      passed: true,
    });
  });
});
