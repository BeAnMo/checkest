import { isBoolean, isNumber, isNull } from './predicates';

describe('"isNull"', () => {
  it('should pass for null', () => {
    expect(isNull(null)).toBe(true);
  });

  it('should fail for non-null objects', () => {
    expect(isNull(Object.create(null))).toBe(false);
    expect(isNull({})).toBe(false);
  });

  it('should fail for false/undefined/0/""', () => {
    expect(isNull(false)).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
  });
});

describe('"isBoolean"', () => {
  it('should pass for true/false', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it('should fail for constructor function', () => {
    expect(isNumber(Boolean)).toBe(false);
  });

  it('should fail for strings', () => {
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean('')).toBe(false);
  });

  it('should fail for 0/1', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
  });

  it('should fail for null/undefined', () => {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
  });

  it('should fail for objects', () => {
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(['a', {}])).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean(/whut?/i)).toBe(false);
  });
});

describe('"isNumber"', () => {
  it('should pass for integers/floats/big ints/MAX/MIN', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(1_000_00)).toBe(true);
    expect(isNumber(3.143434)).toBe(true);
    expect(isNumber(Math.PI)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
    expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumber(BigInt('9007199254740991'))).toBe(true);
    expect(
      isNumber(
        BigInt('0b11111111111111111111111111111111111111111111111111111')
      )
    ).toBe(true);
  });

  it('should fail for NaN', () => {
    expect(isNumber(NaN)).toBe(false);
  });

  it('should fail for constructor function', () => {
    expect(isNumber(Number)).toBe(false);
  });

  it('should fail for booleans', () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
  });

  it('should fail for strings', () => {
    expect(isNumber('0')).toBe(false);
    expect(isNumber('1')).toBe(false);
    expect(isNumber('hello')).toBe(false);
  });

  it('should fail for null/undefined', () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });

  it('should fail for objects', () => {
    expect(isNumber([])).toBe(false);
    expect(isNumber(['a', {}])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(/whut?/i)).toBe(false);
  });
});
